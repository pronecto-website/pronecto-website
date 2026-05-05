# CLAUDE.md — PRONECTO

> Dieses Dokument ist die zentrale Projektbeschreibung für Claude Code.
> Es enthält alle Entscheidungen, die Architektur, das Design-System und den Umsetzungsplan.
> **WICHTIG:** David wird seinen vollständigen PRONECTO-Projekt-Prompt (Gründerprofil, USP, Strategie, Kommunikationsregeln) noch oben in diese Datei einfügen. → Bitte unter "## Über PRONECTO" einfügen.

---

## Über PRONECTO

> **[# PRONECTO — Projekt-Prompt für Claude

Du bist der strategische Berater und kreative Partner für PRONECTO, das Unternehmen von David Justus. Nutze die folgenden Informationen als Grundlage für alle Gespräche. Frage aktiv nach, wenn sich etwas geändert hat, und schlage vor, dieses Dokument zu aktualisieren.

---

## Gründer

- **Name:** David Justus
- **Standort:** Hamburg / Norderstedt
- **Studium:** WILUM (Wirtschaftsingenieurwesen Logistik und Mobilität) an der TUHH
- **Kernkompetenzen:** KI & Low-Code (durch Selbstständigkeit aufgebaut), Excel, Prozessverständnis in Industrie & Logistik
- **Berufserfahrung:**
  - Praktikum + Werkstudent bei Aurubis (Metallindustrie)
  - 1 Jahr Werkstudent bei WISAG Elektrotechnik
- **Langfristiges Ziel:** Vollzeit-Selbstständigkeit, mittelfristig bereits neben dem Studium aufbauen
- **Persönlichkeit:** Macher-Mentalität, will nicht nur reden sondern umsetzen, schätzt klare Kommunikation

---

## Unternehmen

- **Name:** PRONECTO
- **Herkunft:** Lateinisch — "pro" (für/Prozess) + "necto" (ich knüpfe, ich verbinde) = "Ich verbinde Prozesse"
- **Slogan:** "Ihre Prozesse — justiert." (alternativ: "Ihre Prozesse. Endlich verbunden.")
- **Domain:** pronecto.de (gesichert), pronecto.com (in Verhandlung)
- **Rechtsform:** Noch zu klären — wahrscheinlich Einzelunternehmen oder Freiberufler (Beratung/Schulung könnte als freiberuflich gelten). Kleinunternehmerregelung §19 UStG nutzen.
- **Status:** Gründungsphase

### Was PRONECTO macht

KI-gestützte Prozessautomatisierung und Beratung für mittelständische Unternehmen. Drei Leistungsbereiche:

1. **Prozessautomatisierung** — Automatisierte Workflows mit KI und Low-Code-Tools (Make, n8n, Power Automate), die repetitive Aufgaben übernehmen
2. **KI-Beratung & Workshops** — Identifikation von KI-Use-Cases, Schulung von Teams, Pilotprojekte umsetzen
3. **Digitale Prozessanalyse** — Bestehende Abläufe durchleuchten, Engpässe finden, konkreten Optimierungsplan liefern

### Zielgruppe

- Mittelständische Unternehmen (50–500 Mitarbeiter) in Norddeutschland/Hamburg
- Branchen: Logistik, Produktion, Elektrotechnik, Metallindustrie, Gebäudetechnik
- Entscheider: Geschäftsführer (oft 50+), Abteilungsleiter, Operations Manager
- Diese Unternehmen wissen oft, dass sie digitalisieren müssen, aber nicht wo sie anfangen sollen

### Wettbewerbsvorteil (USP)

David kombiniert drei Dinge, die sonst niemand zusammen hat:
- **Ingenieurswissen** (WILUM, Logistik & Mobilität) — versteht Produktions- und Logistikprozesse von innen
- **Praktische KI/Low-Code-Erfahrung** — kann sofort umsetzen, nicht nur beraten
- **Industrie-Background** (Aurubis, WISAG) — spricht die Sprache der Kunden, kennt den Alltag in Werkshallen

---

## Branding & Design

### Markenidentität

- **Ton:** Ruhig, klar, konkret. Keine Buzzwords, kein "revolutionär" oder "cutting-edge". Stattdessen: "Ihre Rechnungen werden noch von Hand abgetippt? Das geht auch automatisch."
- **Haltung:** Partnerschaftlich, auf Augenhöhe, nicht belehrend. "Wir machen das zusammen."
- **Versprechen:** Messbare Ergebnisse, keine leeren Versprechen. Zahlen nennen.

### Visuelle Identität

- **Design-Richtung:** Apple-inspiriert — extreme Weißräume, zentrierte Typografie, minimalistisch aber mit Charakter
- **Primärfarbe:** #E8793A (Macherorange — Energie, Tatkraft, Wärme)
- **Sekundärfarbe:** #1A1F2E (Nachtblau — Seriosität, Tiefe, Technik)
- **Hintergrund:** #FAFAFA (fast weiß, warm)
- **Grautöne:** #6B6B6B (Fließtext), #8A8A8A (sekundärer Text), #E2E2E2 (Linien)
- **Schriften:**
  - Überschriften: Outfit (clean, geometrisch)
  - Kursive Akzente: Source Serif 4 (gibt Charakter)
- **Logo:** Brücken-Icon (SVG) — eleganter Bogen mit drei Pfeilern, linker Punkt blass (Ausgangslage), rechter kräftig (Ziel). Symbolisiert: Verbindung, Überbrückung, drei Leistungssäulen.
- **Logo-Varianten:** Hell (weiß/creme Hintergrund) und Dunkel (schwarzer Hintergrund)

### Logo SVG-Code

```svg
<svg viewBox="0 0 64 64" fill="none">
  <path d="M8 40 Q20 14 32 14 Q44 14 56 40" stroke="#E8793A" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M20 40 L20 24.5" stroke="#E8793A" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
  <path d="M32 40 L32 14" stroke="#E8793A" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
  <path d="M44 40 L44 24.5" stroke="#E8793A" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
  <circle cx="8" cy="40" r="3" fill="#E8793A" opacity="0.4"/>
  <circle cx="56" cy="40" r="3" fill="#E8793A"/>
</svg>
```

---

## Strategie & Nächste Schritte

### Kurzfristig (nächste 3-6 Monate)
- [ ] Domain pronecto.de kaufen und sichern
- [ ] Gewerbeanmeldung oder Freiberufler-Status klären (Finanzamt)
- [ ] Website live bringen (HTML via VS Code → GitHub → Vercel)
- [ ] LinkedIn-Profil optimieren, regelmäßig posten (KI + Logistik/Industrie Insights)
- [ ] Logo finalisieren (Fiverr, 30-50€, Brücken-Konzept als Briefing)
- [ ] Geschäftskonto eröffnen (N26 Business oder Kontist, kostenlos)
- [ ] Startup Dock der TUHH kontaktieren (Gründungsberatung)
- [ ] 10 potenzielle Kunden anrufen und fragen wo ihre Schmerzpunkte liegen
- [ ] 2-3 Referenzprojekte aufbauen (ggf. vergünstigt/kostenlos für Case Studies)

### Mittelfristig (6-18 Monate)
- [ ] Strategische Werkstudentenstelle wählen (Airbus, Otto, HHLA) — für Einkommen, Netzwerk UND Expertise
- [ ] Selbstständigkeit parallel weiterlaufen lassen
- [ ] Workshop-Konzept entwickeln ("KI-Enablement für Logistik-KMU")
- [ ] Erste zahlende Kunden gewinnen
- [ ] Case Studies auf Website veröffentlichen
- [ ] Nische schärfen basierend auf den ersten 10 Kundengesprächen

### Langfristig (nach Studium)
- Entweder direkt Vollzeit-Selbstständigkeit (wenn Kundenstamm + 6 Monate Rücklagen da)
- Oder 1-2 Jahre Beratung (z.B. Ingenics) für Senior-Netzwerk, dann Selbstständigkeit

### Mögliche Nischen (noch zu validieren)
1. KI-Dokumentenautomatisierung für Logistik-KMU
2. Bestandsoptimierung & Nachfrageprognosen mit KI
3. Prozessautomatisierung für Industrieunternehmen (Produktion + Intralogistik)
4. KI-Enablement & Schulungen (Workshops als Einstieg, Umsetzung als Folgeauftrag)
5. Nachhaltigkeits-Reporting & CO₂-Tracking mit KI

---

## Website

- **Tech-Stack:** Reines HTML/CSS/JS → VS Code → GitHub → Vercel (kostenlos)
- **Struktur:** One-Pager mit folgenden Sektionen:
  1. Hero (Problem + Lösung in einem Satz)
  2. Problem-Section (Pain Points des Kunden, Loss Aversion)
  3. Vorher/Nachher-Transformation (mit Brücken-Visual)
  4. Leistungen (3 Karten)
  5. Ablauf (4-Schritte-Timeline)
  6. Social Proof (Zahlen: 73% weniger, 2x schneller, <4 Wochen)
  7. CTA (niedrige Schwelle: "30 Min, unverbindlich, kostenlos")
  8. Footer (Impressum, Datenschutz)

### Psychologische Prinzipien auf der Website
- **Loss Aversion:** "40% Ihrer Zeit geht für Aufgaben drauf, die eine Maschine besser kann"
- **Future Pacing:** Vorher/Nachher-Vergleich macht Wunschzustand greifbar
- **Social Proof:** Konkrete Zahlen statt vager Versprechen
- **Low Commitment CTA:** "30 Minuten. Unverbindlich. Kein Verkaufsgespräch. Nur Klarheit."
- **Authority:** Branchenerfahrung nennen, nicht verstecken

---

## Kommunikationsregeln

Wenn du für PRONECTO schreibst oder berätst:
- **Nie sagen:** "revolutionär", "cutting-edge", "End-to-End-Transformation", "AI-powered solutions"
- **Immer sagen:** Konkrete Probleme benennen, konkrete Zahlen nennen, einfache Sprache
- **Zielgruppe im Kopf:** Ein 55-jähriger Logistik-Geschäftsführer UND ein 30-jähriger Abteilungsleiter müssen sich gleichzeitig angesprochen fühlen
- **Tonalität:** Wie ein kompetenter Freund, nicht wie eine Unternehmensberatung

---

## Änderungsprotokoll

| Datum | Änderung |
|-------|----------|
| April 2026 | Erstversion erstellt |

> **Hinweis an Claude:** Wenn David dir neue Informationen gibt (neuer Kunde, neue Nische, geänderter Fokus), schlage vor, dieses Dokument zu aktualisieren und nenne die konkreten Stellen, die angepasst werden sollten.]**

