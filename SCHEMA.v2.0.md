# Lecture Site Schema v2.0

Fixed contract between AI extraction prompts and site parsers. **One canonical form per block — no alternates.**

**Changes from v1.0:**
- Rendering metadata (invisible HTML comments) for template engine guidance
- Coverage tracking metadata (@coverage, @missing-pieces, @additions)
- Collapsible original text block (optional, replaces inline "النص الأصلي يقول")
- Progressive disclosure section structure (with clearer visual hierarchy)
- Support for visualization hints (type, layout, connectivity)

---

## 0. Inline formatting rules

- **Always leave one blank line before a bulleted or numbered list.**
- Use `**bold**` for key technical terms on first mention.
- Use `==term==` (double equals) for maximum emphasis (sparingly).

---

## 1. Heading hierarchy

| Level | Syntax | Purpose |
| --- | --- | --- |
| Lecture | `# {unit_label} {num} — {title_en} ({title_ar})` | One lecture per file |
| Part | `## {part_heading}` | Major section (detail, MCQ, exercises…) |
| Section | `### {N}. {title}` | Numbered topic (TOC anchor) |
| Block | `#### {marker}` | Sub-block inside a section |

**Intro blockquote** (optional, before first `##`):
```markdown
> **المادة:** {subject} | **الموضوع:** {topic}
```

---

## 2. Part titles (parser detection)

**Comprehensive Summary (Part 1) Detection:**
- Title must contain: `ملخص` or `summary` or `منظم`
- Triggers flowing, non-structured layout
- Single continuous narrative (no forced sections)

**Other Part Types:**
- Same as v1.0 — keywords in title determine part type (mcq, exercise, detail, etc.)

**Order in lecture file:**
1. Comprehensive Summary (Part 1) — ALWAYS FIRST
2. Detail explanations (Part 2)
3. MCQ (Part 3)
4. Q&A Cards (Part 4)
5. Cheat Sheet (Part 5)

---

## 3. NEW IN v2.0: Rendering Metadata (Invisible Comments)

Every section (`###`) should open with metadata comment(s) that guide the rendering engine:

```markdown
### 1.1. Topic Name
<!-- @render: {type: "prose-first", visualization: "none", layout: "inline", coverage: "95%"} -->
<!-- @source: lecture_section_1.1 -->
<!-- @missing-pieces: ["edge case X"] -->
<!-- @additions: ["analogy (not in lecture)"] -->
```

**Metadata fields:**

| Field | Values | Purpose |
| --- | --- | --- |
| `type` | `prose-first` \| `equation-first` \| `code-first` \| `diagram-first` \| `hybrid` | Determines content ordering (what goes first?) |
| `visualization` | `none` \| `inline-diagram` \| `algorithm-steps` \| `cycle` \| `sequence` \| `tree` \| `comparison-table` | What visual aid is needed? |
| `layout` | `full-width` \| `inline` \| `progressive-disclosure` | How should this render? |
| `coverage` | `"95%"` | What % of original lecture is explained? |
| `connectivity` | `{prerequisite: "topic-X", connects-to: ["Y", "Z"]}` | Topic relationships |
| `source` | `lecture_section_X.Y` | Where in original lecture this came from |
| `missing-pieces` | `["concept A", "edge case B"]` | What wasn't explained (and why) |
| `additions` | `["analogy (from guide)"]` | What was added beyond the lecture |

**Coverage threshold:** If `coverage < 90%`, must include `⚠️` badge in collapsible original text.

---

## 4. Comprehensive Summary Part (Part 1) — NEW STRUCTURE

**Comprehensive Summary is NOT a traditional "part"** — it's a standalone, flowing study guide.

