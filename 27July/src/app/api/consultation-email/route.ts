import { NextResponse } from 'next/server';
import { sendConsultationEmail } from '@/src/lib/consultationEmail';
import type { Consultation } from '@/src/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Consultation;
    await sendConsultationEmail(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Consultation email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: String(error) },
      { status: 500 }
    );
  }
}
