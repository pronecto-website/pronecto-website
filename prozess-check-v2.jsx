import { useState, useEffect, useRef } from "react";

const BRAND = {
  orange: "#E8793A",
  orangeLight: "#E8793A18",
  orangeMid: "#E8793A30",
  dark: "#1A1F2E",
  bg: "#FAFAFA",
  text: "#1A1F2E",
  textSecondary: "#6B6B6B",
  textMuted: "#8A8A8A",
  border: "#E2E2E2",
  white: "#FFFFFF",
  green: "#2E9E6B",
  greenLight: "#2E9E6B18",
  red: "#D94F4F",
  redLight: "#D94F4F18",
  yellow: "#E2A843",
  yellowLight: "#E2A84318",
};

const BRANCHES = {
  handwerk: {
    label: "Handwerk",
    sub: "Dachdecker, Maurer, Gerüstbau, etc.",
    icon: "🏗️",
    processes: [
      { id: "anfragen", label: "Kundenanfragen entgegennehmen", shortLabel: "Anfragen", desc: "Telefon, WhatsApp, E-Mail — alles manuell?", benchmark: 3.8 },
      { id: "angebote", label: "Angebote erstellen & nachverfolgen", shortLabel: "Angebote", desc: "Wie lange dauert es vom Erstgespräch bis zum fertigen Angebot?", benchmark: 4.1 },
      { id: "planung", label: "Termin- & Einsatzplanung", shortLabel: "Planung", desc: "Wer fährt wann wohin? Wie wird das koordiniert?", benchmark: 3.4 },
      { id: "doku", label: "Baustellendokumentation", shortLabel: "Doku", desc: "Fotos, Tagesberichte, Aufmaße — wie wird das erfasst?", benchmark: 3.9 },
      { id: "rechnung", label: "Rechnungsstellung & Mahnwesen", shortLabel: "Rechnungen", desc: "Vom Auftragsabschluss bis zur bezahlten Rechnung.", benchmark: 3.2 },
      { id: "kommunikation", label: "Kundenkommunikation", shortLabel: "Kommunikation", desc: "Terminbestätigungen, Nachfragen, Google-Bewertungen.", benchmark: 3.5 },
    ],
  },
  elektro: {
    label: "Elektrotechnik",
    sub: "Installation, Wartung, Prüfungen",
    icon: "⚡",
    processes: [
      { id: "anfragen", label: "Kundenanfragen & Auftragsannahme", shortLabel: "Anfragen", desc: "Wie kommen Aufträge rein und wie werden sie erfasst?", benchmark: 3.5 },
      { id: "angebote", label: "Angebote kalkulieren & versenden", shortLabel: "Angebote", desc: "Material, Arbeitszeit, Sonderposten — wie wird kalkuliert?", benchmark: 3.9 },
      { id: "protokolle", label: "Prüfprotokolle & Dokumentation", shortLabel: "Protokolle", desc: "DGUV V3, E-Checks — wie werden Protokolle erstellt?", benchmark: 4.2 },
      { id: "material", label: "Materialbestellung & Lager", shortLabel: "Material", desc: "Wer bestellt wann was? Gibt es Übersicht über den Bestand?", benchmark: 3.6 },
      { id: "einsatz", label: "Einsatzplanung & Touren", shortLabel: "Einsatz", desc: "Techniker-Zuweisung, Routenplanung, Terminkoordination.", benchmark: 3.3 },
      { id: "rechnung", label: "Abrechnung & Zeiterfassung", shortLabel: "Abrechnung", desc: "Stundenzettel, Materialverbräuche, Rechnungserstellung.", benchmark: 3.7 },
    ],
  },
  autohaus: {
    label: "Autohaus",
    sub: "Verkauf, Werkstatt, Service",
    icon: "🚗",
    processes: [
      { id: "leads", label: "Anfragen & Lead-Management", shortLabel: "Leads", desc: "Website, AutoScout24, mobile.de — wie werden Interessenten erfasst?", benchmark: 4.0 },
      { id: "nachverfolgung", label: "Nachverfolgung von Interessenten", shortLabel: "Follow-up", desc: "Wer ruft wann zurück? Fallen Leads durchs Raster?", benchmark: 4.3 },
      { id: "fahrzeugverwaltung", label: "Fahrzeugbestand & Inserate", shortLabel: "Bestand", desc: "Fotos, Beschreibungen, Plattform-Updates — alles aktuell?", benchmark: 3.5 },
      { id: "werkstatt", label: "Werkstattplanung & Aufträge", shortLabel: "Werkstatt", desc: "Terminvergabe, Auftragserstellung, Teilebestellung.", benchmark: 3.4 },
      { id: "service", label: "Service-Erinnerungen", shortLabel: "Service", desc: "TÜV, Inspektion, Reifenwechsel — werden Kunden aktiv erinnert?", benchmark: 3.8 },
      { id: "dms", label: "Datenmanagement & Systempflege", shortLabel: "Daten", desc: "DMS, Excel, Zettel — wie viele Systeme parallel?", benchmark: 3.6 },
    ],
  },
  sonstiges: {
    label: "Andere Branche",
    sub: "Produktion, Logistik, Dienstleistung",
    icon: "🏢",
    processes: [
      { id: "anfragen", label: "Kundenanfragen & Erstreaktion", shortLabel: "Anfragen", desc: "Wie schnell und strukturiert reagiert Ihr Unternehmen?", benchmark: 3.6 },
      { id: "angebote", label: "Angebots- & Auftragsprozess", shortLabel: "Angebote", desc: "Vom Erstkontakt bis zum unterschriebenen Auftrag.", benchmark: 3.8 },
      { id: "kommunikation", label: "Interne Kommunikation", shortLabel: "Kommunikation", desc: "E-Mail-Flut, Meetings, Informationsverluste?", benchmark: 3.4 },
      { id: "doku", label: "Dokumentation & Berichte", shortLabel: "Doku", desc: "Berichte, Protokolle, Reports — manuell oder automatisiert?", benchmark: 3.7 },
      { id: "rechnung", label: "Rechnungsstellung & Buchhaltung", shortLabel: "Rechnungen", desc: "Vom Abschluss bis zur Zahlung.", benchmark: 3.3 },
      { id: "daten", label: "Datenpflege & Systeme", shortLabel: "Daten", desc: "Wie viele Tools, Excel-Listen und Insellösungen?", benchmark: 3.5 },
    ],
  },
};