**Characteristics:**
- Self-contained (reader doesn't need to read full lecture)
- Natural flow (combines related ideas, not lecture order)
- Casual tone (not academic, friendly)
- For tired/not-sharp students
- Explains ALL main concepts fully, but concisely

**Structure (NO forced section breaks):**

```markdown
## {summary.heading}

> **هذا الملخص لشخص مو فاهم كتير أو تعبان أو مو قادر يركز**

### The Big Idea
[One sentence: What's this lecture about?]

### لماذا يهمك هذا؟
[1-2 sentences: Why do you need to understand this?]

### الحاجات اللي تحتاج تعرفها قبل البداية
[Prerequisite concepts from earlier lectures]

### الآن، هذا اللي بيحصل:
[Main explanation — flows naturally, combines related lecture sections, casual tone.
Not rigidly structured. Use examples. Explain the why.]

### الأخطاء اللي الناس دايماً تقع فيها
- ❌ Common misconception
- ✅ Correct understanding

### لما تحتاج هذا في الامتحان
[Expected exam questions]

### الخطوة التالية
[What's next? What you need for the next lecture?]

### Summary — اللي تحتاج تتذكره
- Key point 1
- Key point 2
```

**Key Rules for Comprehensive Summary:**
- ✅ NO rigid section numbering (### 1.1, 1.2, etc.)
- ✅ Combine related lecture sections into flowing paragraphs
- ✅ Casual, conversational Arabic
- ✅ Real examples, not textbook examples
- ✅ Short paragraphs (2-3 lines max)
- ✅ Whitespace between ideas
- ✅ Explains "why" not just "what"
- ❌ No metadata comments (<!-- @render ... -->)
- ❌ No collapsible original text (not a detail section)
- ❌ No formal academic tone

---

## 5. Section Structure Template (v2.0) — For Detail Sections

Each `### {num}. Topic` section in the DETAIL part should follow this order:

```markdown
### 1.1. Topic Name
<!-- @render: {type: "...", visualization: "...", coverage: "..."} -->
<!-- @connectivity: {prerequisite: "..."} -->

#### 📍 أين نحن الآن؟
[One sentence — what is this topic about?]

#### ⬅️ الربط مع السابق
[One sentence — what previous topic should you remember? How does this connect?]
[**This replaces "النص الأصلي يقول" as the opening element**]

#### 💡 الفكرة الأساسية
**[One sentence core idea — BOLD, HIGH CONTRAST]**

---

#### [Content section — varies by content_type]
[If type: "equation-first" → formula/definition here]
[If type: "code-first" → code/pseudocode here]
[If type: "diagram-first" → diagram here]
[If type: "prose-first" → prose explanation here]

#### 📖 الشرح
[2-4 short paragraphs, broken for readability]

#### 🎯 الملخص السريع
- Key point 1
- Key point 2
- Key point 3

#### 📚 التطبيق
[Where is this used next? Connection to future topics?]

#### ⚠️ أخطاء شائعة

```markdown
#### الفهم الخاطئ ❌:
[misconception]

#### الفهم الصحيح ✅:
[correct understanding]
```

#### ⚠️ تنبيه بصري (Visual Reference Alert)
[Optional — only if a diagram/photo/chart is essential to understand this topic]

```markdown
#### ⚠️ تنبيه:
هذا الموضوع موضح أفضل بكثير من الرسمة/الصورة في الصفحة X من ملف المحاضرة الأصلية — يجب أن تشوفها هناك.
```

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 95%)</summary>

**النص الأصلي يقول:**
> [EXACT QUOTE — verbatim from lecture]

**ملاحظة على التغطية:**
- ✓ تم شرح: [concepts covered]
- ⚠️ غير مشروح بالكامل: [why?]
- ℹ️ إضافة من الدليل: [what was added]

</details>
```

**Key changes:**
1. ✅ Metadata at top (invisible comments)
2. ✅ "⬅️ الربط" replaces "النص الأصلي يقول" at opening
3. ✅ "💡 الفكرة الأساسية" — one sentence, bold, high-visibility
4. ✅ Content type determines order of subsequent elements
5. ✅ "📄 النص الأصلي" moved to **collapsible <details> block** at end
6. ✅ Coverage tracking in collapsible header

---

## 5. Block markers (Detail sections)

### Callouts

```markdown
#### مهم للامتحان ⚠️:
> [reinforcement]

#### نقطة مهمة ⚠️:
> [key insight]

#### ملاحظة:
> [side note]

#### الدرس المستفاد:
> [takeaway]
```

### Compare (wrong vs right)

```markdown
**الفهم الخاطئ الشائع ❌:** [misconception]
**الفهم الصحيح ✅:** [correct understanding]
```

### Code block

```markdown
#### 💻 الكود: [title]

#### ما هذا الكود؟
> [1–3 sentences]

```kotlin
// English comment per line
fun main() { println("Hi") }
```

#### شرح كل سطر:
1. `fun` → [explanation]
2. `main` → [explanation]

**المكتبات المطلوبة:**
> `import ...`

**الناتج المتوقع:**
> [expected output]
```

### Algorithm (ordered steps)

```markdown
#### ⚙️ الخطوات / الخوارزمية: [title]

#### ما هدف هذه العملية؟
> [1–2 sentences]

```algorithm
1 | Step title | Tool/Method | What happens
2 | Step title | Tool/Method | What happens
```

#### نقاط التنفيذ:
- [constraints, edge cases]
```

### Diagram

```markdown
#### 📊 المخطط: [title]

#### ما هذا المخطط؟
> [1–3 sentences]

#### وصف العُقد:
| # | العُقدة | النوع | الشرح |
| --- | --- | --- | --- |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |

```diagram
type: flowchart
nodes:
  - id: A
    label: Start
relationships:
  - from: A
    to: B
    label: yes
```
```

**Diagram types:** `flowchart` | `bpmn` | `decision-tree` | `dfd` | `usecase` | `class` | `activity` | `cycle` | `sequence` | `tree`

### Trace (inline walk-through)

```markdown
#### 🔍 تتبع التنفيذ: [title]

#### المدخل:
> [Initial state / input]

#### خطوات التنفيذ:
| الخطوة | العملية | الحالة |
| 1 | [operation] | [state after] |
| 2 | [operation] | [state after] |

#### النتيجة النهائية:
> [Output]
```

### Analogy (daily-life comparison)

```markdown
#### 💡 التشبيه:
> [Concept] أشبه بـ [everyday example]
> **وجه الشبه:** [Mapping: X = Y]
```

### Trade-off (both options valid)

```markdown
#### ⚖️ المقايضة:

| المعيار | الخيار أ | الخيار ب |
| --- | --- | --- |
| **السرعة** | سريع جداً | أبطأ |
| **سهولة الاستخدام** | معقد | سهل |
| **متى تختاره؟** | عندما تحتاج السرعة | عندما تحتاج البساطة |
```

### Before-After (state transformation)

```markdown
#### 🔄 قبل / بعد:

**قبل:**
```kotlin
val x = 5
var y = x
```

**بعد:**
```kotlin
val x = 5
val y = x  // changed var to val
```

**ماذا تغيّر؟**
> Immutability enforced; compiler prevents reassignment.
```

### Equations

```markdown
#### 📐 المعادلة: [title]

$$
\text{formula} = \text{expression}
$$

#### الشرح:
- **الرمز A:** معنى A
- **الرمز B:** معنى B
```

For inline short formulas: `$x = 5$`

### Fill gaps (incomplete code/steps)

```markdown
#### ملء الفراغات:

```kotlin
fun calculate(x: Int) {
    val result = _______  // (1)
    println(_______)      // (2)
}
```

**نموذج الحل:**
```kotlin
fun calculate(x: Int) {
    val result = x * 2
    println(result)
}
```
```

### Code fix (wrong → correct)

```markdown
#### تصحيح الكود:

**الكود الخاطئ:**
```kotlin
fun add(a: Int, b: String) {  // type mismatch
    return a + b
}
```

**التصحيح:**
```kotlin
fun add(a: Int, b: Int): Int {
    return a + b
}
```

**الشرح:**
- Parameter `b` must be `Int` (not `String`)
- Return type declared as `Int`
```

---

## 6. MCQ Format

```markdown
### السؤال 1 (متوسط)

[Question text with code/diagram if needed]

أ) [Option A]
ب) [Option B]
ج) [Option C]
د) [Option D]

**الإجابة الصحيحة:** [Letter]

**التعليل:**
- ✅ **الخيار [Letter]:** [Why it's correct]
- ❌ **الخيار [Letter]:** [Why wrong]
- ❌ **الخيار [Letter]:** [Why wrong]
- ❌ **الخيار [Letter]:** [Why wrong]
```

---

## 7. Trace Exercise (practice problem)

```markdown
### تمرين تتبع 1

#### المدخل:
> [Initial state / input]

#### أكمل الجدول:
| الخطوة | العملية | الحالة |
| 1 | [?] | [?] |
| 2 | [?] | [?] |
| 3 | [?] | [?] |

#### نموذج الحل:
| الخطوة | العملية | الحالة |
| 1 | [filled] | [filled] |
| 2 | [filled] | [filled] |
| 3 | [filled] | [filled] |

#### النتيجة النهائية:
> [Output]
```

---

## 8. Summary Part Structure

Standard subsections:

```markdown
## الجزء الثاني: ملخص منظم

### تعريفات
| المصطلح | التعريف |
| --- | --- |

### مكونات
| المكون | الشرح |
| --- | --- |

### مقارنات
| المعيار | الخيار أ | الخيار ب |
| --- | --- | --- |

### مصطلحات (Glossary)
| الإنجليزية | العربية | الشرح |
| --- | --- | --- |

### نقاط ذهبية
- [Key insight 1]
- [Key insight 2]

### أخطاء شائعة
- ❌ Misconception 1
- ✅ Correct concept 1

### خطوات وإجراءات المحاضرة

#### الإجراء 1: [name]
```algorithm
1 | Step | Tool | Result
2 | Step | Tool | Result
```

#### الإجراء 2: [name]
```algorithm
1 | Step | Tool | Result
```

### أنماط الأكواد
[Code patterns used in lecture, with examples]

### أنماط التعامل
[Patterns, best practices, workflows]

### الأفكار الشاملة
[Overarching concepts not captured above]
```

---

## 9. Checklist Part

```markdown
## الجزء السادس: قائمة فحص ذاتي

- [ ] أفهم مفهوم X
- [ ] يمكنني تطبيق Y
- [ ] أعرف الفرق بين A و B
- [ ] استطيع حل مسألة من نوع Z
```

---

## 10. Cheat Sheet Part

```markdown
## ورقة المراجعة السريعة

### جدول سريع: X

| المعيار | الخيار أ | الخيار ب |
| --- | --- | --- |

### قواعد ذهبية
- Rule 1
- Rule 2

### مرجع سريع
[Concise reference for studying]
```

---

## 11. Q&A Cards Part

```markdown
## بطاقات سؤال وجواب

### البطاقة 1
**Q1:** سؤال؟
**A:** إجابة مختصرة.

### البطاقة 2
**Q2:** سؤال؟
**A:** إجابة مختصرة.
```

---

## 12. Validation Footer (Optional)

If `output.validation_footer: true`:

```markdown
<!-- VALIDATION
schema: 2.0
parts: [detail, mcq, exercise, trace_exercise, theory, qa_cards, cheat_sheet]
mcq_count: 16
code_blocks: 5
coverage_metadata: true
original_text_collapsible: true
-->
```

---

## v2.0 Summary

| Feature | v1.0 | v2.0 |
| --- | --- | --- |
| Section structure | Inline original text + explanation | Progressive disclosure with metadata |
| Original text display | Always visible box | Collapsible <details> (end of section) |
| Coverage tracking | None | @coverage, @missing-pieces, @additions metadata |
| Rendering hints | None | <!-- @render: {...} --> comments |
| Connectivity | Implicit | Explicit metadata: prerequisite, connects-to |
| Content ordering | Fixed (prose always first) | Flexible: equation-first, code-first, diagram-first |

---

**Parser contract: One canonical form per block — no alternates.**

---

## Comprehensive Summary vs Detail Sections — Key Differences

| Aspect | Comprehensive Summary (Part 1) | Detail Sections (Part 2) |
| --- | --- | --- |
| **Structure** | Natural flowing narrative | Rigid section structure (### 1.1, 1.2, etc.) |
| **Metadata** | None | Full metadata comments (@render, @coverage, etc.) |
| **Section headers** | Few, only for logical flow | Many, numbered hierarchically |
| **Combining ideas** | ✅ Combine related lecture sections | ❌ One section = one topic strictly |
| **Tone** | Casual, conversational | Professional, structured |
| **Purpose** | Standalone study guide | Detailed reference with original text |
| **Original text** | NOT included | Collapsible <details> block at end |
| **Reader expectation** | "Read only this" | "Read this for detail + original quote" |