---

## Repository & Bestehendes Projekt

**Repo:** https://github.com/pronecto-website/pronecto-website
**Live:** https://pronecto.de
**Hosting:** Vercel (automatisches Deployment von GitHub main-Branch)

### Aktuelle Repo-Struktur
```
pronecto-website/
├── .github/workflows/    ← CI/CD (bestehend, nicht anfassen)
├── index.html            ← Landingpage (bestehend, nicht anfassen)
├── README.md
└── CLAUDE.md             ← Diese Datei
```

### Ziel-Struktur (nach Umbau)
```
pronecto-website/
├── .github/workflows/
├── api/                          ← NEU: Vercel Serverless Functions
│   ├── analyse.js                ← Claude API Calls (Lead + Intern)
│   ├── lead/
│   │   ├── [token].js            ← Ergebnis abrufen per Link-Token
│   │   └── save-email.js         ← E-Mail speichern + PDF triggern
│   └── admin/
│       ├── leads.js              ← Alle Leads abrufen
│       └── update.js             ← Status/Notizen aktualisieren
├── prozess-check/
│   ├── index.html                ← NEU: Fragebogen-Seite
│   └── ergebnis/
│       └── index.html            ← NEU: Ergebnis-Seite (dynamisch per JS)
├── admin/
│   └── index.html                ← NEU: Dashboard (passwortgeschützt)
├── css/
│   └── shared.css                ← NEU: Gemeinsame Styles (Brand)
├── js/
│   ├── prozess-check.js          ← NEU: Fragebogen-Logik
│   ├── ergebnis.js               ← NEU: Ergebnis-Rendering
│   └── dashboard.js              ← NEU: Dashboard-Logik
├── index.html                    ← Landingpage (BESTEHEND, minimal anpassen)
├── vercel.json                   ← NEU: Routing-Konfiguration
├── package.json                  ← NEU: Dependencies (Supabase Client)
├── .env.local                    ← NEU: API Keys (NICHT committen!)
├── .gitignore                    ← NEU: .env.local ausschließen
├── CLAUDE.md
└── README.md
```

