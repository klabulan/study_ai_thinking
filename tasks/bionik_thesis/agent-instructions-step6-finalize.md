# Agent Instructions: Format for Submission & Final Verification

## Content Type: Final Thesis Formatting (MS Word .docx)

## Task Overview
Create final submission-ready thesis file:
1. **Convert** thesis_draft.md → MS Word .docx format
2. **Apply** RINC formatting specifications exactly
3. **Verify** all technical requirements met
4. **Prepare** submission checklist for user

## Context Files to Read (MANDATORY)

### Final Content
1. **tasks/bionik_thesis/thesis_draft.md**
   - Final revised content (after Step 5)
   - All sections complete

### Formatting Requirements
2. **tasks/bionik_thesis/requirements.md**
   - RINC technical specifications
   - MS Word formatting rules
   - Page layout requirements

### Metadata
3. **tasks/bionik_thesis/metadata_draft.md**
   - УДК, title, annotation, keywords
   - To be included in final document

---

## CRITICAL: MS Word Formatting Specifications

### Page Setup (Must match exactly)

```
Paper size: A4 (210 × 297 mm)
Margins: 2 cm (all sides) - top, bottom, left, right
Font: Times New Roman
Font size: 12 pt
Line spacing: 1.5 lines (полуторный интервал)
Alignment: Justified (по ширине) for body text
Paragraph indent: 1.25 cm first line (for body paragraphs)
```

### Section Formatting Rules

**УДК (one line):**
- Alignment: Left
- Font: Times New Roman, 12pt
- No bold
- Example: `УДК 007.52`

**Title (Заголовок):**
- Alignment: Center
- Font: Times New Roman, 12pt, **Bold**
- Line spacing: 1.5
- No all caps (use sentence case with capitals as appropriate)

**Author Information (Сведения об авторах):**
- Alignment: Left
- Font: Times New Roman, 12pt
- Superscript numbers for affiliations
- Email in same line as name
- SPIN-код on separate line (if provided)
- Affiliation lines: numbered with superscript, full organization name

**Annotation (Аннотация):**
- Alignment: Justified
- Font: Times New Roman, 12pt
- First line indent: 1.25 cm
- Label "Аннотация." in bold at start

**Keywords (Ключевые слова):**
- Alignment: Justified
- Font: Times New Roman, 12pt
- First line indent: 1.25 cm
- Label "Ключевые слова:" in bold
- Keywords separated by commas, ending with period

**Section Headers (Введение, Методы и материалы; результаты, Заключение):**
- Alignment: Left (no centering)
- Font: Times New Roman, 12pt, **Bold**
- Followed by period and space, then text continues on same line ("в подбор к тексту")
- Example: `**Введение.** Текст введения начинается здесь...`

**Body Text:**
- Alignment: Justified
- Font: Times New Roman, 12pt
- Line spacing: 1.5
- First line indent: 1.25 cm (except after section headers)
- No manual line breaks within paragraphs

**References (Список источников):**
- Header "Список источников" - Bold, followed by text on next line (not "в подбор")
- Each reference: hanging indent 1.25 cm (first line flush left, subsequent lines indented)
- Font: Times New Roman, 12pt
- Line spacing: 1.5
- Numbering: [1], [2], [3] in square brackets, bold

---

## Step-by-Step Formatting Process

### Step 1: Create MS Word Document Structure

**Create new .docx file:** papers/bionik_thesis/thesis_v1.docx

**Set page layout:**
1. Page Setup → Margins → Custom: 2cm all sides
2. Font: Times New Roman, 12pt (set as default for document)
3. Line spacing: 1.5 lines (set as default)
4. Alignment: Justified (default for body paragraphs)

### Step 2: Insert Metadata Section

Copy from metadata_draft.md and format:

```
УДК [code]
[blank line]
[Title - centered, bold]
[blank line]
[Author name]¹(*) email@example.com
SPIN-код: XXXX-XXXX (if provided, otherwise omit this line)
[blank line]
¹ [Organization], [City], Россия
[blank line]
Аннотация. [Annotation text - justified, first line indent]
[blank line]
Ключевые слова: [keyword1], [keyword2], [keyword3], [keyword4], [keyword5], [keyword6], [keyword7].
```

**Formatting checklist:**
- [ ] УДК: left-aligned, no bold
- [ ] Title: centered, bold
- [ ] Author superscript numbers formatted (use Superscript feature)
- [ ] Annotation: "Аннотация." bold, text justified with first-line indent
- [ ] Keywords: "Ключевые слова:" bold, justified with first-line indent, comma-separated

### Step 3: Insert Main Text Sections

