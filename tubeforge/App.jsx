import { useState, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@300;400;500;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:       #07080c;
  --surface:  #0e1018;
  --elevated: #141720;
  --border:   #1e2230;
  --border2:  #262b3d;
  --gold:     #f5c842;
  --gold2:    #e8a800;
  --red:      #ef4444;
  --green:    #22c55e;
  --blue:     #3b82f6;
  --purple:   #a855f7;
  --cyan:     #06b6d4;
  --text:     #e8eaf0;
  --text2:    #8b92a8;
  --text3:    #50566b;
  --r:        10px;
  --r-sm:     6px;
}

body { background: var(--bg); color: var(--text); font-family: 'Cabinet Grotesk', sans-serif; min-height: 100vh; }

/* scrollbar */
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 4px; }

/* LAYOUT */
.layout { display: flex; min-height: 100vh; }

/* SIDEBAR */
.sidebar {
  width: 220px;
  flex-shrink: 0;
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0; left: 0; bottom: 0;
  z-index: 50;
}

.sidebar-logo {
  padding: 22px 20px 18px;
  border-bottom: 1px solid var(--border);
}

.logo-mark {
  font-family: 'Clash Display', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
}

.logo-mark span { color: var(--gold); }
.logo-sub { font-size: 10px; color: var(--text3); letter-spacing: 0.12em; text-transform: uppercase; margin-top: 3px; font-family: 'JetBrains Mono', monospace; }

.sidebar-nav { flex: 1; padding: 12px 10px; overflow-y: auto; }

.nav-section-label {
  font-size: 9px;
  font-weight: 700;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 14px 10px 6px;
  font-family: 'JetBrains Mono', monospace;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: var(--r-sm);
  cursor: pointer;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--text2);
  transition: all 0.15s;
  border: 1px solid transparent;
  margin-bottom: 2px;
}

.nav-item:hover { background: var(--elevated); color: var(--text); }
.nav-item.active { background: rgba(245,200,66,0.1); color: var(--gold); border-color: rgba(245,200,66,0.2); }
.nav-item .nav-icon { font-size: 15px; width: 18px; text-align: center; flex-shrink: 0; }
.nav-badge { margin-left: auto; background: var(--red); color: #fff; font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 10px; font-family: 'JetBrains Mono', monospace; }

.sidebar-footer {
  padding: 14px 16px;
  border-top: 1px solid var(--border);
  font-size: 11px;
  color: var(--text3);
}

.api-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
}

.api-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: blink 2s ease infinite; }

/* MAIN */
.main { margin-left: 220px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; }

.topbar {
  height: 56px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  background: rgba(7,8,12,0.8);
  backdrop-filter: blur(16px);
  position: sticky;
  top: 0;
  z-index: 40;
}

.topbar-title { font-family: 'Clash Display', sans-serif; font-size: 1.1rem; font-weight: 600; letter-spacing: -0.01em; }
.topbar-right { display: flex; align-items: center; gap: 10px; }

.content { padding: 28px; flex: 1; }

/* CARDS */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 20px;
  margin-bottom: 14px;
}

.card-sm {
  background: var(--elevated);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 16px;
}

.card-title {
  font-size: 11px;
  font-weight: 700;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 14px;
  font-family: 'JetBrains Mono', monospace;
}

/* STATS GRID */
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }

.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 18px 20px;
  transition: border-color 0.2s;
}

.stat-card:hover { border-color: var(--border2); }
.stat-label { font-size: 11px; color: var(--text3); margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.05em; }
.stat-value { font-family: 'Clash Display', sans-serif; font-size: 1.9rem; font-weight: 600; letter-spacing: -0.02em; line-height: 1; }
.stat-change { font-size: 11px; margin-top: 6px; }
.stat-change.up { color: var(--green); }
.stat-change.down { color: var(--red); }

/* PIPELINE */
.pipeline-steps {
  display: flex;
  gap: 0;
  margin-bottom: 28px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 6px;
  overflow-x: auto;
}

.pip-step {
  flex: 1;
  min-width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 10px 8px;
  border-radius: var(--r-sm);
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
  position: relative;
}

.pip-step::after {
  content: '›';
  position: absolute;
  right: -4px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--border2);
  font-size: 16px;
  z-index: 1;
}

.pip-step:last-child::after { display: none; }

.pip-step.active { background: rgba(245,200,66,0.08); border-color: rgba(245,200,66,0.25); }
.pip-step.done { background: rgba(34,197,94,0.06); border-color: rgba(34,197,94,0.2); }
.pip-step.locked { opacity: 0.35; cursor: not-allowed; }

.pip-icon { font-size: 18px; }
.pip-label { font-size: 10px; font-weight: 600; color: var(--text2); text-align: center; font-family: 'JetBrains Mono', monospace; }
.pip-step.active .pip-label { color: var(--gold); }
.pip-step.done .pip-label { color: var(--green); }

/* BUTTONS */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 18px;
  border-radius: var(--r-sm);
  font-family: 'Cabinet Grotesk', sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid transparent;
  white-space: nowrap;
}

.btn-gold { background: var(--gold); color: #0a0800; }
.btn-gold:hover:not(:disabled) { background: #fdd84e; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(245,200,66,0.3); }

.btn-ghost { background: transparent; color: var(--text2); border-color: var(--border2); }
.btn-ghost:hover:not(:disabled) { color: var(--text); border-color: var(--text3); background: var(--elevated); }

.btn-danger { background: rgba(239,68,68,0.12); color: var(--red); border-color: rgba(239,68,68,0.25); }
.btn-danger:hover { background: rgba(239,68,68,0.2); }

.btn-green { background: rgba(34,197,94,0.12); color: var(--green); border-color: rgba(34,197,94,0.25); }
.btn-green:hover { background: rgba(34,197,94,0.2); }

.btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none !important; box-shadow: none !important; }

.btn-sm { padding: 6px 12px; font-size: 12px; }
.btn-xs { padding: 4px 9px; font-size: 11px; }

/* INPUTS */
textarea, input[type="text"], input[type="number"], select {
  width: 100%;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  color: var(--text);
  font-family: 'Cabinet Grotesk', sans-serif;
  font-size: 14px;
  padding: 10px 14px;
  outline: none;
  transition: border-color 0.2s;
}

textarea { resize: vertical; line-height: 1.6; }
textarea:focus, input:focus, select:focus { border-color: rgba(245,200,66,0.5); }
::placeholder { color: var(--text3); }
select option { background: var(--surface); }

label { font-size: 12px; font-weight: 600; color: var(--text2); display: block; margin-bottom: 6px; letter-spacing: 0.03em; }

.field { margin-bottom: 14px; }

/* TAGS */
.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 9px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
}
.tag-gold { background: rgba(245,200,66,0.12); color: var(--gold); border: 1px solid rgba(245,200,66,0.2); }
.tag-green { background: rgba(34,197,94,0.1); color: var(--green); border: 1px solid rgba(34,197,94,0.2); }
.tag-red { background: rgba(239,68,68,0.1); color: var(--red); border: 1px solid rgba(239,68,68,0.2); }
.tag-blue { background: rgba(59,130,246,0.1); color: var(--blue); border: 1px solid rgba(59,130,246,0.2); }
.tag-purple { background: rgba(168,85,247,0.1); color: var(--purple); border: 1px solid rgba(168,85,247,0.2); }
.tag-cyan { background: rgba(6,182,212,0.1); color: var(--cyan); border: 1px solid rgba(6,182,212,0.2); }

/* GRID LAYOUTS */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
.row { display: flex; gap: 10px; align-items: flex-start; flex-wrap: wrap; }
.row.center { align-items: center; }
.row.end { justify-content: flex-end; }
.row.between { justify-content: space-between; align-items: center; }

/* OUTPUT BOXES */
.output-box {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  padding: 16px;
  font-size: 13.5px;
  line-height: 1.75;
  white-space: pre-wrap;
  color: var(--text);
  max-height: 380px;
  overflow-y: auto;
}

.mono-box {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  padding: 14px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11.5px;
  line-height: 1.7;
  color: var(--gold);
  white-space: pre-wrap;
  max-height: 240px;
  overflow-y: auto;
}

/* TITLE OPTIONS */
.title-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  padding: 13px 16px;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}
.title-card:hover { border-color: rgba(245,200,66,0.3); }
.title-card.selected { border-color: var(--gold); background: rgba(245,200,66,0.05); }
.title-radio { width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--border2); flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
.title-card.selected .title-radio { border-color: var(--gold); background: var(--gold); }
.title-radio-dot { width: 6px; height: 6px; border-radius: 50%; background: #0a0800; opacity: 0; transition: opacity 0.15s; }
.title-card.selected .title-radio-dot { opacity: 1; }
.title-text { font-size: 14px; font-weight: 500; flex: 1; }
.title-score { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--text3); flex-shrink: 0; }

