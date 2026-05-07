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

  const { branche, mitarbeiter, schwerpunkte, ausstattung, alleAntworten, scores, kiInsights, zeitverlustGesamt, kostenJahr } = req.body;
  if (!branche || !alleAntworten || !scores) return res.status(400).json({ error: 'Fehlende Parameter' });

  const branchenkontext = getBranchenkontext(branche);

  const userPrompt = `KONTEXT DES LEADS:
- Branche: ${branche}
- Mitarbeiter: ${mitarbeiter}
- Schwerpunkte: ${JSON.stringify(schwerpunkte)}
- Digitale Ausstattung: ${JSON.stringify(ausstattung)}
- Berechnete Scores: ${JSON.stringify(scores)}
- KI-Insights aus den Blöcken: ${JSON.stringify(kiInsights)}
- Geschätzter Gesamtzeitverlust: ${zeitverlustGesamt ? zeitverlustGesamt.toFixed(1) + 'h/Woche' : 'n/a'}
- Hochgerechnete Kosten/Jahr: ${kostenJahr ? Math.round(kostenJahr) + '€' : 'n/a'}

BRANCHENSPEZIFISCHES VOKABULAR:
${branchenkontext}

AUFGABE: Generiere:
1. Teaser-Text für Vorschau (2-3 Sätze, enthält die wichtigste Erkenntnis + Zahl)
2. Top-3 Maßnahmenplan mit Ist/Soll/Ersparnis/Aufwandskategorie — sortiert nach Aufwand (quick_win zuerst)
3. Fließtext-Gesamteinschätzung (5-8 Sätze, umfasst alle Bereiche, keine Wiederholung des Teasers)
4. Eine prägnante Headline-Kennzahl (auffälligste Zahl aus der Analyse)

Antworte NUR als gültiges JSON ohne Markdown:
{
  "teaser": "...",
  "massnahmen": [
    {
      "bereich": "Angebotserstellung",
      "ist": "Jedes Angebot wird manuell in Word erstellt — ca. 45 Min pro Stück",
      "soll": "Angebotsvorlagen in Branchensoftware, Erstellung in unter 10 Min",
      "ersparnis_h_woche": 3.5,
      "aufwand": "quick_win",
      "beschreibung": "Erstellen Sie drei Angebotsvorlagen für Ihre häufigsten Auftragstypen..."
    }
  ],
  "gesamteinschaetzung": "...",
  "headline_stat": {"label": "Zeitverlust pro Woche", "wert": "12", "einheit": "Stunden"}
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
