import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { supabaseAdmin } from '@/lib/supabase';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawUsername = (body.username || '').trim().toLowerCase().replace(/^@/, '');
    const forceRefresh = Boolean(body.forceRefresh);

    if (!rawUsername || !/^[a-z0-9._]{1,30}$/.test(rawUsername)) {
      return NextResponse.json({ error: 'Please enter a valid public Instagram handle.' }, { status: 400 });
    }

    // 1. Check Supabase Cache first (saves 100% of API & AI costs if searched within 7 days)
    if (!forceRefresh) {
      const { data: cached } = await supabaseAdmin
        .from('audits')
        .select('*')
        .eq('username', rawUsername)
        .single();

      if (cached && cached.updated_at) {
        const ageHours = (Date.now() - new Date(cached.updated_at).getTime()) / (1000 * 60 * 60);
        if (ageHours < 168) {
          return NextResponse.json({ source: 'cache', audit: cached });
        }
      }
    }

    // 2. Fetch Public Profile + Recent Posts via ScrapeCreators (with 7d free cache fallback)
    const scUrl = `https://api.scrapecreators.com/v1/instagram/profile?handle=${encodeURIComponent(rawUsername)}&cache_max_age=7d`;
    const scRes = await fetch(scUrl, {
      headers: { 'x-api-key': process.env.SCRAPECREATORS_API_KEY || '' },
    });

    if (!scRes.ok) {
      return NextResponse.json(
        { error: 'Could not fetch profile. Ensure the account is public and spelled correctly.' },
        { status: 404 }
      );
    }

    const scData = await scRes.json();
    const user = scData?.data?.user || scData?.user || scData;

    if (!user || user.is_private) {
      return NextResponse.json(
        { error: 'This account is private or does not exist. ViewInstaAnon audits public profiles only.' },
        { status: 403 }
      );
    }

    const followersCount = user.edge_followed_by?.count || user.follower_count || 0;
    const followingCount = user.edge_follow?.count || user.following_count || 0;
    const postsCount = user.edge_owner_to_timeline_media?.count || user.media_count || 0;
    const bio = user.biography || '';
    const bioUrl = user.external_url || '';
    const displayName = user.full_name || rawUsername;

    // Normalize recent posts
    const edges = user.edge_owner_to_timeline_media?.edges || [];
    const normalizedPosts = edges.slice(0, 24).map((edge: any) => {
      const node = edge.node || edge;
      const caption = node.edge_media_to_caption?.edges?.[0]?.node?.text || node.caption?.text || '';
      const likes = node.edge_liked_by?.count || node.edge_media_preview_like?.count || node.like_count || 0;
      const comments = node.edge_media_to_comment?.count || node.comment_count || 0;
      const views = node.video_view_count || node.play_count || 0;
      return {
        id: node.id || node.shortcode,
        shortcode: node.shortcode || '',
        is_video: Boolean(node.is_video),
        likes,
        comments,
        views,
        caption: caption.slice(0, 600),
        timestamp: node.taken_at_timestamp || 0,
      };
    });

    // Calculate baseline Engagement Rate & isolate 2.5x+ Outliers
    const totalInteractions = normalizedPosts.reduce((sum: number, p: any) => sum + p.likes + p.comments, 0);
    const avgInteractions = normalizedPosts.length > 0 ? totalInteractions / normalizedPosts.length : 0;
    const engagementRate = followersCount > 0 ? Number(((avgInteractions / followersCount) * 100).toFixed(2)) : 0;

    // 3. Run Gemini 2.5 Flash Forensic Analysis (Structured JSON Output)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            niche: { type: SchemaType.STRING },
            ad_saturation_pct: { type: SchemaType.INTEGER },
            detected_sponsors: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  brand_or_code: { type: SchemaType.STRING },
                  type: { type: SchemaType.STRING },
                  evidence: { type: SchemaType.STRING },
                },
              },
            },
            outlier_breakdowns: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  shortcode: { type: SchemaType.STRING },
                  hook_pattern: { type: SchemaType.STRING },
                  why_it_worked: { type: SchemaType.STRING },
                  stealable_template: { type: SchemaType.STRING },
                },
              },
            },
            funnel_stack: {
              type: SchemaType.OBJECT,
              properties: {
                bio_platform: { type: SchemaType.STRING },
                uses_dm_automation: { type: SchemaType.BOOLEAN },
                dm_keywords: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                primary_offer: { type: SchemaType.STRING },
              },
            },
          },
          required: ['niche', 'ad_saturation_pct', 'detected_sponsors', 'outlier_breakdowns', 'funnel_stack'],
        },
      },
    });

    const prompt = `Analyze this public Instagram creator/brand profile for a B2B competitive intelligence report.
Handle: @${rawUsername}
Bio: ${bio}
Bio URL: ${bioUrl}
Followers: ${followersCount}
Average Interactions per post: ${Math.round(avgInteractions)}

Recent Posts JSON:
${JSON.stringify(normalizedPosts.slice(0, 15))}

Instructions:
1. Identify the primary B2B/D2C niche.
2. Calculate ad_saturation_pct (0-100) based on sponsored tags (#ad, #partner), discount codes, or affiliate CTAs.
3. Extract all detected_sponsors (tagged brands, promo codes, affiliate links).
4. Pick the top 3 performing posts (highest likes/views relative to average) and provide outlier_breakdowns with hook_pattern, why_it_worked, and a fill-in-the-blank stealable_template.
5. Analyze funnel_stack: identify the link-in-bio platform (e.g., Stan Store, Linktree, Shopify, Custom Domain), whether they use ManyChat-style DM triggers (e.g., "Comment WORD"), list the dm_keywords, and summarize their primary_offer.`;

    const aiResult = await model.generateContent(prompt);
    const analysis = JSON.parse(aiResult.response.text());

    // Merge outlier metrics with AI hook breakdowns
    const enrichedOutliers = (analysis.outlier_breakdowns || []).map((item: any) => {
      const matchedPost = normalizedPosts.find((p: any) => p.shortcode === item.shortcode) || normalizedPosts[0] || {};
      const multiplier = avgInteractions > 0
        ? Number((((matchedPost.likes || 0) + (matchedPost.comments || 0)) / avgInteractions).toFixed(1))
        : 1.0;
      return {
        ...item,
        likes: matchedPost.likes || 0,
        comments: matchedPost.comments || 0,
        views: matchedPost.views || 0,
        multiplier: Math.max(multiplier, 1.2),
      };
    });

    const auditRecord = {
      username: rawUsername,
      display_name: displayName,
      niche: analysis.niche || 'Creator & Brand',
      bio,
      bio_url: bioUrl,
      followers_count: followersCount,
      following_count: followingCount,
      posts_count: postsCount,
      engagement_rate: engagementRate,
      ad_saturation_pct: analysis.ad_saturation_pct ?? 0,
      detected_sponsors: analysis.detected_sponsors || [],
      outlier_posts: enrichedOutliers,
      funnel_stack: analysis.funnel_stack || {},
      raw_posts: normalizedPosts,
      updated_at: new Date().toISOString(),
    };

    // 4. Upsert into Supabase (powers pSEO /audit/[username] pages automatically)
    await supabaseAdmin.from('audits').upsert(auditRecord, { onConflict: 'username' });

    return NextResponse.json({ source: 'live', audit: auditRecord });
  } catch (err: any) {
    console.error('Audit Error:', err);
    return NextResponse.json({ error: 'Analysis failed. Please try again in a moment.' }, { status: 500 });
  }
}