### Wichtige Regeln für die bestehende Seite
- `index.html` (Landingpage) NICHT grundlegend umbauen — nur minimal anpassen:
  - Link zum Prozess-Check einfügen (z.B. als neuen CTA-Button oder Navbar-Link)
  - Eventuell einen Teaser-Abschnitt für den Prozess-Check hinzufügen
- Das bestehende Design und die Struktur der Landingpage beibehalten
- Kein Framework-Wechsel (kein React/Next.js für die Hauptseite)

### Vercel-Konfiguration (vercel.json)
```json
{
  "rewrites": [
    { "source": "/prozess-check/ergebnis/:token", "destination": "/prozess-check/ergebnis/index.html" },
    { "source": "/admin", "destination": "/admin/index.html" }
  ]
}
```

---

## Projektübersicht

**Produkt:** PRONECTO Prozess-Check — ein KI-gestütztes Self-Service-Tool auf pronecto.de, das mittelständischen Unternehmen eine kostenlose Prozessanalyse bietet und qualifizierte Leads generiert.

**Gründer:** David Justus, Hamburg/Norderstedt. Studium: WILUM (Wirtschaftsingenieurwesen Logistik & Mobilität) an der TUHH. Kernkompetenzen: KI/Low-Code, Prozessmanagement (BPMN 2.0, DMAIC/Six Sigma, Lean/7 Muda), Industrieerfahrung (Aurubis, WISAG).

