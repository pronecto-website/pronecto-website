# Claude Code Setup-Guide für PRONECTO

## 1. Installation (2 Minuten)

### Voraussetzungen
- Anthropic-Account mit **Claude Pro** ($20/Monat) oder **Claude Max** ($100/Monat)
- Claude Pro reicht für den Anfang völlig aus
- Git installiert (für GitHub-Integration)

### Installieren (Native Installer — empfohlen)

**macOS:**
```bash
curl -fsSL https://claude.ai/install.sh | sh
```

**Windows (PowerShell als Admin):**
```powershell
irm https://claude.ai/install.ps1 | iex
```

**Linux:**
```bash
curl -fsSL https://claude.ai/install.sh | sh
```

### Prüfen ob es funktioniert
```bash
claude --version
claude doctor    # Diagnose, zeigt Probleme an
```

### Einloggen
```bash
claude          # Startet Claude Code und öffnet Browser zum Login
```

---

## 2. Projekt aufsetzen

### Bestehendes Repo klonen (falls noch nicht lokal)
```bash
git clone https://github.com/pronecto-website/pronecto-website.git
cd pronecto-website
```

### CLAUDE.md ins Projekt kopieren
Die Datei `CLAUDE.md` in den Root-Ordner des Projekts legen (direkt neben die index.html).

**WICHTIG:** Öffne die CLAUDE.md und füge deinen PRONECTO-Projekt-Prompt
ein — den Text der mit "Du bist der strategische Berater..." anfängt.
Ersetze damit den Platzhalter unter "## Über PRONECTO".

Das ist die wichtigste Datei — Claude Code liest sie automatisch und kennt
dann das gesamte Projekt, alle Entscheidungen und die Architektur.

```bash
# CLAUDE.md in den Projektordner kopieren, dann:
claude
```

Claude Code liest die CLAUDE.md und weiß sofort Bescheid.

### Erster Befehl an Claude Code
```
Lies die CLAUDE.md und erstelle die neue Ordnerstruktur
laut Ziel-Struktur. Die bestehende index.html nicht verändern.
Erstelle: /api, /prozess-check, /admin, /css, /js Ordner,
vercel.json, package.json, und .gitignore.
```

---

## 3. Empfohlene Settings

### Model
Claude Code nutzt standardmäßig **Claude Opus 4.6** — das ist das stärkste
Modell und ideal für komplexe Architektur-Entscheidungen und Code-Generierung.
Lass es auf dem Standard.

### Effort Level
```
/effort high
```
- **high** (empfohlen): Beste Balance aus Qualität und Geschwindigkeit
- **max**: Für besonders komplexe Aufgaben (z.B. komplette Seitenarchitektur)
- **auto**: Claude entscheidet selbst — gut für gemischte Aufgaben

### Nützliche Befehle
```
/init              → Generiert/aktualisiert CLAUDE.md automatisch
/effort high       → Setzt Effort-Level
/bug               → Bug an Anthropic melden
/compact            → Komprimiert den Kontext wenn die Konversation lang wird
claude doctor      → Diagnose bei Problemen
```

---

## 4. Workflow-Tipps für effizientes Arbeiten

### Prinzip: Eine Aufgabe pro Nachricht
Nicht: "Bau den kompletten Fragebogen mit allen Branchen und der API"
Sondern: "Erstelle die Fragebogen-Komponente für die Branche Handwerk mit allen 5 Blöcken"

### Prinzip: Kontext geben
Claude Code liest dein Dateisystem. Verweise auf existierende Dateien:
"Orientiere dich am Design in `components/ui/Button.tsx`"

### Prinzip: Testen lassen
"Starte den Dev-Server und prüfe ob die Seite ohne Fehler lädt"
Claude Code kann `npm run dev` ausführen und Fehler selbst fixen.

### Prinzip: Git nutzen
Nach jedem funktionierenden Feature:
"Committe die Änderungen mit der Message 'feat: Handwerk-Fragebogen implementiert'"
Claude Code kann Git-Befehle direkt ausführen.

### Prinzip: Kompakt bleiben
Bei langen Sessions: `/compact` nutzt, damit der Kontext nicht überläuft.

---

## 5. Empfohlene Reihenfolge der Umsetzung

### Phase 1: Grundgerüst (Tag 1)
1. Ordnerstruktur anlegen (api/, prozess-check/, admin/, css/, js/)
2. vercel.json + package.json + .gitignore erstellen
3. Supabase-Projekt erstellen (supabase.com, kostenlos)
4. Shared CSS-Datei mit PRONECTO-Brand erstellen
5. Testen: `vercel dev` lokal starten

### Phase 2: Fragebogen (Tag 2-3)
1. prozess-check/index.html mit Fragebogen-UI
2. js/prozess-check.js mit aller Logik (Branchen, Fragen, Zwischenfazits)
3. Erst Handwerk komplett, dann weitere Branchen
4. Testen: Fragebogen durchklicken, Antworten als JSON sammeln

### Phase 3: Analyse-Engine (Tag 3-4)
1. api/analyse.js — Serverless Function mit Claude API
2. Score-Berechnung und Muda-Klassifikation
3. Supabase-Anbindung zum Speichern
4. Testen: Fragebogen → API → Ergebnis in Supabase

### Phase 4: Ergebnis-Seite (Tag 4-5)
1. prozess-check/ergebnis/index.html
2. js/ergebnis.js — Token aus URL lesen, Daten von API laden, rendern
3. Score-Dashboard, Muda-Profil, Automatisierungsplan
4. E-Mail-Eingabe (optional)
5. Testen: Kompletter Flow Fragebogen → Analyse → Ergebnis

### Phase 5: Dashboard (Tag 5-6)
1. admin/index.html mit einfachem Passwort-Schutz
2. js/dashboard.js — Leads laden, anzeigen, filtern
3. Detail-Ansicht mit Tabs (Analyse, Plan, Intern)
4. Status-Management + Notizfeld

### Phase 6: E-Mail & Polish (Tag 6-7)
1. api/lead/save-email.js — E-Mail speichern + PDF triggern
2. Resend-Integration für E-Mail an Lead + David
3. Link zum Prozess-Check auf der Landingpage einfügen
4. Finaler Test des gesamten Flows
5. Live deployen (git push → Vercel auto-deploy)

---

## 6. Umgebungsvariablen (.env.local)

```env
# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# E-Mail (Resend)
RESEND_API_KEY=re_...

# Admin
ADMIN_EMAIL=david@pronecto.de
```

**WICHTIG:** .env.local niemals committen! In .gitignore eintragen.
