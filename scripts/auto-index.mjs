import crypto from 'node:crypto';

const SITE_URL = 'https://viewinstaanon.com';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const INDEXNOW_KEY = process.env.INDEXNOW_KEY;
const GOOGLE_CREDS = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}');

// 1. Fetch static, niche, comparison, and newest enriched audit pages from Supabase
async function getUrlsToIndex() {
  const nicheSlugs = [
    'd2c-fitness-supplements',
    'skincare-beauty-cosmetics',
    'b2b-saas-ai-tools',
    'ecommerce-fashion-apparel',
    'personal-finance-investing',
    'real-estate-architecture',
    'food-beverage-coffee-brands',
    'pet-care-accessories',
    'digital-marketing-growth-agencies',
    'productivity-creator-economy-educators',
  ];

  const staticUrls = [
    `${SITE_URL}/`,
    `${SITE_URL}/compare`,
    `${SITE_URL}/vs/hypeauditor`,
    `${SITE_URL}/vs/modash`,
    `${SITE_URL}/vs/sprout-social`,
    `${SITE_URL}/vs/social-blade`,
    `${SITE_URL}/tools/bio-grader`,
    `${SITE_URL}/tools/safe-zone`,
    `${SITE_URL}/tools/utm-stripper`,
    ...nicheSlugs.map((slug) => `${SITE_URL}/niche/${slug}`),
  ];

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/audits?select=username&followers_count=gt.0&order=updated_at.desc&limit=150`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    }
  );
  const audits = await res.json();
  const auditUrls = Array.isArray(audits)
    ? audits.map((a) => `${SITE_URL}/audit/${a.username}`)
    : [];

  return [...staticUrls, ...auditUrls];
}

// 2. Ping IndexNow (Bing, Yandex, DuckDuckGo, ChatGPT Search)
async function pingIndexNow(urlList) {
  if (!INDEXNOW_KEY) return;
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: 'viewinstaanon.com',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
  });
  console.log(`IndexNow status: ${res.status} (${urlList.length} URLs submitted)`);
}

// 3. Generate Google OAuth2 JWT Token (Zero external dependencies)
async function getGoogleAccessToken() {
  if (!GOOGLE_CREDS.client_email || !GOOGLE_CREDS.private_key) return null;

  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const claim = Buffer.from(
    JSON.stringify({
      iss: GOOGLE_CREDS.client_email,
      scope: 'https://www.googleapis.com/auth/indexing',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    })
  ).toString('base64url');

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(`${header}.${claim}`);
  const signature = signer.sign(GOOGLE_CREDS.private_key, 'base64url');
  const jwt = `${header}.${claim}.${signature}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

// 4. Submit batch to Google Indexing API (up to 100/day quota)
async function pingGoogle(urls) {
  const token = await getGoogleAccessToken();
  if (!token) {
    console.log('Skipping Google Indexing API (no credentials configured).');
    return;
  }

  let successCount = 0;
  for (const url of urls.slice(0, 95)) {
    const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ url, type: 'URL_UPDATED' }),
    });
    if (res.ok) successCount++;
  }
  console.log(`Google Indexing API: ${successCount}/${Math.min(urls.length, 95)} URLs notified.`);
}

const urls = await getUrlsToIndex();
await pingIndexNow(urls);
await pingGoogle(urls);