/* SCENE CARDS */
.scene-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
.scene-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  overflow: hidden;
  animation: fadeUp 0.3s ease both;
}
.scene-head { background: var(--border); padding: 7px 11px; display: flex; justify-content: space-between; align-items: center; }
.scene-num { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--text3); }
.scene-ts { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--gold); }
.scene-body { padding: 11px; }
.scene-prompt { font-size: 12px; color: var(--text); line-height: 1.5; margin-bottom: 7px; }
.scene-narration { font-size: 11px; color: var(--text3); font-style: italic; line-height: 1.4; }

/* NICHE CHIPS */
.chip-grid { display: flex; flex-wrap: wrap; gap: 7px; }
.chip {
  background: var(--elevated);
  border: 1px solid var(--border);
  color: var(--text2);
  border-radius: 20px;
  padding: 5px 13px;
  font-size: 12.5px;
  cursor: pointer;
  transition: all 0.15s;
  font-weight: 500;
}
.chip:hover { border-color: var(--border2); color: var(--text); }
.chip.active { background: rgba(245,200,66,0.1); border-color: rgba(245,200,66,0.4); color: var(--gold); }

/* CALENDAR */
.cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
.cal-header { text-align: center; font-size: 10px; color: var(--text3); font-family: 'JetBrains Mono', monospace; padding: 4px; text-transform: uppercase; letter-spacing: 0.08em; }
.cal-day {
  aspect-ratio: 1;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  border: 1px solid transparent;
  transition: all 0.15s;
  background: var(--bg);
}
.cal-day:hover { border-color: var(--border2); }
.cal-day.today { border-color: var(--gold); color: var(--gold); }
.cal-day.scheduled { background: rgba(59,130,246,0.1); border-color: rgba(59,130,246,0.3); }
.cal-day.published { background: rgba(34,197,94,0.08); border-color: rgba(34,197,94,0.25); }
.cal-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--blue); position: absolute; bottom: 4px; }
.cal-day.published .cal-dot { background: var(--green); }
.cal-day.empty { opacity: 0; pointer-events: none; }

/* REVENUE CALC */
.rpm-bar-wrap { background: var(--bg); border-radius: 4px; height: 8px; overflow: hidden; margin-top: 4px; }
.rpm-bar-fill { height: 100%; border-radius: 4px; transition: width 0.5s ease; }

/* PROJECTS LIST */
.project-item {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  padding: 14px 16px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  transition: all 0.15s;
}
.project-item:hover { border-color: var(--border2); background: var(--elevated); }
.project-dot { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
.project-info { flex: 1; min-width: 0; }
.project-title { font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 3px; }
.project-meta { font-size: 11px; color: var(--text3); font-family: 'JetBrains Mono', monospace; }

/* LOADING */
.loader-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 60px; }
.spinner { width: 32px; height: 32px; border: 2.5px solid var(--border2); border-top-color: var(--gold); border-radius: 50%; animation: spin 0.7s linear infinite; }
.loader-text { font-size: 13px; color: var(--text2); font-family: 'JetBrains Mono', monospace; animation: blink 1.5s ease infinite; }
.loader-sub { font-size: 11px; color: var(--text3); text-align: center; max-width: 260px; line-height: 1.5; }

/* DIVIDER */
.divider { height: 1px; background: var(--border); margin: 20px 0; }

/* THUMBNAIL PREVIEW */
.tnail-preview {
  aspect-ratio: 16/9;
  border-radius: var(--r-sm);
  background: linear-gradient(135deg, #1a1a2e 0%, #0f172a 50%, #1a1a2e 100%);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 14px;
}
.tnail-preview::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 30% 50%, rgba(245,200,66,0.08) 0%, transparent 60%);
}
.tnail-headline { font-family: 'Clash Display', sans-serif; font-size: clamp(1.2rem, 3vw, 2.2rem); font-weight: 700; color: var(--gold); text-shadow: 0 0 30px rgba(245,200,66,0.5), 0 2px 4px rgba(0,0,0,0.8); text-align: center; padding: 20px; letter-spacing: 0.02em; line-height: 1.2; z-index: 1; }

/* TABS */
.tabs { display: flex; gap: 4px; margin-bottom: 20px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--r); padding: 5px; }
.tab { flex: 1; padding: 8px 12px; border-radius: var(--r-sm); border: none; background: transparent; color: var(--text2); font-family: 'Cabinet Grotesk', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s; text-align: center; }
.tab.active { background: var(--elevated); color: var(--text); border: 1px solid var(--border2); }

/* PROGRESS BAR */
.progress { height: 3px; background: var(--border); border-radius: 3px; overflow: hidden; margin-bottom: 24px; }
.progress-fill { height: 100%; background: linear-gradient(90deg, var(--gold), #e8a800); border-radius: 3px; transition: width 0.4s ease; }

/* SEO TAGS */
.seo-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.seo-tag {
  background: var(--elevated);
  border: 1px solid var(--border);
  color: var(--text2);
  border-radius: 5px;
  padding: 4px 10px;
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  display: flex; align-items: center; gap: 6px;
  cursor: pointer;
  transition: all 0.15s;
}
.seo-tag:hover { border-color: var(--border2); color: var(--text); }
.seo-tag-copy { font-size: 9px; color: var(--text3); }

/* MONETIZATION */
.money-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border); }
.money-row:last-child { border-bottom: none; }
.money-label { font-size: 13px; font-weight: 500; }
.money-val { font-family: 'Clash Display', sans-serif; font-size: 1.2rem; color: var(--gold); }

/* SHORTS FORMAT */
.format-toggle { display: flex; gap: 8px; margin-bottom: 16px; }
.format-btn {
  flex: 1;
  padding: 10px;
  border-radius: var(--r-sm);
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text2);
  cursor: pointer;
  font-family: 'Cabinet Grotesk', sans-serif;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.15s;
  text-align: center;
}
.format-btn.active { border-color: var(--gold); background: rgba(245,200,66,0.08); color: var(--gold); }

/* ANIMATIONS */
@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
@keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }

.fade-in { animation: fadeUp 0.35s ease both; }

/* COPY FEEDBACK */
.copied-flash { color: var(--green) !important; }

/* SECTION TITLE */
.section-title { font-family: 'Clash Display', sans-serif; font-size: 1.5rem; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 4px; }
.section-sub { color: var(--text2); font-size: 13.5px; margin-bottom: 24px; line-height: 1.5; }

/* INSIGHT BOX */
.insight {
  background: rgba(59,130,246,0.06);
  border: 1px solid rgba(59,130,246,0.2);
  border-radius: var(--r-sm);
  padding: 12px 14px;
  font-size: 12.5px;
  color: #93c5fd;
  line-height: 1.6;
  margin-top: 12px;
}
.insight.gold { background: rgba(245,200,66,0.06); border-color: rgba(245,200,66,0.2); color: #fde68a; }
.insight.green { background: rgba(34,197,94,0.06); border-color: rgba(34,197,94,0.2); color: #86efac; }

/* CHECKLIST */
.checklist-item { display: flex; align-items: flex-start; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--border); }
.checklist-item:last-child { border-bottom: none; }
.check-circle { width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--border2); flex-shrink: 0; margin-top: 1px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 10px; transition: all 0.15s; }
.check-circle.checked { background: var(--green); border-color: var(--green); color: #fff; }
.check-text { font-size: 13px; line-height: 1.5; flex: 1; }
.check-text.done { color: var(--text3); text-decoration: line-through; }

/* EMPTY STATE */
.empty { text-align: center; padding: 48px 20px; color: var(--text3); }
.empty-icon { font-size: 2.5rem; margin-bottom: 12px; opacity: 0.5; }
.empty-text { font-size: 14px; }

/* API KEY SETUP */
.setup-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  padding: 20px;
}
.setup-card {
  width: 100%;
  max-width: 460px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 40px 36px;
}
.setup-logo { font-family: 'Clash Display', sans-serif; font-size: 2rem; font-weight: 700; letter-spacing: -0.03em; margin-bottom: 4px; }
.setup-logo span { color: var(--gold); }
.setup-sub { font-size: 13px; color: var(--text3); margin-bottom: 32px; line-height: 1.5; }
.setup-key-input { position: relative; }
.setup-key-input input { font-family: 'JetBrains Mono', monospace; font-size: 13px; padding-right: 44px; letter-spacing: 0.02em; }
.setup-key-toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text3); cursor: pointer; font-size: 16px; padding: 4px; }
.setup-key-toggle:hover { color: var(--text2); }
.setup-error { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.25); border-radius: var(--r-sm); padding: 10px 13px; font-size: 12.5px; color: var(--red); margin-top: 10px; }
.setup-note { font-size: 11px; color: var(--text3); margin-top: 8px; line-height: 1.5; }
.setup-note a { color: var(--gold); text-decoration: none; }
.setup-note a:hover { text-decoration: underline; }
.api-key-badge { display: flex; align-items: center; gap: 6px; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--text3); cursor: pointer; padding: 6px 10px; border-radius: var(--r-sm); border: 1px solid var(--border); background: var(--elevated); transition: all 0.15s; }
.api-key-badge:hover { border-color: var(--border2); color: var(--text2); }

