import { useState } from "react";

const B = {
  orange: "#E8793A", orangeL: "#E8793A18", orangeM: "#E8793A40",
  dark: "#1A1F2E", bg: "#F5F4F1", white: "#FFFFFF",
  text: "#1A1F2E", text2: "#6B6B6B", text3: "#8A8A8A", border: "#E2E2E2",
  green: "#2E9E6B", greenL: "#2E9E6B18", red: "#D94F4F", redL: "#D94F4F18",
  yellow: "#E2A843", yellowL: "#E2A84318", blue: "#3B7DD8", blueL: "#3B7DD818",
  purple: "#7C5CBF", purpleL: "#7C5CBF18",
};

const MUDA = {
  warten: { label: "Warten", icon: "⏳", color: B.red, desc: "Verzögerungen durch fehlende Rückmeldungen oder langsame Reaktionszeiten" },
  ueberbearbeitung: { label: "Überbearbeitung", icon: "🔄", color: B.orange, desc: "Manuelle Schritte die automatisiert werden könnten" },
  bewegung: { label: "Bewegung", icon: "🔀", color: B.yellow, desc: "Unnötiges Wechseln zwischen Tools und Systemen" },
  transport: { label: "Transport", icon: "📋", color: B.blue, desc: "Daten werden manuell von System zu System übertragen" },
  bestaende: { label: "Bestände", icon: "📥", color: B.purple, desc: "Liegengebliebene Anfragen, unbeantwortete Mails, offene Angebote" },
  fehler: { label: "Fehler", icon: "⚠️", color: "#D94F4F", desc: "Fehler durch manuelle Dateneingabe oder fehlende Kontrolle" },
  ueberproduktion: { label: "Überproduktion", icon: "📊", color: B.text3, desc: "Reports oder Dokumente die niemand nutzt" },
};

const REIFE = [
  { level: 1, label: "Ad-hoc", desc: "Keine festen Abläufe, alles improvisiert", color: B.red },
  { level: 2, label: "Managed", desc: "Grundstruktur vorhanden, aber manuell", color: B.orange },
  { level: 3, label: "Definiert", desc: "Dokumentierte Prozesse, teilweise digital", color: B.yellow },
  { level: 4, label: "Gemessen", desc: "KPIs werden erfasst, regelmäßige Optimierung", color: B.blue },
  { level: 5, label: "Optimiert", desc: "Automatisiert, datengetrieben", color: B.green },
];

