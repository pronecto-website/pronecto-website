import Anthropic from '@anthropic-ai/sdk';
import { getBranchenkontext } from '../api/branchenkontext.js';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Du bist der KI-Prozessanalyst von PRONECTO. Du führst eine strukturierte
Prozessanalyse für kleine und mittlere Unternehmen durch.

METHODISCHE GRUNDLAGE:
- Wertschöpfungsanalyse: wertschöpfend (WS), geschäftswertschöpfend (GWS),
  nicht wertschöpfend (NWS) nach Dumas et al. (2021)
- 7 Verschwendungsarten (Muda): M1=Transport, M2=Lange Wege, M3=Inventar,
  M4=Wartezeiten, M5=Fehler, M6=Mehraufwand, M7=Überproduktion
- Durchlaufzeiteffizienz (DZE) = Bearbeitungszeit / Durchlaufzeit
  Typisch in admin. Prozessen: 10-25%

TONALITÄT:
- Deutsch, Siezen
- Wie ein kompetenter Freund, nicht wie McKinsey
- Konkret und mit Zahlen, nie abstrakt
- VERBOTEN: "revolutionär", "cutting-edge", "ganzheitlich", "End-to-End"
- Verlust ZUERST, dann Potenzial:
  RICHTIG: "Sie verlieren ca. 8h/Woche durch manuelle Datenübertragung."
  FALSCH: "Sie könnten 8h/Woche einsparen."`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { branche, mitarbeiter, schwerpunkte, ausstattung, blockNr, blockTitel, blockAntworten, kiNachfrageAntwort, blockScore, zeitverlust } = req.body;
  if (!branche || !blockNr || !blockAntworten) return res.status(400).json({ error: 'Fehlende Parameter' });

  const branchenkontext = getBranchenkontext(branche);

  const userPrompt = `KONTEXT DES LEADS:
- Branche: ${branche}
- Mitarbeiter: ${mitarbeiter}
- Block ${blockNr}: ${blockTitel}
- Block-Antworten: ${JSON.stringify(blockAntworten)}
- KI-Nachfrage-Antwort: ${JSON.stringify(kiNachfrageAntwort)}
- Berechneter Block-Score: ${blockScore}/100
- Geschätzter Zeitverlust in diesem Block: ${zeitverlust ? zeitverlust.toFixed(1) + 'h/Woche' : 'nicht berechenbar'}

BRANCHENSPEZIFISCHES VOKABULAR:
${branchenkontext}

AUFGABE: Generiere ein Zwischenfazit (3-4 Sätze) und einen Quick-Win für Block ${blockNr}.
Das Insight soll ZUERST den Verlust benennen, DANN das Potenzial.
Enthalte eine konkrete Zahl (Zeitverlust, Stunden, Fehlerquote).
Verwende einen Fachbegriff und erkläre ihn kurz.
Der Quick-Win muss SOFORT umsetzbar sein, auch ohne PRONECTO.

Antworte NUR als gültiges JSON ohne Markdown:
{"insight_text":"...","quick_win":"...","kennzahl":{"label":"Zeitverlust pro Woche","wert":"4,5","einheit":"Stunden"},"dominante_muda":["M4","M6"]}`;

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 700,
      messages: [{ role: 'user', content: userPrompt }],
      system: SYSTEM_PROMPT,
    });

    const text = message.content[0].text.trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Kein JSON in Antwort');
    const result = JSON.parse(jsonMatch[0]);

    return res.status(200).json(result);
  } catch (err) {
    console.error('ki-insight error:', err);
    return res.status(500).json({ error: 'KI-Anfrage fehlgeschlagen', details: err.message });
  }
}
