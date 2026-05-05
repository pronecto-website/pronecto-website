import { useState, useEffect, useRef } from "react";

const B = {
  orange: "#E8793A", orangeL: "#E8793A15", orangeM: "#E8793A30",
  dark: "#1A1F2E", bg: "#FAFAFA", white: "#FFFFFF",
  text: "#1A1F2E", text2: "#6B6B6B", text3: "#8A8A8A", border: "#E2E2E2",
  green: "#2E9E6B", greenL: "#2E9E6B12", red: "#D94F4F", redL: "#D94F4F12",
  yellow: "#E2A843", yellowL: "#E2A84312", blue: "#3B7DD8", blueL: "#3B7DD812",
};

const f = "'Outfit', system-ui, sans-serif";
const fs = "'Source Serif 4', Georgia, serif";

const REIFE_LABELS = [
  null,
  { label: "Ad-hoc", desc: "Keine festen Abläufe", color: B.red },
  { label: "Managed", desc: "Grundstruktur, aber manuell", color: B.orange },
  { label: "Definiert", desc: "Teilweise digitalisiert", color: B.yellow },
  { label: "Gemessen", desc: "KPIs werden erfasst", color: B.blue },
  { label: "Optimiert", desc: "Automatisiert & datengetrieben", color: B.green },
];

const MUDA_INFO = {
  warten: { label: "Warten", icon: "⏳", color: B.red },
  ueberbearbeitung: { label: "Überbearbeitung", icon: "🔄", color: B.orange },
  bewegung: { label: "Systemwechsel", icon: "🔀", color: B.yellow },
  transport: { label: "Datenübertragung", icon: "📋", color: B.blue },
  bestaende: { label: "Liegengebliebenes", icon: "📥", color: "#7C5CBF" },
  fehler: { label: "Fehleranfälligkeit", icon: "⚠️", color: B.red },
};

const SAMPLE = {
  firma: "Müller Bedachungen GmbH",
  branche: "Handwerk",
  groesse: "11–30 Mitarbeiter",
  gesamtscore: 78,
  ersparnis_woche: 13,
  ersparnis_jahr: 624,
  prozesse: [
    { name: "Angebotserstellung", score: 91, reife: 1, muda: ["ueberbearbeitung", "bewegung", "fehler"], ist: "Angebote werden in Word erstellt, ca. 45 Minuten pro Stück. 8 Angebote pro Woche. Keine systematische Nachverfolgung — ob ein Angebot angenommen wurde, fällt oft erst spät auf.", soll: "Eine Anfrage löst automatisch ein vorausgefülltes Angebot aus Textbausteinen aus. Sie prüfen nur noch, statt alles neu zu tippen. Nach 3 Tagen ohne Rückmeldung geht automatisch eine freundliche Nachfrage raus.", ersparnis: "4,5 Std." },
    { name: "Baustellendokumentation", score: 85, reife: 1, muda: ["ueberbearbeitung", "transport"], ist: "Fotos landen unsortiert auf dem Handy. Kein Tagesbericht, keine systematische Zuordnung zur Baustelle. Bei Rückfragen oder Reklamationen wird lange gesucht.", soll: "Fotos und Notizen per WhatsApp an einen Bot schicken — der erstellt automatisch einen Tagesbericht mit Datum, Adresse und Fotodokumentation als PDF.", ersparnis: "2 Std." },
    { name: "Kundenanfragen", score: 82, reife: 2, muda: ["warten", "bestaende"], ist: "Anfragen kommen über Telefon, WhatsApp und E-Mail — ohne zentrale Erfassung. Reaktionszeit liegt bei 1–3 Tagen. In der Zwischenzeit entscheiden sich Kunden für die Konkurrenz.", soll: "Alle Kanäle laufen in einem Posteingang zusammen. Der Kunde bekommt sofort eine automatische Eingangsbestätigung. Nichts geht verloren.", ersparnis: "3 Std." },
  ],
  muda_profil: [
    { key: "ueberbearbeitung", count: 3 },
    { key: "bestaende", count: 2 },
    { key: "warten", count: 2 },
    { key: "bewegung", count: 2 },
    { key: "transport", count: 1 },
    { key: "fehler", count: 1 },
  ],
  ki_analyse: "Ihr Betrieb zeigt ein typisches Muster für Handwerksunternehmen Ihrer Größe: Die operative Arbeit auf der Baustelle läuft gut, aber die kaufmännischen Prozesse drum herum sind weitgehend manuell und kosten Sie jede Woche wertvolle Stunden.\n\nBesonders auffällig sind zwei Bereiche. Erstens: Die Angebotserstellung bindet mit geschätzt 6 Stunden pro Woche unverhältnismäßig viel Zeit — und ohne Nachverfolgung gehen Aufträge verloren, die eigentlich gewonnen wären. Zweitens: Ihre Baustellendokumentation existiert faktisch nicht in verwertbarer Form, was bei Reklamationen oder Versicherungsfällen zum Problem werden kann.\n\nKonservativ geschätzt können Sie durch gezielte Automatisierung 13 Stunden pro Woche einsparen. Das sind über 620 Stunden im Jahr — oder anders ausgedrückt: fast 16 volle Arbeitswochen, die Sie zurückgewinnen.",
};