const SAMPLE_LEADS = [
  {
    id: "L-001",
    firma: "Müller Bedachungen GmbH",
    ansprechpartner: "Thomas Müller",
    email: "t.mueller@mueller-bedachungen.de",
    branche: "Handwerk",
    groesse: "11-30",
    digi: "mixed",
    datum: "2026-05-04",
    status: "neu",
    qualitaet: "heiß",
    volumen: "3.000–5.000 €",
    gesamtscore: 78,
    prozesse: [
      { name: "Kundenanfragen", score: 82, reife: 2, muda: ["warten", "bestaende"], ist: "Anfragen kommen über Telefon und WhatsApp. Keine zentrale Erfassung. Reaktionszeit 1–3 Tage.", soll: "Alle Kanäle in einem Posteingang. Automatische Eingangsbestätigung. Anfragen werden sofort als Lead erfasst.", ersparnis: "3h/Woche" },
      { name: "Angebotserstellung", score: 91, reife: 1, muda: ["ueberbearbeitung", "bewegung", "fehler"], ist: "Angebote werden in Word erstellt, ~45 Min pro Stück. 8 Angebote pro Woche. Keine systematische Nachverfolgung.", soll: "Textbausteine und Kalkulationsvorlage. Anfrage löst vorausgefülltes Angebot aus. Automatisches Follow-up nach 3 Tagen.", ersparnis: "4,5h/Woche" },
      { name: "Einsatzplanung", score: 55, reife: 3, muda: ["bewegung"], ist: "Google Calendar für Termine. Funktioniert grundsätzlich, aber keine Verknüpfung mit Aufträgen.", soll: "Kalender mit Auftragsdaten verknüpft. Automatische Benachrichtigung an Kunden am Vortag.", ersparnis: "1h/Woche" },
      { name: "Baustellendoku", score: 85, reife: 1, muda: ["ueberbearbeitung", "transport"], ist: "Fotos auf dem Handy, unsortiert. Kein Tagesbericht. Bei Rückfragen wird lange gesucht.", soll: "Fotos per WhatsApp/App an Bot senden. KI erstellt Tagesbericht mit Datum, Adresse, Fortschritt als PDF.", ersparnis: "2h/Woche" },
      { name: "Rechnungsstellung", score: 68, reife: 2, muda: ["warten", "ueberbearbeitung"], ist: "Lexware für Rechnungen, aber erst 1–2 Wochen nach Auftragsabschluss. Mahnungen manuell.", soll: "Auftragsabschluss triggert automatisch Rechnungsentwurf. Automatisches Mahnwesen.", ersparnis: "1,5h/Woche" },
      { name: "Kundenkommunikation", score: 72, reife: 2, muda: ["bestaende", "ueberbearbeitung"], ist: "Keine Terminbestätigungen. Kein Google-Profil. Kunden werden nach Abschluss nicht kontaktiert.", soll: "Automatische Terminbestätigung + Erinnerung. Google-Bewertung automatisch anfragen nach Projektabschluss.", ersparnis: "1h/Woche" },
    ],
    upsell: [
      "Angebots-Automatisierung als Einstiegsprojekt (Quick Win, ~1.500€)",
      "Baustellendoku-Bot als Folgeprojekt (~2.000€)",
      "Kundenkommunikation + Bewertungen als drittes Paket (~800€)",
    ],
    gespraechseinstieg: "Herr Müller, Ihre Angebotserstellung fällt auf — 6 Stunden pro Woche in Word, keine Nachverfolgung. Das lässt sich auf unter 1,5 Stunden drücken. Soll ich Ihnen zeigen wie das konkret aussieht?",
    notizen: "",
  },
  {
    id: "L-002",
    firma: "Elektro Schmidt & Söhne",
    ansprechpartner: "Jan Schmidt",
    email: "j.schmidt@elektro-schmidt.de",
    branche: "Elektrotechnik",
    groesse: "31-100",
    digi: "digital",
    datum: "2026-05-03",
    status: "kontaktiert",
    qualitaet: "warm",
    volumen: "2.000–3.500 €",
    gesamtscore: 58,
    prozesse: [
      { name: "Auftragsannahme", score: 42, reife: 3, muda: ["bewegung"], ist: "Aufträge kommen per E-Mail und werden in Branchensoftware erfasst. Funktioniert, aber Medienbruch.", soll: "E-Mail-Parsing: Auftragsdaten werden automatisch in die Software übernommen.", ersparnis: "1h/Woche" },
      { name: "Angebotskalkulation", score: 55, reife: 3, muda: ["ueberbearbeitung"], ist: "Branchensoftware mit eigenen Kalkulationen. Dauert 30–60 Min pro Angebot.", soll: "Vorlagen optimieren, häufige Positionen als Schnellauswahl. Automatische Nachverfolgung.", ersparnis: "2h/Woche" },
      { name: "Prüfprotokolle", score: 88, reife: 1, muda: ["ueberbearbeitung", "transport", "fehler"], ist: "DGUV V3 Protokolle auf Papier. 30+ Prüfungen pro Monat. Werden manuell in Excel übertragen und als PDF abgelegt.", soll: "Tablet-Formular vor Ort → automatisch PDF-Protokoll → automatisch beim Kunden abgelegt.", ersparnis: "5h/Woche" },
      { name: "Materialbestellung", score: 62, reife: 2, muda: ["warten", "bewegung"], ist: "Telefonisch beim Großhändler. Ab und zu fehlt Material auf der Baustelle.", soll: "Digitale Bestellliste pro Auftrag. Automatische Bestellung bei Standardmaterial.", ersparnis: "1,5h/Woche" },
      { name: "Zeiterfassung", score: 45, reife: 3, muda: ["ueberbearbeitung"], ist: "App-basierte Zeiterfassung. Aber manuelle Übertragung in die Abrechnung.", soll: "Zeiterfassung direkt mit Rechnungssystem verknüpft. Aufwand pro Auftrag automatisch.", ersparnis: "1h/Woche" },
    ],
    upsell: [
      "Prüfprotokoll-Automatisierung als Hauptprojekt (~2.500€)",
      "Materialbestellung als Folgeprojekt (~1.000€)",
    ],
    gespraechseinstieg: "Herr Schmidt, bei 30+ DGUV-Prüfungen im Monat auf Papier — das sind geschätzt 5 Stunden pro Woche nur für Dokumentation. Mit einem Tablet-Workflow geht das in Echtzeit.",
    notizen: "Erstgespräch am 06.05. um 14:00. Interesse an Prüfprotokollen.",
  },
  {
    id: "L-003",
    firma: "Autohaus Petersen",
    ansprechpartner: "Markus Petersen",
    email: "",
    branche: "Autohaus",
    groesse: "11-30",
    digi: "mixed",
    datum: "2026-05-05",
    status: "neu",
    qualitaet: "heiß",
    volumen: "4.000–6.000 €",
    gesamtscore: 82,
    prozesse: [
      { name: "Lead-Management", score: 90, reife: 1, muda: ["bestaende", "warten", "fehler"], ist: "Leads von AutoScout24 und Website landen im E-Mail-Postfach. Keine zentrale Erfassung. Reaktion wenn Zeit ist.", soll: "Alle Leads automatisch in CRM. Sofortige Bestätigungsmail. Verkäufer bekommt Aufgabe mit allen Infos.", ersparnis: "3h/Woche" },
      { name: "Nachverfolgung", score: 95, reife: 1, muda: ["bestaende", "warten"], ist: "Kein Follow-up-Prozess. Jeder Verkäufer macht es anders. Geschätzt gehen viele Anfragen verloren.", soll: "Automatisches Follow-up nach 2 und 7 Tagen. Dashboard zeigt offene Leads pro Verkäufer.", ersparnis: "4h/Woche" },
      { name: "Fahrzeuginserate", score: 72, reife: 2, muda: ["ueberbearbeitung", "bewegung"], ist: "Manuell auf jeder Plattform einzeln. 1–2 Stunden pro Fahrzeug. Oft veraltet.", soll: "Zentrale Inserierung: einmal eingeben, auf alle Plattformen gleichzeitig. Automatisch deaktivieren bei Verkauf.", ersparnis: "3h/Woche" },
      { name: "Service-Erinnerungen", score: 85, reife: 1, muda: ["bestaende", "ueberbearbeitung"], ist: "Keine aktiven Erinnerungen. Kunden melden sich selbst oder vergessen es.", soll: "Automatisch 4 Wochen vor TÜV/Inspektion: SMS oder E-Mail an Kunden mit Buchungslink.", ersparnis: "2h/Woche" },
      { name: "Kundenbindung", score: 70, reife: 2, muda: ["bestaende"], ist: "Kein Kontakt nach dem Kauf. Keine Newsletter. Keine Aktionen für Bestandskunden.", soll: "Automatische Zufriedenheitsabfrage 2 Wochen nach Kauf. Saisonale Angebote per E-Mail.", ersparnis: "1h/Woche" },
    ],
    upsell: [
      "Lead-Management + Follow-up als Gesamtpaket (~3.500€)",
      "Service-Erinnerungen als Quick Win (~1.000€)",
      "Inserat-Automatisierung als Folgeprojekt (~1.500€)",
    ],
    gespraechseinstieg: "Herr Petersen, bei Ihnen fallen Leads durchs Raster — keine zentrale Erfassung, kein Follow-up. Das ist bares Geld das liegen bleibt. Mit einem einfachen System reagieren Sie in Minuten statt Tagen.",
    notizen: "",
  },
];

