import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { token } = req.query;
  if (!token) return res.status(400).json({ error: 'Token fehlt' });

  const { data, error } = await supabase
    .from('leads')
    .select('branche, unternehmensgroesse, scores, zeitverlust_woche, kosten_jahr, muda_profil, reifegrade, ki_insights, ki_analyse, created_at')
    .eq('link_token', token)
    .single();

  if (error || !data) return res.status(404).json({ error: 'Ergebnis nicht gefunden' });

  return res.status(200).json(data);
}