**Website:** pronecto.de (live, Vercel, reines HTML/CSS/JS)

### Bestehende Website-Struktur (index.html)
Die Landingpage ist ein One-Pager mit folgenden Sektionen:
1. Hero — "Ihre Prozesse. Endlich verbunden."
2. Problem-Section — 3 Pain Points (Daten abtippen, Excel-Chaos, Wissen im Kopf)
3. Vorher/Nachher-Transformation
4. Leistungen — 3 Karten (Automatisieren, Verstehen, Analysieren)
5. Ablauf — 4-Schritte-Timeline
6. Social Proof — Zahlen (73% weniger, 2x schneller, <4 Wochen)
7. CTA — "Erstgespräch vereinbaren" (mailto:hallo@pronecto.de)
8. Footer — Impressum, Datenschutz

Die Seite nutzt Google Fonts (Outfit + Source Serif 4), Farben wie im Design-System definiert, und ist komplett responsive.

---

## Was gebaut werden muss

### 1. Prozess-Check Fragebogen (Frontend)
Ein mehrstufiger, branchenspezifischer Fragebogen auf `pronecto.de/prozess-check`.

### 2. KI-Analyse-Engine (Backend)
Vercel Serverless Functions die Claude API aufrufen und Ergebnisse generieren.

### 3. Ergebnis-Seite (Frontend)
Vollständige Analyse mit Scores, Lean-Verschwendungsprofil, Prozessreifegrad und konkretem Automatisierungsplan auf `pronecto.de/prozess-check/ergebnis/{token}`.

### 4. Admin-Dashboard (Frontend + Auth)
Geschützter Bereich unter `pronecto.de/admin` für David mit allen Lead-Daten und internen KI-Einschätzungen.

### 5. E-Mail & PDF-System
Automatischer Versand von Ergebnissen an Leads und Benachrichtigungen an David.

---

## Tech-Stack

| Komponente | Technologie |
|---|---|
| Frontend | Reines HTML/CSS/JS (kein Framework) |
| Backend/API | Vercel Serverless Functions (Node.js, `/api`-Ordner) |
| KI | Anthropic Claude API (Sonnet 4.6) |
| Datenbank | Supabase (Free Tier) |
| E-Mail | Resend (oder n8n Webhook) |
| PDF | jsPDF (clientseitig) oder Serverless Function |
| Hosting | Vercel (bereits eingerichtet, auto-deploy von GitHub) |
| Repo | github.com/pronecto-website/pronecto-website |

### Warum kein React/Next.js?
Die bestehende Website ist reines HTML und funktioniert. Für den Prozess-Check reicht Vanilla JS mit fetch()-Aufrufen an die Serverless Functions. Das hält das Projekt einfach und vermeidet einen kompletten Umbau. Bei Bedarf kann später auf Next.js migriert werden.

---

## Design-System (PRONECTO Brand)

### Farben
```
Primär (Macherorange):  #E8793A
Sekundär (Nachtblau):   #1A1F2E
Hintergrund:             #FAFAFA
Weiß (Karten):           #FFFFFF
Fließtext:               #6B6B6B
Sekundärer Text:         #8A8A8A
Linien/Borders:          #E2E2E2
Erfolg/Grün:             #2E9E6B
Warnung/Gelb:            #E2A843
Fehler/Rot:              #D94F4F
Info/Blau:               #3B7DD8
```

### Typografie
```
Überschriften: 'Outfit' (Google Fonts) — clean, geometrisch
Kursive Akzente: 'Source Serif 4' (Google Fonts) — gibt Charakter
Gewichte: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
```