const STATUS_MAP = {
  neu: { label: "Neu", color: B.blue, bg: B.blueL },
  kontaktiert: { label: "Kontaktiert", color: B.orange, bg: B.orangeL },
  angebot: { label: "Angebot", color: B.purple, bg: B.purpleL },
  kunde: { label: "Kunde", color: B.green, bg: B.greenL },
  kein_interesse: { label: "Kein Interesse", color: B.text3, bg: "#8A8A8A18" },
};

const QUAL_MAP = {
  "heiß": { color: B.red, bg: B.redL },
  "warm": { color: B.orange, bg: B.orangeL },
  "kalt": { color: B.blue, bg: B.blueL },
};

const f = "'Outfit', system-ui, sans-serif";

function Badge({ label, color, bg }) {
  return <span style={{ fontFamily: f, fontSize: 11, fontWeight: 600, color, background: bg, padding: "3px 10px", borderRadius: 6 }}>{label}</span>;
}

function ReifeBar({ level }) {
  const r = REIFE[level - 1];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ display: "flex", gap: 2 }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{ width: 16, height: 6, borderRadius: 3, background: i <= level ? r.color : B.border }} />
        ))}
      </div>
      <span style={{ fontFamily: f, fontSize: 11, color: r.color, fontWeight: 600 }}>{r.label}</span>
    </div>
  );
}