/* RESPONSIVE */
@media (max-width: 900px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .grid-2, .grid-3 { grid-template-columns: 1fr; }
}
`;

// ═══════════════════════════════════════════════════════════════════
// CLAUDE API
// ═══════════════════════════════════════════════════════════════════
async function ai(apiKey, prompt, system = "You are an expert YouTube content strategist optimizing for monetization and virality. Be precise and return only what is asked.") {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      system,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const d = await res.json();
  if (d.error) throw new Error(d.error.message);
  return d.content[0].text;
}

async function aiJSON(apiKey, prompt, system) {
  const raw = await ai(apiKey, prompt, system || "Return only valid JSON, no markdown, no explanation.");
  return JSON.parse(raw.replace(/```json|```/g, "").trim());
}

// ═══════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════
const NICHES = [
  { name: "True Crime", rpm: 8.5, color: "#ef4444" },
  { name: "Finance & Money", rpm: 18.2, color: "#22c55e" },
  { name: "Ancient History", rpm: 12.4, color: "#f59e0b" },
  { name: "Tech Reviews", rpm: 9.8, color: "#3b82f6" },
  { name: "Health & Fitness", rpm: 11.3, color: "#06b6d4" },
  { name: "Business Stories", rpm: 15.6, color: "#a855f7" },
  { name: "Geopolitics", rpm: 10.7, color: "#f97316" },
  { name: "Science Explained", rpm: 8.9, color: "#06b6d4" },
  { name: "Mystery & Unexplained", rpm: 7.2, color: "#6366f1" },
  { name: "Self Improvement", rpm: 13.1, color: "#10b981" },
  { name: "Conspiracy", rpm: 6.8, color: "#8b5cf6" },
  { name: "Celebrity Stories", rpm: 5.4, color: "#ec4899" },
];

const PIPELINE_STEPS = [
  { id: "topic", icon: "💡", label: "Topic" },
  { id: "titles", icon: "🎯", label: "Titles" },
  { id: "script", icon: "📝", label: "Script" },
  { id: "shorts", icon: "📱", label: "Shorts" },
  { id: "scenes", icon: "🎬", label: "Scenes" },
  { id: "seo", icon: "🔍", label: "SEO" },
  { id: "thumbnail", icon: "🖼️", label: "Thumb" },
  { id: "monetize", icon: "💰", label: "Revenue" },
];

const NAV = [
  { id: "dashboard", icon: "📊", label: "Dashboard" },
  { id: "pipeline", icon: "⚡", label: "Create Video", section: "CREATE" },
  { id: "projects", icon: "📁", label: "My Projects" },
  { id: "calendar", icon: "📅", label: "Upload Schedule" },
  { id: "calculator", icon: "🧮", label: "Revenue Calculator", section: "TOOLS" },
  { id: "niches", icon: "🔥", label: "Niche Research" },
  { id: "checklist", icon: "✅", label: "Launch Checklist" },
];

const CHECKLIST_ITEMS = [
  { id: 1, text: "Enable monetization on YouTube Studio", category: "Setup" },
  { id: 2, text: "Link Google AdSense account", category: "Setup" },
  { id: 3, text: "Reach 1,000 subscribers", category: "Milestone" },
  { id: 4, text: "Reach 4,000 watch hours (or 10M Shorts views)", category: "Milestone" },
  { id: 5, text: "Set up channel brand kit (logo, banner, colors)", category: "Brand" },
  { id: 6, text: "Write a keyword-rich channel description", category: "SEO" },
  { id: 7, text: "Create channel trailer (60–90 sec hook)", category: "Content" },
  { id: 8, text: "Post at least 3 videos before going 'public'", category: "Content" },
  { id: 9, text: "Add end screens & cards to all videos", category: "Retention" },
  { id: 10, text: "Pin a comment with a CTA on every video", category: "Retention" },
  { id: 11, text: "Set up channel memberships (once eligible)", category: "Revenue" },
  { id: 12, text: "Join an affiliate program in your niche", category: "Revenue" },
  { id: 13, text: "Create a digital product or Gumroad page", category: "Revenue" },
  { id: 14, text: "Publish Shorts versions of every long video", category: "Growth" },
  { id: 15, text: "Post consistently (2–3x/week minimum)", category: "Growth" },
];

function genId() { return Math.random().toString(36).slice(2, 9); }
function fmtMoney(n) { return n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n.toFixed(0)}`; }

