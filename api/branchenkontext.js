export const BRANCHENKONTEXT = {
  handwerk: {
    bezeichnung: 'Handwerksbetrieb',
    begriffe: ['Aufmaß', 'Baustelle', 'Angebotskalkulation', 'Stundenzettel', 'Nachunternehmer', 'Auftragszettel'],
    software: ['openHandwerk', 'Taifun', 'Streit V.1', 'Lexware', 'SevDesk', 'DATEV'],
    probleme: [
      'Angebote werden handschriftlich oder in Word erstellt — jedes von Grund auf neu',
      'Stundenzettel werden manuell ausgefüllt und am Ende der Woche abgetippt',
      'Aufmaße werden auf Papier notiert und später ins Büro übertragen',
      'Termine werden telefonisch vergeben, ohne digitale Rückmeldung an den Kunden',
      'Rechnungen gehen erst Wochen nach Auftragsabschluss raus',
      'Kundenbewertungen werden nicht systematisch eingeholt'
    ],
    benchmarks: {
      angebotsdauer_gut: '< 15 Min mit Software',
      reaktionszeit_gut: '< 2 Stunden',
      rechnungsverzug_typisch: '2-4 Wochen',
      dze_typisch: '15-20%'
    }
  },
  elektro: {
    bezeichnung: 'Elektrotechnik-Betrieb',
    begriffe: ['DGUV V3', 'E-Check', 'Prüfprotokoll', 'Schaltplan', 'Stückliste', 'Bauteil', 'VDE-Norm'],
    software: ['WinWorker', 'WISO Mein Büro', 'Branchensoftware Elektro', 'ProOffice', 'Lexware', 'DATEV'],
    probleme: [
      'Prüfprotokolle werden auf Papier ausgefüllt und manuell ins System übertragen',
      'Materialbestellungen laufen über Telefon, ohne digitale Bestandsübersicht',
      'Techniker fehlt vor Ort die aktuelle Stückliste oder der Schaltplan',
      'Zeiterfassung läuft über Papierzettel, Übertrag ins System dauert Stunden',
      'Angebote für E-Checks werden jedes Mal von Hand kalkuliert',
      'Kunden wissen nicht, wann der nächste Wartungstermin fällig ist'
    ],
    benchmarks: {
      pruefprotokolle_pro_monat_schnell: '> 50 mit Software',
      materialverfuegbarkeit_gut: '> 95%',
      dze_typisch: '20-25%',
      reaktionszeit_gut: '< 4 Stunden'
    }
  },
  autohaus: {
    bezeichnung: 'Autohaus',
    begriffe: ['DMS', 'Werkstattauftrag', 'HU/AU', 'Inspektion', 'Inzahlungnahme', 'Lead', 'Probefahrt', 'Lagerfahrzeug'],
    software: ['Autoline', 'Incadea', 'ADP/CDK', 'AutoScout24', 'mobile.de', 'DAT-Bewertung', 'DEKRA'],
    probleme: [
      'Online-Leads aus AutoScout24 werden zu spät kontaktiert — der Kunde kauft woanders',
      'Inserate müssen auf mehreren Plattformen manuell gepflegt werden',
      'Kunden werden nicht automatisch an TÜV, Inspektion oder Reifenwechsel erinnert',
      'Follow-up nach Probefahrten läuft nicht systematisch — Verkäufer vergessen es',
      'Werkstatttermine können nur per Telefon gebucht werden',
      'Keine Übersicht, welche Leads wie weit im Kaufprozess sind'
    ],
    benchmarks: {
      lead_reaktion_gut: '< 30 Minuten',
      inserat_pflege_gut: 'zentral, < 15 Min/Fahrzeug',
      werkstattauslastung_gut: '> 85%',
      dze_typisch: '10-15%'
    }
  },
  andere: {
    bezeichnung: 'Unternehmen',
    begriffe: ['Auftragsbearbeitung', 'Angebotserstellung', 'Kundenkommunikation', 'Rechnungsstellung', 'Dokumentation'],
    software: ['Excel', 'Word', 'Google Workspace', 'Lexware', 'SevDesk', 'DATEV', 'CRM-System'],
    probleme: [
      'Wiederkehrende Aufgaben werden manuell erledigt, obwohl sie automatisierbar wären',
      'Informationen liegen an verschiedenen Stellen — kein zentrales System',
      'Kundenanfragen werden nicht systematisch erfasst und nachverfolgt',
      'Rechnungen und Angebote werden manuell erstellt ohne Vorlagen',
      'Mitarbeiter verbringen Zeit mit Aufgaben die keinen direkten Kundenwert schaffen'
    ],
    benchmarks: {
      dze_typisch: '15-20%',
      reaktionszeit_gut: '< 1 Tag',
      digitalisierungsgrad_gut: 'Branchensoftware + Cloud'
    }
  }
};

export function getBranchenkontext(branche) {
  const ctx = BRANCHENKONTEXT[branche] || BRANCHENKONTEXT.andere;
  return `Branche: ${ctx.bezeichnung}
Typische Fachbegriffe: ${ctx.begriffe.join(', ')}
Typisch genutzte Software: ${ctx.software.join(', ')}
Häufige Probleme in dieser Branche:
${ctx.probleme.map(p => `- ${p}`).join('\n')}
Benchmarks: ${JSON.stringify(ctx.benchmarks)}`;
}
