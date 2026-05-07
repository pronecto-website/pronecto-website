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
- Prozesskennzahlen: Zeit, Kosten, Qualität, Flexibilität

TONALITÄT:
- Deutsch, Siezen
- Wie ein kompetenter Freund, nicht wie McKinsey
- Konkret und mit Zahlen, nie abstrakt
- VERBOTEN: "revolutionär", "cutting-edge", "ganzheitlich", "End-to-End",
  "Synergie", "Digitalisierungsreise", "Transformation"
- Fachbegriffe verwenden UND sofort erklären
- Verlust ZUERST, dann Potenzial`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { branche, mitarbeiter, schwerpunkte, ausstattung, blockNr, blockAntworten, alleAntworten, E0_freitext, blockFreitext } = req.body;
  if (!branche || !blockNr || !blockAntworten) return res.status(400).json({ error: 'Fehlende Parameter' });

  const branchenkontext = getBranchenkontext(branche);

  const userPrompt = `KONTEXT DES LEADS:
- Betriebsgröße: ${mitarbeiter}
- Block ${blockNr} Antworten: ${JSON.stringify(blockAntworten)}
${E0_freitext ? `\nHauptproblem des Leads (eigene Worte): "${E0_freitext}"` : ''}
${blockFreitext ? `\nKonkrete Situation (O-Ton): "${blockFreitext}"` : ''}

BRANCHENSPEZIFISCHES VOKABULAR (nur als Orientierung):
${branchenkontext}

AUFGABE: Generiere eine Vertiefungsfrage basierend auf den Antworten und der persönlichen Situation des Leads.
Die Frage soll als Multiple-Choice mit 3-4 Optionen, konkrete Folgefragen zu dem aufwerfen, was der Lead beschrieben hat.
${blockFreitext ? 'Die Frage soll sich auf die beschriebene Situation beziehen.' : ''}

WICHTIG:
- Keine generischen Fragen — beziehe dich auf die PERSÖNLICHE Situation des Leads
- Nicht "Als [Branche]..." sondern auf konkrete Antworten und Freitexte aufbauen
- Frage nach konkretem Verhalten, nicht nach Selbsteinschätzung

Antworte NUR als gültiges JSON ohne Markdown:
{"frage":"...","optionen":["...","...","..."],"muda_mapping":{"0":["M1"],"1":["M4"]},"scoring":{"0":20,"1":50,"2":80}}`;

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [{ role: 'user', content: userPrompt }],
      system: SYSTEM_PROMPT,
    });

    const text = message.content[0].text.trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Kein JSON in Antwort');
    const result = JSON.parse(jsonMatch[0]);

    return res.status(200).json(result);
  } catch (err) {
    console.error('ki-nachfrage error:', err);
    return res.status(500).json({ error: 'KI-Anfrage fehlgeschlagen', details: err.message });
  }
}
