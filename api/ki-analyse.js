import Anthropic from '@anthropic-ai/sdk';
import { getBranchenkontext } from '../api/branchenkontext.js';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Du bist der KI-Prozessanalyst von PRONECTO. Du erstellst die abschließende
Prozessanalyse für kleine und mittlere Unternehmen auf Basis aller gesammelten Daten.

METHODISCHE GRUNDLAGE:
- BPM-Lebenszyklus (Dumas et al.): Prozessidentifikation → Prozesserhebung → Analyse → Verbesserung
- 7 Verschwendungsarten (Muda): M1=Transport, M2=Lange Wege, M3=Inventar,
  M4=Wartezeiten, M5=Fehler, M6=Mehraufwand, M7=Überproduktion
- Durchlaufzeiteffizienz (DZE) = Bearbeitungszeit / Durchlaufzeit (typisch admin.: 10-25%)
- Aufwandskategorien: quick_win (<1 Woche, <500€), mittelfristig (1-4 Wochen, 500-3000€), strategisch (>4 Wochen, >3000€)

TONALITÄT:
- Deutsch, Siezen
- Wie ein kompetenter Freund, nicht wie McKinsey
- Konkret und mit Zahlen, nie abstrakt
- VERBOTEN: "revolutionär", "cutting-edge", "ganzheitlich", "End-to-End", "Synergie"
- Verlust ZUERST, dann Potenzial
- KEIN Verkaufspitch für PRONECTO in der Analyse`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { branche, mitarbeiter, schwerpunkte, ausstattung, alleAntworten, scores, kiInsights, zeitverlustGesamt, kostenJahr, E0_freitext, blockFreitexte } = req.body;
  if (!branche || !alleAntworten || !scores) return res.status(400).json({ error: 'Fehlende Parameter' });

  const branchenkontext = getBranchenkontext(branche);
  const kostenProWoche = kostenJahr ? Math.round(kostenJahr / 48) : 0;

  const userPrompt = `KONTEXT DES LEADS:
- Betriebsgröße: ${mitarbeiter}
- Berechnete Scores: ${JSON.stringify(scores)}
- KI-Insights aus den Blöcken: ${JSON.stringify(kiInsights)}
- Geschätzter Gesamtzeitverlust: ${zeitverlustGesamt ? zeitverlustGesamt.toFixed(1) + 'h/Woche' : 'n/a'}
- Hochgerechnete Kosten/Jahr: ${kostenJahr ? Math.round(kostenJahr) + '€' : 'n/a'}
- Kosten pro Woche: ~${kostenProWoche}€

EIGENE WORTE DES LEADS:
${E0_freitext ? `- Hauptproblem: "${E0_freitext}"` : '- (nicht angegeben)'}
${Object.entries(blockFreitexte || {}).filter(([, v]) => v).map(([b, t]) => `- Block ${b}: "${t}"`).join('\n') || '- (keine)'}

BRANCHENSPEZIFISCHES VOKABULAR (nur als Orientierung):
${branchenkontext}

AUFGABE: Generiere:
1. Teaser-Text (2-3 Sätze, wichtigste Erkenntnis + Zahl)
2. Top-3 Maßnahmenplan — sortiert nach Aufwand (quick_win zuerst)
3. Fließtext-Gesamteinschätzung (5-8 Sätze, umfasst alle Bereiche)
4. Headline-Kennzahl (auffälligste Zahl)
5. Dringlichkeitsaussage (1-2 Sätze: Kosten pro Woche + Timeline bis Quick Win)

WICHTIG:
${E0_freitext ? `- Der Lead hat sein Problem selbst so beschrieben: "${E0_freitext}". Beziehe dich darauf in der gesamteinschaetzung.` : ''}
- Baue die Analyse um die persönliche Situation des Leads, nicht um die Branche.
- Die gesamteinschaetzung sollte so klingen, als sprichst du mit DIESER Person, nicht mit einer Zielgruppe.
- Kein Satz darf generisch oder austauschbar sein.

Antworte NUR als gültiges JSON ohne Markdown:
{
  "teaser": "...",
  "massnahmen": [
    {
      "bereich": "...",
      "ist": "...",
      "soll": "...",
      "ersparnis_h_woche": 3.5,
      "aufwand": "quick_win|mittelfristig|strategisch",
      "beschreibung": "..."
    }
  ],
  "gesamteinschaetzung": "...",
  "headline_stat": {"label": "...", "wert": "...", "einheit": "..."},
  "dringlichkeit": {
    "text": "Jede weitere Woche kostet Ihren Betrieb ca. ${kostenProWoche}€. Die Quick Wins sind in 1-2 Wochen umsetzbar.",
    "wochen_bis_quick_win": 1,
    "ersparnis_quick_win_h": 2.5
  }
}`;

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [{ role: 'user', content: userPrompt }],
      system: SYSTEM_PROMPT,
    });

    const text = message.content[0].text.trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Kein JSON in Antwort');
    const result = JSON.parse(jsonMatch[0]);

    return res.status(200).json(result);
  } catch (err) {
    console.error('ki-analyse error:', err);
    return res.status(500).json({ error: 'KI-Anfrage fehlgeschlagen', details: err.message });
  }
}
