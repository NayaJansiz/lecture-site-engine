#!/usr/bin/env node
/**
 * Generate dist/contrib/index.html — Fork + PR (no Collaborator / Write needed on public repo).
 */
import { existsSync } from 'node:fs';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { listAllSubjectDirs, parseSubjectBrief } from './lib/scaffold-subject.mjs';
import { ENGINE_ROOT } from './lib/subject-paths.mjs';

const REPO = (process.env.GITHUB_REPOSITORY || 'Shahd-Abbara/lecture-site-engine');
const MAIN_BRANCH = process.env.GITHUB_BRANCH || 'main';
const GH = `https://github.com/${REPO}`;

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** @param {string} subjectRel */
async function subjectTitle(subjectRel) {
  const briefPath = path.join(ENGINE_ROOT, 'subjects', subjectRel, 'subject-brief.yaml');
  if (existsSync(briefPath)) {
    try {
      const brief = parseSubjectBrief(await readFile(briefPath, 'utf8'));
      if (brief.name_ar) return brief.name_ar;
    } catch { /* ignore */ }
  }
  const manifestPath = path.join(ENGINE_ROOT, 'subjects', subjectRel, 'lectures/manifest.json');
  if (existsSync(manifestPath)) {
    try {
      const m = JSON.parse(await readFile(manifestPath, 'utf8'));
      return m.settings?.subjectName || m.title || subjectRel;
    } catch { /* ignore */ }
  }
  return subjectRel;
}

/** @param {string} subjectRel */
function lecturePath(subjectRel) {
  return `subjects/${subjectRel}/lectures`;
}