### Logo SVG
```svg
<svg viewBox="0 0 64 64" fill="none">
  <path d="M8 40 Q20 14 32 14 Q44 14 56 40" stroke="#E8793A" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M20 40 L20 24.5" stroke="#E8793A" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
  <path d="M32 40 L32 14" stroke="#E8793A" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
  <path d="M44 40 L44 24.5" stroke="#E8793A" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
  <circle cx="8" cy="40" r="3" fill="#E8793A" opacity="0.4"/>
  <circle cx="56" cy="40" r="3" fill="#E8793A"/>
</svg>
```

### Design-Prinzipien
- Apple-inspiriert: extreme Weißräume, zentrierte Typografie, minimalistisch
- Keine Buzzwords: "revolutionär", "cutting-edge", "End-to-End" sind verboten
- Tonalität: Wie ein kompetenter Freund, nicht wie eine Unternehmensberatung
- Zielgruppe: 55-jähriger Logistik-GF UND 30-jähriger Abteilungsleiter gleichzeitig
- Border-Radius: 14px für Karten, 10-12px für Buttons, 6-8px für kleine Elemente

---

## Fachliche Frameworks

### DMAIC (Six Sigma) — Struktur der Gesamtanalyse
Die gesamte Analyse folgt dem DMAIC-Zyklus:
- **Define:** Lead definiert Branche, Größe, Ist-Zustand
- **Measure:** Fragebogen misst die Prozessleistung durch gezielte Fragen
- **Analyze:** KI identifiziert Engpässe und Verschwendung
- **Improve:** Automatisierungsplan mit Top-3-Empfehlungen
- **Control:** Erstgespräch mit David / Umsetzungsbegleitung

### 7 Muda (Lean) — Verschwendungsklassifikation
Jeder identifizierte Schmerzpunkt wird einer Verschwendungsart zugeordnet:
1. **Warten** (⏳) — Verzögerungen durch fehlende Rückmeldungen
2. **Überbearbeitung** (🔄) — Manuelle Schritte die automatisiert werden könnten
3. **Bewegung/Systemwechsel** (🔀) — Unnötiges Wechseln zwischen Tools
4. **Transport/Datenübertragung** (📋) — Daten manuell von System zu System
5. **Bestände/Liegengebliebenes** (📥) — Unbeantwortete Anfragen, offene Angebote
6. **Fehler/Fehleranfälligkeit** (⚠️) — Fehler durch manuelle Dateneingabe
7. **Überproduktion** (📊) — Reports/Dokumente die niemand nutzt

### Prozessreifegrad — Scoring (angelehnt an CMMI)
1. **Ad-hoc** — Keine festen Abläufe, alles improvisiert
2. **Managed** — Grundstruktur vorhanden, aber manuell
3. **Definiert** — Dokumentierte Prozesse, teilweise digital
4. **Gemessen** — KPIs werden erfasst, regelmäßige Optimierung
5. **Optimiert** — Automatisiert, datengetrieben, kontinuierliche Verbesserung

### Darstellung für den Lead
Fachwissen ist **sichtbar aber erklärt**. Beispiel: "Verschwendungsanalyse nach Lean-Methodik" mit kurzer Erklärung darunter. Der Lead soll Kompetenz spüren, ohne überfordert zu werden.

---

## Branchen & Fragensets

### Unterstützte Branchen
1. **Handwerk** (Dachdecker, Maurer, Gerüstbau)
2. **Elektrotechnik** (Installation, Wartung, Prüfungen)
3. **Autohaus** (Verkauf, Werkstatt, Service)
4. **Andere Branche** (generische Fragen)

### Fragenstruktur pro Branche
- 5 Themenblöcke mit je 2-3 Fragen (ca. 12-15 Fragen gesamt)
- Alle Fragen sind Multiple-Choice
- Nach jedem Block ein Zwischenfazit (z.B. "Sie investieren ca. 5h/Woche in Angebote")
- Die KI berechnet Scores AUS den Antworten (keine Selbsteinschätzung durch den Lead)
- Geschätzte Dauer: ca. 5 Minuten

### HANDWERK — Fragenset

**Block 1: Kundenanfragen & Kommunikation**
- "Wie kommen die meisten Anfragen rein?" → Telefon / WhatsApp / E-Mail / Website-Formular / Mundpropaganda
- "Wie schnell antworten Sie auf eine neue Anfrage?" → Innerhalb 1 Stunde / Am selben Tag / 1–3 Tage / Wenn ich dazu komme
- "Bestätigen Sie Termine schriftlich?" → Ja, per WhatsApp oder SMS / Ja, per E-Mail / Nur mündlich am Telefon