For each section (Введение, Методы и материалы; результаты, Заключение):

**Format:**
```
**Введение.** [Text begins immediately after period and space, same line]
[Continue paragraph text with justified alignment, first-line indent 1.25cm]

[Subsequent paragraphs also justified with first-line indent]
```

**Critical "в подбор" rule:**
- Section header (e.g., "Введение.") and text START on same line
- NOT separate lines (header then text below)

**Formatting checklist per section:**
- [ ] Header: Bold, followed by period
- [ ] Text starts same line as header (в подбор)
- [ ] Body text: justified, 1.5 line spacing, first-line indent
- [ ] No manual line breaks within paragraphs
- [ ] Citations [1], [2], [3] formatted consistently

### Step 4: Insert References Section

**Format Список источников:**

```
Список источников
[blank line]
[1] [First reference with hanging indent]
[2] [Second reference with hanging indent]
[3] [Third reference with hanging indent]
```

**Hanging indent setup:**
1. Select reference text
2. Paragraph → Indentation → Special: Hanging, By: 1.25cm
3. Effect: [1] is flush left, subsequent lines of same reference indented

**Formatting checklist:**
- [ ] Header "Список источников" - bold, on separate line (exception to "в подбор" rule)
- [ ] Each reference: [N] in square brackets, bold
- [ ] Hanging indent: 1.25cm for each reference
- [ ] English sources: DOI included as clickable hyperlink (allowed in references)
- [ ] Proper spacing between references (single blank line)

### Step 5: Technical Verification

**Character count verification:**

MS Word character count (with spaces):
1. Select main text only (Введение through Заключение, excluding metadata and references)
2. Tools → Word Count → Characters (with spaces)
3. Verify: 2500-3500 characters ✅

**Page count verification:**
- Target: 1.5-2 pages total (including all sections)
- Check: Print Preview or Page Layout view
- If >2 pages: Condense (Step 5 revision needed)
- If <1.5 pages: Verify character count is still ≥2500

**Font consistency check:**
- [ ] All text: Times New Roman, 12pt
- [ ] No accidentally bolded body text
- [ ] No font size variations (common copy-paste error)

**Spacing consistency check:**
- [ ] All body text: 1.5 line spacing
- [ ] No double spaces between sentences (use single space)
- [ ] No extra blank lines within sections

### Step 6: Forbidden Elements Check

**Must NOT contain (RINC violations):**
- [ ] ❌ Hyperlinks in body text (only allowed in Список источников)
- [ ] ❌ Section breaks (continuous text flow required)
- [ ] ❌ Tables (if any used, verify <20% of text and proper format)
- [ ] ❌ Multiple fonts
- [ ] ❌ Colored text (black only, except hyperlinks)
- [ ] ❌ Headers/footers (none allowed)
- [ ] ❌ Page numbers (conference will add)

### Step 7: Final Quality Pass

**Read entire document in Word:**
1. Check for formatting inconsistencies
2. Verify superscript numbers display correctly
3. Check citation brackets: [1] not (1) or 1.
4. Verify no orphaned section headers (header at bottom of page, text on next)
5. Spell-check (Russian language setting)

**Compare against RINC example** (from requirements.md):
- Layout matches example structure?
- Section headers formatted identically?
- References match example format?

---

## Submission Checklist Creation

### Output File: submission_checklist.md

Create comprehensive checklist for user:

```markdown
# Submission Checklist - Bionics-2025 Conference

## ✅ THESIS DOCUMENT READY

**File:** papers/bionik_thesis/thesis_v1.docx
**Status:** Ready for submission

### Technical Requirements Verified
- [✅] Format: MS Word .docx (not .pdf)
- [✅] Page size: A4
- [✅] Margins: 2cm all sides
- [✅] Font: Times New Roman, 12pt
- [✅] Line spacing: 1.5
- [✅] Page count: [X] pages (1.5-2 target ✅)
- [✅] Character count: [Y] characters with spaces (2500+ ✅)

### Content Requirements Verified
- [✅] УДК code: [code]
- [✅] Title: [X] words (6-15 ✅)
- [✅] Author template: Provided (USER MUST COMPLETE)
- [✅] Annotation: ~600 characters ✅
- [✅] Keywords: [N] keywords (5-7 ✅)
- [✅] Введение: All required elements present
- [✅] Методы и материалы; результаты: Complete
- [✅] Заключение: Complete, no repetition
- [✅] Список источников: [N] sources (minimum 3 ✅)

---

## ⚠️ USER ACTION REQUIRED

### 1. Complete Author Information

**Open:** papers/bionik_thesis/thesis_v1.docx
**Section:** Author information (Сведения об авторах)

**Replace template with:**
```
[Your Full Name in Russian: Фамилия Имя Отчество]¹(*) [your.email@example.com]
SPIN-код: [Your SPIN code if registered, or delete this line]

