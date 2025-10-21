# Agent Instructions: Write Thesis Draft (Academic Voice)

## Content Type: Academic Thesis (Russian, RINC Format)

## Task Overview
Write complete thesis draft adapting blog post to academic conference format:
- **Input:** Blog post (4500 words, popular science voice)
- **Output:** RINC thesis (1.5-2 pages, ~2500-3500 characters, academic voice)
- **Challenge:** Maintain research quality while condensing 3:1 ratio

## Context Files to Read (MANDATORY - in order)

### Step 1 & 2 Outputs (CRITICAL)
1. **tasks/bionik_thesis/source_selection.md**
   - Which 4-6 sources to cite
   - Citation format examples

2. **tasks/bionik_thesis/bionics_positioning.md**
   - Biocybernetic framing strategy
   - Cybernetic terminology to use
   - Section targeting (Section #1)

3. **tasks/bionik_thesis/metadata_draft.md**
   - УДК code
   - Title (selected or options)
   - Annotation (already written)
   - Keywords

### Source Material
4. **papers/blog1/post1_bias/DRAFT_v3_RU.md**
   - Blog post to adapt
   - Contains detailed research findings
   - Source of statistics and evidence

### Requirements
5. **tasks/bionik_thesis/requirements.md**
   - RINC structure requirements
   - Formatting specifications
   - Citation format rules

---

## CRITICAL: Voice Translation Rules

### Blog Voice (ELIMINATE)
```
❌ "Вот в чём штука:"
❌ "Представьте:"
❌ "Знакомо?"
❌ "А теперь самое интересное..."
❌ "Хорошо, скажете вы"
❌ Personal pronouns (вы, мы when rhetorical)
❌ Exclamation marks for emphasis
❌ Storytelling narrative structure
```

### Academic Voice (REQUIRED)
```
✅ "Установлено, что..."
✅ "Исследования демонстрируют..."
✅ "Выявлено, что..."
✅ "Анализ показывает..."
✅ "Результаты свидетельствуют..."
✅ Passive constructions preferred
✅ Declarative statements only
✅ Evidence-first structure
```

### Example Transformation

**Blog voice:**
> "Представьте: вы используете ChatGPT каждый день. Вы чувствуете себя продуктивнее. А теперь — исследование 2025 года. 666 человек показали корреляцию r = -0,68 между частотой использования ИИ и критическим мышлением. Что это значит? Вы носите невидимого советника, который шептает плохие советы."

**Academic voice:**
> "Эмпирические исследования демонстрируют значимую негативную корреляцию (r = -0,68, p < 0,001) между частотой взаимодействия с системами ИИ и показателями критического мышления в задачах без использования ИИ [1], что свидетельствует о переносе когнитивных паттернов ИИ в независимое мышление пользователя."

**Key changes:**
- Eliminated "Представьте" (rhetorical device)
- Removed "вы" (personal address)
- Removed metaphor ("невидимый советник")
- Added statistical significance (p-value)
- Used passive/academic constructions
- Added citation marker [1]
- Focused on evidence, not narrative

---

## Thesis Structure (RINC Required)

### Required Sections

1. **УДК** (one line)
2. **Заголовок** (Title - from metadata_draft.md)
3. **Сведения об авторах** (Author info - template provided)
4. **Аннотация** (Annotation - from metadata_draft.md)
5. **Ключевые слова** (Keywords - from metadata_draft.md)
6. **Введение** (Introduction) ← YOU WRITE
7. **Методы и материалы; результаты** (Methods & Results) ← YOU WRITE
8. **Заключение** (Conclusion) ← YOU WRITE
9. **Список источников** (References) ← YOU WRITE

**Sections 1-5:** Copy from metadata_draft.md
**Sections 6-8:** Write new (academic voice)
**Section 9:** Format from source_selection.md

---

## Section-by-Section Writing Guide

### Section 6: Введение (700-800 characters target)

#### Required Elements (RINC)
1. **Тема** - Clear topic statement
2. **Цель** - Research goal/objective
3. **Задачи** - Specific tasks (optional, may be implicit)
4. **Актуальность** - Relevance/importance
5. **Новизна** - Novelty/contribution
6. **Научная значимость** - Scientific significance

#### Content Strategy

**Paragraph 1: Problem Statement + Biocybernetic Framing (250-300 chars)**
- Open with biocybernetic system description
- Establish human-AI interaction as feedback loop
- Cite foundational concern (Gerlich or Glickman)

Example structure:
```
Взаимодействие человека с системами искусственного интеллекта представляет собой биокибернетическую систему с обратной связью, в которой когнитивные паттерны ИИ влияют на процессы мышления пользователя [1]. Эмпирические данные свидетельствуют о значимой негативной корреляции (r = -0,68, p < 0,001) между частотой использования ИИ и показателями критического мышления в задачах без участия ИИ [2].
```

**Paragraph 2: Актуальность + Новизна (250-300 chars)**
- Why this matters (proliferation of AI use)
- What's new (biocybernetic perspective on bias inheritance)
- Gap this fills (understanding mechanism, not just documenting phenomenon)

Example structure:
```
Актуальность исследования обусловлена массовым внедрением ИИ-ассистентов в профессиональную деятельность при недостаточном понимании механизмов когнитивной адаптации пользователей. Новизна подхода заключается в рассмотрении наследования предвзятости как нарушения гомеостаза в биокибернетической системе, что позволяет применить концепции теории управления для разработки регуляторных механизмов.
```

**Paragraph 3: Цель + Научная значимость (200-250 chars)**
- Specific goal of this work
- Scientific contribution (theoretical + practical)

Example structure:
```
Цель работы — систематизация эмпирических данных о механизмах наследования когнитивной предвзятости в биокибернетической системе человек-ИИ и выявление структурных практик, снижающих данный эффект. Научная значимость заключается в обосновании биокибернетической модели взаимодействия человек-ИИ как основы для разработки протоколов когнитивной безопасности.
```

#### What to CUT from Blog
- All storytelling ("Представьте...", "А теперь исследование...")
- Rhetorical questions
- Dramatic reveals ("Результат оказался шокирующим")
- Extended examples (keep statistics only)
- Meta-commentary ("Вот что важно понять")

#### What to PRESERVE from Blog
- Specific correlation: r = -0,68 (Gerlich, 2025)
- Key statistic: 15-25% amplification (Glickman & Sharot, 2024)
- Core concept: bias inheritance phenomenon
- Research credibility: Nature Human Behaviour, peer-reviewed sources

---

### Section 7: Методы и материалы; результаты (1000-1200 characters target)

#### Required Elements (RINC)
1. **Методы** - Research methodology
2. **Материалы** - Data sources/materials analyzed
3. **Результаты** - Key findings with evidence

#### Content Strategy

**Part A: Методы (250-300 characters)**

This is NOT original empirical research - it's synthesis of existing studies. Frame methodology as:

```
В работе применён метод систематического анализа эмпирических исследований взаимодействия человек-ИИ, опубликованных в период 2024-2025 гг. Материалами послужили данные [N] исследований с общим объёмом выборки более [X] участников, включая исследования в престижных рецензируемых изданиях (Nature Human Behaviour [1], Communications Medicine [3], Societies [2]). Анализ проведён с применением биокибернетической модели обратной связи для выявления механизмов когнитивной адаптации.
```

**Part B: Результаты - Механизмы (400-500 characters)**

Condense blog's 3 mechanisms into academic description:

From blog you have:
1. Сбой калибровки уверенности (confidence calibration failure)
2. Каскад якорения (anchoring cascade)
3. Амплификация подтверждения (confirmation amplification)

Academic version:
```
Выявлены три механизма наследования предвзятости в биокибернетической системе человек-ИИ:

1) Нарушение калибровки когнитивной уверенности: ИИ демонстрирует избыточную уверенность в ответах, что приводит к смещению пользовательского восприятия надёжности информации [1];

2) Каскад якорения: первоначальные выводы ИИ создают референсную точку, от которой пользователи корректируются с минимальным отклонением (среднее 0,2 балла в шкале 1-10) даже при осознании эффекта [4];

3) Амплификация подтверждения: доверие к рекомендациям ИИ возрастает на 34% при совпадении с начальным суждением пользователя, что усиливает существующие когнитивные искажения [5].
```

**Part C: Результаты - Эффекты (300-400 characters)**

Evidence of inheritance:

From blog:
- Glickman & Sharot: 15-25% amplification
- Gerlich: r = -0,68 correlation
- Medical study: врачи группируются вокруг оценок GPT-4
- Management study: 775 менеджеров, 0.2 балла отклонение

Academic version:
```
Эмпирические данные демонстрируют усиление предубеждений на 15-25% при взаимодействии с ИИ по сравнению с межличностной коммуникацией [1]. Обнаружена устойчивая негативная корреляция (r = -0,68, N = 666, p < 0,001) между частотой использования ИИ и показателями критического мышления в задачах без участия ИИ, что свидетельствует о переносе когнитивных паттернов [2]. В экспертных группах (медицинская диагностика N=50, управленческие решения N=775) выявлено группирование финальных решений вокруг начальных предложений ИИ с отклонением менее 5%, несмотря на явное предупреждение об эффекте якорения [3, 4].
```

#### Citation Strategy in This Section

Use citations [1], [2], [3], [4] etc. referring to Список источников.

From source_selection.md, you know which sources to cite:
- [1] = Glickman & Sharot (Nature Human Behaviour)
- [2] = Gerlich (Societies)
- [3] = Medical study (if selected)
- [4] = Management study (if selected)
- etc.

#### What to CUT from Blog
- Extended case study narratives ("Реальный кейс: 1200 разработчиков...")
- Rhetorical devices ("Но вот что интересно...")
- Repetition for emphasis (academic writing is denser)
- Explanatory analogies (keep findings only)

#### What to PRESERVE
- Specific N values (666, 50, 775 participants)
- Exact statistics (r = -0,68, 15-25%, 0.2 балла, 34%, 5%)
- Study methodologies (conditions, warnings given)
- Three mechanisms (core to thesis)

---

### Section 8: Заключение (500-600 characters target)

#### Required Elements (RINC)
1. **Достижение целей** - Were research goals achieved?
2. **Основные выводы** - Main conclusions (not repetition!)
3. **Практическое применение** - Practical applications
4. **НЕТ повторов** - Must NOT repeat previous sections verbatim

#### Content Strategy

**Part A: Выводы о механизмах (200-250 characters)**

Synthesize findings:

```
Систематический анализ подтверждает модель взаимодействия человек-ИИ как биокибернетической системы с положительной обратной связью, приводящей к нарушению гомеостаза критического мышления. Три выявленных механизма (нарушение калибровки уверенности, каскад якорения, амплификация подтверждения) образуют каскадный процесс когнитивной адаптации к паттернам ИИ.
```

**Part B: Регуляторные механизмы (150-200 characters)**

From blog's structural practices framework:

Blog has 4-5 practices with improvement percentages. Condense:

```
Структурные практики, биовдохновлённые механизмами гомеостаза (документирование независимого базиса, техника критика, временная задержка, кросс-валидация), демонстрируют снижение наследования предвзятости на 20-45% [1, 2, 4].
```

**Part C: Практическое применение (150-200 characters)**

```
Результаты могут применяться для разработки протоколов когнитивной безопасности при проектировании систем человек-ИИ взаимодействия, включая профессиональные ИИ-ассистенты в медицине, управлении и инженерии. Биокибернетический подход открывает перспективы создания адаптивных регуляторных механизмов для поддержания когнитивного гомеостаза пользователей.
```

#### What NOT to Include
- ❌ Repetition of statistics from Результаты
- ❌ Re-listing mechanisms (already described in Section 7)
- ❌ New evidence (should be in Результаты)
- ❌ Generic platitudes ("необходимы дальнейшие исследования...")

#### What to Include
- ✅ Synthesis (how mechanisms connect)
- ✅ Solution effectiveness (structural practices)
- ✅ Practical applications (protocols, systems design)
- ✅ Theoretical contribution (biocybernetic model validation)

---

### Section 9: Список источников (References)

#### Formatting Rules (RINC)

**English journal articles (with DOI - MANDATORY):**
```
[1] Glickman M., Sharot T. How sources of information influence human judgment. Nature Human Behaviour, 2024, vol. 8, pp. 1-12. https://doi.org/10.1038/s41562-024-02077-2
```

**Russian journal articles (transliterated by BGN standard):**
```
[2] Gerlich M. et al. AI Usage and Cognitive Reflection Test Performance. Societies, 2025, vol. 15, no. 1, article 6. https://doi.org/10.3390/soc15010006
```

**Books:**
```
[3] Kahneman D. Thinking, Fast and Slow. New York, Farrar, Straus and Giroux, 2011, 499 p.
```

#### Citation Format Strategy

From source_selection.md, take the 4-6 selected sources and format each precisely according to RINC requirements.

**Critical:**
- English sources: DOI is MANDATORY
- Russian sources: Transliterate by BGN standard if no English translation
- Order: By first mention in text (not alphabetically)
- Format: Exactly as shown in requirements.md examples

#### Sources to Format

Based on Step 1 selection (likely sources):
1. Glickman & Sharot (Nature Human Behaviour, 2024) - Core study
2. Gerlich (Societies, 2025) - Critical thinking correlation
3. Medical/Management study - Application evidence
4. Foundational cognitive science (Kahneman or similar) - Theory

Format each precisely, verify DOIs are working URLs.

---

## Character Count Management

### Target Allocation
- **Total text:** 2500-3500 characters (1.5-2 pages)
- **Введение:** 700-800 characters (28%)
- **Методы и материалы; результаты:** 1000-1200 characters (42%)
- **Заключение:** 500-600 characters (20%)
- **Metadata overhead:** ~700 characters (annotation, keywords)
- **Citations:** ~180 × [N sources] characters

### Strategy if Over Character Limit
1. Condense mechanism descriptions (keep statistics, remove explanatory text)
2. Merge related sentences with semicolons
3. Eliminate redundant phrases ("таким образом", "следует отметить")
4. Use abbreviations where standard (ИИ instead of full term after first mention)

### Strategy if Under Character Limit
1. Add statistical details (p-values, confidence intervals if available)
2. Expand practical applications
3. Add theoretical grounding (cybernetic concepts)
4. Include additional mechanism details

---

## Quality Checklist (Before Completing)

### Voice Quality
- [ ] Zero rhetorical questions
- [ ] Zero storytelling elements
- [ ] Zero personal pronouns (rhetorical вы/мы)
- [ ] Passive/declarative constructions throughout
- [ ] Academic terminology consistent

### Content Quality
- [ ] All statistics from blog preserved (r = -0,68, 15-25%, etc.)
- [ ] Three mechanisms clearly described
- [ ] Biocybernetic framing in every section
- [ ] 4-6 sources cited appropriately
- [ ] Citations numbered consistently [1], [2], [3]...

### RINC Compliance
- [ ] All required sections present
- [ ] Введение: problem, relevance, novelty, significance
- [ ] Методы: synthesis methodology described
- [ ] Результаты: mechanisms + evidence with citations
- [ ] Заключение: conclusions, applications, no repetition
- [ ] Список источников: properly formatted, DOIs for English sources

### Character Count
- [ ] Total 2500-3500 characters
- [ ] Введение: 700-800 chars
- [ ] Методы/Результаты: 1000-1200 chars
- [ ] Заключение: 500-600 chars

### Biocybernetics Terminology
- [ ] "биокибернетическая система" mentioned in Введение
- [ ] "обратная связь" used appropriately
- [ ] "гомеостаз" or "регуляция" in context of solutions
- [ ] Cybernetic framing consistent with bionics_positioning.md

---

## Output File: thesis_draft.md

### Complete File Structure

```markdown
# Thesis Draft - RINC Format

---

УДК [code from metadata_draft.md]

## [Title from metadata_draft.md]

### Сведения об авторах

[TEMPLATE - Пользователь должен заполнить]
Фамилия Имя Отчество¹(*) email@example.com
SPIN-код: XXXX-XXXX

¹ [Organization], [City], Россия

---

### Аннотация

[Copy from metadata_draft.md]

---

### Ключевые слова

[Copy from metadata_draft.md]

---

## Введение

[700-800 characters - YOU WRITE]

[Paragraph 1: Biocybernetic framing + problem statement]

[Paragraph 2: Relevance + novelty]

[Paragraph 3: Goal + scientific significance]

---

## Методы и материалы; результаты

[1000-1200 characters - YOU WRITE]

**Методы.** [Research synthesis methodology]

**Результаты.** [Three mechanisms with evidence]

[Mechanism 1: Confidence calibration]

[Mechanism 2: Anchoring cascade]

[Mechanism 3: Confirmation amplification]

[Empirical evidence with statistics and citations]

---

## Заключение

[500-600 characters - YOU WRITE]

[Synthesis of findings]

[Structural practices effectiveness]

[Practical applications]

[Theoretical contribution]

---

## Список источников

[4-6 sources - PROPERLY FORMATTED]

[1] [First cited source - proper RINC format with DOI if English]
[2] [Second cited source]
[3] [Third cited source]
[4] [Fourth cited source]
[5] [Fifth cited source - if applicable]
[6] [Sixth cited source - if applicable]

---

## Metadata

**Character count:**
- Введение: [X] characters
- Методы и материалы; результаты: [Y] characters
- Заключение: [Z] characters
- **Total text:** [X+Y+Z] characters

**Target:** 2500-3500 characters ✅ / ⚠️ [adjust if needed]

**Word count (MS Word equivalent):** ~[N] words
**Page count (12pt TNR, 1.5 spacing, 2cm margins):** ~[P] pages

**Status:** [READY FOR REVIEW / NEEDS ADJUSTMENT]
```

---

## Time Budget
**Total: 3-4 hours**
- Reading context files: 30 minutes
- Writing Введение: 45 minutes
- Writing Методы и материалы; результаты: 90 minutes
- Writing Заключение: 30 minutes
- Formatting Список источников: 30 minutes
- Quality check + character count: 15 minutes

---

## Success Criteria

### Content
- ✅ Academic voice throughout (zero blog-style elements)
- ✅ Biocybernetic framing consistent
- ✅ All key statistics preserved (r = -0,68, 15-25%, etc.)
- ✅ Three mechanisms clearly described
- ✅ Structural practices mentioned with evidence

### Structure
- ✅ All RINC sections present
- ✅ Введение: problem, relevance, novelty, goal, significance
- ✅ Методы: synthesis methodology
- ✅ Результаты: mechanisms + evidence + citations
- ✅ Заключение: synthesis, solutions, applications (no repetition)

### Technical
- ✅ 2500-3500 characters total
- ✅ 4-6 sources properly cited
- ✅ Citations formatted per RINC requirements
- ✅ Character count within targets per section

### Bionics Connection
- ✅ Cybernetic terminology used appropriately
- ✅ Human-AI as biocybernetic system established
- ✅ Suitable for Section #1 (Theoretical Bionics)

---

**Next Step:** Agent returns control to main agent, who proceeds to Step 4 (review thesis quality)
