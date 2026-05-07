// PRONECTO — Client-side scoring logic
// Quelle: Dumas et al. (2021) Grundlagen des Geschäftsprozessmanagements

const STUNDENSATZ = { handwerk: 55, elektro: 60, autohaus: 45, andere: 50 };

const BLOCK_TITEL = {
  1: 'Kundenanfragen & Erstreaktion',
  2: 'Angebote & Kalkulation',
  3: 'Auftragsabwicklung & Dokumentation',
  4: 'Rechnungen & Zahlungen',
  5: 'Kundenbindung & Nachverfolgung',
};

function mittelwert(arr) {
  if (!arr.length) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function modus(arr) {
  if (!arr.length) return 1;
  const counts = {};
  let maxCount = 0;
  let result = arr[0];
  for (const v of arr) {
    counts[v] = (counts[v] || 0) + 1;
    if (counts[v] > maxCount || (counts[v] === maxCount && v < result)) {
      maxCount = counts[v];
      result = v;
    }
  }
  return result;
}

// Handlungsbedarf-Score nach Prozessportfolio (Dumas S. 62ff.)
// Drei Dimensionen: strategische Bedeutung (30%), Verbesserungswürdigkeit (50%), Verbesserungsfähigkeit (20%)
export function berechneHandlungsbedarf(blockNr, blockScores, einstieg) {
  const schwerpunkte = einstieg.schwerpunkte || [];
  const stratBedeutung = schwerpunkte.includes(`B${blockNr}`) ? 80 : 40;
  const verbWuerdigkeit = 100 - mittelwert(blockScores.filter(s => s != null));
  const verbFaehigkeit = Math.min(100, (einstieg.digitalPunkte || 0) * 100 / 80);
  return Math.round(stratBedeutung * 0.3 + verbWuerdigkeit * 0.5 + verbFaehigkeit * 0.2);
}

// Muda-Profil nach 7 Verschwendungsarten (Toyota Produktionssystem)
export function berechneMudaProfil(alleAntworten) {
  const zaehler = { M1:0, M2:0, M3:0, M4:0, M5:0, M6:0, M7:0 };
  const gewicht  = { M1:0, M2:0, M3:0, M4:0, M5:0, M6:0, M7:0 };
  const labels = {
    M1: 'Transport', M2: 'Lange Wege', M3: 'Inventar',
    M4: 'Wartezeiten', M5: 'Fehler', M6: 'Mehraufwand', M7: 'Überproduktion'
  };

  for (const a of alleAntworten) {
    if (!a || !a.muda) continue;
    for (const m of a.muda) {
      if (!(m in zaehler)) continue;
      zaehler[m]++;
      gewicht[m] += (100 - (a.score || 50));
    }
  }

  return Object.keys(gewicht).map(typ => ({
    typ,
    label: labels[typ],
    gewicht: Math.round(gewicht[typ] / (zaehler[typ] || 1)),
    count: zaehler[typ],
  })).sort((a, b) => b.gewicht - a.gewicht);
}

// Reifegrad pro Block — Modus der Reifegrad-Werte (CMMI-angelehnt)
export function berechneReifegrad(blockAntworten) {
  const reifegrade = blockAntworten.filter(a => a && a.reifegrad).map(a => a.reifegrad);
  return modus(reifegrade) || 1;
}

// Durchlaufzeiteffizienz pro Block
// DZE = Bearbeitungszeit / Durchlaufzeit (Dumas S. 299ff.)
export function berechneDZE(blockNr, answers) {
  const dzeMap = {
    1: () => {
      const s = answers.B1_1?.score || 50;
      return s >= 70 ? 0.65 : s >= 40 ? 0.35 : 0.15;
    },
    2: () => {
      const s = answers.B2_1?.score || 50;
      return s >= 70 ? 0.60 : s >= 40 ? 0.35 : 0.18;
    },
    3: () => {
      const s1 = answers.B3_2?.score || 50;
      const s2 = answers.B3_3?.score || 50;
      const avg = (s1 + s2) / 2;
      return avg >= 70 ? 0.65 : avg >= 40 ? 0.35 : 0.15;
    },
    4: () => {
      const s = answers.B4_1?.score || 50;
      return s >= 70 ? 0.70 : s >= 40 ? 0.40 : 0.20;
    },
    5: () => {
      const s = answers.B5_1?.score || 50;
      return s >= 70 ? 0.75 : s >= 40 ? 0.50 : 0.25;
    },
  };
  return (dzeMap[blockNr] && dzeMap[blockNr]()) || 0.30;
}

// Zeitverlust pro Block (Stunden/Woche)
export function berechneZeitverlust(blockNr, answers) {
  switch (blockNr) {
    case 1: {
      const score11 = answers.B1_1?.score || 50;
      const wert13a = answers.B1_3a?.wert || 5;
      const minProAnfrage = score11 < 40 ? 12 : score11 < 70 ? 7 : 2;
      return (wert13a * minProAnfrage) / 60;
    }
    case 2: {
      const wert22a = answers.B2_2a?.wert || 3;
      const wert22b = answers.B2_2b?.wert || 30;
      return (wert22a * wert22b) / 60;
    }
    case 3: {
      const score33 = answers.B3_3?.score || 50;
      const rueckfragen = score33 < 30 ? 8 : score33 < 65 ? 3 : 0;
      return (rueckfragen * 20) / 60;
    }
    case 4: {
      const score41 = answers.B4_1?.score || 50;
      const wert42a = answers.B4_2a?.wert || 10;
      const minProRechnung = score41 < 30 ? 30 : score41 < 60 ? 15 : 5;
      return (wert42a * minProRechnung) / 60 / 4.33;
    }
    case 5:
      return 0; // Block 5 ist Potenzialberechnung, kein direkter Zeitverlust
    default:
      return 0;
  }
}

// Vollständige Score-Berechnung über alle Blöcke
export function berechneAlleScores(answers, einstieg) {
  const blockScores = {};
  const reifegrade = {};
  const dzeWerte = {};
  const zeitverluste = {};

  for (let b = 1; b <= 5; b++) {
    // Sammle alle Antworten für diesen Block
    const blockAntworten = Object.entries(answers)
      .filter(([key]) => key.startsWith(`B${b}_`))
      .map(([, val]) => val)
      .filter(Boolean);

    const scores = blockAntworten.map(a => a.score).filter(s => s != null);
    const avg = scores.length ? Math.round(mittelwert(scores)) : 50;

    blockScores[b] = avg;
    reifegrade[b] = berechneReifegrad(blockAntworten);
    dzeWerte[b] = berechneDZE(b, answers);
    zeitverluste[b] = berechneZeitverlust(b, answers);
  }

  const handlungsbedarf = {};
  for (let b = 1; b <= 5; b++) {
    handlungsbedarf[b] = berechneHandlungsbedarf(b, [blockScores[b]], einstieg);
  }

  const alleAntworten = Object.values(answers).filter(Boolean);
  const mudaProfil = berechneMudaProfil(alleAntworten);

  const zeitverlustGesamt = Object.values(zeitverluste).reduce((a, b) => a + b, 0);
  const multiplikator = answers.E2?.multiplikator || 1.0;
  const zeitverlustSkaliert = zeitverlustGesamt * multiplikator;
  const stundensatz = STUNDENSATZ[answers.E1?.value] || STUNDENSATZ.andere;
  const kostenJahr = zeitverlustSkaliert * stundensatz * 48;

  return {
    blockScores,
    handlungsbedarf,
    reifegrade,
    dzeWerte,
    zeitverluste,
    zeitverlustGesamt: zeitverlustSkaliert,
    kostenJahr: Math.round(kostenJahr),
    mudaProfil,
    blockTitel: BLOCK_TITEL,
  };
}

export { BLOCK_TITEL, STUNDENSATZ };
