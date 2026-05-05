import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const BRANCHEN_LABEL = {
  handwerk: 'Handwerk',
  elektro: 'Elektrotechnik',
  autohaus: 'Autohaus',
  sonstiges: 'Allgemein'
};

function formatAntworten(branche, antworten) {
  return Object.entries(antworten)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { branche, groesse, antworten } = req.body;
  if (!branche || !groesse || !antworten) {
    return res.status(400).json({ error: 'Fehlende Felder' });
  }

  const brancheLabel = BRANCHEN_LABEL[branche] || branche;
  const antwortText = formatAntworten(branche, antworten);

  const LEAD_PROMPT = `Du bist David Justus von PRONECTO — ein erfahrener Prozessberater mit Ingenieurs-Hintergrund (Logistik & Mobilität, TUHH). Du analysierst gerade die Antworten eines Unternehmens aus dem Bereich "${brancheLabel}" (${groesse} Mitarbeiter).

ANTWORTEN DES UNTERNEHMENS:
${antwortText}

Erstelle eine JSON-Analyse mit dieser exakten Struktur:
{
  "gesamtscore": <Integer 0-100, Automatisierungspotenzial>,
  "ersparnis_woche": <Dezimalzahl, geschätzte Stunden/Woche die automatisiert werden könnten>,
  "ersparnis_jahr": <ersparnis_woche * 48>,
  "ki_analyse": "<3-4 Absätze Fließtext, Deutsch, siezen, konkret und branchenspezifisch. Kein Marketing-Sprech. Beginne mit dem größten identifizierten Problem, dann was es kostet, dann was möglich wäre.>",
  "muda_profil": {
    "warten": <0.0-1.0>,
    "ueberbearbeitung": <0.0-1.0>,
    "bewegung": <0.0-1.0>,
    "transport": <0.0-1.0>,
    "bestaende": <0.0-1.0>,
    "fehler": <0.0-1.0>,
    "ueberproduktion": <0.0-1.0>
  },
  "prozesse": [
    {
      "name": "<Prozessname, kurz>",
      "ist": "<Ist-Zustand in 1-2 Sätzen, konkret>",
      "soll": "<Soll-Zustand mit Automatisierung, konkret>",
      "muda_tags": ["<Muda-Art>"],
      "reifegrad": <1-5>,
      "ersparnis": "<z.B. '2,5h/Woche' mit kurzem Rechenweg>"
    }
  ]
}

Regeln:
- "prozesse" enthält genau 5 Einträge, sortiert nach Priorität (höchstes Potenzial zuerst)
- Zeitersparnis immer mit Rechenweg (z.B. "7 Angebote × 30min = 3,5h/Woche")
- Keine Buzzwords: kein "revolutionär", "cutting-edge", "End-to-End"
- Tonalität: wie ein kompetenter Berater, nicht wie eine Unternehmensberatungs-Broschüre
- Antworte NUR mit dem JSON-Objekt, kein Markdown, keine Erklärungen davor/danach`;

  const INTERN_PROMPT = `Du bist David Justus von PRONECTO. Erstelle eine INTERNE Einschätzung für diesen Lead — was sehe ich als Berater, was der Lead nicht sieht?

Branche: ${brancheLabel}, Größe: ${groesse} Mitarbeiter
Antworten:
${antwortText}

Erstelle JSON:
{
  "lead_qualitaet": "<heiss|warm|kalt>",
  "geschaetztes_volumen": "<z.B. 'Einmalige Analyse 800-1.200€ + mögliches Umsetzungsprojekt 3.000-8.000€'>",
  "upsell_potenzial": ["<konkrete Folgeaufträge die sinnvoll wären>"],
  "gespraechseinstieg": "<Wie ich das Gespräch starten würde — welches konkrete Problem ich als erstes anspreche, mit welchen Zahlen. Max 3 Sätze.>"
}

Antworte NUR mit dem JSON-Objekt.`;

  try {
    const [leadRes, internRes] = await Promise.all([
      anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 2048,
        messages: [{ role: 'user', content: LEAD_PROMPT }]
      }),
      anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 512,
        messages: [{ role: 'user', content: INTERN_PROMPT }]
      })
    ]);

    let leadData, internData;
    try {
      leadData = JSON.parse(leadRes.content[0].text);
    } catch {
      const match = leadRes.content[0].text.match(/\{[\s\S]*\}/);
      leadData = match ? JSON.parse(match[0]) : {};
    }
    try {
      internData = JSON.parse(internRes.content[0].text);
    } catch {
      const match = internRes.content[0].text.match(/\{[\s\S]*\}/);
      internData = match ? JSON.parse(match[0]) : {};
    }

    const token = crypto.randomBytes(16).toString('hex');

    const { error } = await supabase.from('leads').insert({
      link_token: token,
      branche,
      unternehmensgroesse: groesse,
      antworten,
      scores: leadData.muda_profil,
      gesamtscore: leadData.gesamtscore,
      ersparnis_woche: leadData.ersparnis_woche,
      ersparnis_jahr: leadData.ersparnis_jahr,
      muda_profil: leadData.muda_profil,
      prozesse: leadData.prozesse,
      ki_analyse: leadData.ki_analyse,
      lead_qualitaet: internData.lead_qualitaet,
      geschaetztes_volumen: internData.geschaetztes_volumen,
      upsell_potenzial: internData.upsell_potenzial,
      gespraechseinstieg: internData.gespraechseinstieg,
      status: 'neu'
    });

    if (error) throw error;

    return res.status(200).json({ token });
  } catch (err) {
    console.error('analyse error:', err);
    return res.status(500).json({ error: 'Analyse fehlgeschlagen' });
  }
}
