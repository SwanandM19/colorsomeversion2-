import nodemailer from 'nodemailer';
import type { Consultation } from './supabase';

// Basic HTML-escaping for user-submitted text dropped into the email template.
function esc(value: unknown): string {
  if (value === null || value === undefined || value === '') return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function row(label: string, value: unknown, href?: string) {
  const v = esc(value) || '<span style="color:#B0A898;">Not provided</span>';
  const content = href && value ? `<a href="${href}" style="color:#8C6478;text-decoration:none;font-weight:600;">${v}</a>` : `<span style="color:#1A1A1A;font-weight:600;">${v}</span>`;
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #EDE6DA;width:170px;vertical-align:top;">
        <span style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#9B8E7E;font-weight:700;">${label}</span>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #EDE6DA;font-family:Arial,sans-serif;font-size:14px;vertical-align:top;">
        ${content}
      </td>
    </tr>`;
}

/** Sends the branded "new consultation request" alert email to the owner. */
export async function sendConsultationEmail(consultation: Consultation): Promise<void> {
  const { id, created_at, name, phone, email, city, property_type, interior_exterior, area_size, preferred_finish, timeline, notes } = consultation;

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const alertEmail = process.env.CONSULTATION_ALERT_EMAIL;

  if (!gmailUser || !gmailAppPassword || !alertEmail) {
    throw new Error('Missing Gmail environment variables.');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: gmailUser, pass: gmailAppPassword },
  });

  const submittedAt = created_at
    ? new Date(created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    : new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

  const html = `
    <div style="background:#FAF8F5;padding:32px 16px;font-family:Arial,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #EDE6DA;">
        <tr>
          <td style="height:5px;background:linear-gradient(90deg,#8C6478,#C4704B);background-color:#C4704B;"></td>
        </tr>
        <tr>
          <td style="background-color:#1A1A1A;padding:28px 32px;">
            <p style="margin:0;font-size:20px;font-weight:700;color:#FFFFFF;letter-spacing:0.02em;">COLORSOME <span style="color:#C9A858;">PAINTS</span></p>
            <p style="margin:4px 0 0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#9B8E7E;">Consultation Request Alert</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0;font-size:22px;font-weight:700;color:#1A1A1A;">New Consultation Request</p>
                  <p style="margin:4px 0 0;font-size:13px;color:#9B8E7E;">Submitted ${esc(submittedAt)}${id ? ` &middot; Ref #${esc(String(id).slice(0, 8))}` : ''}</p>
                </td>
                <td align="right" style="vertical-align:top;">
                  <span style="display:inline-block;background-color:#F3E7C9;color:#1A1A1A;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;padding:6px 12px;border-radius:999px;white-space:nowrap;">${esc(interior_exterior) || 'General'}</span>
                </td>
              </tr>
            </table>

            <p style="margin:28px 0 10px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#C4704B;font-weight:700;">Contact Details</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${row('Name', name)}
              ${row('Phone', phone, phone ? `tel:${String(phone).replace(/\s/g, '')}` : undefined)}
              ${row('Email', email, email ? `mailto:${email}` : undefined)}
              ${row('City', city)}
            </table>

            <p style="margin:28px 0 10px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#C4704B;font-weight:700;">Project Details</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${row('Property Type', property_type)}
              ${row('Requirement', interior_exterior)}
              ${row('Area Size', area_size)}
              ${row('Preferred Finish', preferred_finish)}
              ${row('Timeline', timeline)}
            </table>

            ${notes ? `
            <p style="margin:28px 0 10px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#C4704B;font-weight:700;">Additional Notes</p>
            <p style="margin:0;padding:14px 16px;background-color:#FDFBF7;border:1px solid #EDE6DA;border-radius:10px;font-size:14px;color:#1A1A1A;line-height:1.6;">${esc(notes)}</p>
            ` : ''}

            <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:32px;">
              <tr>
                ${phone ? `
                <td style="padding-right:10px;">
                  <a href="tel:${esc(String(phone).replace(/\s/g, ''))}" style="display:inline-block;background-color:#1A1A1A;color:#FFFFFF;text-decoration:none;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;padding:12px 20px;border-radius:10px;">Call ${esc(name).split(' ')[0] || 'Client'}</a>
                </td>` : ''}
                ${email ? `
                <td>
                  <a href="mailto:${esc(email)}" style="display:inline-block;background-color:#F3E7C9;color:#1A1A1A;text-decoration:none;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;padding:12px 20px;border-radius:10px;">Reply by Email</a>
                </td>` : ''}
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:#FDFBF7;padding:18px 32px;border-top:1px solid #EDE6DA;">
            <p style="margin:0;font-size:11px;color:#9B8E7E;">This request was submitted via the "Request Consultation" form on colorsomepaints.com.</p>
          </td>
        </tr>
      </table>
    </div>
  `;

  await transporter.sendMail({
    from: `"Colorsome Paints Website" <${gmailUser}>`,
    to: alertEmail,
    subject: `New consultation request from ${name}${city ? ` (${city})` : ''}`,
    html,
    replyTo: email || gmailUser,
  });
}