const PAIN_LABELS = ["", "Kein Problem", "Kleines Ärgernis", "Kostet spürbar Zeit", "Großer Zeitfresser", "Akuter Engpass"];

const DIGI_OPTIONS = [
  { value: "analog", label: "Überwiegend analog", desc: "Papier, Telefon, Zettelwirtschaft" },
  { value: "mixed", label: "Teils digital, teils analog", desc: "Einige Tools, aber viel manuelles Hin und Her" },
  { value: "digital", label: "Überwiegend digital", desc: "Branchensoftware vorhanden, aber nicht optimal genutzt" },
];

const SIZE_OPTIONS = [
  { value: "1-10", label: "1–10 Mitarbeiter" },
  { value: "11-30", label: "11–30 Mitarbeiter" },
  { value: "31-100", label: "31–100 Mitarbeiter" },
  { value: "100+", label: "Über 100 Mitarbeiter" },
];

const Logo = () => (
  <svg viewBox="0 0 64 64" fill="none" style={{ width: 32, height: 32 }}>
    <path d="M8 40 Q20 14 32 14 Q44 14 56 40" stroke={BRAND.orange} strokeWidth="3.5" strokeLinecap="round" />
    <path d="M20 40 L20 24.5" stroke={BRAND.orange} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <path d="M32 40 L32 14" stroke={BRAND.orange} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <path d="M44 40 L44 24.5" stroke={BRAND.orange} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <circle cx="8" cy="40" r="3" fill={BRAND.orange} opacity="0.4" />
    <circle cx="56" cy="40" r="3" fill={BRAND.orange} />
  </svg>
);

