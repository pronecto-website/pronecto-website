import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const SYSTEM_PROMPT = `Du bist der interne Berater von PRONECTO (David Justus). Du bewertest
Lead-Qualität und identifizierst Verkaufschancen für KI-Prozessautomatisierung im Mittelstand.
Sei direkt und ehrlich — das ist für interne Nutzung.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Nicht autorisiert' });
  }

  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Token fehlt' });

  const { data: lead, error } = await supabase
    .from('leads')
    .select('*')
    .eq('link_token', token)
    .single();

  if (error || !lead) return res.status(404).json({ error: 'Lead nicht gefunden' });

  const userPrompt = `Lead-Daten:
- Branche: ${lead.branche}
- Mitarbeiter: ${lead.unternehmensgroesse}
- Scores: ${JSON.stringify(lead.scores)}
- Muda-Profil: ${JSON.stringify(lead.muda_profil)}
- Zeitverlust/Woche: ${lead.zeitverlust_woche}h
- Kosten/Jahr: ${lead.kosten_jahr}€
- KI-Analyse: ${JSON.stringify(lead.ki_analyse)}

Bewerte diesen Lead:
1. Lead-Qualität: heiß / warm / kalt (mit kurzer Begründung)
2. Geschätztes Projektvolumen in €
3. Top-3 Upsell-Potenziale (konkrete Maßnahmen die ich anbieten kann)
4. Gesprächseinstieg: Welche eine Zahl/Erkenntnis nehme ich als Eröffnung?

Antworte NUR als gültiges JSON ohne Markdown:
{
  "lead_qualitaet": "heiß",
  "qualitaet_begruendung": "Hoher Zeitverlust (14h/Woche), mittlerer Betrieb, klar benennte Pain Points",
  "geschaetztes_volumen": "3.000-6.000€",
  "upsell_potenzial": ["Angebotssoftware-Einführung (openHandwerk)", "Stundenzettel-App für Monteure", "Automatisches Mahnwesen"],
  "gespraechseinstieg": "Herr/Frau X, Ihre Analyse zeigt: Sie verlieren ca. 14h pro Woche durch manuelle Angebote und Stundenzettel — das entspricht fast 10.000€ pro Jahr."
}`;

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 600,
      messages: [{ role: 'user', content: userPrompt }],
      system: SYSTEM_PROMPT,
    });

    const text = message.content[0].text.trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Kein JSON in Antwort');
    const result = JSON.parse(jsonMatch[0]);

    await supabase.from('leads').update({ ki_intern: result }).eq('link_token', token);

    return res.status(200).json(result);
  } catch (err) {
    console.error('ki-intern error:', err);
    return res.status(500).json({ error: 'KI-Anfrage fehlgeschlagen', details: err.message });
  }
}
