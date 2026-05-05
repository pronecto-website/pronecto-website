import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Nicht autorisiert' });
  }

  const { id, status, notizen } = req.body;
  if (!id) return res.status(400).json({ error: 'ID fehlt' });

  const updates = {};
  if (status !== undefined) updates.status = status;
  if (notizen !== undefined) updates.notizen = notizen;

  const { error } = await supabase.from('leads').update(updates).eq('id', id);

  if (error) return res.status(500).json({ error: 'Update fehlgeschlagen' });

  return res.status(200).json({ ok: true });
}