function MudaProfile({ prozesse }) {
  const counts = {};
  prozesse.forEach(p => p.muda.forEach(m => { counts[m] = (counts[m] || 0) + 1; }));
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const max = sorted[0]?.[1] || 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {sorted.map(([key, count]) => {
        const m = MUDA[key];
        return (
          <div key={key}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontFamily: f, fontSize: 13, fontWeight: 500, color: B.text }}>
                {m.icon} {m.label}
              </span>
              <span style={{ fontFamily: f, fontSize: 12, color: B.text3 }}>
                {count}× identifiziert
              </span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: B.border }}>
              <div style={{ height: 6, borderRadius: 3, background: m.color, width: `${(count / max) * 100}%`, transition: "width 0.5s" }} />
            </div>
            <p style={{ fontFamily: f, fontSize: 11, color: B.text3, margin: "4px 0 0" }}>{m.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

function DMAICTimeline({ active }) {
  const steps = [
    { key: "D", label: "Define", desc: "Branche & Ist-Zustand" },
    { key: "M", label: "Measure", desc: "Fragebogen-Daten" },
    { key: "A", label: "Analyze", desc: "Engpässe & Muda" },
    { key: "I", label: "Improve", desc: "Automatisierungsplan" },
    { key: "C", label: "Control", desc: "Erstgespräch & Umsetzung" },
  ];
  return (
    <div style={{ display: "flex", gap: 0 }}>
      {steps.map((s, i) => (
        <div key={s.key} style={{ flex: 1, textAlign: "center", position: "relative" }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, margin: "0 auto 6px",
            background: i <= active ? B.orange : B.border,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: f, fontSize: 14, fontWeight: 700, color: i <= active ? "#fff" : B.text3,
          }}>{s.key}</div>
          <p style={{ fontFamily: f, fontSize: 11, fontWeight: 600, color: i <= active ? B.text : B.text3, margin: 0 }}>{s.label}</p>
          <p style={{ fontFamily: f, fontSize: 10, color: B.text3, margin: "2px 0 0" }}>{s.desc}</p>
          {i < steps.length - 1 && (
            <div style={{ position: "absolute", top: 15, left: "calc(50% + 20px)", width: "calc(100% - 40px)", height: 2, background: i < active ? B.orange : B.border }} />
          )}
        </div>
      ))}
    </div>
  );
}

function ScoreCircle({ score, size = 72 }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color = score > 70 ? B.red : score > 40 ? B.yellow : B.green;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={B.border} strokeWidth="4" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} />
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central" style={{ transform: "rotate(90deg)", transformOrigin: "center", fontFamily: f, fontSize: 18, fontWeight: 700, fill: color }}>{score}</text>
    </svg>
  );
}