¹ [Your organization full name], [City], Россия
```

**Example:**
```
Иванов Иван Иванович¹(*) ivanov@bmstu.ru
SPIN-код: 1234-5678

¹ МГТУ им. Н.Э. Баумана, Москва, Россия
```

**Notes:**
- (*) marks corresponding author (person for correspondence)
- Superscript ¹ connects name to affiliation
- SPIN-код: Russian Science Citation Index ID (if registered)
- Include FULL organization name (not abbreviation unless official)

---

### 2. Obtain Required Document

**Required:** Заключение о возможности открытого опубликования

**What it is:**
- Official letter from your organization
- Confirms permission to publicly publish this work
- Required by all RINC-indexed conferences

**How to obtain:**
- Contact your organization's research department / scientific secretary
- Provide them with thesis title and abstract
- They will issue formal letter/stamp

**CRITICAL:** Conference will NOT accept submission without this document.

---

### 3. Register & Submit

**Deadlines:**
- **Submission deadline:** October 1, 2025
- **Conference dates:** October 29-31, 2025

**Step 1: Register on conference website**
- **Primary URL:** http://biomimetic.wixsite.com/conference
- Complete registration form
- Indicate section: **Section #1 - Theoretical Bionics (Biocybernetics)**
  - (Alternative: Section #4 - Humanitarian Bionics if instructed)

**Step 2: Submit thesis to congress portal**
- **Portal URL:** https://rusengineer.bmstu.ru/
- Upload: papers/bionik_thesis/thesis_v1.docx (completed with your author info)
- Upload: Заключение о возможности открытого опубликования
- Follow portal instructions for submission

**Step 3: Confirm registration**
- Check email for confirmation
- Verify thesis appears in your portal account
- Note any additional requirements from organizers

---

## 📋 PRE-SUBMISSION VERIFICATION

**Before uploading thesis_v1.docx, verify:**

### Content Accuracy
- [ ] Your name and email correct in document
- [ ] Organization affiliation correct and complete
- [ ] SPIN-код correct (or line deleted if not applicable)
- [ ] УДК code: [code from thesis]
- [ ] All statistics accurate (cross-checked against sources)

### Formatting Compliance
- [ ] Open document in MS Word (not Google Docs or other)
- [ ] Verify layout looks professional and matches RINC example
- [ ] Check no weird formatting artifacts (especially if copy-pasted)
- [ ] Print preview: looks like 1.5-2 pages
- [ ] No red underlines (spell-check passed for Russian text)

### File Check
- [ ] File name appropriate: "thesis_bionik2025_[YourLastName].docx" (rename from thesis_v1.docx)
- [ ] File size reasonable (<1 MB for text-only document)
- [ ] File opens correctly in MS Word 2007 or later

---

## 📞 CONTACT INFORMATION

**If questions about:**

**General questions, submissions, publications:**
- Юрий Тихонович Каганов
- Phone: +7-925-860-59-97
- Email: yurijkaganov@gmail.com

**Conference organization:**
- Сергей Владимирович Рубцов
- Phone: +7-916-615-17-42
- Email: eco-ark@list.ru

**Conference website:**
- http://biomimetic.wixsite.com/conference

**Congress website:**
- https://rusengineer.bmstu.ru/

---

## 🎯 TARGET CONFERENCE SECTION

**Recommended: Section #1 - Theoretical Bionics (Biocybernetics)**

**Section description:**
> Бионика теоретическая (математическая) или метабионика, включая биоинформатику, биокибернетику, философско-методологические вопросы бионики

**Why this section:**
- Thesis frames AI-human interaction as biocybernetic system
- Uses cybernetic terminology (feedback, regulation, system adaptation)
- Theoretical rather than applied focus
- Aligns with biocybernetics subfield

**Alternative: Section #4 - Humanitarian Bionics (Psychology)**
- If reviewers suggest better fit
- Psychology with bionic methods angle
- Only use if Section #1 acceptance uncertain

---

## 💾 BACKUP & VERSION CONTROL

**Keep these files safe:**

**Primary deliverable:**
- papers/bionik_thesis/thesis_v1.docx (with your completed info)

**Task memory (reference):**
- tasks/bionik_thesis/plan.md (planning document)
- tasks/bionik_thesis/thesis_draft.md (working version)
- tasks/bionik_thesis/source_selection.md (selected sources rationale)
- tasks/bionik_thesis/bionics_positioning.md (biocybernetic framing)
- tasks/bionik_thesis/review_feedback.md (quality review)

**Source material:**
- papers/blog1/post1_bias/DRAFT_v3_RU.md (original blog post)

**Recommendation:** Back up entire tasks/bionik_thesis/ folder before submission.

---

## ✉️ POST-SUBMISSION

**After submission:**
1. Save confirmation email from conference
2. Check submission status on https://rusengineer.bmstu.ru/ regularly
3. Be prepared to make revisions if reviewers request (2-week typical turnaround)
4. Mark calendar: October 29-31, 2025 (conference dates)
5. Decide: In-person (Moscow, МГТУ им. Н.Э. Баумана) or remote participation

**Publication timeline:**
- Тезисы (current submission): Published before conference start (electronic + print)
- Indexed in РИНЦ: Automatic after publication
- Полные тексты (full papers): If invited after conference, separate submission
- Both 2024 and 2025 accepted papers: Published in unified congress proceedings by end of 2025

---

## 🎓 ACADEMIC CONTEXT

**Publication venue:**
- Conference: "Бионика-2025" (5th International Scientific-Practical Conference)
- Congress: "Русский Инженер" (Russian Engineer Congress)
- Organizer: МГТУ им. Н.Э. Баумана (Bauman Moscow State Technical University)
- Indexed: РИНЦ (Russian Index of Scientific Citation)

**Expected outcomes:**
- РИНЦ-indexed publication (counts for academic metrics)
- Presentation opportunity at Section #1 (Theoretical Bionics)
- Networking with biocybernetics researchers
- Potential invitation for full paper (if thesis well-received)

---

## 📊 THESIS METRICS SUMMARY

**Content:**
- Main text: [X] characters (2500-3500 target)
- Sources cited: [N] (minimum 3, target 4-6)
- Page count: [P] pages (1.5-2 target)

**Quality indicators:**
- Academic voice: Rigorous scholarly tone ✅
- Biocybernetics framing: Strong cybernetic terminology ✅
- Source verification: All statistics backed by peer-reviewed research ✅
- RINC compliance: All structural requirements met ✅

**Thesis positioning:**
- Topic: AI bias inheritance as biocybernetic system
- Framework: Human-AI interaction as feedback loop
- Contribution: Systematic synthesis + regulatory mechanisms framework
- Section fit: Section #1 (Theoretical Bionics) ✅

---

## 🚀 READY FOR SUBMISSION

**Status: ✅ COMPLETE**

All technical requirements met. User action required:
1. Complete author information in thesis_v1.docx
2. Obtain "Заключение о возможности открытого опубликования"
3. Submit to conference by October 1, 2025

Good luck with the submission!
```

