import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { bio, niche } = await req.json();
    if (!bio || bio.trim().length < 5) {
      return NextResponse.json({ error: 'Please paste a valid Instagram bio.' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            score: { type: SchemaType.INTEGER },
            critique: { type: SchemaType.STRING },
            rewrites: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  angle: { type: SchemaType.STRING },
                  text: { type: SchemaType.STRING },
                },
              },
            },
          },
          required: ['score', 'critique', 'rewrites'],
        },
      },
    });

    const prompt = `Grade this Instagram bio for conversion clarity, authority, and CTA strength in the "${niche || 'General Business/Creator'}" niche (max 150 characters per rewrite).
Current Bio:
"${bio}"

Return a score from 1-100, a sharp 2-sentence critique of what's hurting conversions, and 3 high-converting rewrite options (Authority Angle, Direct-Response Offer Angle, and Social Proof Angle).`;

    const result = await model.generateContent(prompt);
    return NextResponse.json(JSON.parse(result.response.text()));
  } catch {
    return NextResponse.json({ error: 'Failed to grade bio. Try again.' }, { status: 500 });
  }
}
