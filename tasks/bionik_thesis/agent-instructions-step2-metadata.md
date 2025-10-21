# Agent Instructions: УДК Code & Metadata Preparation

## Content Type: Academic Thesis Metadata (RINC Format)

## Task Overview
Prepare all metadata components required for RINC thesis submission:
1. Research and select appropriate УДК code
2. Draft thesis title (6-15 words, Russian)
3. Write annotation (~600 characters, specific format)
4. Select 5-7 keywords
5. Create author information template

## Context Files to Read (MANDATORY)

### Previous Step Outputs
- **tasks/bionik_thesis/source_selection.md**
  - Selected sources for thesis
- **tasks/bionik_thesis/bionics_positioning.md**
  - УДК code recommendations
  - Biocybernetic framing strategy

### Requirements
- **tasks/bionik_thesis/requirements.md**
  - RINC formatting requirements
  - Metadata specifications

### Source Material
- **papers/blog1/post1_bias/DRAFT_v3_RU.md**
  - For understanding content scope

---

## Task 1: УДК Code Selection

### What is УДК?
**Universal Decimal Classification (Универсальная десятичная классификация)**
- International classification system for library cataloging
- Required for RINC indexing
- Must accurately reflect thesis topic

### УДК Research Process

**Step 1:** Review recommendations from bionics_positioning.md

**Step 2:** Use official classifier
- URL: https://www.teacode.com/online/udc/
- Search terms: "биокибернетика", "искусственный интеллект", "когнитивные процессы"

**Step 3:** Research similar papers
- Search RINC for papers on:
  - AI-human interaction
  - Cognitive biases in AI use
  - Biocybernetic systems
- Note their УДК codes

**Step 4:** Select most appropriate code

### Candidate УДК Codes

**Option A: 007.52 - Биокибернетика**
- Pros: Direct fit with biocybernetic framing
- Cons: May be too narrow if bionic connection is weak
- Use if: Strong cybernetic framing in thesis

**Option B: 159.9.072 - Методы психологических исследований**
- Pros: Psychology focus with AI methods
- Cons: Weaker bionics connection
- Use if: Positioning more in Section #4 (humanitarian bionics)

**Option C: 004.8:159.9 - Искусственный интеллект и психология**
- Pros: Explicit AI-psychology intersection
- Cons: Less clear bionics connection
- Use if: Interdisciplinary framing

**Option D: Combination code (if allowed)**
- Format: Primary:Secondary (e.g., 007.52:159.9)
- Check if RINC accepts combination codes for this conference

### Output Required

Document УДК selection with full reasoning:

```markdown
# УДК Code Selection

## Selected Code
**УДК:** [Code number]

## Full Classification Path
[Example: 007.52 = Наука → Кибернетика → Биокибернетика]

## Reasoning
[Why this code best represents the thesis topic]

## Verification
- ✅ Checked in official classifier: https://www.teacode.com/online/udc/
- ✅ Found similar papers using this code: [List 1-2 examples if available]
- ✅ Aligns with biocybernetic framing from Step 1
- ✅ Appropriate for Section #1 (Theoretical Bionics)

## Alternative Codes Considered
**[Code]:** [Why not chosen]
**[Code]:** [Why not chosen]
```

---

## Task 2: Title Drafting (Заголовок тезисов)

### RINC Requirements
- **Length:** 6-15 words (не менее 6 слов, не более 15 слов)
- **Language:** Russian only
- **Content:** Must accurately reflect thesis content
- **Restrictions:**
  - Cannot be multiple sentences
  - No mathematical formulas
  - No non-Latin/non-Cyrillic characters
  - No abbreviations (except widely accepted: ИИ acceptable, LLM not)

### Title Strategy

**Core elements to include:**
1. **AI context:** "искусственный интеллект" or "ИИ"
2. **Phenomenon:** "наследование предвзятости" or "когнитивная адаптация"
3. **Biocybernetic angle:** "биокибернетическая система" or "обратная связь"
4. **Human impact:** "критическое мышление" or "когнитивные процессы"

**Avoid:**
- Vague terms ("проблемы", "перспективы")
- Questions (cannot be question format)
- Promotional language ("инновационный", "уникальный")

### Title Options to Consider

**Option A - Cybernetic Focus:**
"Наследование предвзятости от искусственного интеллекта как биокибернетическая система с нарушением гомеостаза критического мышления"
- Word count: 13 words
- Emphasizes cybernetic system
- May be too technical

**Option B - Phenomenon Focus:**
"Адаптация когнитивных процессов человека к паттернам ИИ: биокибернетический анализ механизмов наследования предвзятости"
- Word count: 13 words
- Balance of phenomenon + biocybernetics
- Accessible yet rigorous

**Option C - Impact Focus:**
"Деградация критического мышления при взаимодействии с ИИ: биокибернетическое исследование эффектов обратной связи"
- Word count: 12 words
- Emphasizes concerning outcome
- Strong hook for reviewers

### Output Required

