import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Retry with exponential backoff
async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 1000
): Promise<T> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      const isRetryable =
        err?.status === 503 ||
        err?.status === 429 ||
        err?.message?.includes('503') ||
        err?.message?.includes('429') ||
        err?.message?.includes('overloaded') ||
        err?.message?.includes('high demand');

      if (isRetryable && attempt < retries - 1) {
        // Wait: 1s → 2s → 4s
        await new Promise((res) => setTimeout(res, delayMs * 2 ** attempt));
        continue;
      }
      throw err;
    }
  }
  throw new Error('Max retries exceeded');
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const history = messages
  .slice(0, -1) // exclude last message (sent separately)
  .map((m: any) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }))
  .filter((_: any, i: number, arr: any[]) => {
    // Drop everything before the first 'user' message
    const firstUserIndex = arr.findIndex((msg) => msg.role === 'user');
    return i >= firstUserIndex;
  });

    const lastMessage = messages[messages.length - 1].content;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: `You are Chroma, an expert AI paint consultant for Colorsome Paints.
You help customers choose paint colours, products, and finishes for their homes and projects.
Keep responses friendly, concise, and focused on paint-related topics.`,
    });

    const result = await withRetry(() => {
      const chat = model.startChat({ history });
      return chat.sendMessage(lastMessage);
    });

    const text = result.response.text();
    return NextResponse.json({ reply: text });

  } catch (err: any) {
    console.error('Chat API error:', err);

    // Send a friendly message based on error type
    const is503 =
      err?.status === 503 ||
      err?.message?.includes('503') ||
      err?.message?.includes('high demand');

    const is429 =
      err?.status === 429 ||
      err?.message?.includes('429') ||
      err?.message?.includes('quota');

    if (is503) {
      return NextResponse.json(
        { reply: "I'm a little busy right now — Chroma is in high demand! 🎨 Please try again in a few seconds." },
        { status: 200 } // Return 200 so the frontend shows the message, not a hard error
      );
    }

    if (is429) {
      return NextResponse.json(
        { reply: "We've hit our usage limit for now. Please try again in a minute!" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { reply: "Sorry, something went wrong on my end. Please try again!" },
      { status: 200 }
    );
  }
}