function AnimatedNumber({ value, suffix = "", duration = 1200 }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCurrent(value); clearInterval(timer); }
      else setCurrent(Math.round(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <>{current}{suffix}</>;
}

function ReifeScale({ level }) {
  const r = REIFE_LABELS[level];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ display: "flex", gap: 3 }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{
            width: 28, height: 7, borderRadius: 4,
            background: i <= level ? r.color : B.border,
            transition: "background 0.4s ease",
          }} />
        ))}
      </div>
      <span style={{ fontFamily: f, fontSize: 13, fontWeight: 600, color: r.color }}>{r.label}</span>
      <span style={{ fontFamily: f, fontSize: 12, color: B.text3 }}>— {r.desc}</span>
    </div>
  );
}

function Section({ label, sublabel, children, id }) {
  return (
    <div id={id} style={{ marginBottom: 40 }}>
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontFamily: f, fontSize: 11, fontWeight: 600, color: B.orange, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
        {sublabel && <p style={{ fontFamily: f, fontSize: 13, color: B.text3, margin: 0 }}>{sublabel}</p>}
      </div>
      {children}
    </div>
  );
}

export default function LeadErgebnis() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const d = SAMPLE;

  return (
    <div style={{ fontFamily: f, background: B.bg, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Source+Serif+4:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      {/* Header */}
      <div style={{ background: B.white, borderBottom: `1px solid ${B.border}`, padding: "14px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg viewBox="0 0 64 64" fill="none" style={{ width: 26, height: 26 }}>
              <path d="M8 40 Q20 14 32 14 Q44 14 56 40" stroke={B.orange} strokeWidth="3.5" strokeLinecap="round"/>
              <circle cx="8" cy="40" r="3" fill={B.orange} opacity="0.4"/>
              <circle cx="56" cy="40" r="3" fill={B.orange}/>
            </svg>
            <span style={{ fontWeight: 700, fontSize: 16, color: B.dark }}>PRONECTO</span>
          </div>
          <span style={{ fontSize: 12, color: B.text3 }}>Prozess-Check · Ergebnis</span>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "36px 24px 80px" }}>

        {/* Hero Score */}
        <div style={{ textAlign: "center", marginBottom: 48, animation: "fadeUp 0.6s ease" }}>
          <p style={{ fontFamily: f, fontSize: 13, color: B.text3, margin: "0 0 8px" }}>{d.branche} · {d.groesse}</p>
          <h1 style={{ fontFamily: f, fontSize: 28, fontWeight: 700, color: B.dark, margin: "0 0 24px", lineHeight: 1.3 }}>
            Ihre Prozessanalyse
          </h1>

          <div style={{ display: "inline-flex", gap: 32, background: B.white, borderRadius: 16, padding: "28px 40px", border: `1px solid ${B.border}` }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 42, fontWeight: 700, color: B.orange, margin: 0, lineHeight: 1 }}>
                <AnimatedNumber value={d.gesamtscore} />
              </p>
              <p style={{ fontSize: 11, color: B.text3, margin: "6px 0 0" }}>Automatisierungs-<br/>potenzial / 100</p>
            </div>
            <div style={{ width: 1, background: B.border }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 42, fontWeight: 700, color: B.green, margin: 0, lineHeight: 1 }}>
                <AnimatedNumber value={d.ersparnis_woche} suffix="h" />
              </p>
              <p style={{ fontSize: 11, color: B.text3, margin: "6px 0 0" }}>geschätzte Ersparnis<br/>pro Woche</p>
            </div>
            <div style={{ width: 1, background: B.border }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 42, fontWeight: 700, color: B.dark, margin: 0, lineHeight: 1 }}>
                <AnimatedNumber value={d.ersparnis_jahr} suffix="h" />
              </p>
              <p style={{ fontSize: 11, color: B.text3, margin: "6px 0 0" }}>Ersparnis<br/>pro Jahr</p>
            </div>
          </div>
        </div>

        {/* KI-Einschätzung */}
        <Section label="Einschätzung" sublabel="Basierend auf Ihren Angaben, erstellt durch KI-gestützte Prozessanalyse">
          <div style={{ background: B.white, borderRadius: 14, padding: 28, border: `1px solid ${B.border}`, borderLeft: `3px solid ${B.orange}` }}>
            <p style={{ fontFamily: f, fontSize: 15, color: B.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
              {d.ki_analyse}
            </p>
          </div>
        </Section>

        {/* Verschwendungsprofil */}
        <Section label="Verschwendungsanalyse" sublabel="Nach Lean-Methodik — zeigt, welche Arten von Verschwendung in Ihren Prozessen dominieren">
          <div style={{ background: B.white, borderRadius: 14, padding: 24, border: `1px solid ${B.border}` }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {d.muda_profil.map(({ key, count }) => {
                const m = MUDA_INFO[key];
                const maxCount = d.muda_profil[0].count;
                return (
                  <div key={key}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 16 }}>{m.icon}</span>
                        <span style={{ fontFamily: f, fontSize: 14, fontWeight: 600, color: B.dark }}>{m.label}</span>
                      </div>
                      <span style={{ fontFamily: f, fontSize: 12, color: B.text3 }}>
                        {count === 1 ? "1 Prozess betroffen" : `${count} Prozesse betroffen`}
                      </span>
                    </div>
                    <div style={{ height: 8, borderRadius: 4, background: B.bg }}>
                      <div style={{ height: 8, borderRadius: 4, background: m.color, opacity: 0.7, width: `${(count / maxCount) * 100}%`, transition: "width 0.6s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <p style={{ fontFamily: f, fontSize: 12, color: B.text3, margin: "16px 0 0", lineHeight: 1.6, borderTop: `1px solid ${B.border}`, paddingTop: 14 }}>
              Die Lean-Methodik unterscheidet 7 Arten von Verschwendung (japanisch: "Muda") in Geschäftsprozessen. Jede identifizierte Verschwendung ist ein konkreter Ansatzpunkt für Automatisierung.
            </p>
          </div>
        </Section>

        {/* Automatisierungsplan */}
        <Section label="Ihr Automatisierungsplan" sublabel="Die drei Prozesse mit dem größten Hebel — mit konkretem Ist/Soll-Vergleich">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {d.prozesse.map((p, i) => (
              <div key={p.name} style={{ background: B.white, borderRadius: 14, padding: 0, border: `1px solid ${B.border}`, overflow: "hidden", animation: `fadeUp 0.5s ease ${0.1 * i}s both` }}>
                {/* Header */}
                <div style={{ padding: "18px 24px", borderBottom: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, background: B.orangeL,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: f, fontSize: 18, fontWeight: 700, color: B.orange,
                    }}>{i + 1}</div>
                    <div>
                      <h3 style={{ fontFamily: f, fontSize: 16, fontWeight: 700, color: B.dark, margin: 0 }}>{p.name}</h3>
                      <div style={{ display: "flex", gap: 6, marginTop: 5 }}>
                        {p.muda.map(m => (
                          <span key={m} style={{
                            fontFamily: f, fontSize: 10, fontWeight: 600,
                            color: MUDA_INFO[m].color, background: MUDA_INFO[m].color + "15",
                            padding: "2px 8px", borderRadius: 4,
                          }}>
                            {MUDA_INFO[m].icon} {MUDA_INFO[m].label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontFamily: f, fontSize: 22, fontWeight: 700, color: B.green, margin: 0 }}>{p.ersparnis}</p>
                    <p style={{ fontFamily: f, fontSize: 10, color: B.text3, margin: 0 }}>pro Woche</p>
                  </div>
                </div>

                {/* Ist / Soll */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 0 }}>
                  <div style={{ padding: 20, borderRight: `1px solid ${B.border}`, background: B.redL }}>
                    <p style={{ fontFamily: f, fontSize: 10, fontWeight: 700, color: B.red, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Heute</p>
                    <p style={{ fontFamily: f, fontSize: 13, color: B.text, margin: 0, lineHeight: 1.7 }}>{p.ist}</p>
                  </div>
                  <div style={{ padding: 20, background: B.greenL }}>
                    <p style={{ fontFamily: f, fontSize: 10, fontWeight: 700, color: B.green, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Automatisiert</p>
                    <p style={{ fontFamily: f, fontSize: 13, color: B.text, margin: 0, lineHeight: 1.7 }}>{p.soll}</p>
                  </div>
                </div>

                {/* Reifegrad */}
                <div style={{ padding: "14px 24px", borderTop: `1px solid ${B.border}`, background: B.bg }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: f, fontSize: 11, color: B.text3 }}>Prozessreifegrad:</span>
                    <ReifeScale level={p.reife} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: f, fontSize: 12, color: B.text3, margin: "14px 0 0", lineHeight: 1.6 }}>
            Der Prozessreifegrad orientiert sich am Capability Maturity Model und beschreibt, wie strukturiert und automatisiert ein Prozess bereits läuft — von "Ad-hoc" (Stufe 1) bis "Optimiert" (Stufe 5).
          </p>
        </Section>

        {/* Methodik-Hinweis */}
        <div style={{ background: B.white, borderRadius: 14, padding: 24, border: `1px solid ${B.border}`, marginBottom: 40 }}>
          <p style={{ fontFamily: f, fontSize: 11, fontWeight: 600, color: B.orange, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Methodik</p>
          <p style={{ fontFamily: f, fontSize: 13, color: B.text2, margin: 0, lineHeight: 1.7 }}>
            Diese Analyse basiert auf etablierten Methoden der Prozessoptimierung: Die Strukturierung folgt dem DMAIC-Modell (Define, Measure, Analyze, Improve, Control) aus Six Sigma. Die Verschwendungsidentifikation nutzt die 7 Muda aus der Lean-Methodik. Die Reifegradeinschätzung orientiert sich am Capability Maturity Model (CMMI). Alle Ergebnisse werden KI-gestützt auf Basis Ihrer individuellen Angaben berechnet.
          </p>
        </div>

        {/* Save / Email */}
        <div style={{
          background: `linear-gradient(135deg, ${B.dark} 0%, #2a3142 100%)`,
          borderRadius: 16, padding: "36px 32px", textAlign: "center",
        }}>
          {!emailSent ? (
            <>
              <p style={{ fontFamily: fs, fontStyle: "italic", fontSize: 19, color: "#fff", margin: "0 0 8px" }}>
                Dieses Ergebnis speichern?
              </p>
              <p style={{ fontFamily: f, fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 24px" }}>
                Wir schicken Ihnen einen Link zum Wiederaufrufen und den vollständigen Plan als PDF.
              </p>
              <div style={{ display: "flex", gap: 10, maxWidth: 420, margin: "0 auto 24px" }}>
                <input
                  type="email" placeholder="Ihre E-Mail-Adresse"
                  value={email} onChange={e => setEmail(e.target.value)}
                  style={{
                    flex: 1, fontFamily: f, fontSize: 14, padding: "12px 16px",
                    borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.08)", color: "#fff", outline: "none",
                  }}
                />
                <button onClick={() => email && setEmailSent(true)} style={{
                  fontFamily: f, fontSize: 14, fontWeight: 600, padding: "12px 24px",
                  borderRadius: 10, border: "none", cursor: "pointer",
                  background: B.orange, color: "#fff",
                }}>Senden</button>
              </div>
              <p style={{ fontFamily: f, fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0 }}>
                Kein Newsletter. Nur Ihr Ergebnis.
              </p>
            </>
          ) : (
            <>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(46,158,107,0.2)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 24 }}>✓</span>
              </div>
              <p style={{ fontFamily: f, fontSize: 16, fontWeight: 600, color: "#fff", margin: "0 0 6px" }}>
                Ihr Ergebnis wurde an {email} gesendet.
              </p>
              <p style={{ fontFamily: f, fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                Sie finden den Link und das PDF in Ihrem Posteingang.
              </p>
            </>
          )}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <p style={{ fontFamily: fs, fontStyle: "italic", fontSize: 17, color: B.dark, margin: "0 0 6px" }}>
            Diesen Plan können Sie eigenständig umsetzen.
          </p>
          <p style={{ fontFamily: f, fontSize: 14, color: B.text2, margin: "0 0 20px" }}>
            Wenn Sie möchten, begleiten wir Sie dabei.
          </p>
          <button onClick={() => window.open("https://pronecto.de/#kontakt", "_blank")} style={{
            fontFamily: f, fontSize: 15, fontWeight: 600, padding: "14px 36px",
            borderRadius: 12, border: `2px solid ${B.orange}`, cursor: "pointer",
            background: "transparent", color: B.orange, transition: "all 0.2s",
          }}>
            Kostenloses Erstgespräch vereinbaren
          </button>
          <p style={{ fontFamily: f, fontSize: 12, color: B.text3, margin: "10px 0 0" }}>
            30 Minuten. Unverbindlich. Kein Verkaufsgespräch.
          </p>
        </div>

      </div>
    </div>
  );
}