**Block 2: Angebotserstellung**
- "Wie erstellen Sie Ihre Angebote?" → Word oder Excel / Handschriftlich / Branchensoftware (z.B. openHandwerk, Taifun) / Mischung aus allem
- "Wie lange brauchen Sie pro Angebot?" → Unter 15 Min / 15–30 Min / 30–60 Min / Über 1 Stunde
- "Wie viele Angebote pro Woche?" → 1–3 / 4–7 / 8–15 / Über 15
- "Verfolgen Sie nach, ob ein Angebot angenommen wurde?" → Ja, systematisch / Wenn ich dran denke / Der Kunde meldet sich schon

**Block 3: Einsatzplanung & Baustelle**
- "Wie planen Sie Ihre Einsätze?" → Wandkalender oder Papier / Excel / Google Calendar oder Handy / Branchensoftware
- "Wie dokumentieren Sie den Baufortschritt?" → Fotos auf dem Handy, unsortiert / Handschriftliche Berichte / Software oder App / Gar nicht systematisch
- "Erstellen Sie Aufmaße digital?" → Papier und Zollstock / Fotos mit Notizen / Digitale App oder Laser

**Block 4: Rechnungen & Verwaltung**
- "Wie erstellen Sie Ihre Rechnungen?" → Word oder Excel / Buchhaltungssoftware (z.B. Lexware, SevDesk) / Steuerberater macht alles / Branchensoftware
- "Wie schnell nach Auftragsabschluss geht die Rechnung raus?" → Am selben Tag / Innerhalb einer Woche / Dauert oft länger / Sehr unterschiedlich
- "Haben Sie einen festen Prozess für Mahnungen?" → Ja, automatisch / Ja, aber manuell / Nein, fällt mir irgendwann auf

**Block 5: Kundenbindung**
- "Holen Sie aktiv Google-Bewertungen ein?" → Ja, regelmäßig / Manchmal / Nein / Wir haben kein Google-Profil
- "Melden Sie sich nach Projektabschluss nochmal beim Kunden?" → Ja, systematisch / Ab und zu / Nein

### ELEKTROTECHNIK — Fragenset

**Block 1: Auftragsannahme**
- "Wie kommen die meisten Aufträge rein?" → Telefonanrufe / E-Mail / Stammkunden / Hausverwaltungen oder Firmen
- "Wie erfassen Sie neue Aufträge?" → Direkt im System / Excel oder Liste / Notizzettel oder Gedächtnis / E-Mail-Postfach
- "Wie schnell können Sie auf eine Anfrage reagieren?" → Innerhalb Stunden / Am selben Tag / 1–3 Tage / Unterschiedlich

**Block 2: Angebotskalkulation**
- "Wie kalkulieren Sie Ihre Angebote?" → Excel mit eigenen Formeln / Branchensoftware (z.B. WinWorker) / Erfahrungswerte im Kopf / Mischung
- "Wie lange brauchen Sie für eine Kalkulation?" → Unter 15 Min / 15–30 Min / 30–60 Min / Über 1 Stunde
- "Wie viele Angebote pro Woche?" → 1–3 / 4–7 / 8–15 / Über 15

**Block 3: Prüfprotokolle & Dokumentation**
- "Wie erstellen Sie Prüfprotokolle (DGUV V3, E-Check)?" → Papierformular / Word oder Excel / Spezielle Software / App auf dem Tablet
- "Wo werden Protokolle abgelegt?" → Ordner im Büro / Server in Ordnerstruktur / Cloud oder DMS / Verschiedene Orte
- "Wie viele Prüfungen pro Monat?" → Unter 10 / 10–30 / 30–100 / Über 100

**Block 4: Material & Bestellung**
- "Wie bestellen Sie Material?" → Telefonisch beim Großhändler / Online-Shop / Branchensoftware / Jemand fährt hin
- "Haben Sie Übersicht über Ihren Materialbestand?" → Ja, digital / Im Kopf / Nur grob / Nicht wirklich
- "Wie oft fehlt Material auf der Baustelle?" → Selten / Ab und zu / Regelmäßig / Häufig

**Block 5: Zeiterfassung & Abrechnung**
- "Wie erfassen Ihre Techniker Arbeitszeit?" → Stundenzettel auf Papier / Excel / App / Branchensoftware
- "Wie lange dauert es von Auftragsabschluss bis Rechnung?" → Gleicher Tag / Innerhalb einer Woche / Dauert oft länger / Sehr unterschiedlich

### AUTOHAUS — Fragenset

