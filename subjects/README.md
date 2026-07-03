# Subjects

Content-only folders — one subject per directory inside a **year** folder.

```
subjects/
├── _template/          # Copy to create a new subject
├── year-1/             # First year courses (empty — add subjects here)
├── year-2/
├── year-3/
├── year-4/
└── year-5/
```

## Add a new subject

```bash
mkdir -p subjects/year-4/my-subject
# Add subject-brief.yaml + custom_prompt.md (optional)
npm run scaffold          # creates lectures/, manifest.json, guide-config.js
# Add lectures/par1.md …
npm run validate -- --subject year-4/my-subject
npm run build -- --subject year-4/my-subject
```

`npm run scaffold` also runs automatically before validate, build, and deploy.

## Contributor rules

- Only add/edit `lectures/parN.md` or `parN-secM.md` (N = رقم المحاضرة، M = رقم الجزء)
- Filename examples: `par1.md`, `par5-sec1.md`, `par5-sec2.md`
- Do not hand-edit `manifest.json` `files` — auto-synced on validate/build/CI
- Do not modify `parser/`, `renderer/`, or `site-shell/`