export default function Dashboard() {
  const [selectedId, setSelectedId] = useState("L-001");
  const [leads, setLeads] = useState(SAMPLE_LEADS);
  const [tab, setTab] = useState("analyse");

  const lead = leads.find(l => l.id === selectedId);
  const totalErsparnis = lead?.prozesse.reduce((s, p) => s + parseFloat(p.ersparnis), 0).toFixed(1);

  const updateStatus = (id, status) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  return (
    <div style={{ fontFamily: f, background: B.bg, minHeight: "100vh", display: "flex" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Source+Serif+4:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />

      {/* Sidebar */}
      <div style={{ width: 300, background: B.white, borderRight: `1px solid ${B.border}`, padding: "20px 0", flexShrink: 0, overflowY: "auto" }}>
        <div style={{ padding: "0 20px 16px", borderBottom: `1px solid ${B.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <svg viewBox="0 0 64 64" fill="none" style={{ width: 24, height: 24 }}>
              <path d="M8 40 Q20 14 32 14 Q44 14 56 40" stroke={B.orange} strokeWidth="3.5" strokeLinecap="round"/>
              <circle cx="8" cy="40" r="3" fill={B.orange} opacity="0.4"/>
              <circle cx="56" cy="40" r="3" fill={B.orange}/>
            </svg>
            <span style={{ fontWeight: 700, fontSize: 16, color: B.dark }}>PRONECTO</span>
          </div>
          <span style={{ fontSize: 12, color: B.text3 }}>Admin Dashboard</span>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, padding: "16px 20px", borderBottom: `1px solid ${B.border}` }}>
          {[
            { v: leads.length, l: "Leads" },
            { v: leads.filter(l => l.qualitaet === "heiß").length, l: "Heiß" },
            { v: leads.filter(l => l.status === "neu").length, l: "Neu" },
          ].map(s => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <p style={{ fontSize: 20, fontWeight: 700, color: B.dark, margin: 0 }}>{s.v}</p>
              <p style={{ fontSize: 10, color: B.text3, margin: 0 }}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* Lead List */}
        <div style={{ padding: "8px 12px" }}>
          {leads.map(l => (
            <button key={l.id} onClick={() => { setSelectedId(l.id); setTab("analyse"); }}
              style={{
                width: "100%", textAlign: "left", padding: "12px", borderRadius: 10, border: "none", cursor: "pointer", marginBottom: 4,
                background: selectedId === l.id ? B.orangeL : "transparent",
                transition: "background 0.15s",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: B.dark }}>{l.firma}</span>
                <Badge {...QUAL_MAP[l.qualitaet]} label={l.qualitaet} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: B.text3 }}>{l.branche} · {l.datum}</span>
                <Badge {...STATUS_MAP[l.status]} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      {lead && (
        <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: B.dark, margin: "0 0 4px" }}>{lead.firma}</h1>
              <p style={{ fontSize: 14, color: B.text2, margin: 0 }}>
                {lead.ansprechpartner} · {lead.branche} · {lead.groesse} Mitarbeiter
                {lead.email && <> · <span style={{ color: B.blue }}>{lead.email}</span></>}
              </p>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {Object.entries(STATUS_MAP).map(([key, s]) => (
                <button key={key} onClick={() => updateStatus(lead.id, key)}
                  style={{
                    fontFamily: f, fontSize: 11, fontWeight: 600, padding: "6px 12px", borderRadius: 6, cursor: "pointer", border: "none",
                    background: lead.status === key ? s.bg : "transparent",
                    color: lead.status === key ? s.color : B.text3,
                    outline: lead.status === key ? `1.5px solid ${s.color}` : `1px solid ${B.border}`,
                  }}>{s.label}</button>
              ))}
            </div>
          </div>

          {/* DMAIC Timeline */}
          <div style={{ background: B.white, borderRadius: 14, padding: "20px 24px", marginBottom: 16, border: `1px solid ${B.border}` }}>
            <DMAICTimeline active={3} />
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
            {[
              { key: "analyse", label: "Analyse & Muda" },
              { key: "plan", label: "Automatisierungsplan" },
              { key: "intern", label: "Interne Einschätzung" },
            ].map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} style={{
                fontFamily: f, fontSize: 13, fontWeight: 600, padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer",
                background: tab === t.key ? B.dark : "transparent", color: tab === t.key ? "#fff" : B.text3,
              }}>{t.label}</button>
            ))}
          </div>

          {/* Tab: Analyse */}
          {tab === "analyse" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {/* Score Overview */}
              <div style={{ background: B.white, borderRadius: 14, padding: 20, border: `1px solid ${B.border}` }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: B.text3, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Gesamtbewertung</p>
                <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
                  <ScoreCircle score={lead.gesamtscore} />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: B.dark, margin: "0 0 4px" }}>Automatisierungspotenzial</p>
                    <p style={{ fontSize: 12, color: B.text2, margin: 0 }}>
                      {lead.gesamtscore > 70 ? "Hohes Potenzial — mehrere kritische Prozesse" : lead.gesamtscore > 40 ? "Solides Potenzial für gezielte Maßnahmen" : "Prozesse laufen bereits gut"}
                    </p>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div style={{ background: B.bg, borderRadius: 10, padding: 14, textAlign: "center" }}>
                    <p style={{ fontSize: 22, fontWeight: 700, color: B.orange, margin: 0 }}>{totalErsparnis}h</p>
                    <p style={{ fontSize: 11, color: B.text3, margin: 0 }}>Ersparnis / Woche</p>
                  </div>
                  <div style={{ background: B.bg, borderRadius: 10, padding: 14, textAlign: "center" }}>
                    <p style={{ fontSize: 22, fontWeight: 700, color: B.green, margin: 0 }}>{(totalErsparnis * 48).toFixed(0)}h</p>
                    <p style={{ fontSize: 11, color: B.text3, margin: 0 }}>Ersparnis / Jahr</p>
                  </div>
                </div>
              </div>

              {/* Muda Profile */}
              <div style={{ background: B.white, borderRadius: 14, padding: 20, border: `1px solid ${B.border}` }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: B.text3, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Verschwendungsprofil (7 Muda)
                </p>
                <MudaProfile prozesse={lead.prozesse} />
              </div>

              {/* Process Maturity */}
              <div style={{ gridColumn: "1 / -1", background: B.white, borderRadius: 14, padding: 20, border: `1px solid ${B.border}` }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: B.text3, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Prozessreifegrad
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                  {lead.prozesse.map(p => (
                    <div key={p.name} style={{ background: B.bg, borderRadius: 10, padding: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: B.dark }}>{p.name}</span>
                        <span style={{ fontSize: 18, fontWeight: 700, color: p.score > 70 ? B.red : p.score > 40 ? B.yellow : B.green }}>{p.score}</span>
                      </div>
                      <ReifeBar level={p.reife} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Automatisierungsplan */}
          {tab === "plan" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {lead.prozesse
                .sort((a, b) => b.score - a.score)
                .slice(0, 3)
                .map((p, i) => (
                <div key={p.name} style={{ background: B.white, borderRadius: 14, padding: 24, border: `1px solid ${B.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8, background: B.orangeL,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: f, fontSize: 16, fontWeight: 700, color: B.orange,
                      }}>{i + 1}</div>
                      <div>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: B.dark, margin: 0 }}>{p.name}</h3>
                        <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                          {p.muda.map(m => (
                            <span key={m} style={{ fontSize: 10, fontWeight: 600, color: MUDA[m].color, background: MUDA[m].color + "18", padding: "2px 6px", borderRadius: 4 }}>
                              {MUDA[m].icon} {MUDA[m].label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 20, fontWeight: 700, color: B.green, margin: 0 }}>{p.ersparnis}</p>
                      <p style={{ fontSize: 10, color: B.text3, margin: 0 }}>Ersparnis</p>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 24px 1fr", gap: 0, alignItems: "stretch" }}>
                    <div style={{ background: B.redL, borderRadius: 10, padding: 16 }}>
                      <p style={{ fontSize: 11, fontWeight: 600, color: B.red, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Ist-Zustand</p>
                      <p style={{ fontSize: 13, color: B.text, margin: 0, lineHeight: 1.6 }}>{p.ist}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 16, color: B.orange }}>→</span>
                    </div>
                    <div style={{ background: B.greenL, borderRadius: 10, padding: 16 }}>
                      <p style={{ fontSize: 11, fontWeight: 600, color: B.green, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Soll-Zustand</p>
                      <p style={{ fontSize: 13, color: B.text, margin: 0, lineHeight: 1.6 }}>{p.soll}</p>
                    </div>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <ReifeBar level={p.reife} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab: Interne Einschätzung */}
          {tab === "intern" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Gesprächseinstieg */}
              <div style={{ background: B.dark, borderRadius: 14, padding: 24 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: B.orange, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Vorgeschlagener Gesprächseinstieg
                </p>
                <p style={{
                  fontFamily: "'Source Serif 4', Georgia, serif", fontStyle: "italic",
                  fontSize: 15, color: "#fff", margin: 0, lineHeight: 1.7, opacity: 0.9,
                }}>
                  "{lead.gespraechseinstieg}"
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {/* Lead-Qualität */}
                <div style={{ background: B.white, borderRadius: 14, padding: 20, border: `1px solid ${B.border}` }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: B.text3, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Lead-Bewertung</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 13, color: B.text2 }}>Qualität</span>
                      <Badge {...QUAL_MAP[lead.qualitaet]} label={lead.qualitaet} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 13, color: B.text2 }}>Geschätztes Volumen</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: B.dark }}>{lead.volumen}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 13, color: B.text2 }}>Gesamtersparnis/Jahr</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: B.green }}>{(totalErsparnis * 48).toFixed(0)}h</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 13, color: B.text2 }}>E-Mail hinterlegt</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: lead.email ? B.green : B.red }}>{lead.email ? "Ja" : "Nein"}</span>
                    </div>
                  </div>
                </div>

                {/* Upsell */}
                <div style={{ background: B.white, borderRadius: 14, padding: 20, border: `1px solid ${B.border}` }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: B.text3, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Upsell-Potenzial</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {lead.upsell.map((u, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: 6, background: B.orangeL, flexShrink: 0, marginTop: 1,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 10, fontWeight: 700, color: B.orange,
                        }}>{i + 1}</div>
                        <p style={{ fontSize: 13, color: B.text, margin: 0, lineHeight: 1.5 }}>{u}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notizen */}
              <div style={{ background: B.white, borderRadius: 14, padding: 20, border: `1px solid ${B.border}` }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: B.text3, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Notizen</p>
                <textarea
                  placeholder="Eigene Notizen zu diesem Lead..."
                  defaultValue={lead.notizen}
                  style={{
                    fontFamily: f, fontSize: 13, color: B.text, width: "100%", minHeight: 80,
                    background: B.bg, border: `1px solid ${B.border}`, borderRadius: 10, padding: 14,
                    resize: "vertical", outline: "none",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
