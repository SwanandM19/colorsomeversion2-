import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendConsultationEmail } from '@/src/lib/consultationEmail';
import type { Consultation, ConsultationInput } from '@/src/lib/supabase';

// Server-only client using the service-role key. This bypasses Row-Level
// Security entirely, which is intentional here: the public/anon key has no
// insert policy on `consultations`, and this route is the one trusted,
// server-side place allowed to write to that table. The key is read from a
// non-NEXT_PUBLIC_ env var, so it's never bundled into client-side code.
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error('Missing Supabase server credentials.');
  }
  return createClient(url, serviceRoleKey);
}

function required(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ConsultationInput;

    // Defense-in-depth: the form already validates client-side, but never
    // trust the client — re-check the required fields here too.
    if (!required(body.name) || !required(body.phone) || !required(body.city) || !required(body.property_type) || !required(body.interior_exterior)) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    if (!/^(\+?91)?[6-9]\d{9}$/.test(body.phone.replace(/[\s-]/g, ''))) {
      return NextResponse.json({ error: 'Invalid phone number.' }, { status: 400 });
    }
    if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const payload = {
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email || null,
      city: body.city.trim(),
      property_type: body.property_type,
      interior_exterior: body.interior_exterior,
      area_size: body.area_size || null,
      preferred_finish: body.preferred_finish || null,
      timeline: body.timeline || null,
      notes: body.notes || null,
    };

    const supabaseAdmin = getAdminClient();
    const { data, error } = await supabaseAdmin
      .from('consultations')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save your request.' }, { status: 500 });
    }

    const consultation = data as Consultation;

    try {
      await sendConsultationEmail(consultation);
    } catch (emailError) {
      // The request is already saved — a failed alert email shouldn't fail the whole submission.
      console.error('Consultation saved, but alert email failed:', emailError);
    }

    return NextResponse.json({ success: true, consultation });
  } catch (error) {
    console.error('submit-consultation error:', error);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