```markdown
# Title Options

## Recommended Title
**Russian:** [Selected title]
**Word count:** [N] words (6-15 ✅)

**Reasoning:**
[Why this title best represents content and satisfies RINC requirements]

## Alternative Titles (for user choice)

### Option 2
**Russian:** [Title]
**Word count:** [N]
**Reasoning:** [Brief explanation]

### Option 3
**Russian:** [Title]
**Word count:** [N]
**Reasoning:** [Brief explanation]

## Verification Checklist
- ✅ 6-15 words
- ✅ Single sentence (not multiple)
- ✅ No abbreviations except standard (ИИ)
- ✅ Accurately reflects content
- ✅ Includes biocybernetic framing
```

---

## Task 3: Annotation (Аннотация)

### RINC Requirements
- **Length:** ~600 characters with spaces (около 600 знаков с пробелами)
- **Format:** "Рассмотрено..., представлено..., показано... Сделаны выводы, что..."
- **Content:** Concise, informative summary including main results and conclusions
- **Avoid:** Descriptive fluff, generic statements

### Annotation Structure (Strict Format)

**Sentence 1:** "Рассмотрено [что именно]"
- What phenomenon was examined
- Include: bias inheritance, critical thinking degradation

**Sentence 2:** "Представлено/Показано [key findings]"
- Main research findings
- Include: Specific statistics (Glickman & Sharot, Gerlich)

**Sentence 3:** "Выявлены [mechanisms or patterns]"
- Core mechanisms identified
- Include: Biocybernetic feedback loops, system adaptation

**Sentence 4:** "Сделаны выводы, что [conclusions]"
- Conclusions about structural practices
- Include: Bio-inspired control mechanisms

**Sentence 5:** "Результаты могут применяться для [applications]"
- Practical applications
- Include: Designing human-AI interaction protocols

### Character Count Management

Target: 600 characters (flexible: 550-650 acceptable)

**Strategy:**
- Each sentence: ~120 characters avg
- Use semicolons to connect related ideas (saves characters vs. full stops)
- Eliminate articles where grammatically acceptable
- Use abbreviations only if standard (ИИ yes, LLM no)

### Example Annotation (Template)

```
Рассмотрено наследование когнитивной предвзятости при взаимодействии человека с системами искусственного интеллекта как биокибернетическая система с обратной связью. Представлены результаты синтеза эмпирических исследований (Glickman & Sharot, 2024; Gerlich, 2025), демонстрирующих усиление предубеждений на 15-25% и корреляцию r=-0,68 между частотой использования ИИ и критическим мышлением. Выявлены три механизма адаптации когнитивной системы: сбой калибровки уверенности, каскад якорения, амплификация подтверждения. Сделаны выводы, что структурные практики, биовдохновленные механизмами гомеостаза, снижают наследование предвзятости на 20-45%. Результаты могут применяться для разработки протоколов взаимодействия человека с ИИ.

[Character count: ~600]
```

### Output Required

```markdown
# Annotation Draft

## Russian Annotation (~600 characters)

[Full annotation text]

**Character count:** [N] characters (including spaces)

## Verification Checklist
- ✅ Follows "Рассмотрено... Показано... Сделаны выводы..." format
- ✅ 550-650 characters (target: 600)
- ✅ Includes specific findings (statistics, mechanisms)
- ✅ Mentions biocybernetic framing
- ✅ States practical applications
- ✅ No generic/fluffy language
- ✅ Informative and concise

## Structure Breakdown
**Sentence 1 (Рассмотрено):** [X] characters - [What was examined]
**Sentence 2 (Показано):** [Y] characters - [Key findings]
**Sentence 3 (Выявлены):** [Z] characters - [Mechanisms]
**Sentence 4 (Сделаны выводы):** [A] characters - [Conclusions]
**Sentence 5 (Результаты могут):** [B] characters - [Applications]
```

---

## Task 4: Keywords (Ключевые слова)

### RINC Requirements
- **Count:** 5-7 words or word combinations
- **Restrictions:**
  - No abbreviations (except widely accepted: ИИ acceptable)
  - No phrases longer than 4 words
  - Must characterize content

### Keyword Strategy

**Must include:**
1. Core topic identifier (e.g., "искусственный интеллект")
2. Main phenomenon (e.g., "наследование предвзятости", "когнитивная адаптация")
3. Biocybernetic concept (e.g., "биокибернетическая система", "обратная связь")
4. Human impact (e.g., "критическое мышление")

**Optional 5-7:**
5. Mechanism term (e.g., "когнитивные искажения", "эффект якорения")
6. Solution term (e.g., "структурные практики")
7. Research approach (e.g., "синтез эмпирических исследований")

### Candidate Keywords

**Set A (Cybernetic Emphasis):**
1. искусственный интеллект
2. биокибернетическая система
3. наследование предвзятости
4. обратная связь
5. критическое мышление
6. когнитивная адаптация
7. структурные практики

**Set B (Phenomenon Emphasis):**
1. искусственный интеллект
2. когнитивные искажения
3. критическое мышление
4. биокибернетический анализ
5. взаимодействие человек-ИИ
6. эффект якорения
7. регуляторные механизмы

