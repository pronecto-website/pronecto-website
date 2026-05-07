import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const {
    branche, unternehmensgroesse, antworten,
    scores, zeitverlust_woche, kosten_jahr,
    muda_profil, reifegrade, ki_insights, ki_analyse
  } = req.body;

  if (!branche || !unternehmensgroesse || !antworten) {
    return res.status(400).json({ error: 'Fehlende Pflichtfelder' });
  }

  const link_token = crypto.randomBytes(16).toString('hex');

  const { error } = await supabase.from('leads').insert({
    link_token,
    branche,
    unternehmensgroesse,
    antworten,
    scores,
    zeitverlust_woche,
    kosten_jahr,
    muda_profil,
    reifegrade,
    ki_insights,
    ki_analyse,
    status: 'neu',
  });

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ error: 'Speichern fehlgeschlagen', details: error.message });
  }

  return res.status(200).json({ token: link_token });
}
