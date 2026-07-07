#!/usr/bin/env node
/**
 * Generate dist/index.html — hub linking to all subjects (built + placeholder stubs).
 */
import { existsSync } from 'node:fs';
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  listAllSubjectDirs,
  parseSubjectBrief,
  parseParFilename,
  academicYearFromPath,
  toArabicDigits,
  inferTheme,
} from './lib/scaffold-subject.mjs';

const ENGINE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ENGINE_ROOT, 'dist');
const IS_DEV = process.env.GITHUB_BRANCH === 'dev';
/** @type {Record<string, { primary: string, secondary: string, tertiary: string, fixed: string, onFixed: string, icon: string }>} */
const HUB_THEME_PALETTE = {
  'kotlin-pink-blue': {
    primary: '#ec4899', secondary: '#2563eb', tertiary: '#00bcd4',
    fixed: '#fce7f3', onFixed: '#500724', icon: 'code',
  },
  'parallel-teal': {
    primary: '#00685f', secondary: '#0058be', tertiary: '#924628',
    fixed: '#e0f7f4', onFixed: '#00201d', icon: 'memory',
  },
  'software-purple': {
    primary: '#7c3aed', secondary: '#2563eb', tertiary: '#06b6d4',
    fixed: '#ede9fe', onFixed: '#2e1065', icon: 'engineering',
  },
  'programming-blue-lavender': {
    primary: '#1064e0', secondary: '#7c4dff', tertiary: '#00acc1',
    fixed: '#e8efff', onFixed: '#001a42', icon: 'terminal',
  },
  'gis-earth': {
    primary: '#2e7d32', secondary: '#558b2f', tertiary: '#8d6e63',
    fixed: '#e8f5e9', onFixed: '#1b5e20', icon: 'map',
  },
  'amber-default': {
    primary: '#7a6200', secondary: '#5c3d8a', tertiary: '#1e5a8a',
    fixed: '#faf4e6', onFixed: '#3d3100', icon: 'school',
  },
};

/** @type {Record<number, { primary: string, secondary: string, fixed: string, label: string }>} */
const YEAR_ACCENTS = {
  1: { primary: '#d97706', secondary: '#fbbf24', fixed: '#fef3c7', label: 'الأولى' },
  2: { primary: '#d97706', secondary: '#fbbf24', fixed: '#fef3c7', label: 'الثانية' },
  3: { primary: '#d97706', secondary: '#fbbf24', fixed: '#fef3c7', label: 'الثالثة' },
  4: { primary: '#d97706', secondary: '#fbbf24', fixed: '#fef3c7', label: 'الرابعة' },
  5: { primary: '#d97706', secondary: '#fbbf24', fixed: '#fef3c7', label: 'الخامسة' },
};

/** @param {number} n */
function lectureCountLabel(n) {
  if (n === 0) return '٠ محاضرات';
  if (n === 1) return 'محاضرة واحدة';
  if (n === 2) return 'محاضرتان';
  return `${toArabicDigits(n)} محاضرات`;
}

/** @param {string} rel */
async function countLecturesForSubject(rel) {
  const lecturesDir = path.join(ENGINE_ROOT, 'subjects', rel, 'lectures');
  if (existsSync(lecturesDir)) {
    const files = await readdir(lecturesDir);
    const nums = new Set();
    for (const f of files) {
      const parsed = parseParFilename(f);
      if (parsed) nums.add(parsed.num);
    }
    if (nums.size) return nums.size;
  }

  const distManifest = path.join(DIST, rel, 'lectures/manifest.json');
  if (existsSync(distManifest)) {
    try {
      const m = JSON.parse(await readFile(distManifest, 'utf8'));
      const nums = new Set(
        (m.files || []).map(f => f.num).filter(n => typeof n === 'number' && !Number.isNaN(n)),
      );
      if (nums.size) return nums.size;
    } catch { /* ignore */ }
  }

  return 0;
}

