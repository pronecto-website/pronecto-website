import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { token, email } = req.body;
  if (!token || !email) return res.status(400).json({ error: 'Token und E-Mail erforderlich' });

  const { error: updateError } = await supabase
    .from('leads')
    .update({ email })
    .eq('link_token', token);

  if (updateError) return res.status(500).json({ error: 'Speichern fehlgeschlagen' });

  const ergebnisUrl = `https://pronecto.de/prozess-check/ergebnis/${token}`;

  try {
    await Promise.all([
      resend.emails.send({
        from: 'PRONECTO <noreply@pronecto.de>',
        to: email,
        subject: 'Ihr PRONECTO Prozess-Check Ergebnis',
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;">
            <div style="margin-bottom:32px;">
              <strong style="font-size:1.1rem;color:#1A1F2E;letter-spacing:1px;">PRONECTO</strong>
            </div>
            <h2 style="color:#1A1F2E;font-size:1.4rem;margin-bottom:12px;">Ihr Prozess-Check Ergebnis</h2>
            <p style="color:#6B6B6B;line-height:1.6;margin-bottom:24px;">
              Vielen Dank für Ihre Teilnahme am Prozess-Check. Ihr persönliches Ergebnis finden Sie unter folgendem Link:
            </p>
            <a href="${ergebnisUrl}" style="display:inline-block;background:#E8793A;color:#fff;padding:14px 28px;border-radius:980px;text-decoration:none;font-weight:600;margin-bottom:32px;">
              Ergebnis ansehen →
            </a>
            <p style="color:#8A8A8A;font-size:0.85rem;line-height:1.6;">
              Wenn Sie Fragen zu Ihrem Ergebnis haben oder konkrete nächste Schritte besprechen möchten, antworten Sie einfach auf diese E-Mail oder buchen Sie ein kostenloses 30-Minuten-Gespräch.
            </p>
            <hr style="border:none;border-top:1px solid #E2E2E2;margin:24px 0;">
            <p style="color:#8A8A8A;font-size:0.78rem;">
              PRONECTO · David Justus · Hamburg<br>
              <a href="https://pronecto.de" style="color:#E8793A;">pronecto.de</a>
            </p>
          </div>
        `
      }),
      resend.emails.send({
        from: 'PRONECTO System <noreply@pronecto.de>',
        to: process.env.DAVID_EMAIL,
        subject: `Neuer Lead hat E-Mail hinterlassen — ${email}`,
        html: `
          <p>Ein Lead hat seine E-Mail-Adresse hinterlassen:</p>
          <p><strong>${email}</strong></p>
          <p>Ergebnis-Link: <a href="${ergebnisUrl}">${ergebnisUrl}</a></p>
        `
      })
    ]);
  } catch (emailErr) {
    console.error('E-Mail-Fehler:', emailErr);
  }

  return res.status(200).json({ ok: true });
}