---

## Final Deliverables Checklist

### Files Created

- [✅] **papers/bionik_thesis/thesis_v1.docx**
  - Submission-ready MS Word file
  - Formatted per RINC specifications
  - Author template (awaiting user completion)

- [✅] **tasks/bionik_thesis/submission_checklist.md**
  - Complete user instructions
  - Pre-submission verification steps
  - Contact information
  - Post-submission guidance

### Verification Complete

- [✅] MS Word formatting: All specifications met
- [✅] Character count: 2500-3500 ✅
- [✅] Page count: 1.5-2 pages ✅
- [✅] RINC structure: All required sections present
- [✅] Citations: Properly formatted with DOIs
- [✅] No forbidden elements (hyperlinks in body, section breaks)
- [✅] Font consistency: Times New Roman 12pt throughout
- [✅] Spacing consistency: 1.5 lines throughout

---

## Time Budget
**Total: 1 hour**
- Create MS Word document: 20 minutes
- Apply formatting: 20 minutes
- Technical verification: 15 minutes
- Create submission checklist: 15 minutes

---

## Success Criteria

### Technical
- ✅ .docx file created (not .pdf)
- ✅ Opens correctly in MS Word
- ✅ All RINC formatting specs applied
- ✅ Character count compliant (2500-3500)
- ✅ Page count compliant (1.5-2)

### Content
- ✅ All sections from thesis_draft.md transferred
- ✅ Metadata from metadata_draft.md included
- ✅ Formatting matches RINC example
- ✅ No formatting artifacts or errors

### User Readiness
- ✅ Submission checklist created
- ✅ Author template clearly marked
- ✅ Next steps documented
- ✅ Contact information provided
- ✅ Deadline emphasized (October 1, 2025)

---

**Next Step:** Agent returns control to main agent for final report to user