/** @returns {Promise<{ rel: string, title: string, subtitle: string, year: string, academicYear: number, hasLectures: boolean, lectureCount: number, theme: string, matIcon: string }[]>} */
async function collectHubSubjects() {
  /** @type {Awaited<ReturnType<typeof collectHubSubjects>>} */
  const items = [];

  for (const rel of await listAllSubjectDirs()) {
    const subjectPath = path.join(ENGINE_ROOT, 'subjects', rel);
    const briefPath = path.join(subjectPath, 'subject-brief.yaml');
    const lecturesDir = path.join(subjectPath, 'lectures');
    if (!existsSync(briefPath) && !existsSync(lecturesDir)) continue;

    const folderName = rel.split('/')[1];
    let title = folderName;
    let subtitle = '';
    let year = '';
    let academicYear = academicYearFromPath(rel);
    let domain = null;
    let subjectId = folderName;

    if (existsSync(briefPath)) {
      try {
        const brief = parseSubjectBrief(await readFile(briefPath, 'utf8'));
        title = brief.name_ar || title;
        subtitle = brief.tagline || '';
        domain = brief.domain;
        subjectId = brief.id || subjectId;
      } catch { /* ignore */ }
    }

    let theme = inferTheme(subjectId, domain);
    let matIcon = HUB_THEME_PALETTE[theme]?.icon || 'school';
    let enabledLectures = false;
    const manifestSrc = path.join(lecturesDir, 'manifest.json');
    if (existsSync(manifestSrc)) {
      try {
        const m = JSON.parse(await readFile(manifestSrc, 'utf8'));
        title = m.settings?.subjectName || m.title || title;
        subtitle = m.subtitle || subtitle;
        year = m.settings?.year || '';
        enabledLectures = m.settings?.enabledLectures || false;
        academicYear = m.settings?.academicYear ?? academicYear;
        theme = m.settings?.theme || theme;
        matIcon = m.lectureMatIcons?.[0]
          || m.files?.[0]?.matIcon
          || HUB_THEME_PALETTE[theme]?.icon
          || matIcon;
      } catch { /* ignore */ }
    }

    const lectureCount = await countLecturesForSubject(rel);
    const hasLectures = lectureCount > 0;

    if(enabledLectures)
    {
      items.push({
      rel, title, subtitle, year, academicYear, hasLectures, lectureCount, theme, matIcon,
    });
    }
  }

  return items.sort((a, b) => a.rel.localeCompare(b.rel, 'ar'));
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderStubHtml(subject) {
  const msg = subject.hasLectures
    ? 'جاري تجهيز عرض المحاضرات — حاول لاحقاً.'
    : 'لا توجد محاضرات منشورة بعد لهذه المادة.';
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject.title)} — قريباً</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'IBM Plex Sans Arabic', sans-serif; margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; background: #f8f6f2; color: #1a1a1a; text-align: center; }
    .box { max-width: 420px; background: #fff; border: 1px solid #e8e4dc; border-radius: 16px; padding: 2rem 1.5rem; }
    h1 { font-size: 1.35rem; margin: 0 0 0.75rem; color: #5c3d8a; }
    p { color: #555; margin: 0 0 1.25rem; line-height: 1.7; }
    a { color: #1e5a8a; text-decoration: none; font-weight: 600; }
    a:hover { text-decoration: underline; }
    .badge { display: inline-block; margin-bottom: 1rem; padding: 0.25rem 0.65rem; border-radius: 999px; background: #f0ebe0; color: #7a6528; font-size: 0.8rem; }
  </style>
  <script type="text/javascript">
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;
    t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "xim6tigbcd");
</script>

</head>
<body>
  <div class="box">
    <span class="badge">قيد الإعداد</span>
    <h1>${escapeHtml(subject.title)}</h1>
    <p>${escapeHtml(msg)}</p>
    <a href="../../index.html">← العودة للصفحة الرئيسية</a>
  </div>
</body>
</html>`;
}

/** @param {Awaited<ReturnType<typeof collectHubSubjects>>} subjects */
async function ensureSubjectStubs(subjects) {
  let created = 0;
  for (const s of subjects) {
    const outIndex = path.join(DIST, s.rel, 'index.html');
    const builtManifest = path.join(DIST, s.rel, 'lectures/manifest.json');
    if (existsSync(builtManifest) || existsSync(outIndex)) continue;
    await mkdir(path.dirname(outIndex), { recursive: true });
    await writeFile(outIndex, renderStubHtml(s));
    created++;
  }
  return created;
}

/** @param {Awaited<ReturnType<typeof collectHubSubjects>>} items @param {number} year */
function yearBlockStats(items, year) {
  const inYear = items.filter(s => (s.academicYear || Number(s.rel.match(/year-(\d)/)?.[1]) || 0) === year);
  const lectures = inYear.reduce((sum, s) => sum + s.lectureCount, 0);
  const ready = inYear.filter(s => s.hasLectures).length;
  return { subjects: inYear.length, lectures, ready };
}

/** @param {Awaited<ReturnType<typeof collectHubSubjects>>[number]} s @param {number} year @param {number} staggerIdx */
function renderSubjectCard(s, year, staggerIdx) {
  const pending = !s.hasLectures;
  const countLabel = lectureCountLabel(s.lectureCount);
  const palette = HUB_THEME_PALETTE[s.theme] || HUB_THEME_PALETTE['amber-default'];
  const stagger = (staggerIdx * 0.07).toFixed(2);

  return `
      <a class="hub-card${pending ? ' hub-card--pending' : ''}" href="./${s.rel}/"
         style="--card-primary:${palette.primary};--card-secondary:${palette.secondary};--card-tertiary:${palette.tertiary};--card-fixed:${palette.fixed};--card-on-fixed:${palette.onFixed};--stagger:${stagger}s"
         aria-label="${escapeHtml(s.title)}">
        <div class="hub-card__head">
          <div class="hub-card__icon" aria-hidden="true">
            <span class="material-symbols-outlined">${escapeHtml(s.matIcon)}</span>
          </div>
          <div class="hub-card__pills">
            <span class="hub-card__pill hub-card__pill--year">السنة ${toArabicDigits(year)}</span>
            <span class="hub-card__pill hub-card__pill--count" title="${escapeHtml(countLabel)}">${toArabicDigits(s.lectureCount)}</span>
          </div>
        </div>
        <h3 class="hub-card__title">${escapeHtml(s.title)}</h3>
        ${s.subtitle ? `<p class="hub-card__sub">${escapeHtml(s.subtitle)}</p>` : ''}
        ${s.year ? `<p class="hub-card__meta">${escapeHtml(s.year)}</p>` : ''}
        <div class="hub-card__chips">
          <span class="hub-card__chip">
            <span class="material-symbols-outlined">menu_book</span>
            ${escapeHtml(countLabel)}
          </span>
          ${pending ? '<span class="hub-card__chip hub-card__chip--pending">قيد الإعداد</span>' : ''}
        </div>
        <span class="hub-card__cta">
          ${pending ? 'عرض المادة' : 'فتح الدليل'}
          <span class="material-symbols-outlined">arrow_back</span>
        </span>
      </a>`;
}

/** @param {Awaited<ReturnType<typeof collectHubSubjects>>} subjects */
function renderHtml(subjects) {
  const byYear = {};
  for (const s of subjects) {
    const y = s.academicYear || Number(s.rel.match(/year-(\d)/)?.[1]) || 0;
    if (!byYear[y]) byYear[y] = [];
    byYear[y].push(s);
  }

  let cardIndex = 0;
  const totalLectures = subjects.reduce((sum, s) => sum + s.lectureCount, 0);
  const readySubjects = subjects.filter(s => s.hasLectures).length;

  const yearSections = Object.keys(byYear).sort((a, b) => Number(a) - Number(b)).map(y => {
    const yearNum = Number(y);
    const accent = YEAR_ACCENTS[yearNum] || YEAR_ACCENTS[1];
    const stats = yearBlockStats(subjects, yearNum);
    const cards = byYear[y].map(s => renderSubjectCard(s, yearNum, cardIndex++)).join('\n');
    return `
    <section class="year-panel" style="--year-primary:${accent.primary};--year-secondary:${accent.secondary};--year-fixed:${accent.fixed}">
      <header class="year-panel__header">
        <div class="year-panel__badge" aria-hidden="true">${toArabicDigits(y)}</div>
        <div class="year-panel__intro">
          <h2>السنة ${accent.label}</h2>
          <p class="year-panel__tagline">${toArabicDigits(stats.subjects)} مواد · ${toArabicDigits(stats.lectures)} محاضرة · ${toArabicDigits(stats.ready)} جاهزة</p>
        </div>
        <div class="year-panel__chips">
          <span class="year-panel__chip">
            <span class="material-symbols-outlined">folder</span>
            ${toArabicDigits(stats.subjects)} مادة
          </span>
          <span class="year-panel__chip">
            <span class="material-symbols-outlined">menu_book</span>
            ${toArabicDigits(stats.lectures)} محاضرة
          </span>
        </div>
      </header>
      <div class="year-panel__body">
        <div class="grid">${cards}</div>
      </div>
    </section>`;
  }).join('\n');

  const heroStats = `
    <div class="hero-stats">
      <div class="hero-stat">
        <span class="hero-stat__icon material-symbols-outlined">school</span>
        <div>
          <strong>${toArabicDigits(subjects.length)}</strong>
          <span>مادة</span>
        </div>
      </div>
      <div class="hero-stat">
        <span class="hero-stat__icon material-symbols-outlined">menu_book</span>
        <div>
          <strong>${toArabicDigits(totalLectures)}</strong>
          <span>محاضرة</span>
        </div>
      </div>
      <div class="hero-stat">
        <span class="hero-stat__icon material-symbols-outlined">check_circle</span>
        <div>
          <strong>${toArabicDigits(readySubjects)}</strong>
          <span>جاهزة للدراسة</span>
        </div>
      </div>
    </div>`;

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>دلائل الدراسة — Faculty Study Guides</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    .material-symbols-outlined {
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-style: normal;
      font-size: 1.25rem;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      direction: ltr;
      -webkit-font-smoothing: antialiased;
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
    @keyframes hub-fade-in-up {
      from { opacity: 0; transform: translateY(28px); }
      to { opacity: 1; transform: translateY(0); }
    }
    body {
      font-family: 'IBM Plex Sans Arabic', sans-serif;
      margin: 0;
      padding: 0 0 3rem;
      background: linear-gradient(180deg, #f8f6f2 0%, #efe9df 55%, #f8f6f2 100%);
      color: #1a1a1a;
      min-height: 100vh;
    }
    .page-hero {
      text-align: center;
      padding: 2.5rem 1.25rem 2rem;
      background:
        radial-gradient(ellipse 80% 60% at 50% -10%, rgba(201,162,39,.18) 0%, transparent 70%),
        linear-gradient(180deg, #fff 0%, #f8f6f2 100%);
      border-bottom: 1px solid #e8e4dc;
      margin-bottom: 2rem;
    }
    .page-hero h1 {
      margin: 0 0 0.35rem;
      font-size: clamp(1.6rem, 4.5vw, 2.25rem);
      color: #3d3100;
      font-weight: 700;
    }
    .lead { color: #666; margin: 0 0 1.5rem; font-size: 1.05rem; }
    .hero-stats {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.85rem;
      max-width: 720px;
      margin: 0 auto;
    }
    .hero-stat {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      padding: 0.75rem 1.1rem;
      border-radius: 1rem;
      background: #fff;
      border: 1px solid #e8e4dc;
      box-shadow: 0 4px 16px -6px rgba(0,0,0,.08);
      min-width: 9rem;
    }
    .hero-stat__icon {
      font-size: 1.6rem !important;
      color: #c9a227;
      background: #faf4e6;
      padding: 0.45rem;
      border-radius: 0.75rem;
    }
    .hero-stat strong {
      display: block;
      font-size: 1.2rem;
      color: #3d3100;
      line-height: 1.2;
    }
    .hero-stat span {
      font-size: 0.78rem;
      color: #777;
    }
    .year-panel {
      max-width: 1140px;
      margin: 0 auto 2rem;
      padding: 0 1rem;
      animation: hub-fade-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
    }
    .year-panel:nth-of-type(2) { animation-delay: 0.08s; }
    .year-panel:nth-of-type(3) { animation-delay: 0.16s; }
    .year-panel:nth-of-type(4) { animation-delay: 0.24s; }
    .year-panel:nth-of-type(5) { animation-delay: 0.32s; }
    .year-panel:nth-of-type(6) { animation-delay: 0.4s; }
    .year-panel__header {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
      padding: 1.15rem 1.35rem;
      border-radius: 1.25rem 1.25rem 0 0;
      background: linear-gradient(
        135deg,
        color-mix(in srgb, var(--year-fixed) 80%, #fff) 0%,
        #fff 100%
      );
      border: 1px solid color-mix(in srgb, var(--year-primary) 20%, #e8e4dc);
      border-bottom: none;
      position: relative;
      overflow: hidden;
    }
    .year-panel__header::after {
      content: '';
      position: absolute;
      inset: 0 auto auto 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, var(--year-primary), var(--year-secondary));
    }
    .year-panel__badge {
      flex-shrink: 0;
      width: 3.25rem;
      height: 3.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 1rem;
      font-size: 1.5rem;
      font-weight: 800;
      color: #fff;
      background: linear-gradient(145deg, var(--year-primary), var(--year-secondary));
      box-shadow: 0 6px 18px -4px color-mix(in srgb, var(--year-primary) 45%, transparent);
    }
    .year-panel__intro { flex: 1; min-width: 10rem; }
    .year-panel__intro h2 {
      margin: 0 0 0.2rem;
      font-size: 1.2rem;
      color: var(--year-primary);
      font-weight: 700;
    }
    .year-panel__tagline {
      margin: 0;
      font-size: 0.85rem;
      color: #666;
    }
    .year-panel__chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.45rem;
      margin-inline-start: auto;
    }
    .year-panel__chip {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.35rem 0.7rem;
      border-radius: 999px;
      background: color-mix(in srgb, var(--year-fixed) 60%, #fff);
      color: color-mix(in srgb, var(--year-primary) 85%, #333);
      font-size: 0.78rem;
      font-weight: 600;
      border: 1px solid color-mix(in srgb, var(--year-primary) 15%, transparent);
    }
    .year-panel__chip .material-symbols-outlined { font-size: 1rem; }
    .year-panel__body {
      padding: 1.25rem;
      border-radius: 0 0 1.25rem 1.25rem;
      background: #fff;
      border: 1px solid color-mix(in srgb, var(--year-primary) 16%, #e8e4dc);
      border-top: 1px dashed color-mix(in srgb, var(--year-primary) 12%, #e8e4dc);
      box-shadow: 0 10px 32px -14px color-mix(in srgb, var(--year-primary) 18%, transparent);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.25rem;
    }
    .hub-card {
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 1.5rem 1.5rem 1.35rem;
      border-radius: 1.25rem;
      text-decoration: none;
      color: inherit;
      text-align: right;
      border: 1px solid color-mix(in srgb, var(--card-primary) 18%, #e8e4dc);
      background: linear-gradient(
        165deg,
        color-mix(in srgb, var(--card-fixed) 55%, #fff) 0%,
        #fff 58%
      );
      box-shadow: 0 8px 28px -10px color-mix(in srgb, var(--card-primary) 22%, transparent);
      opacity: 0;
      animation: hub-fade-in-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      animation-delay: var(--stagger, 0s);
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }
    .hub-card::before {
      content: '';
      position: absolute;
      inset: 0 auto auto 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, var(--card-primary), var(--card-secondary), var(--card-tertiary));
      opacity: 0.9;
    }
    .hub-card:hover {
      transform: translateY(-4px);
      border-color: color-mix(in srgb, var(--card-primary) 42%, #e8e4dc);
      box-shadow: 0 14px 36px -12px color-mix(in srgb, var(--card-primary) 30%, transparent);
    }
    .hub-card:hover .hub-card__icon {
      transform: scale(1.08) rotate(-3deg);
    }
    .hub-card:hover .hub-card__title { color: var(--card-primary); }
    .hub-card:hover .hub-card__cta .material-symbols-outlined { transform: translateX(-4px); }
    .hub-card--pending {
      border-style: dashed;
      background: linear-gradient(165deg, #faf9f7 0%, #fff 58%);
      box-shadow: 0 6px 20px -12px rgba(0,0,0,.12);
    }
    .hub-card__head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .hub-card__icon {
      flex-shrink: 0;
      width: 3.5rem;
      height: 3.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 1rem;
      background: linear-gradient(145deg, var(--card-fixed), color-mix(in srgb, var(--card-primary) 12%, #fff));
      color: var(--card-primary);
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--card-primary) 14%, transparent);
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .hub-card__icon .material-symbols-outlined { font-size: 2rem; }
    .hub-card__pills {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.4rem;
    }
    .hub-card__pill {
      display: inline-flex;
      align-items: center;
      padding: 0.28rem 0.65rem;
      border-radius: 0.65rem;
      font-size: 0.78rem;
      font-weight: 600;
      line-height: 1.2;
    }
    .hub-card__pill--year {
      background: color-mix(in srgb, var(--card-secondary) 12%, #fff);
      color: var(--card-secondary);
    }
    .hub-card__pill--count {
      background: var(--card-primary);
      color: #fff;
      min-width: 2rem;
      justify-content: center;
      box-shadow: 0 2px 10px color-mix(in srgb, var(--card-primary) 35%, transparent);
    }
    .hub-card--pending .hub-card__pill--count {
      background: #9a8b6a;
      box-shadow: 0 2px 8px rgba(122,101,40,.25);
    }
    .hub-card__title {
      margin: 0 0 0.4rem;
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--card-on-fixed);
      transition: color 0.2s ease;
      line-height: 1.45;
    }
    .hub-card__sub {
      margin: 0 0 0.35rem;
      font-size: 0.9rem;
      color: #666;
      line-height: 1.55;
    }
    .hub-card__meta {
      margin: 0 0 0.75rem;
      font-size: 0.78rem;
      color: #999;
    }
    .hub-card__chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.45rem;
      margin-bottom: 1rem;
    }
    .hub-card__chip {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.3rem 0.65rem;
      border-radius: 999px;
      background: #f3f0ea;
      color: #555;
      font-size: 0.78rem;
    }
    .hub-card__chip .material-symbols-outlined { font-size: 1rem; color: var(--card-primary); }
    .hub-card__chip--pending {
      background: #f0ebe0;
      color: #7a6528;
    }
    .hub-card__cta {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      margin-top: auto;
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--card-primary);
      transition: gap 0.2s ease;
    }
    .hub-card__cta .material-symbols-outlined {
      font-size: 1.15rem;
      transition: transform 0.2s ease;
    }
    .empty { text-align: center; color: #888; padding: 3rem; }
    @media (prefers-reduced-motion: reduce) {
      .hub-card, .year-panel {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
      .hub-card:hover { transform: none; }
      .hub-card:hover .hub-card__icon { transform: none; }
    }
    @media (max-width: 640px) {
      .year-panel__header { flex-direction: column; align-items: flex-start; }
      .year-panel__chips { margin-inline-start: 0; }
    }
  </style>
  <script type="text/javascript">
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;
    t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "xim6tigbcd");
</script>
</head>
<body>
  <header class="page-hero">
    <h1>دلائل الدراسة التفاعلية</h1>
    <p class="lead">اختر المادة للبدء</p>
    ${subjects.length ? heroStats : ''}
  </header>
  <main>
  ${subjects.length ? yearSections : '<p class="empty">لا توجد مواد بعد.</p>'}
  </main>
</body>
</html>`;
}

async function main() {
  await mkdir(DIST, { recursive: true });
  const subjects = await collectHubSubjects();
  const stubs = await ensureSubjectStubs(subjects);
  const html = renderHtml(subjects);
  await writeFile(path.join(DIST, 'index.html'), html);
  console.log(`✓ dist/index.html (${subjects.length} subject(s), ${stubs} stub(s))`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