**Block 1: Lead-Management**
- "Woher kommen die meisten Kaufinteressenten?" → Laufkundschaft / AutoScout24 oder mobile.de / Website / Social Media / Empfehlungen
- "Wie erfassen Sie neue Interessenten?" → DMS-System / Excel / CRM / Notizen oder Gedächtnis
- "Wie schnell kontaktieren Sie einen neuen Online-Lead?" → Innerhalb 1 Stunde / Am selben Tag / 1–3 Tage / Wenn Zeit ist

**Block 2: Nachverfolgung & Verkauf**
- "Haben Sie einen festen Follow-up-Prozess?" → Ja, mit festen Schritten / Grob, aber nicht konsequent / Jeder Verkäufer macht es anders / Nicht wirklich
- "Wie viele Anfragen gehen schätzungsweise verloren?" → Fast keine / Einige wenige / Wahrscheinlich etliche / Keine Ahnung
- "Wie viele Probefahrten oder Verkaufsgespräche pro Woche?" → 1–3 / 4–8 / 9–15 / Über 15

**Block 3: Fahrzeugverwaltung & Inserate**
- "Wie pflegen Sie Ihre Online-Inserate?" → Manuell auf jeder Plattform / Zentrale Software / Macht ein Mitarbeiter nebenbei / Nicht regelmäßig
- "Wie lange dauert es, ein Fahrzeug komplett zu inserieren?" → Unter 30 Min / 30–60 Min / 1–2 Stunden / Über 2 Stunden
- "Sind Ihre Inserate immer aktuell?" → Ja, immer / Meistens / Oft veraltet / Keine richtige Übersicht

**Block 4: Werkstatt & Service**
- "Wie vergeben Sie Werkstatttermine?" → Nur Telefon / Online-Buchung / Beides / Kunden kommen einfach vorbei
- "Erinnern Sie Kunden aktiv an TÜV, Inspektion, Reifenwechsel?" → Ja, systematisch / Ab und zu / Nein / Wollten wir immer schon machen
- "Wie erstellen Sie Werkstattaufträge?" → DMS / Papier / Mischung / Andere Software

**Block 5: Kundenbindung**
- "Kontaktieren Sie Kunden nach dem Kauf nochmal?" → Ja, nach festem Plan / Gelegentlich / Nur bei Reklamationen / Nein
- "Nutzen Sie Newsletter oder Aktionen für Bestandskunden?" → Ja, regelmäßig / Selten / Nein / Hatten wir vor

---

## System-Architektur & Datenfluss

```
Lead füllt Fragebogen aus (pronecto.de/prozess-check)
    ↓
Frontend sammelt alle Antworten als JSON
    ↓
POST /api/analyse → Vercel Serverless Function
    ↓
┌──────────────────────────────────────┐
│  Parallel: 2 Claude API Calls        │
│                                       │
│  Call A: Lead-Analyse                 │
│  → Scores, Branchenvergleich,         │
│    Verschwendungsprofil,              │
│    Top-3-Automatisierungsplan,        │
│    KI-Einschätzung                    │
│                                       │
│  Call B: Interne Einschätzung         │
│  → Lead-Qualität, Projektvolumen,     │
│    Upsell-Potenzial,                  │
│    Gesprächseinstieg                  │
└──────────────────────────────────────┘
    ↓
Alles in Supabase speichern + link_token generieren
    ↓
Frontend zeigt vollständiges Ergebnis (Option C: alles sofort sichtbar)
    ↓
Optional: Lead gibt E-Mail ein
    ↓
PDF generieren + E-Mail an Lead (Link + PDF) + E-Mail an David (Benachrichtigung)
    ↓
David sieht Lead im Dashboard (pronecto.de/admin)
```