### Output Required

```markdown
# Keywords Selection

## Selected Keywords (5-7)

1. [Keyword 1]
2. [Keyword 2]
3. [Keyword 3]
4. [Keyword 4]
5. [Keyword 5]
6. [Keyword 6] (optional)
7. [Keyword 7] (optional)

## Reasoning
**Coverage:**
- Topic: [Keywords 1, 2]
- Phenomenon: [Keywords 3, 4]
- Approach: [Keywords 5, 6]
- Application: [Keyword 7]

## Verification Checklist
- ✅ 5-7 keywords total
- ✅ No abbreviations (except ИИ if used)
- ✅ No phrases >4 words
- ✅ Accurately characterize content
- ✅ Include biocybernetic terminology
- ✅ Include AI and cognitive terms

## Alternative Keyword Sets (for user choice)

### Set B
1-7. [Alternative keywords if needed]
```

---

## Task 5: Author Information Template

### RINC Requirements

**Must include:**
- Full name (Фамилия Имя Отчество)
- Email address
- Organization affiliation (full name or official abbreviation)
- City, country
- Corresponding author marked with (*)
- SPIN-код (if available)

**Restrictions:**
- Maximum 6 authors
- Each author must have affiliation marked with superscript number

### Template to Create

```markdown
# Author Information Template

**USER ACTION REQUIRED:** Complete this template before submission

## Author Details

**Full Name (Russian):** [Фамилия Имя Отчество]
**Email:** [author@example.com]
**Organization:** [Full organization name or official abbreviation]
**City:** [City name]
**Country:** Россия
**SPIN-код:** [If available, format: 1234-5678]
**Corresponding author:** [Yes/No - mark with (*) in final document]

## Affiliation Line (for thesis)

Example format:
```
Иванов Иван Иванович¹(*) ivanov@example.com
SPIN-код: 1234-5678

¹ МГТУ им. Н.Э. Баумана, Москва, Россия
```

**USER TO PROVIDE:**
- Actual name and contact information
- Official organization affiliation
- SPIN-код (if registered in РИНЦ system)
```

---

## Output File: metadata_draft.md

### Complete File Structure

```markdown
# Thesis Metadata - RINC Format

---

## УДК Code
**Code:** [Selected УДК]
**Classification:** [Full path in classification system]
**Reasoning:** [Why this code was selected]

---

## Title (Заголовок тезисов)

### Recommended Title
**Russian:** [Selected title]
**Word count:** [N] words (6-15 ✅)

### Alternative Titles
1. [Option 2]
2. [Option 3]

---

## Author Information (TEMPLATE - USER TO COMPLETE)

[Full author template from Task 5]

---

## Annotation (Аннотация)

[Full annotation text from Task 3]

**Character count:** [N] characters ✅

---

## Keywords (Ключевые слова)

1. [Keyword 1]
2. [Keyword 2]
3. [Keyword 3]
4. [Keyword 4]
5. [Keyword 5]
6. [Keyword 6]
7. [Keyword 7]

---

## Additional Requirements

### Заключение о возможности открытого опубликования
**Status:** USER MUST OBTAIN from organization
**Required:** Yes (mandatory for RINC submission)

### Submission Deadlines
**Conference registration:** October 1, 2025
**Conference dates:** October 29-31, 2025

### Submission Portals
- **Primary:** https://rusengineer.bmstu.ru/
- **Also register:** http://biomimetic.wixsite.com/conference

---

## Quality Checks Completed

- ✅ УДК code verified in classifier
- ✅ Title: 6-15 words, accurate, no forbidden elements
- ✅ Annotation: ~600 characters, proper format
- ✅ Keywords: 5-7, no abbreviations, characterize content
- ✅ Author template provided for user completion
```

---

## Quality Standards

### УДК Code
- Must be verifiable in official classifier
- Should match similar papers in bionics/biocybernetics
- Appropriate for target conference section

### Title
- Precise reflection of content (reviewers will check against thesis body)
- Professional academic tone
- No marketing language or vague terms

### Annotation
- Must follow exact format ("Рассмотрено..., показано..., сделаны выводы...")
- Specific findings (numbers, statistics)
- No generic statements ("рассмотрены актуальные проблемы..." - too vague)

### Keywords
- Searchable terms (think: what would someone search in RINC?)
- Cover all major aspects of thesis
- Include both general (ИИ) and specific (когнитивные искажения) terms

---

## Time Budget
**Total: 1 hour**
- УДК research: 20 minutes
- Title drafting: 15 minutes
- Annotation writing: 20 minutes
- Keywords selection: 5 minutes

---

## Success Criteria

- ✅ metadata_draft.md file created with all sections
- ✅ УДК code selected with verification
- ✅ Title options provided (6-15 words each)
- ✅ Annotation written (~600 characters, proper format)
- ✅ Keywords selected (5-7, RINC compliant)
- ✅ Author template ready for user completion
- ✅ All RINC requirements checked

---

**Next Step:** Agent returns control to main agent, who proceeds to Step 3 (write thesis draft)