function ProgressBar({ step, total }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 48 }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? BRAND.orange : BRAND.border, transition: "background 0.4s ease" }} />
      ))}
    </div>
  );
}

function PainSlider({ value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", gap: 6 }}>
        {[1, 2, 3, 4, 5].map((v) => (
          <button key={v} onClick={() => onChange(v)} style={{
            width: 44, height: 44, borderRadius: 12,
            border: `1.5px solid ${value === v ? BRAND.orange : BRAND.border}`,
            background: value === v ? BRAND.orangeLight : "transparent",
            color: value === v ? BRAND.orange : BRAND.textMuted,
            fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 15,
            cursor: "pointer", transition: "all 0.2s ease",
          }}>{v}</button>
        ))}
      </div>
      {value > 0 && <span style={{ fontSize: 13, color: BRAND.textSecondary, fontFamily: "'Outfit', sans-serif" }}>{PAIN_LABELS[value]}</span>}
    </div>
  );
}

function AnimatedBar({ width, delay, color }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(width), delay);
    return () => clearTimeout(t);
  }, [width, delay]);
  return (
    <div style={{
      height: 10, borderRadius: 5, background: color,
      width: `${w}%`, transition: "width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    }} />
  );
}

function ScoreDashboard({ processes, ratings, animateIn }) {
  const avgScore = processes.reduce((sum, p) => sum + (ratings[p.id] || 0), 0) / processes.length;
  const avgBenchmark = processes.reduce((sum, p) => sum + p.benchmark, 0) / processes.length;
  const potentialScore = Math.round(Math.min(100, (avgScore / 5) * 100));
  
  const getScoreColor = (score) => {
    if (score <= 2) return BRAND.green;
    if (score <= 3.5) return BRAND.yellow;
    return BRAND.red;
  };

  const getScoreLabel = (score) => {
    if (score <= 2) return "Gut aufgestellt";
    if (score <= 3.5) return "Optimierungspotenzial";
    return "Dringender Handlungsbedarf";
  };

  return (
    <div style={{ animation: animateIn ? "fadeIn 0.6s ease" : "none" }}>
      {/* Overall Score */}
      <div style={{
        background: `linear-gradient(135deg, ${BRAND.dark} 0%, #2a3142 100%)`,
        borderRadius: 16, padding: "28px 24px", marginBottom: 20, textAlign: "center",
      }}>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Automatisierungspotenzial
        </p>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4 }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 56, fontWeight: 700, color: BRAND.orange, lineHeight: 1 }}>
            {potentialScore}
          </span>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 400, color: "rgba(255,255,255,0.4)" }}>
            / 100
          </span>
        </div>
        <p style={{
          fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 500, marginTop: 8, marginBottom: 0,
          color: potentialScore > 70 ? "#FF8A80" : potentialScore > 40 ? "#FFD180" : "#A5D6A7",
        }}>
          {potentialScore > 70 ? "Hohes Potenzial — hier lässt sich viel herausholen" : potentialScore > 40 ? "Solides Potenzial für gezielte Automatisierung" : "Ihre Prozesse laufen bereits gut"}
        </p>
      </div>

      {/* Process Bars */}
      <div style={{
        background: BRAND.white, borderRadius: 16, border: `1px solid ${BRAND.border}`,
        padding: "20px 20px 12px", marginBottom: 20,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 15, color: BRAND.dark, margin: 0 }}>
            Ihre Bewertung vs. Branchenschnitt
          </p>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: BRAND.orange }} />
              <span style={{ fontSize: 11, color: BRAND.textMuted, fontFamily: "'Outfit', sans-serif" }}>Sie</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: BRAND.border }} />
              <span style={{ fontSize: 11, color: BRAND.textMuted, fontFamily: "'Outfit', sans-serif" }}>Branche Ø</span>
            </div>
          </div>
        </div>

        {processes.map((proc, i) => {
          const score = ratings[proc.id] || 0;
          const diff = score - proc.benchmark;
          const isWorse = diff > 0.3;
          const isBetter = diff < -0.3;

          return (
            <div key={proc.id} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: i < processes.length - 1 ? `1px solid ${BRAND.bg}` : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 500, color: BRAND.dark }}>
                  {proc.shortLabel}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: BRAND.orange }}>
                    {score.toFixed(1)}
                  </span>
                  <span style={{ fontSize: 11, color: BRAND.textMuted }}>/</span>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: BRAND.textMuted }}>
                    {proc.benchmark.toFixed(1)}
                  </span>
                  {isWorse && <span style={{ fontSize: 11, color: BRAND.red, fontWeight: 600, fontFamily: "'Outfit', sans-serif", background: BRAND.redLight, padding: "1px 6px", borderRadius: 4 }}>↑</span>}
                  {isBetter && <span style={{ fontSize: 11, color: BRAND.green, fontWeight: 600, fontFamily: "'Outfit', sans-serif", background: BRAND.greenLight, padding: "1px 6px", borderRadius: 4 }}>↓</span>}
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <div style={{ height: 10, borderRadius: 5, background: BRAND.bg, width: "100%" }} />
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
                  <AnimatedBar width={(proc.benchmark / 5) * 100} delay={200 + i * 80} color={BRAND.border} />
                </div>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
                  <AnimatedBar width={(score / 5) * 100} delay={400 + i * 80} color={BRAND.orange} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
        {[
          {
            label: "Engpässe",
            value: processes.filter(p => (ratings[p.id] || 0) >= 4).length,
            sub: "Prozesse ≥ 4/5",
            color: BRAND.red,
            bg: BRAND.redLight,
          },
          {
            label: "Über Ø",
            value: processes.filter(p => (ratings[p.id] || 0) > p.benchmark + 0.3).length,
            sub: "schlechter als Branche",
            color: BRAND.yellow,
            bg: BRAND.yellowLight,
          },
          {
            label: "Unter Ø",
            value: processes.filter(p => (ratings[p.id] || 0) < p.benchmark - 0.3).length,
            sub: "besser als Branche",
            color: BRAND.green,
            bg: BRAND.greenLight,
          },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: BRAND.white, borderRadius: 12, border: `1px solid ${BRAND.border}`,
            padding: "16px 12px", textAlign: "center",
          }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 700, color: stat.color, margin: "0 0 2px" }}>{stat.value}</p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600, color: BRAND.dark, margin: "0 0 2px" }}>{stat.label}</p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: BRAND.textMuted, margin: 0 }}>{stat.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypeWriter({ text, speed = 10, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const idx = useRef(0);
  useEffect(() => {
    setDisplayed("");
    idx.current = 0;
    const interval = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed((prev) => prev + text[idx.current]);
        idx.current++;
      } else {
        clearInterval(interval);
        if (onDone) onDone();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);
  return <>{displayed}</>;
}

export default function ProzessCheck() {
  const [step, setStep] = useState(0);
  const [branche, setBranche] = useState(null);
  const [size, setSize] = useState(null);
  const [ratings, setRatings] = useState({});
  const [digi, setDigi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [showCTA, setShowCTA] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [dashboardReady, setDashboardReady] = useState(false);
  const containerRef = useRef(null);

  const currentBranch = branche ? BRANCHES[branche] : null;

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const canProceed = () => {
    if (step === 0) return branche !== null;
    if (step === 1) return size !== null;
    if (step === 2) {
      const procs = currentBranch?.processes || [];
      return procs.every((p) => ratings[p.id] > 0);
    }
    if (step === 3) return digi !== null;
    return false;
  };

  const generateAnalysis = async () => {
    setLoading(true);
    setStep(4);
    setDashboardReady(false);
    setTypingDone(false);

    const procs = currentBranch.processes;
    const sortedByPain = [...procs]
      .map((p) => ({ ...p, score: ratings[p.id] || 0, diff: (ratings[p.id] || 0) - p.benchmark }))
      .sort((a, b) => b.score - a.score);

    const topPains = sortedByPain.slice(0, 3);
    const worseThanAvg = sortedByPain.filter((p) => p.diff > 0.3);
    const avgScore = procs.reduce((s, p) => s + (ratings[p.id] || 0), 0) / procs.length;

    const prompt = `Du bist ein erfahrener Prozessberater bei PRONECTO, einer Beratung für KI-gestützte Prozessautomatisierung. Ein potenzieller Kunde hat gerade einen Online-Selbsttest gemacht. Erstelle eine konkrete, branchenspezifische Erstanalyse.

KUNDENPROFIL:
- Branche: ${currentBranch.label}
- Unternehmensgröße: ${size} Mitarbeiter
- Digitalisierungsgrad: ${digi === "analog" ? "Überwiegend analog (Papier, Telefon)" : digi === "mixed" ? "Teils digital, teils analog" : "Überwiegend digital, aber nicht optimal"}

PROZESSBEWERTUNGEN (1 = kein Problem, 5 = akuter Engpass):
${procs.map((p) => `- ${p.label}: ${ratings[p.id]}/5 (Branchenschnitt: ${p.benchmark}/5)${(ratings[p.id] || 0) > p.benchmark + 0.3 ? " ⚠️ ÜBERDURCHSCHNITTLICH SCHLECHT" : ""}`).join("\n")}

DURCHSCHNITTLICHER SCHMERZWERT: ${avgScore.toFixed(1)}/5
ANZAHL AKUTER ENGPÄSSE (≥4): ${procs.filter((p) => (ratings[p.id] || 0) >= 4).length}

TOP-3 SCHMERZPUNKTE:
${topPains.map((p, i) => `${i + 1}. ${p.label} (${p.score}/5, Branche: ${p.benchmark}/5)`).join("\n")}

${worseThanAvg.length > 0 ? `SCHLECHTER ALS BRANCHE:\n${worseThanAvg.map((p) => `- ${p.label}: +${p.diff.toFixed(1)} über Durchschnitt`).join("\n")}` : ""}

AUFGABE — Schreibe genau diese 3 Abschnitte:

ABSCHNITT 1 — "Gesamtbild" (3-4 Sätze):
Was fällt sofort auf? Wo liegt das Unternehmen im Branchenvergleich? Sei dabei spezifisch auf die Branche "${currentBranch.label}" bezogen. Nenne konkret, welche ${topPains.length > 1 ? "Prozesse am meisten auffallen" : "welcher Prozess am meisten auffällt"}.

ABSCHNITT 2 — "Konkrete Hebel" (pro Top-Schmerzpunkt 2-3 Sätze):
Für die ${Math.min(topPains.length, 2)} größten Schmerzpunkte: Was genau passiert heute vermutlich (basierend auf Branchenwissen)? Was könnte stattdessen automatisch laufen? Nenne ein konkretes Tool oder eine Methode. Beispiel-Stil: "Ihre Angebotserstellung liegt bei ${ratings[topPains[0]?.id]}/5 — das bedeutet wahrscheinlich, dass Angebote in Word oder Excel von Hand erstellt werden. Mit einem automatisierten Workflow könnte eine Kundenanfrage direkt ein vorausgefülltes Angebot auslösen, das nur noch geprüft werden muss."

ABSCHNITT 3 — "Einsparpotenzial" (2-3 Sätze):
Schätze konservativ die wöchentliche Zeitersparnis in Stunden — differenziert nach den genannten Prozessen. Nenne auch, was das bei ${size} Mitarbeitern über ein Jahr bedeuten könnte (in Stunden oder Tagen). Sei realistisch, nicht optimistisch.

REGELN:
- Deutsch, Siezen
- Maximal 280 Wörter gesamt
- KEINE Markdown-Formatierung, keine **, keine ##, keine Aufzählungszeichen
- Trenne die Abschnitte nur durch eine Leerzeile
- Schreibe "Gesamtbild:", "Konkrete Hebel:" und "Einsparpotenzial:" als Überschriften in den Fließtext
- Keine Marketing-Floskeln wie "revolutionär", "ganzheitlich", "End-to-End"
- Schreibe wie ein kompetenter Berater der klar spricht — sachlich aber nicht kalt
- Beziehe dich auf echte Probleme in der Branche ${currentBranch.label}`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();
      const text = data.content?.filter((item) => item.type === "text").map((item) => item.text).join("\n");
      setAnalysis(text || "Die Analyse konnte nicht erstellt werden. Bitte kontaktieren Sie uns direkt.");
    } catch (err) {
      setAnalysis("Die Analyse konnte leider nicht erstellt werden. Kontaktieren Sie uns gerne direkt für eine persönliche Einschätzung.");
    }
    setLoading(false);
    setTimeout(() => setDashboardReady(true), 300);
  };

  const renderStep = () => {
    if (step === 0) {
      return (
        <div>
          <p style={styles.stepLabel}>Schritt 1 von 4</p>
          <h2 style={styles.heading}>In welcher Branche sind Sie tätig?</h2>
          <p style={styles.subtext}>Damit wir die richtigen Prozesse abfragen.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 32 }}>
            {Object.entries(BRANCHES).map(([key, b]) => (
              <button key={key} onClick={() => { setBranche(key); setRatings({}); }} style={{
                ...styles.optionCard,
                borderColor: branche === key ? BRAND.orange : BRAND.border,
                background: branche === key ? BRAND.orangeLight : BRAND.white,
              }}>
                <span style={{ fontSize: 28 }}>{b.icon}</span>
                <span style={{ fontWeight: 600, color: BRAND.dark, fontSize: 15 }}>{b.label}</span>
                <span style={{ fontSize: 12, color: BRAND.textMuted }}>{b.sub}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (step === 1) {
      return (
        <div>
          <p style={styles.stepLabel}>Schritt 2 von 4</p>
          <h2 style={styles.heading}>Wie groß ist Ihr Unternehmen?</h2>
          <p style={styles.subtext}>Die Unternehmensgröße beeinflusst, welche Lösungen sinnvoll sind.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 32 }}>
            {SIZE_OPTIONS.map((s) => (
              <button key={s.value} onClick={() => setSize(s.value)} style={{
                ...styles.listOption,
                borderColor: size === s.value ? BRAND.orange : BRAND.border,
                background: size === s.value ? BRAND.orangeLight : BRAND.white,
              }}>
                <span style={{ fontWeight: 500, color: BRAND.dark }}>{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (step === 2 && currentBranch) {
      return (
        <div>
          <p style={styles.stepLabel}>Schritt 3 von 4</p>
          <h2 style={styles.heading}>Wo drückt der Schuh?</h2>
          <p style={styles.subtext}>Bewerten Sie jeden Prozess: 1 = läuft gut, 5 = akuter Engpass.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 32 }}>
            {currentBranch.processes.map((proc) => (
              <div key={proc.id} style={styles.processItem}>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, color: BRAND.dark, fontSize: 15, fontFamily: "'Outfit', sans-serif" }}>{proc.label}</p>
                  <p style={{ margin: "4px 0 10px", fontSize: 13, color: BRAND.textMuted, fontFamily: "'Outfit', sans-serif" }}>{proc.desc}</p>
                </div>
                <PainSlider value={ratings[proc.id] || 0} onChange={(v) => setRatings((prev) => ({ ...prev, [proc.id]: v }))} />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div>
          <p style={styles.stepLabel}>Schritt 4 von 4</p>
          <h2 style={styles.heading}>Wie digital arbeiten Sie heute?</h2>
          <p style={styles.subtext}>Eine ehrliche Einschätzung hilft uns, realistische Empfehlungen zu geben.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 32 }}>
            {DIGI_OPTIONS.map((d) => (
              <button key={d.value} onClick={() => setDigi(d.value)} style={{
                ...styles.listOption,
                borderColor: digi === d.value ? BRAND.orange : BRAND.border,
                background: digi === d.value ? BRAND.orangeLight : BRAND.white,
                textAlign: "left", padding: "16px 20px",
              }}>
                <span style={{ fontWeight: 500, color: BRAND.dark, display: "block" }}>{d.label}</span>
                <span style={{ fontSize: 13, color: BRAND.textMuted }}>{d.desc}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (step === 4) {
      return (
        <div>
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={styles.spinner} />
              <p style={{ marginTop: 24, color: BRAND.textSecondary, fontFamily: "'Outfit', sans-serif", fontSize: 15 }}>
                Ihre Prozesse werden analysiert...
              </p>
              <p style={{ color: BRAND.textMuted, fontFamily: "'Outfit', sans-serif", fontSize: 13, marginTop: 4 }}>
                Das dauert nur wenige Sekunden.
              </p>
            </div>
          ) : (
            <div>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <h2 style={{ ...styles.heading, fontSize: 20, marginBottom: 4 }}>Ihr Ergebnis</h2>
                <p style={{ ...styles.subtext, fontSize: 13 }}>
                  {currentBranch?.label} · {size} Mitarbeiter · {digi === "analog" ? "Analog" : digi === "mixed" ? "Teils digital" : "Digital"}
                </p>
              </div>

              {dashboardReady && currentBranch && (
                <ScoreDashboard processes={currentBranch.processes} ratings={ratings} animateIn={true} />
              )}

              {analysis && (
                <div style={styles.analysisBox}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: BRAND.orangeLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 14 }}>🤖</span>
                    </div>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: BRAND.orange }}>KI-Analyse</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: BRAND.dark, fontFamily: "'Outfit', sans-serif", whiteSpace: "pre-wrap" }}>
                    <TypeWriter text={analysis} speed={8} onDone={() => setTypingDone(true)} />
                  </p>
                </div>
              )}

              {typingDone && (
                <div style={{ animation: "fadeIn 0.6s ease" }}>
                  <div style={{
                    background: `linear-gradient(135deg, ${BRAND.dark} 0%, #2a3142 100%)`,
                    borderRadius: 16, padding: "28px 24px", marginTop: 20,
                  }}>
                    <p style={{
                      fontFamily: "'Source Serif 4', Georgia, serif", fontStyle: "italic",
                      fontSize: 17, color: "#FFFFFF", margin: "0 0 8px", textAlign: "center",
                    }}>
                      Wollen Sie wissen, was das konkret für Sie bedeutet?
                    </p>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 20px", textAlign: "center", fontFamily: "'Outfit', sans-serif" }}>
                      30 Minuten. Unverbindlich. Kein Verkaufsgespräch — nur Klarheit.
                    </p>
                    <button onClick={() => window.open("https://pronecto.de/#kontakt", "_blank")} style={styles.ctaButton}>
                      Kostenloses Erstgespräch buchen
                    </button>
                  </div>

                  <p style={{ textAlign: "center", marginTop: 16, marginBottom: 0 }}>
                    <button onClick={() => { setStep(0); setBranche(null); setSize(null); setRatings({}); setDigi(null); setAnalysis(null); setTypingDone(false); setDashboardReady(false); }} style={{
                      fontFamily: "'Outfit', sans-serif", fontSize: 13, color: BRAND.textMuted,
                      background: "none", border: "none", cursor: "pointer", textDecoration: "underline",
                    }}>
                      Analyse wiederholen
                    </button>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div style={styles.outer}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Source+Serif+4:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        button:hover { transform: translateY(-1px); }
        button:active { transform: translateY(0); }
      `}</style>
      <div ref={containerRef} style={styles.container}>
        <div style={styles.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Logo />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 18, color: BRAND.dark }}>PRONECTO</span>
          </div>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: BRAND.textMuted }}>Prozess-Check</span>
        </div>

        {step === 0 && !branche && (
          <div style={{ textAlign: "center", marginBottom: 40, animation: "fadeIn 0.5s ease" }}>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 700, color: BRAND.dark, margin: "0 0 12px", lineHeight: 1.2 }}>
              Wie viel Potenzial steckt<br />in Ihren Prozessen?
            </h1>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontStyle: "italic", fontSize: 16, color: BRAND.textSecondary, margin: 0 }}>
              4 Fragen. 2 Minuten. Kostenlose KI-Analyse.
            </p>
          </div>
        )}

        {step > 0 && step < 4 && <ProgressBar step={step - 1} total={3} />}

        <div style={{ animation: "fadeIn 0.4s ease" }} key={step}>{renderStep()}</div>

        {step < 4 && (
          <div style={styles.footer}>
            {step > 0 && (
              <button onClick={() => setStep((s) => s - 1)} style={styles.backButton}>← Zurück</button>
            )}
            <button
              onClick={() => { step === 3 ? generateAnalysis() : setStep((s) => s + 1); }}
              disabled={!canProceed()}
              style={{ ...styles.nextButton, opacity: canProceed() ? 1 : 0.4, cursor: canProceed() ? "pointer" : "not-allowed" }}
            >
              {step === 3 ? "Analyse starten →" : "Weiter →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  outer: {
    background: BRAND.bg, minHeight: "100vh", display: "flex", justifyContent: "center",
    alignItems: "flex-start", padding: "20px 16px", fontFamily: "'Outfit', sans-serif",
  },
  container: {
    width: "100%", maxWidth: 520, background: BRAND.white, borderRadius: 20,
    padding: "32px 28px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)",
    overflowY: "auto",
  },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: 32, paddingBottom: 20, borderBottom: `1px solid ${BRAND.border}`,
  },
  stepLabel: {
    fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 500, color: BRAND.orange,
    margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em",
  },
  heading: {
    fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 700, color: BRAND.dark,
    margin: "0 0 8px", lineHeight: 1.3,
  },
  subtext: {
    fontFamily: "'Outfit', sans-serif", fontSize: 14, color: BRAND.textSecondary, margin: 0, lineHeight: 1.5,
  },
  optionCard: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
    padding: "24px 16px", borderRadius: 16, border: "1.5px solid", cursor: "pointer",
    transition: "all 0.2s ease", fontFamily: "'Outfit', sans-serif", background: "none",
  },
  listOption: {
    padding: "14px 20px", borderRadius: 12, border: "1.5px solid", cursor: "pointer",
    transition: "all 0.2s ease", fontFamily: "'Outfit', sans-serif", fontSize: 15,
    textAlign: "left", display: "flex", flexDirection: "column", gap: 2, background: "none",
  },
  processItem: { paddingBottom: 20, borderBottom: `1px solid ${BRAND.border}` },
  footer: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginTop: 36, paddingTop: 20, borderTop: `1px solid ${BRAND.border}`,
  },
  backButton: {
    fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 500, color: BRAND.textMuted,
    background: "none", border: "none", cursor: "pointer", padding: "8px 0", transition: "color 0.2s",
  },
  nextButton: {
    fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600, color: BRAND.white,
    background: BRAND.orange, border: "none", borderRadius: 12, padding: "12px 28px",
    cursor: "pointer", transition: "all 0.2s ease", marginLeft: "auto",
  },
  analysisBox: {
    background: BRAND.bg, borderRadius: 16, padding: "20px", marginBottom: 0,
    borderLeft: `3px solid ${BRAND.orange}`,
  },
  ctaButton: {
    display: "block", width: "100%", fontFamily: "'Outfit', sans-serif", fontSize: 15,
    fontWeight: 600, color: "#FFFFFF", background: BRAND.orange, border: "none",
    borderRadius: 12, padding: "14px 24px", cursor: "pointer", transition: "all 0.2s ease",
  },
  spinner: {
    width: 40, height: 40, border: `3px solid ${BRAND.border}`, borderTopColor: BRAND.orange,
    borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto",
  },
};