// ═══════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════
export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [keyError, setKeyError] = useState("");
  const [keyLoading, setKeyLoading] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [pip, setPip] = useState(0); // pipeline step index

  // Pipeline data
  const [topic, setTopic] = useState("");
  const [niche, setNiche] = useState("");
  const [format, setFormat] = useState("long"); // long | short
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [script, setScript] = useState("");
  const [shortsScript, setShortsScript] = useState("");
  const [scenes, setScenes] = useState([]);
  const [seo, setSeo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [monetization, setMonetization] = useState(null);

  // UI state
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [copied, setCopied] = useState("");
  const [projects, setProjects] = useState([]);
  const [checks, setChecks] = useState({});

  // Revenue calc
  const [calcViews, setCalcViews] = useState(10000);
  const [calcNiche, setCalcNiche] = useState("Finance & Money");

  // Calendar
  const [scheduled, setScheduled] = useState({ 5: true, 12: true, 19: true, 26: true });

  // Load projects from storage
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("yt_projects");
        if (r) setProjects(JSON.parse(r.value));
        const c = await window.storage.get("yt_checks");
        if (c) setChecks(JSON.parse(c.value));
      } catch {}
    })();
  }, []);

  function saveProjects(p) {
    setProjects(p);
    window.storage.set("yt_projects", JSON.stringify(p)).catch(() => {});
  }

  function saveChecks(c) {
    setChecks(c);
    window.storage.set("yt_checks", JSON.stringify(c)).catch(() => {});
  }

  async function handleSetKey() {
    const k = apiKeyInput.trim();
    if (!k.startsWith("sk-ant-")) { setKeyError("Key must start with sk-ant-"); return; }
    setKeyLoading(true); setKeyError("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": k, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 10, messages: [{ role: "user", content: "hi" }] }),
      });
      const d = await res.json();
      if (d.error) { setKeyError(d.error.message); } else { setApiKey(k); }
    } catch(e) { setKeyError("Connection failed. Check your network."); }
    setKeyLoading(false);
  }

  function copy(text, key) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  }

  function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function load(msg, fn) {
    setLoading(true);
    setLoadingMsg(msg);
    fn().finally(() => setLoading(false));
  }

  // ── PIPELINE ACTIONS ──────────────────────────────────────────
  async function doTitles() {
    const data = await aiJSON(
      apiKey,
      `Generate 5 viral YouTube ${format === "short" ? "Shorts" : "long-form"} video titles for: "${topic}"${niche ? ` (niche: ${niche})` : ""}.
Return JSON array of objects: [{"title":"...","hook":"why it clicks in 1 sentence","score":8}]
Score 1-10 for click potential. No markdown.`
    );
    setTitles(data);
    setPip(1);
  }

  async function doScript() {
    const out = await ai(
      apiKey,
      format === "long"
        ? `Write a compelling YouTube long-form video script (~500-700 words) for: "${selectedTitle}"

Use these markers: [HOOK] [INTRO] [SECTION_1] [SECTION_2] [SECTION_3] [PATTERN_INTERRUPT] [CTA]

Rules:
- Hook must grab in first 10 seconds — start mid-story or with a shocking fact
- Every 90 seconds, add a pattern interrupt (change pace/topic/energy)
- Use short punchy sentences for voiceover
- End CTA: subscribe + next video tease
- Write for AI narration (no stage directions)`
        : `Write a 45-second YouTube Shorts script for: "${selectedTitle}"

Format:
[HOOK - 0:00-0:05] — instant grab, no intro
[BODY - 0:05-0:35] — rapid fire value or story
[CTA - 0:35-0:45] — follow for more

Rules:
- No fluff, every second counts
- Each sentence is a new thought
- End on a cliffhanger or surprise fact`
    );
    setScript(out);
    setPip(2);
  }

  async function doShorts() {
    const out = await ai(
      apiKey,
      `Convert this long-form YouTube script into a 45-second Shorts script:

ORIGINAL:
${script}

Rules:
- Extract the single most shocking/interesting moment
- [HOOK 0:00-0:05]: Drop into the action immediately
- [BODY 0:05-0:38]: 5-7 rapid punchy facts/moments
- [CTA 0:38-0:45]: "Follow for more [topic]"
- Max 120 words total
- Every sentence = new visual`
    );
    setShortsScript(out);
    setPip(3);
  }

  async function doScenes() {
    const scriptToUse = script || shortsScript;
    const data = await aiJSON(
      apiKey,
      `Generate ${format === "long" ? 8 : 5} visual scene prompts for AI image generation based on:

TITLE: ${selectedTitle}
SCRIPT EXCERPT: ${scriptToUse.slice(0, 600)}

Return JSON array:
[{"scene":1,"timestamp":"0:00-0:15","style":"cinematic/anime/documentary","prompt":"ultra-detailed AI image prompt, lighting, composition, mood","narration":"exact quote from script"}]
No markdown.`
    );
    setScenes(data);
    setPip(4);
  }

  async function doSEO() {
    const data = await aiJSON(
      apiKey,
      `Generate YouTube SEO data for: "${selectedTitle}"${niche ? ` in ${niche} niche` : ""}

Return JSON:
{
  "description": "300-word SEO description with timestamps, keywords, CTA",
  "tags": ["array","of","15","optimized","tags"],
  "chapters": [{"time":"0:00","title":"Chapter Name"}],
  "primaryKeyword": "main search keyword",
  "searchVolume": "estimated monthly searches",
  "competition": "low|medium|high",
  "seoScore": 8,
  "tips": ["3 specific tips to rank higher"]
}
No markdown.`
    );
    setSeo(data);
    setPip(5);
  }

  async function doThumbnail() {
    const data = await aiJSON(
      apiKey,
      `Design a high-CTR YouTube thumbnail for: "${selectedTitle}"

Return JSON:
{
  "headline": "2-4 bold words for text overlay",
  "subtext": "secondary text or empty string",
  "imagePrompt": "ultra-detailed AI image generation prompt",
  "colorPalette": "dominant colors description",
  "faceEmotion": "shocked|curious|smiling|serious|etc",
  "textPosition": "left|right|center|bottom",
  "clickbaitScore": 8,
  "psychologyHook": "what psychological trigger this uses",
  "reasoning": "why this thumbnail will get clicks"
}
No markdown.`
    );
    setThumbnail(data);
    setPip(6);
  }

  async function doMonetize() {
    const nicheData = NICHES.find(n => n.name === niche) || { rpm: 8 };
    const data = await aiJSON(
      apiKey,
      `Create a monetization strategy for a YouTube video about: "${selectedTitle}"
Niche: ${niche || "general"}, Estimated RPM: $${nicheData.rpm}

Return JSON:
{
  "adRevenue": {"10k": 85, "50k": 425, "100k": 850},
  "affiliateIdeas": [{"product":"...","commission":"...","fit":"why it fits"}],
  "sponsorshipRate": {"integrated": 500, "dedicated": 2000},
  "digitalProduct": {"idea": "...", "price": 29, "conversionRate": "2%"},
  "ctaPlacement": "where to put affiliate link in description",
  "titleOptimization": "one tweak to increase RPM",
  "bestUploadTime": "day and time for this niche",
  "estimatedMonthlyIncome": {"conservative": 200, "realistic": 800, "optimistic": 2500}
}
No markdown.`
    );
    setMonetization(data);
    setPip(7);
    // Auto-save project
    const project = {
      id: genId(),
      title: selectedTitle,
      niche: niche || "General",
      format,
      createdAt: new Date().toISOString(),
      script,
      scenes,
      seo,
      thumbnail,
      monetization: data,
    };
    saveProjects([project, ...projects.slice(0, 19)]);
  }

  // ═══════════════════════════════════════════════════════════════
  // PAGE RENDERS
  // ═══════════════════════════════════════════════════════════════

  function PageDashboard() {
    const totalSaved = projects.length;
    const checksDone = Object.values(checks).filter(Boolean).length;
    const selectedNicheData = NICHES.find(n => n.name === calcNiche) || NICHES[1];
    const estimatedMonthly = (calcViews / 1000) * selectedNicheData.rpm;

    return (
      <div className="fade-in">
        <div className="section-title">Welcome Back 👋</div>
        <div className="section-sub">Your YouTube income dashboard. Track progress, build content, grow revenue.</div>

        <div className="stats-grid">
          {[
            { label: "Projects Saved", value: totalSaved, change: "↑ ready to upload", dir: "up" },
            { label: "Checklist Progress", value: `${checksDone}/${CHECKLIST_ITEMS.length}`, change: checksDone >= CHECKLIST_ITEMS.length ? "✓ All done!" : `${CHECKLIST_ITEMS.length - checksDone} remaining`, dir: checksDone >= CHECKLIST_ITEMS.length ? "up" : "down" },
            { label: "Potential RPM", value: `$${selectedNicheData.rpm}`, change: `${calcNiche || "Finance"} niche`, dir: "up" },
            { label: "Est. Monthly (10K views)", value: fmtMoney(estimatedMonthly), change: "Ad revenue only", dir: "up" },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-label">{s.label}</div>
              <div className="stat-value" style={{ color: "var(--gold)" }}>{s.value}</div>
              <div className={`stat-change ${s.dir}`}>{s.change}</div>
            </div>
          ))}
        </div>

        <div className="grid-2">
          <div className="card">
            <div className="card-title">Top Earning Niches</div>
            {NICHES.slice(0, 6).sort((a, b) => b.rpm - a.rpm).map(n => (
              <div key={n.name} style={{ marginBottom: 12 }}>
                <div className="row between" style={{ marginBottom: 5 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{n.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: n.color }}>${n.rpm} RPM</span>
                </div>
                <div className="rpm-bar-wrap">
                  <div className="rpm-bar-fill" style={{ width: `${(n.rpm / 20) * 100}%`, background: n.color }} />
                </div>
              </div>
            ))}
            <button className="btn btn-ghost btn-sm" style={{ marginTop: 8, width: "100%" }} onClick={() => setPage("niches")}>View All Niches →</button>
          </div>

          <div className="card">
            <div className="card-title">Recent Projects</div>
            {projects.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">📁</div>
                <div className="empty-text">No projects yet.<br />Create your first video!</div>
              </div>
            ) : projects.slice(0, 4).map(p => (
              <div key={p.id} className="project-item" style={{ marginBottom: 6 }}>
                <div className="project-dot" style={{ background: "var(--elevated)" }}>🎬</div>
                <div className="project-info">
                  <div className="project-title">{p.title}</div>
                  <div className="project-meta">{p.niche} · {p.format} · {new Date(p.createdAt).toLocaleDateString()}</div>
                </div>
                <span className="tag tag-green" style={{ fontSize: 10 }}>✓ Done</span>
              </div>
            ))}
            {projects.length > 0 && (
              <button className="btn btn-ghost btn-sm" style={{ marginTop: 8, width: "100%" }} onClick={() => setPage("projects")}>View All Projects →</button>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Quick Start</div>
          <div className="grid-3">
            {[
              { icon: "⚡", title: "Create New Video", sub: "Full AI pipeline", action: () => { setPage("pipeline"); setPip(0); } },
              { icon: "🧮", title: "Revenue Calculator", sub: "Estimate your earnings", action: () => setPage("calculator") },
              { icon: "✅", title: "Monetization Checklist", sub: `${CHECKLIST_ITEMS.length - checksDone} items left`, action: () => setPage("checklist") },
            ].map(q => (
              <div key={q.title} className="card-sm" style={{ cursor: "pointer", transition: "border-color 0.15s" }}
                onClick={q.action}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border2)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{q.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{q.title}</div>
                <div style={{ fontSize: 12, color: "var(--text3)" }}>{q.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function PagePipeline() {
    const pct = (pip / (PIPELINE_STEPS.length - 1)) * 100;

    return (
      <div className="fade-in">
        <div className="section-title">Video Pipeline</div>
        <div className="section-sub">AI-powered creation from idea to upload-ready package.</div>

        {/* PIPELINE STEPS */}
        <div className="pipeline-steps">
          {PIPELINE_STEPS.map((s, i) => (
            <div key={s.id} className={`pip-step ${pip === i ? "active" : ""} ${pip > i ? "done" : ""} ${pip < i ? "locked" : ""}`}
              onClick={() => pip > i && setPip(i)}>
              <div className="pip-icon">{pip > i ? "✅" : s.icon}</div>
              <div className="pip-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="progress"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>

        {loading ? (
          <div className="loader-wrap">
            <div className="spinner" />
            <div className="loader-text">{loadingMsg}</div>
            <div className="loader-sub">Claude is analyzing trends and optimizing for maximum revenue...</div>
          </div>
        ) : (
          <>
            {pip === 0 && <StepTopic />}
            {pip === 1 && <StepTitles />}
            {pip === 2 && <StepScript />}
            {pip === 3 && <StepShorts />}
            {pip === 4 && <StepScenes />}
            {pip === 5 && <StepSEO />}
            {pip === 6 && <StepThumbnail />}
            {pip === 7 && <StepMonetize />}
          </>
        )}
      </div>
    );
  }

  function StepTopic() {
    return (
      <div className="fade-in">
        <div className="card">
          <div className="card-title">Video Format</div>
          <div className="format-toggle">
            <button className={`format-btn ${format === "long" ? "active" : ""}`} onClick={() => setFormat("long")}>
              📺 Long-Form (8–20 min)
            </button>
            <button className={`format-btn ${format === "short" ? "active" : ""}`} onClick={() => setFormat("short")}>
              📱 Shorts (under 60 sec)
            </button>
          </div>
          <div className="insight gold">
            {format === "long"
              ? "Long-form earns 10-20x more per view via AdSense. Best for evergreen topics, stories, explainers."
              : "Shorts grows subscribers 5x faster. Best for hooks, quick facts, cliffhangers. Monetizes via Shorts Fund."}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Choose Your Niche</div>
          <div className="chip-grid">
            {NICHES.map(n => (
              <button key={n.name} className={`chip ${niche === n.name ? "active" : ""}`} onClick={() => setNiche(niche === n.name ? "" : n.name)}>
                {n.name}
                <span style={{ marginLeft: 5, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: niche === n.name ? "var(--gold2)" : "var(--text3)" }}>
                  ${n.rpm}
                </span>
              </button>
            ))}
          </div>
          {niche && (
            <div className="insight green" style={{ marginTop: 12 }}>
              ✓ {niche} has an estimated RPM of ${NICHES.find(n => n.name === niche)?.rpm}/1000 views — one of the {NICHES.find(n => n.name === niche)?.rpm > 12 ? "highest" : "solid"} earning niches.
            </div>
          )}
        </div>

        <div className="card">
          <div className="field">
            <label>Your Topic or Idea</label>
            <textarea rows={3} placeholder='e.g. "How a college dropout made $10M flipping storage units" or "The CIA program that actually worked"'
              value={topic} onChange={e => setTopic(e.target.value)} />
          </div>
          <div className="row end">
            <button className="btn btn-gold" disabled={!topic.trim()}
              onClick={() => load("Generating viral titles...", doTitles)}>
              Generate Titles →
            </button>
          </div>
        </div>
      </div>
    );
  }

  function StepTitles() {
    return (
      <div className="fade-in">
        <div className="card">
          <div className="row between" style={{ marginBottom: 16 }}>
            <div className="card-title" style={{ margin: 0 }}>AI-Generated Titles</div>
            <button className="btn btn-ghost btn-sm" onClick={() => load("Regenerating titles...", doTitles)}>Regenerate</button>
          </div>
          {titles.map((t, i) => (
            <div key={i} className={`title-card ${selectedTitle === t.title ? "selected" : ""}`} onClick={() => setSelectedTitle(t.title)}>
              <div className="title-radio"><div className="title-radio-dot" /></div>
              <div className="title-text">{t.title}</div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                <span className="tag tag-gold">{t.score}/10</span>
                <span style={{ fontSize: 10, color: "var(--text3)", maxWidth: 140, textAlign: "right", lineHeight: 1.3 }}>{t.hook}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="row between">
          <button className="btn btn-ghost" onClick={() => setPip(0)}>← Back</button>
          <button className="btn btn-gold" disabled={!selectedTitle} onClick={() => load("Writing your script...", doScript)}>
            Write Script →
          </button>
        </div>
      </div>
    );
  }

  function StepScript() {
    return (
      <div className="fade-in">
        <div className="card">
          <div className="row between" style={{ marginBottom: 12 }}>
            <div>
              <div className="card-title" style={{ margin: 0 }}>Script</div>
              <div style={{ fontSize: 12, color: "var(--gold)", marginTop: 4, fontWeight: 600 }}>{selectedTitle}</div>
            </div>
            <div className="row" style={{ gap: 8 }}>
              <button className="btn btn-ghost btn-sm" onClick={() => load("Rewriting script...", doScript)}>Rewrite</button>
              <button className={`btn btn-ghost btn-sm ${copied === "script" ? "copied-flash" : ""}`}
                onClick={() => copy(script, "script")}>{copied === "script" ? "✓ Copied" : "Copy"}</button>
            </div>
          </div>
          <div className="output-box">{script}</div>
          <div className="insight" style={{ marginTop: 12 }}>
            💡 Word count: ~{script.split(" ").length} words · Est. duration: ~{Math.round(script.split(" ").length / 130)} min
          </div>
        </div>
        <div className="row between">
          <button className="btn btn-ghost" onClick={() => setPip(1)}>← Back</button>
          <button className="btn btn-gold" onClick={() => load("Adapting for Shorts...", doShorts)}>
            Create Shorts Version →
          </button>
        </div>
      </div>
    );
  }

  function StepShorts() {
    return (
      <div className="fade-in">
        <div className="grid-2" style={{ alignItems: "start" }}>
          <div className="card">
            <div className="row between" style={{ marginBottom: 12 }}>
              <div className="card-title" style={{ margin: 0 }}>Long-Form Script</div>
              <span className="tag tag-blue">📺 Long</span>
            </div>
            <div className="output-box" style={{ maxHeight: 280, fontSize: 12.5 }}>{script}</div>
          </div>
          <div className="card">
            <div className="row between" style={{ marginBottom: 12 }}>
              <div className="card-title" style={{ margin: 0 }}>Shorts Adaptation</div>
              <span className="tag tag-purple">📱 Short</span>
            </div>
            <div className="output-box" style={{ maxHeight: 280, fontSize: 12.5 }}>{shortsScript}</div>
            <div className="row end" style={{ marginTop: 10 }}>
              <button className={`btn btn-ghost btn-sm ${copied === "shorts" ? "copied-flash" : ""}`}
                onClick={() => copy(shortsScript, "shorts")}>{copied === "shorts" ? "✓ Copied" : "Copy Shorts"}</button>
            </div>
          </div>
        </div>
        <div className="insight gold">
          📱 Strategy: Upload the long video first, then post the Shorts version 2–3 days later to drive traffic to the full video.
        </div>
        <div className="row between" style={{ marginTop: 14 }}>
          <button className="btn btn-ghost" onClick={() => setPip(2)}>← Back</button>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn btn-ghost btn-sm" onClick={() => load("Regenerating Shorts...", doShorts)}>Redo Shorts</button>
            <button className="btn btn-gold" onClick={() => load("Generating scene prompts...", doScenes)}>
              Generate Scenes →
            </button>
          </div>
        </div>
      </div>
    );
  }

  function StepScenes() {
    return (
      <div className="fade-in">
        <div className="card">
          <div className="row between" style={{ marginBottom: 16 }}>
            <div className="card-title" style={{ margin: 0 }}>{scenes.length} Scene Prompts</div>
            <div className="row" style={{ gap: 8 }}>
              <button className="btn btn-ghost btn-sm" onClick={() => load("Regenerating scenes...", doScenes)}>Regenerate</button>
              <button className={`btn btn-ghost btn-sm ${copied === "scenes" ? "copied-flash" : ""}`}
                onClick={() => copy(scenes.map(s => `[${s.timestamp}]\nPROMPT: ${s.prompt}\n"${s.narration}"`).join("\n\n"), "scenes")}>
                {copied === "scenes" ? "✓ Copied" : "Copy All"}
              </button>
            </div>
          </div>
          <div className="scene-grid">
            {scenes.map((s, i) => (
              <div key={i} className="scene-card" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="scene-head">
                  <span className="scene-num">Scene {s.scene}</span>
                  <span className="scene-ts">{s.timestamp}</span>
                </div>
                <div className="scene-body">
                  <div className="scene-prompt">{s.prompt}</div>
                  <div className="scene-narration">"{s.narration}"</div>
                  <div style={{ marginTop: 7 }}>
                    <button className={`btn btn-ghost btn-xs ${copied === `s${i}` ? "copied-flash" : ""}`}
                      onClick={() => copy(s.prompt, `s${i}`)}>
                      {copied === `s${i}` ? "✓" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="insight" style={{ marginTop: 14 }}>
            💡 Paste prompts into DALL·E 3, Midjourney, or Leonardo.ai. Use consistent seed/style for visual continuity.
          </div>
        </div>
        <div className="row between">
          <button className="btn btn-ghost" onClick={() => setPip(3)}>← Back</button>
          <button className="btn btn-gold" onClick={() => load("Optimizing SEO...", doSEO)}>
            Generate SEO →
          </button>
        </div>
      </div>
    );
  }

  function StepSEO() {
    return (
      <div className="fade-in">
        {seo && (
          <>
            <div className="grid-2">
              <div className="card">
                <div className="row between" style={{ marginBottom: 12 }}>
                  <div className="card-title" style={{ margin: 0 }}>Description</div>
                  <button className={`btn btn-ghost btn-sm ${copied === "desc" ? "copied-flash" : ""}`}
                    onClick={() => copy(seo.description, "desc")}>{copied === "desc" ? "✓" : "Copy"}</button>
                </div>
                <div className="output-box" style={{ maxHeight: 220, fontSize: 12.5 }}>{seo.description}</div>
              </div>
              <div className="card">
                <div className="card-title">Video Chapters</div>
                {(seo.chapters || []).map((c, i) => (
                  <div key={i} className="row between" style={{ padding: "7px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--gold)", fontSize: 12 }}>{c.time}</span>
                    <span>{c.title}</span>
                  </div>
                ))}
                <button className={`btn btn-ghost btn-sm ${copied === "chapters" ? "copied-flash" : ""}`}
                  style={{ marginTop: 10 }}
                  onClick={() => copy((seo.chapters || []).map(c => `${c.time} ${c.title}`).join("\n"), "chapters")}>
                  {copied === "chapters" ? "✓ Copied" : "Copy Chapters"}
                </button>
              </div>
            </div>

            <div className="card">
              <div className="row between" style={{ marginBottom: 14 }}>
                <div className="card-title" style={{ margin: 0 }}>Tags</div>
                <div className="row" style={{ gap: 8 }}>
                  <span className={`tag tag-${seo.competition === "low" ? "green" : seo.competition === "medium" ? "gold" : "red"}`}>
                    {seo.competition} competition
                  </span>
                  <span className="tag tag-blue">SEO {seo.seoScore}/10</span>
                </div>
              </div>
              <div className="seo-tags">
                {(seo.tags || []).map((t, i) => (
                  <div key={i} className="seo-tag" onClick={() => copy(t, `tag${i}`)}>
                    {t} <span className="seo-tag-copy">{copied === `tag${i}` ? "✓" : "copy"}</span>
                  </div>
                ))}
              </div>
              <button className={`btn btn-ghost btn-sm ${copied === "tags" ? "copied-flash" : ""}`}
                style={{ marginTop: 12 }}
                onClick={() => copy((seo.tags || []).join(", "), "tags")}>
                {copied === "tags" ? "✓ Copied All Tags" : "Copy All Tags"}
              </button>

              <div className="divider" />
              <div className="card-title">Pro Tips</div>
              {(seo.tips || []).map((tip, i) => (
                <div key={i} className="insight" style={{ marginBottom: 8 }}>💡 {tip}</div>
              ))}
            </div>
          </>
        )}
        <div className="row between">
          <button className="btn btn-ghost" onClick={() => setPip(4)}>← Back</button>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn btn-ghost btn-sm" onClick={() => load("Re-optimizing SEO...", doSEO)}>Redo</button>
            <button className="btn btn-gold" onClick={() => load("Designing thumbnail...", doThumbnail)}>
              Design Thumbnail →
            </button>
          </div>
        </div>
      </div>
    );
  }

  function StepThumbnail() {
    return (
      <div className="fade-in">
        {thumbnail && (
          <>
            <div className="grid-2" style={{ alignItems: "start" }}>
              <div>
                <div className="card">
                  <div className="tnail-preview">
                    <div className="tnail-headline">{thumbnail.headline}{thumbnail.subtext ? `\n${thumbnail.subtext}` : ""}</div>
                  </div>
                  <div className="row between">
                    <span className="tag tag-gold">CTR Score: {thumbnail.clickbaitScore}/10</span>
                    <span className="tag tag-purple">🧠 {thumbnail.psychologyHook}</span>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-title">Thumbnail Brief</div>
                {[
                  { label: "Headline Text", value: thumbnail.headline, key: "hl" },
                  { label: "Sub Text", value: thumbnail.subtext || "None" },
                  { label: "Color Palette", value: thumbnail.colorPalette },
                  { label: "Face Emotion", value: thumbnail.faceEmotion },
                  { label: "Text Position", value: thumbnail.textPosition },
                ].map(({ label, value, key }) => (
                  <div key={label} style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 10, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4, fontFamily: "'JetBrains Mono', monospace" }}>{label}</div>
                    <div style={{ fontSize: 13, color: "var(--text)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span>{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="row between" style={{ marginBottom: 10 }}>
                <div className="card-title" style={{ margin: 0 }}>AI Image Prompt</div>
                <button className={`btn btn-gold btn-sm ${copied === "tnail" ? "copied-flash" : ""}`}
                  onClick={() => copy(thumbnail.imagePrompt, "tnail")}>
                  {copied === "tnail" ? "✓ Copied!" : "Copy Prompt"}
                </button>
              </div>
              <div className="mono-box">{thumbnail.imagePrompt}</div>
              <div className="insight green" style={{ marginTop: 10 }}>✓ {thumbnail.reasoning}</div>
            </div>
          </>
        )}
        <div className="row between">
          <button className="btn btn-ghost" onClick={() => setPip(5)}>← Back</button>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn btn-ghost btn-sm" onClick={() => load("Redesigning thumbnail...", doThumbnail)}>Redo</button>
            <button className="btn btn-gold" onClick={() => load("Building monetization plan...", doMonetize)}>
              Revenue Plan →
            </button>
          </div>
        </div>
      </div>
    );
  }

  function StepMonetize() {
    if (!monetization) return null;
    const m = monetization;

    return (
      <div className="fade-in">
        <div className="card" style={{ borderColor: "rgba(245,200,66,0.3)", background: "rgba(245,200,66,0.04)" }}>
          <div className="card-title">Estimated Monthly Income</div>
          <div style={{ display: "flex", gap: 16 }}>
            {[
              { label: "Conservative", value: m.estimatedMonthlyIncome?.conservative, color: "var(--text2)" },
              { label: "Realistic", value: m.estimatedMonthlyIncome?.realistic, color: "var(--gold)" },
              { label: "Optimistic", value: m.estimatedMonthlyIncome?.optimistic, color: "var(--green)" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ flex: 1, background: "var(--elevated)", borderRadius: "var(--r-sm)", padding: "14px", border: "1px solid var(--border)", textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "var(--text3)", marginBottom: 6, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
                <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "1.6rem", color, fontWeight: 600 }}>{fmtMoney(value || 0)}</div>
                <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 4 }}>per month</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid-2">
          <div className="card">
            <div className="card-title">Ad Revenue (by Views)</div>
            {Object.entries(m.adRevenue || {}).map(([views, rev]) => (
              <div key={views} className="money-row">
                <div className="row center" style={{ gap: 8 }}>
                  <span className="tag tag-blue">{Number(views).toLocaleString()} views</span>
                  <span style={{ fontSize: 12, color: "var(--text3)" }}>/month</span>
                </div>
                <div className="money-val">{fmtMoney(rev)}</div>
              </div>
            ))}
            <div className="insight" style={{ marginTop: 10 }}>
              💡 Best upload time: <strong style={{ color: "var(--gold)" }}>{m.bestUploadTime}</strong>
            </div>
          </div>

          <div className="card">
            <div className="card-title">Affiliate Opportunities</div>
            {(m.affiliateIdeas || []).map((a, i) => (
              <div key={i} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--r-sm)", padding: "11px 13px", marginBottom: 8 }}>
                <div className="row between" style={{ marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{a.product}</span>
                  <span className="tag tag-green">{a.commission}</span>
                </div>
                <div style={{ fontSize: 11.5, color: "var(--text3)", lineHeight: 1.4 }}>{a.fit}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid-2">
          <div className="card">
            <div className="card-title">Sponsorship Rates</div>
            {[
              { label: "Integrated Mention (30-60s)", value: m.sponsorshipRate?.integrated },
              { label: "Dedicated Sponsor Video", value: m.sponsorshipRate?.dedicated },
            ].map(({ label, value }) => (
              <div key={label} className="money-row">
                <span style={{ fontSize: 13 }}>{label}</span>
                <span className="money-val">{fmtMoney(value || 0)}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-title">Digital Product Idea</div>
            <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--r-sm)", padding: 14 }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{m.digitalProduct?.idea}</div>
              <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
                <span className="tag tag-gold">${m.digitalProduct?.price}</span>
                <span className="tag tag-green">{m.digitalProduct?.conversionRate} CVR</span>
              </div>
            </div>
            <div className="insight green" style={{ marginTop: 10 }}>
              📌 CTA Placement: {m.ctaPlacement}
            </div>
          </div>
        </div>

        <div className="card" style={{ borderColor: "rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.04)" }}>
          <div className="row between" style={{ marginBottom: 14 }}>
            <div className="card-title" style={{ margin: 0 }}>🎉 Project Auto-Saved!</div>
            <span className="tag tag-green">✓ In My Projects</span>
          </div>
          <div className="row" style={{ gap: 10, flexWrap: "wrap" }}>
            <button className="btn btn-ghost" onClick={() => {
              setTopic(""); setNiche(""); setTitles([]); setSelectedTitle(""); setScript("");
              setShortsScript(""); setScenes([]); setSeo(null); setThumbnail(null); setMonetization(null);
              setPip(0);
            }}>Start New Video</button>
            <button className="btn btn-ghost" onClick={() => setPage("projects")}>View All Projects</button>
            <button className="btn btn-gold"
              onClick={() => downloadJSON({ title: selectedTitle, script, shortsScript, scenes, seo, thumbnail, monetization },
                `${selectedTitle.slice(0, 40).replace(/[^a-z0-9]/gi, "_")}.json`)}>
              ⬇ Download JSON
            </button>
          </div>
        </div>

        <div className="row between">
          <button className="btn btn-ghost" onClick={() => setPip(6)}>← Back</button>
        </div>
      </div>
    );
  }

  function PageProjects() {
    return (
      <div className="fade-in">
        <div className="row between" style={{ marginBottom: 20 }}>
          <div>
            <div className="section-title">My Projects</div>
            <div className="section-sub">{projects.length} videos created</div>
          </div>
          <button className="btn btn-gold" onClick={() => { setPip(0); setPage("pipeline"); }}>+ New Video</button>
        </div>
        {projects.length === 0 ? (
          <div className="card"><div className="empty"><div className="empty-icon">🎬</div><div className="empty-text">No projects yet. Create your first video!</div></div></div>
        ) : projects.map(p => (
          <div key={p.id} className="project-item">
            <div className="project-dot" style={{ background: "var(--elevated)", fontSize: 20 }}>🎬</div>
            <div className="project-info">
              <div className="project-title">{p.title}</div>
              <div className="project-meta">{p.niche} · {p.format === "long" ? "Long-Form" : "Shorts"} · {new Date(p.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="row center" style={{ gap: 8, flexShrink: 0 }}>
              <span className="tag tag-green">✓ Complete</span>
              <button className="btn btn-ghost btn-xs"
                onClick={() => downloadJSON(p, `${p.title.slice(0, 40).replace(/[^a-z0-9]/gi, "_")}.json`)}>
                ⬇ Export
              </button>
              <button className="btn btn-danger btn-xs"
                onClick={() => saveProjects(projects.filter(x => x.id !== p.id))}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function PageCalendar() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const totalDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const cells = [...Array(firstDay).fill(null), ...Array.from({ length: totalDays }, (_, i) => i + 1)];

    return (
      <div className="fade-in">
        <div className="section-title">Upload Schedule</div>
        <div className="section-sub">Plan your publishing cadence. Click a day to toggle a scheduled upload.</div>

        <div className="card">
          <div className="row between" style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "1.2rem", fontWeight: 600 }}>
              {today.toLocaleString("default", { month: "long" })} {today.getFullYear()}
            </div>
            <div className="row center" style={{ gap: 12 }}>
              <div className="row center" style={{ gap: 5 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--blue)" }} /><span style={{ fontSize: 11, color: "var(--text3)" }}>Scheduled</span></div>
              <div className="row center" style={{ gap: 5 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)" }} /><span style={{ fontSize: 11, color: "var(--text3)" }}>Published</span></div>
            </div>
          </div>
          <div className="cal-grid" style={{ marginBottom: 6 }}>
            {days.map(d => <div key={d} className="cal-header">{d}</div>)}
          </div>
          <div className="cal-grid">
            {cells.map((day, i) => {
              if (!day) return <div key={`e${i}`} className="cal-day empty" />;
              const isToday = day === today.getDate();
              const isScheduled = scheduled[day];
              const isPast = day < today.getDate();
              return (
                <div key={day}
                  className={`cal-day ${isToday ? "today" : ""} ${isScheduled && !isPast ? "scheduled" : ""} ${isScheduled && isPast ? "published" : ""}`}
                  onClick={() => setScheduled(s => ({ ...s, [day]: !s[day] }))}>
                  {day}
                  {isScheduled && <div className="cal-dot" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid-2">
          <div className="card">
            <div className="card-title">Scheduled Uploads ({Object.values(scheduled).filter(Boolean).length})</div>
            {Object.entries(scheduled).filter(([, v]) => v).map(([day]) => (
              <div key={day} className="row between" style={{ padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                <span>{today.toLocaleString("default", { month: "short" })} {day}, {today.getFullYear()}</span>
                <span className={`tag ${Number(day) < today.getDate() ? "tag-green" : "tag-blue"}`}>
                  {Number(day) < today.getDate() ? "Published" : "Scheduled"}
                </span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-title">Upload Cadence Tips</div>
            {[
              { tip: "Post 2–3x/week minimum for algorithm momentum", color: "var(--gold)" },
              { tip: "Tuesday–Thursday 2–4pm EST = peak engagement", color: "var(--green)" },
              { tip: "Never go more than 7 days without posting", color: "var(--red)" },
              { tip: "Shorts can go daily — use them to fill gaps", color: "var(--blue)" },
              { tip: "Batch-create 4 videos per session for consistency", color: "var(--purple)" },
            ].map(({ tip, color }) => (
              <div key={tip} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 12.5, color: "var(--text2)", lineHeight: 1.4 }}>
                <div style={{ width: 4, borderRadius: 4, background: color, flexShrink: 0, alignSelf: "stretch" }} />
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function PageCalculator() {
    const nicheData = NICHES.find(n => n.name === calcNiche) || NICHES[1];
    const monthly = (calcViews / 1000) * nicheData.rpm;
    const yearly = monthly * 12;
    const affiliate = monthly * 0.4;
    const sponsorship = calcViews >= 50000 ? 800 : calcViews >= 10000 ? 200 : 0;
    const digital = calcViews * 0.002 * 27;
    const total = monthly + affiliate + sponsorship + digital;

    return (
      <div className="fade-in">
        <div className="section-title">Revenue Calculator</div>
        <div className="section-sub">Estimate your monthly YouTube income across all streams.</div>

        <div className="grid-2" style={{ alignItems: "start" }}>
          <div>
            <div className="card">
              <div className="card-title">Your Channel Settings</div>
              <div className="field">
                <label>Monthly Views</label>
                <input type="number" value={calcViews} onChange={e => setCalcViews(Number(e.target.value))} min={1000} step={1000} />
              </div>
              <div className="field">
                <label>Niche</label>
                <select value={calcNiche} onChange={e => setCalcNiche(e.target.value)}>
                  {NICHES.map(n => <option key={n.name}>{n.name}</option>)}
                </select>
              </div>
              <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--r-sm)", padding: 14, marginTop: 8 }}>
                <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 6, fontFamily: "'JetBrains Mono', monospace" }}>ESTIMATED RPM</div>
                <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "2rem", color: nicheData.color, fontWeight: 600 }}>${nicheData.rpm}</div>
                <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>per 1,000 views</div>
              </div>
            </div>
          </div>

          <div>
            <div className="card" style={{ borderColor: "rgba(245,200,66,0.3)" }}>
              <div className="card-title">Monthly Revenue Breakdown</div>
              {[
                { label: "💛 AdSense", value: monthly, note: `${calcViews.toLocaleString()} views × $${nicheData.rpm}` },
                { label: "🔗 Affiliate Links", value: affiliate, note: "~40% of ad revenue (est.)" },
                { label: "🤝 Sponsorship", value: sponsorship, note: calcViews >= 10000 ? "Eligible" : "Not yet (need 10k+ views)" },
                { label: "📦 Digital Product", value: digital, note: "0.2% CVR × $27 avg price" },
              ].map(({ label, value, note }) => (
                <div key={label} className="money-row">
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{note}</div>
                  </div>
                  <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "1.2rem", color: value > 0 ? "var(--gold)" : "var(--text3)" }}>
                    {fmtMoney(value)}
                  </div>
                </div>
              ))}
              <div style={{ background: "rgba(245,200,66,0.08)", border: "1px solid rgba(245,200,66,0.25)", borderRadius: "var(--r-sm)", padding: "14px", marginTop: 14 }}>
                <div className="row between">
                  <div>
                    <div style={{ fontSize: 12, color: "var(--gold)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Total Monthly</div>
                    <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 2 }}>${(yearly).toLocaleString()} / year</div>
                  </div>
                  <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "2.2rem", color: "var(--gold)", fontWeight: 700 }}>
                    {fmtMoney(total)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Views Needed to Hit Income Goals</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Goal", "Monthly Views", "Daily Views", "Videos/Week"].map(h => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "var(--text3)", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { goal: "$500/mo", views: Math.round(500 / total * calcViews) },
                  { goal: "$1,000/mo", views: Math.round(1000 / total * calcViews) },
                  { goal: "$3,000/mo", views: Math.round(3000 / total * calcViews) },
                  { goal: "$10,000/mo", views: Math.round(10000 / total * calcViews) },
                ].map(({ goal, views }) => (
                  <tr key={goal} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "11px 14px", fontWeight: 700, color: "var(--gold)" }}>{goal}</td>
                    <td style={{ padding: "11px 14px", fontFamily: "'JetBrains Mono', monospace" }}>{views.toLocaleString()}</td>
                    <td style={{ padding: "11px 14px", fontFamily: "'JetBrains Mono', monospace", color: "var(--text2)" }}>{Math.round(views / 30).toLocaleString()}</td>
                    <td style={{ padding: "11px 14px" }}>
                      <span className={`tag ${views / calcViews <= 3 ? "tag-green" : views / calcViews <= 10 ? "tag-gold" : "tag-red"}`}>
                        ~{Math.max(2, Math.ceil(views / calcViews / 4))}x/week
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  function PageNiches() {
    return (
      <div className="fade-in">
        <div className="section-title">Niche Research</div>
        <div className="section-sub">Compare niches by RPM, competition, and income potential.</div>

        <div className="card">
          {NICHES.sort((a, b) => b.rpm - a.rpm).map((n, i) => {
            const monthly10k = (10000 / 1000) * n.rpm;
            const monthly100k = (100000 / 1000) * n.rpm;
            return (
              <div key={n.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0", borderBottom: i < NICHES.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "1.1rem", color: "var(--text3)", width: 24, textAlign: "right", flexShrink: 0 }}>#{i + 1}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{n.name}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: n.color, fontWeight: 700 }}>${n.rpm} RPM</span>
                  </div>
                  <div className="rpm-bar-wrap" style={{ height: 6 }}>
                    <div className="rpm-bar-fill" style={{ width: `${(n.rpm / 20) * 100}%`, background: n.color }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, flexShrink: 0, flexWrap: "wrap" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "'JetBrains Mono', monospace" }}>10K views</div>
                    <div style={{ fontWeight: 700, color: "var(--text)", fontSize: 13 }}>{fmtMoney(monthly10k)}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "'JetBrains Mono', monospace" }}>100K views</div>
                    <div style={{ fontWeight: 700, color: "var(--gold)", fontSize: 13 }}>{fmtMoney(monthly100k)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="insight gold">
          💡 RPM varies by country, season, and channel age. Finance and Business niches consistently earn the most due to high advertiser competition.
          Your actual RPM may be 30–50% lower in the first 6 months as YouTube assesses your content.
        </div>
      </div>
    );
  }

  function PageChecklist() {
    const categories = [...new Set(CHECKLIST_ITEMS.map(i => i.category))];
    const done = Object.values(checks).filter(Boolean).length;

    function toggle(id) {
      const next = { ...checks, [id]: !checks[id] };
      saveChecks(next);
    }

    return (
      <div className="fade-in">
        <div className="row between" style={{ marginBottom: 8 }}>
          <div>
            <div className="section-title">Launch Checklist</div>
            <div className="section-sub">Complete these steps to maximize your channel's income potential.</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "2rem", color: done === CHECKLIST_ITEMS.length ? "var(--green)" : "var(--gold)" }}>{done}/{CHECKLIST_ITEMS.length}</div>
            <div style={{ fontSize: 11, color: "var(--text3)" }}>completed</div>
          </div>
        </div>

        <div className="progress" style={{ marginBottom: 28 }}>
          <div className="progress-fill" style={{ width: `${(done / CHECKLIST_ITEMS.length) * 100}%` }} />
        </div>

        {categories.map(cat => (
          <div key={cat} className="card">
            <div className="row between" style={{ marginBottom: 12 }}>
              <div className="card-title" style={{ margin: 0 }}>{cat}</div>
              <span className="tag tag-green">
                {CHECKLIST_ITEMS.filter(i => i.category === cat && checks[i.id]).length}/{CHECKLIST_ITEMS.filter(i => i.category === cat).length}
              </span>
            </div>
            {CHECKLIST_ITEMS.filter(i => i.category === cat).map(item => (
              <div key={item.id} className="checklist-item">
                <div className={`check-circle ${checks[item.id] ? "checked" : ""}`} onClick={() => toggle(item.id)}>
                  {checks[item.id] ? "✓" : ""}
                </div>
                <div className={`check-text ${checks[item.id] ? "done" : ""}`}>{item.text}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════
  const PAGE_TITLES = { dashboard: "Dashboard", pipeline: "Create Video", projects: "My Projects", calendar: "Upload Schedule", calculator: "Revenue Calculator", niches: "Niche Research", checklist: "Launch Checklist" };

  const PAGES = { dashboard: PageDashboard, pipeline: PagePipeline, projects: PageProjects, calendar: PageCalendar, calculator: PageCalculator, niches: PageNiches, checklist: PageChecklist };
  const ActivePage = PAGES[page];

  // ── API KEY SETUP SCREEN ──────────────────────────────────────────
  if (!apiKey) {
    return (
      <>
        <style>{STYLES}</style>
        <div className="setup-screen">
          <div className="setup-card fade-in">
            <div className="setup-logo">TUBE<span>FORGE</span></div>
            <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em", marginBottom: 28 }}>AI INCOME STUDIO</div>
            <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "1.2rem", fontWeight: 600, marginBottom: 8 }}>Connect Claude AI</div>
            <div className="setup-sub">Enter your Anthropic API key to power the AI pipeline. Your key stays in memory only and is never stored or sent anywhere except Anthropic's API.</div>
            <div className="field">
              <label>Anthropic API Key</label>
              <div className="setup-key-input">
                <input
                  type={showKey ? "text" : "password"}
                  placeholder="sk-ant-api03-..."
                  value={apiKeyInput}
                  onChange={e => { setApiKeyInput(e.target.value); setKeyError(""); }}
                  onKeyDown={e => e.key === "Enter" && handleSetKey()}
                />
                <button className="setup-key-toggle" onClick={() => setShowKey(s => !s)}>{showKey ? "🙈" : "👁"}</button>
              </div>
              {keyError && <div className="setup-error">⚠ {keyError}</div>}
              <div className="setup-note" style={{ marginTop: 10 }}>
                Don't have a key? Get one at <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer">console.anthropic.com</a> → API Keys → Create Key
              </div>
            </div>
            <button className="btn btn-gold" style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
              onClick={handleSetKey} disabled={!apiKeyInput.trim() || keyLoading}>
              {keyLoading ? "Verifying..." : "Connect & Launch →"}
            </button>
            <div className="insight" style={{ marginTop: 20, fontSize: 11.5 }}>
              🔒 Your key is held in memory for this session only. Refreshing the page will clear it.
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{STYLES}</style>
      <div className="layout">
        {/* SIDEBAR */}
        <nav className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-mark">TUBE<span>FORGE</span></div>
            <div className="logo-sub">AI Income Studio</div>
          </div>
          <div className="sidebar-nav">
            {NAV.map((item, i) => (
              <div key={item.id}>
                {item.section && <div className="nav-section-label">{item.section}</div>}
                <div className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                  {item.id === "projects" && projects.length > 0 && <span className="nav-badge">{projects.length}</span>}
                </div>
              </div>
            ))}
          </div>
          <div className="sidebar-footer">
            <div className="api-status" style={{ marginBottom: 8 }}>
              <div className="api-dot" />
              Claude API Active
            </div>
            <div className="api-key-badge" onClick={() => setApiKey("")} title="Click to disconnect">
              🔑 {apiKey.slice(0,12)}... <span style={{ marginLeft: "auto", fontSize: 9 }}>reset</span>
            </div>
          </div>
        </nav>

        {/* MAIN */}
        <div className="main">
          <div className="topbar">
            <div className="topbar-title">{PAGE_TITLES[page]}</div>
            <div className="topbar-right">
              <span className="tag tag-gold">AI Powered</span>
              {page !== "pipeline" && (
                <button className="btn btn-gold btn-sm" onClick={() => { setPip(0); setPage("pipeline"); }}>
                  + New Video
                </button>
              )}
            </div>
          </div>
          <div className="content">
            <ActivePage />
          </div>
        </div>
      </div>
    </>
  );
}