async function main() {
  const subjectRels = (await listAllSubjectDirs()).filter(s => {
    const base = path.join(ENGINE_ROOT, 'subjects', s);
    return existsSync(path.join(base, 'lectures'))
      || existsSync(path.join(base, 'subject-brief.yaml'));
  });

  /** @type {{ year: number, id: string, title: string, path: string }[]} */
  const subjects = await Promise.all(subjectRels.map(async id => {
    const year = Number(id.match(/^year-(\d)/)?.[1] || 0);
    return {
      year,
      id,
      title: await subjectTitle(id),
      path: lecturePath(id),
    };
  }));

  subjects.sort((a, b) => a.year - b.year || a.title.localeCompare(b.title, 'ar'));

  const years = [...new Set(subjects.map(s => s.year))].filter(Boolean).sort((a, b) => a - b);
  const subjectsJson = JSON.stringify(subjects).replace(/</g, '\\u003c');

  const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>رفع محاضرة — طريقة سهلة</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'IBM Plex Sans Arabic', sans-serif; margin: 0; padding: 2rem 1.5rem; background: #f0f4f8; color: #1a1a1a; line-height: 1.6; }
    .wrap { max-width: 520px; margin: 0 auto; }
    h1 { font-size: 1.5rem; margin: 0 0 0.5rem; }
    .lead { color: #555; margin: 0 0 1.5rem; font-size: 0.95rem; }
    .panel { background: #fff; border-radius: 12px; padding: 1.25rem 1.5rem; margin-bottom: 1rem; border: 1px solid #dde3ea; }
    .field { margin-bottom: 1rem; }
    .field:last-child { margin-bottom: 0; }
    .field label { display: block; font-weight: 600; margin-bottom: 0.35rem; font-size: 0.9rem; color: #333; }
    .field select { width: 100%; padding: 0.6rem 0.75rem; border-radius: 8px; border: 1px solid #c5d0dc; font-family: inherit; font-size: 1rem; background: #fff; }
    .field select:disabled { background: #f5f7fa; color: #888; }
    .card { display: none; background: #fff; border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; border: 1px solid #dde3ea; }
    .card.is-visible { display: block; }
    .card__title { font-size: 1.05rem; margin: 0 0 0.35rem; color: #1e5a8a; }
    .card__path { font-size: 0.78rem; color: #666; font-family: monospace; margin: 0 0 1rem; word-break: break-all; }
    .actions { display: flex; flex-direction: column; gap: 0.5rem; }
    .btn { display: block; text-align: center; padding: 0.65rem 0.85rem; border-radius: 8px; font-size: 0.95rem; text-decoration: none; background: #e8eef4; color: #1a1a1a; border: 1px solid #c5d0dc; }
    .btn:hover { background: #dce6f0; }
    .btn--primary { background: #1e5a8a; color: #fff; border-color: #1e5a8a; font-weight: 600; }
    .btn--primary:hover { background: #164a72; }
    .btn--ghost { background: transparent; font-size: 0.88rem; }
    .btn.is-disabled { pointer-events: none; opacity: 0.45; }
    .steps { background: #fff; border-radius: 12px; padding: 1.25rem 1.5rem; margin-bottom: 1rem; border: 1px solid #dde3ea; font-size: 0.9rem; }
    .steps ol { margin: 0.5rem 0 0; padding-right: 1.25rem; }
    .steps li { margin-bottom: 0.35rem; }
    .naming { margin-top: 0.75rem; padding: 0.75rem; background: #f5f8fb; border-radius: 8px; font-size: 0.85rem; color: #444; }
    .naming code { background: #e8eef4; padding: 0.1rem 0.35rem; border-radius: 4px; }
    .back { display: inline-block; margin-bottom: 1rem; color: #1e5a8a; text-decoration: none; }
    .note { font-size: 0.85rem; color: #666; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #dde3ea; }
    .note--ok { background: #eef8f0; border: 1px solid #b8dcc0; border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 1rem; color: #1f4d2a; font-size: 0.88rem; }
    .empty { color: #888; text-align: center; padding: 1rem; }
  </style>
</head>
<body>
  <div class="wrap">
    <a class="back" href="../">← الصفحة الرئيسية</a>
    <h1>📤 رفع محاضرة</h1>
    <p class="lead">Fork (مرة واحدة) → رفع المحاضرة → Pull Request. لازم يكونوا <strong>مسجّlin على GitHub</strong>.</p>

    <div class="note--ok">
      <strong>ما بتحتاجي Collaborator.</strong> المستودع Public + Fork + PR يكفي.
      عند الحفظ: اختاروا <strong>Propose changes</strong> / <strong>Create a new branch and start a pull request</strong> — مو حفظ مباشر على <code>main</code>.
    </div>

    <div class="panel">
      <div class="field">
        <label for="yearSelect">١ — السنة الدراسية</label>
        <select id="yearSelect" aria-label="السنة الدراسية">
          <option value="">— اختر السنة —</option>
          ${years.map(y => `<option value="${y}">السنة ${y}</option>`).join('\n          ')}
        </select>
      </div>
      <div class="field">
        <label for="subjectSelect">٢ — المادة</label>
        <select id="subjectSelect" disabled aria-label="المادة">
          <option value="">— اختر المادة —</option>
        </select>
      </div>
    </div>

    <article class="card" id="subjectCard" aria-live="polite">
      <h2 class="card__title" id="cardTitle"></h2>
      <p class="card__path" id="cardPath"></p>
      <div class="actions">
        <a class="btn btn--primary is-disabled" id="btnFork" href="#" target="_blank" rel="noopener">① Fork المستودع (مرة واحدة)</a>
        <a class="btn btn--primary is-disabled" id="btnSubmit" href="#" target="_blank" rel="noopener">② رفع محاضرة (parN.md)</a>
        <a class="btn is-disabled" id="btnPr" href="#" target="_blank" rel="noopener">③ فتح Pull Request</a>
        <a class="btn btn--ghost is-disabled" id="btnFolder" href="#" target="_blank" rel="noopener">📁 عرض مجلد المحاضرات</a>
      </div>
    </article>

    <div class="steps">
      <strong>الخطوات بالترتيب:</strong>
      <ol>
        <li>سجّل دخول على <a href="https://github.com/login" target="_blank" rel="noopener">GitHub</a></li>
        <li>① <strong>Fork المستودع</strong> — مرة واحدة لكل حساب</li>
        <li>② <strong>رفع محاضرة</strong> — يفتح محرّر؛ غيّروا <code>parN.md</code> لرقم المحاضرة</li>
        <li>الصقوا المحتوى → Commit → اختاروا <strong>Propose changes</strong> / <strong>start a pull request</strong></li>
        <li>③ أو اضغطوا <strong>فتح Pull Request</strong> بعد الحفظ</li>
        <li>بعد CI → أنتِ Merge → الموقع يتحدّث</li>
      </ol>
      <div class="naming">
        <strong>تسمية الملف:</strong><br>
        <code>parN.md</code> — محاضرة كاملة<br>
        <code>parN-secM.md</code> — جزء من محاضرة<br>
        <span style="color:#666">مثال: <code>par1.md</code> · <code>par1-sec1.md</code></span>
      </div>
    </div>

    ${subjects.length ? '' : '<p class="empty">لا توجد مواد بعد.</p>'}

    <p class="note">
      لا تحتاج تعديل <code>manifest.json</code> — يُزامَن تلقائياً عند الـ PR.
    </p>
  </div>
  <script>
    const GH = ${JSON.stringify(GH)};
    const MAIN_BRANCH = ${JSON.stringify(MAIN_BRANCH)};
    const SUBJECTS = ${subjectsJson};

    const yearSelect = document.getElementById('yearSelect');
    const subjectSelect = document.getElementById('subjectSelect');
    const card = document.getElementById('subjectCard');
    const cardTitle = document.getElementById('cardTitle');
    const cardPath = document.getElementById('cardPath');
    const btnFork = document.getElementById('btnFork');
    const btnSubmit = document.getElementById('btnSubmit');
    const btnPr = document.getElementById('btnPr');
    const btnFolder = document.getElementById('btnFolder');

    function encPath(folder) {
      return folder.split('/').map(encodeURIComponent).join('/');
    }

    /** Full file path in URL — works even when lectures/ was just scaffolded. */
    function contribUrls(s) {
      const filePath = s.path + '/parN.md';
      return {
        fork: GH + '/fork',
        newPar: GH + '/new/' + encodeURIComponent(MAIN_BRANCH) + '/' + encPath(filePath),
        openPr: GH + '/compare/' + encodeURIComponent(MAIN_BRANCH) + '?expand=1',
        folder: GH + '/tree/' + encodeURIComponent(MAIN_BRANCH) + '/' + encPath(s.path),
      };
    }

    function setBtn(btn, href, on) {
      btn.href = href || '#';
      btn.classList.toggle('is-disabled', !on);
    }

    function hideCard() {
      card.classList.remove('is-visible');
      setBtn(btnFork, '#', false);
      setBtn(btnSubmit, '#', false);
      setBtn(btnPr, '#', false);
      setBtn(btnFolder, '#', false);
    }

    function showSubject(s) {
      const urls = contribUrls(s);
      cardTitle.textContent = s.title;
      cardPath.textContent = s.path + '/parN.md';
      setBtn(btnFork, urls.fork, true);
      setBtn(btnSubmit, urls.newPar, true);
      setBtn(btnPr, urls.openPr, true);
      setBtn(btnFolder, urls.folder, true);
      card.classList.add('is-visible');
    }

    yearSelect.addEventListener('change', () => {
      const y = Number(yearSelect.value);
      subjectSelect.innerHTML = '<option value="">— اختر المادة —</option>';
      hideCard();
      if (!y) {
        subjectSelect.disabled = true;
        return;
      }
      const list = SUBJECTS.filter(s => s.year === y);
      for (const s of list) {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.title;
        subjectSelect.appendChild(opt);
      }
      subjectSelect.disabled = list.length === 0;
    });

    subjectSelect.addEventListener('change', () => {
      const s = SUBJECTS.find(x => x.id === subjectSelect.value);
      if (s) showSubject(s);
      else hideCard();
    });

    if (!SUBJECTS.length) {
      yearSelect.disabled = true;
    }
  </script>
</body>
</html>`;

  const outDir = path.join(ENGINE_ROOT, 'dist', 'contrib');
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), html);
  console.log(`✓ dist/contrib/index.html (${subjects.length} subject(s), ${years.length} year(s))`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