### Datenstruktur (Supabase)

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  link_token TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),

  -- Grunddaten
  branche TEXT NOT NULL,
  unternehmensgroesse TEXT NOT NULL,

  -- Alle Antworten als JSON
  antworten JSONB NOT NULL,

  -- Kontaktdaten (optional)
  email TEXT,
  firmenname TEXT,
  ansprechpartner TEXT,

  -- KI-generiert: Lead-seitig
  scores JSONB,
  gesamtscore INTEGER,
  ersparnis_woche DECIMAL,
  ersparnis_jahr DECIMAL,
  muda_profil JSONB,
  prozesse JSONB,
  ki_analyse TEXT,

  -- KI-generiert: Intern
  lead_qualitaet TEXT,
  geschaetztes_volumen TEXT,
  upsell_potenzial JSONB,
  gespraechseinstieg TEXT,

  -- Verwaltung
  status TEXT DEFAULT 'neu',
  notizen TEXT DEFAULT '',
  pdf_generated BOOLEAN DEFAULT FALSE
);
```

---

## Ergebnis-Seite (Was der Lead sieht)

### Aufbau (von oben nach unten)
1. **Header** — PRONECTO Logo + "Prozess-Check · Ergebnis"
2. **Hero-Kennzahlen** — Automatisierungspotenzial (X/100), Ersparnis/Woche, Ersparnis/Jahr
3. **KI-Einschätzung** — 3-4 Absätze Fließtext, persönlich und konkret
4. **Verschwendungsanalyse** — Lean-Muda-Profil als Balkendiagramm, mit Erklärung
5. **Automatisierungsplan** — Top 3 Prozesse mit Ist/Soll, Muda-Tags, Zeitersparnis, Reifegrad
6. **Methodik-Block** — Kurzer Hinweis auf DMAIC, Lean, CMMI
7. **E-Mail-Eingabe** — Optional, für Link + PDF. "Kein Newsletter. Nur Ihr Ergebnis."
8. **CTA** — "Diesen Plan können Sie eigenständig umsetzen. Wenn Sie möchten, begleiten wir Sie dabei."

### Design-Entscheidungen
- Alles sofort sichtbar (Option C), kein Gating
- E-Mail ist optional und fühlt sich wie ein Service an
- Fachbegriffe sichtbar aber erklärt
- CTA dezent, nicht drückend
- Teilbarer Link: Lead kann Ergebnis an Chef/Partner weiterleiten

---

## Admin-Dashboard (Was David sieht)

### Aufbau
- **Sidebar:** Lead-Liste mit Firma, Branche, Datum, Qualität (heiß/warm/kalt), Status
- **Statistiken:** Gesamt-Leads, Heiße Leads, Neue Leads
- **DMAIC-Timeline:** Zeigt wo der Lead im Prozess steht
- **Tab "Analyse & Muda":** Gesamtscore, Zeitersparnis, Verschwendungsprofil (7 Muda), Prozessreifegrad pro Bereich
- **Tab "Automatisierungsplan":** Top 3 mit Ist/Soll, Muda-Tags, Ersparnis, Reifegrad
- **Tab "Interne Einschätzung":** Gesprächseinstieg, Lead-Qualität, Projektvolumen, Upsell-Potenzial, Notizfeld
- **Status-Management:** Neu → Kontaktiert → Angebot → Kunde / Kein Interesse

---

## Kommunikationsregeln (für alle KI-generierten Texte)

- Deutsch, Siezen
- Keine Marketing-Floskeln: "revolutionär", "cutting-edge", "ganzheitlich", "End-to-End" sind verboten
- Konkrete Probleme benennen, konkrete Zahlen nennen
- Ton: kompetenter Berater, sachlich aber nicht kalt
- Immer branchenspezifisch formulieren (nicht generisch)
- Zeitersparnis immer mit Rechenweg (z.B. "7 Angebote × 45min = 5,25h")

---

## Offene Punkte / Nächste Schritte

1. [ ] Repo-Struktur auf GitHub aufsetzen
2. [ ] Supabase-Projekt erstellen und Tabelle anlegen
3. [ ] Vercel-Projekt mit GitHub verbinden
4. [ ] Fragebogen-Frontend bauen (alle 4 Branchen)
5. [ ] API-Routes für Analyse erstellen (/api/analyse)
6. [ ] Ergebnis-Seite bauen (/prozess-check/ergebnis/[token])
7. [ ] Dashboard bauen (/admin, mit Auth)
8. [ ] E-Mail-Versand implementieren
9. [ ] PDF-Generierung implementieren
10. [ ] Testen mit echten Daten
11. [ ] Live deployen

---

## Existierende Prototypen

Es gibt funktionsfähige React-Prototypen aus der Konzeptphase:
- `prozess-check-v2.jsx` — Fragebogen mit Score-Dashboard (noch mit Selbsteinschätzung, muss auf gezielte Fragen umgebaut werden)
- `lead-ergebnis.jsx` — Ergebnis-Seite für den Lead (mit Lean-Muda, Reifegrad, Automatisierungsplan)
- `dashboard.jsx` — Admin-Dashboard mit Beispieldaten (DMAIC, Muda, interne Einschätzung)

Diese dienen als Design-Referenz. Der Code muss für die Produktion neu strukturiert werden.
