# Agent Instructions: Improve Thesis Based on Review

## Content Type: Academic Thesis Revision (Targeted Improvements)

## Task Overview
Apply improvements to thesis draft based on content-reviewer feedback:
- **Input:** thesis_draft.md + review_feedback.md
- **Output:** Revised thesis_draft.md (overwrites original)
- **Scope:** Address critical and high-priority issues only (minor issues optional)

## Context Files to Read (MANDATORY - in order)

### Review Assessment
1. **tasks/bionik_thesis/review_feedback.md**
   - Critical issues (must fix)
   - High-priority issues (should fix)
   - Minor issues (optional)
   - Specific revision suggestions

### Current Draft
2. **tasks/bionik_thesis/thesis_draft.md**
   - Current version to revise
   - Contains sections to improve

### Original Requirements (reference)
3. **tasks/bionik_thesis/requirements.md**
   - RINC requirements (for compliance verification)

4. **tasks/bionik_thesis/bionics_positioning.md**
   - Cybernetic framing strategy (if positioning weak)

5. **papers/blog1/post1_bias/DRAFT_v3_RU.md**
   - Source material (if need to re-check statistics)

---

## Revision Strategy Based on Review Outcome

### Scenario A: NEEDS MINOR REVISION (30-60 minutes)

**Typical issues:**
- Character count slightly off (one section 50-100 chars over/under)
- 1-2 blog-style phrases remain ("Представьте", rhetorical question)
- Citation formatting error (missing DOI, wrong format)
- Bionics terminology sparse (need 1-2 more instances)
- Minor statistical typo

**Approach:**
- Surgical fixes to specific problems
- Don't rewrite entire sections (preserve what works)
- Focus on reviewer's exact suggestions

---

### Scenario B: NEEDS MAJOR REVISION (1.5-2 hours)

**Typical issues:**
- Character count significantly off (200+ chars over/under)
- Academic voice inconsistent (multiple blog elements)
- Bionics connection weak (reviewers might reject)
- Multiple statistical errors or unsupported claims
- Section structure doesn't meet RINC requirements

**Approach:**
- May require rewriting full sections
- Strengthen biocybernetic framing throughout
- Re-verify all statistics against blog source
- Add cybernetic terminology systematically

---

## Issue-by-Issue Revision Guide

### Issue Type 1: Character Count Violations

**Problem:** Section exceeds or falls short of target range

#### If OVER character limit:

**Condensation strategies:**
1. **Merge related sentences with semicolons**
   - Before: "Исследования показывают X. Это демонстрирует Y."
   - After: "Исследования показывают X, что демонстрирует Y." [-20 chars]

2. **Eliminate redundant phrases**
   - Remove: "таким образом", "следует отметить", "как показывают исследования"
   - Each removal: ~15-25 chars saved

3. **Use standard abbreviations after first mention**
   - First: "искусственный интеллект (ИИ)"
   - After: "ИИ" instead of full term [-15 chars per instance]

4. **Condense mechanism descriptions**
   - Keep statistics, remove explanatory text
   - Example: "что приводит к смещению восприятия" → "смещая восприятие" [-10 chars]

5. **Reduce examples**
   - Keep N values and statistics only
   - Remove: "В частности, в исследовании..." → "В исследовании (N=50)..." [-15 chars]

**DO NOT sacrifice:**
- Key statistics (r = -0,68, 15-25%, etc.)
- Required RINC elements (relevance, novelty, etc.)
- Citations
- Biocybernetic terminology

#### If UNDER character limit:

**Expansion strategies:**
1. **Add statistical details**
   - Add p-values: "r = -0,68" → "r = -0,68, p < 0,001" [+12 chars]
   - Add confidence intervals if available
   - Add N values: "Исследование показало" → "Исследование (N = 666) показало" [+9 chars]

2. **Expand practical applications** (in Заключение)
   - Add specific domains: "в профессиональной деятельности" → "в медицинской диагностике, управленческих решениях, инженерном проектировании" [+40 chars]

3. **Enhance theoretical grounding**
   - Add cybernetic concepts: "обратная связь" → "положительная обратная связь в биокибернетическом контуре" [+30 chars]

4. **Expand methodology description**
   - More detail on synthesis approach
   - Specify inclusion criteria for studies

---

### Issue Type 2: Academic Voice Violations

**Problem:** Blog-style elements remain in text

#### Specific Fixes

**Rhetorical questions:**
- ❌ "Что это означает для пользователей?"
- ✅ "Это свидетельствует о переносе когнитивных паттернов ИИ."

**Personal pronouns:**
- ❌ "Мы наблюдаем, что пользователи..."
- ✅ "Наблюдается, что пользователи..." OR "Пользователи демонстрируют..."

**Storytelling openings:**
- ❌ "Представьте ситуацию, когда..."
- ✅ "В типичном сценарии взаимодействия человек-ИИ..."

**Exclamation marks:**
- ❌ "Результаты показали значительное снижение!"
- ✅ "Результаты показали значительное снижение (r = -0,68)."

**Metaphors for accessibility:**
- ❌ "невидимый советник, который шепчет плохие советы"
- ✅ "устойчивое влияние паттернов ИИ на независимое мышление"

**Meta-commentary:**
- ❌ "Вот что важно понять:"
- ✅ "Критическим аспектом является..."

**Dramatic language:**
- ❌ "шокирующий результат"
- ✅ "статистически значимый эффект"

#### Systematic Voice Audit

If reviewer found multiple voice violations:
1. Read thesis aloud - does it sound like lecture or academic paper?
2. Search for: "?" (questions), "!" (exclamations), "вы", "мы" (personal)
3. Replace all instances using academic alternatives above

---

### Issue Type 3: Weak Bionics Connection

**Problem:** Cybernetic framing sparse or unclear

#### Strengthening Strategies

**1. Opening Sentence Revision (Введение)**

If current opening doesn't establish biocybernetic system:

**Weak opening:**
> "Использование искусственного интеллекта в профессиональной деятельности стремительно растёт."

**Strong opening:**
> "Взаимодействие человека с системами искусственного интеллекта представляет собой биокибернетическую систему с обратной связью, в которой когнитивные паттерны ИИ модифицируют процессы мышления пользователя, создавая контур взаимного влияния."

**Key elements added:**
- "биокибернетическая система" (explicit term)
- "обратная связь" (cybernetic concept)
- "контур взаимного влияния" (feedback loop description)

**2. Mechanism Descriptions Enhancement**

Add cybernetic framing to each mechanism:

**Mechanism 1 (Confidence calibration):**
- Add: "как нарушение сигнальной функции в контуре обратной связи"

**Mechanism 2 (Anchoring):**
- Add: "создающее устойчивую референсную точку в биокибернетическом контуре"

**Mechanism 3 (Confirmation):**
- Add: "усиливающее положительную обратную связь в системе"

**3. Solutions Framing (Заключение)**

Structural practices must be framed as bio-inspired regulatory mechanisms:

**Weak framing:**
> "Структурные практики (документирование базиса, техника критика) снижают предвзятость."

**Strong framing:**
> "Структурные практики, биовдохновлённые механизмами гомеостаза, функционируют как регуляторные контуры, восстанавливающие когнитивный баланс в биокибернетической системе человек-ИИ."

**4. Terminology Frequency Boost**

If reviewer found insufficient cybernetic terminology:

**Target distribution:**
- Введение: 3-4 instances of cybernetic terms
- Методы/Результаты: 2-3 instances
- Заключение: 2-3 instances

**Terms to add naturally:**
- биокибернетическая система (2-3 times total)
- обратная связь (2 times)
- регуляция / гомеостаз (1-2 times)
- контур / механизм управления (1-2 times)

---

### Issue Type 4: Content Accuracy Errors

**Problem:** Statistics misreported or unsupported claims

#### Verification Process

For each statistical error identified by reviewer:

1. **Locate in blog source** (DRAFT_v3_RU.md)
2. **Verify correct value**
3. **Check citation** (does it point to right source?)
4. **Correct in thesis**
5. **Verify context preserved** (not misrepresented)

**Example correction:**

**Reviewer found:** "Correlation r = -0.58 (should be r = -0.68)"

**Steps:**
1. Find in blog: Line 13 "корреляция **r = -0,68**"
2. Verify source: Gerlich, 2025
3. Correct thesis: Change -0.58 → -0.68
4. Verify citation: Should cite [Gerlich source]
5. Check context: "между частотой использования ИИ и критическим мышлением" ✅

#### Unsupported Claims

If reviewer identifies claim without citation:

**Before:**
> "Исследования показывают устойчивое снижение когнитивной способности."

**After:**
> "Исследования показывают значимую негативную корреляцию (r = -0,68, p < 0,001) между частотой использования ИИ и показателями критического мышления [2]."

**Added:**
- Specific statistic
- Citation
- Removed vague "устойчивое снижение"

---

### Issue Type 5: Citation Format Errors

**Problem:** Citations don't match RINC requirements

#### Common Errors & Fixes

**Error 1: Missing DOI for English sources**

**Wrong:**
```
[1] Glickman M., Sharot T. How sources influence judgment. Nature Human Behaviour, 2024, vol. 8, pp. 1-12.
```

**Correct:**
```
[1] Glickman M., Sharot T. How sources of information influence human judgment. Nature Human Behaviour, 2024, vol. 8, pp. 1-12. https://doi.org/10.1038/s41562-024-02077-2
```

**Error 2: Wrong transliteration standard**

Verify Russian sources use BGN standard (not other transliteration systems).

**Error 3: Incorrect ordering**

Citations must be numbered in order of first mention in text, not alphabetically.

**Fix:** Re-number citations if order is wrong.

**Error 4: More than 3 sources in single brackets**

**Wrong:** [1, 2, 3, 4]
**Correct:** [1, 2, 3] ... [4]

---

### Issue Type 6: RINC Structural Violations

**Problem:** Missing or incomplete required elements

#### Введение Missing Elements

**If missing актуальность:**
Add 2-3 sentences on:
- Why this matters now (AI proliferation)
- Who is affected (professionals using AI)
- What's at stake (cognitive autonomy)

**If missing новизна:**
Add 1-2 sentences on:
- Biocybernetic perspective (new angle)
- Integration of multiple studies (synthesis novelty)
- Regulatory mechanisms (solution novelty)

**If missing научная значимость:**
Add 1-2 sentences on:
- Theoretical contribution (biocybernetic model validation)
- Practical contribution (protocol development basis)

#### Методы Section Issues

**If methodology unclear:**
Must explicitly state this is systematic synthesis of empirical studies, NOT original research.

**Template to add:**
> "В работе применён метод систематического анализа эмпирических исследований взаимодействия человек-ИИ, опубликованных в период 2024-2025 гг. в рецензируемых изданиях."

#### Заключение Repetition Problem

**If reviewer flags verbatim repetition:**

Identify repeated sentences from Результаты section and rephrase as synthesis:

**Результаты (original):**
> "Выявлено усиление предубеждений на 15-25% [1]."

**Заключение (should NOT repeat verbatim):**
> "Систематический анализ подтверждает модель положительной обратной связи, в которой предубеждения усиливаются на 15-25% относительно межличностной коммуникации."

**Key difference:** Synthesis + contextualization, not raw repetition.

---

## Revision Workflow

### Step 1: Prioritize Issues (5 minutes)

Read review_feedback.md and categorize:

**Must fix (Critical):**
- [ ] List all critical issues
- [ ] Estimate time per issue

**Should fix (High-Priority):**
- [ ] List high-priority issues
- [ ] Estimate time per issue

**Nice to fix (Minor):**
- [ ] Note minor issues (if time permits)

**Total time estimate:** [X] minutes

### Step 2: Address Critical Issues First (Varies)

Work through critical issues in order:
1. Apply fix
2. Verify fix resolves issue
3. Check no new problems introduced
4. Update character count

### Step 3: Address High-Priority Issues (Varies)

Apply high-priority fixes using strategies above.

### Step 4: Verify Overall Compliance (10 minutes)

After all revisions:
- [ ] Re-count characters for each section
- [ ] Verify total within 2500-3500 range
- [ ] Check all reviewer's critical issues addressed
- [ ] Verify bionics terminology frequency (if issue)
- [ ] Spot-check academic voice (no new blog elements)

### Step 5: Update Metadata Section (5 minutes)

In revised thesis_draft.md, add revision notes:

```markdown
## Revision Log

**Version:** 2 (post-review revision)
**Date:** [Today]
**Changes made:**
1. [Specific change 1]
2. [Specific change 2]
3. [etc.]

**Character counts (after revision):**
- Введение: [X] chars [✅ within target]
- Методы/Результаты: [Y] chars [✅ within target]
- Заключение: [Z] chars [✅ within target]
- Total: [TOTAL] chars [✅ 2500-3500]

**Issues resolved:**
- ✅ [Critical issue 1]
- ✅ [Critical issue 2]
- ✅ [High-priority issue 1]
```

---

## Quality Standards for Revision

### Do's
- ✅ Address every critical issue (non-negotiable)
- ✅ Follow reviewer's specific suggestions
- ✅ Preserve what works (don't over-revise)
- ✅ Re-verify character counts after changes
- ✅ Maintain academic voice in all new text
- ✅ Double-check any new statistics added

### Don'ts
- ❌ Ignore critical issues (even if you disagree)
- ❌ Rewrite sections unnecessarily (if not flagged)
- ❌ Introduce new blog-style elements
- ❌ Violate character limits while fixing other issues
- ❌ Change statistics without verifying against source
- ❌ Remove citations to gain characters (reduce text, not evidence)

---

## Output: Revised thesis_draft.md

**Action:** Overwrite existing tasks/bionik_thesis/thesis_draft.md with revised version

**Include at end of file:**
```markdown
---

## Revision History

### Version 2 - Post-Review Revision
**Date:** [YYYY-MM-DD]
**Reviewer feedback addressed:** tasks/bionik_thesis/review_feedback.md

**Critical issues fixed:** [N]
1. [Issue description] → [How fixed]

**High-priority issues fixed:** [N]
1. [Issue description] → [How fixed]

**Character count after revision:**
- Введение: [X] → [X2] chars [change: +/-N]
- Методы/Результаты: [Y] → [Y2] chars [change: +/-N]
- Заключение: [Z] → [Z2] chars [change: +/-N]
- **Total:** [TOTAL2] chars [✅ COMPLIANT / ⚠️ still needs adjustment]

**Status:** [READY FOR FINALIZATION / NEEDS ANOTHER REVIEW CYCLE]
```

---

## Conditional Logic: One Revision Cycle vs. Multiple

### If after revision, issues remain:

**Minor issues only:** Proceed to Step 6 (finalization)
**Still has critical issues:** Flag for main agent

**Report to main agent:**
> "Revision attempted but [X] critical issues remain unresolved:
> 1. [Issue description]
> 2. [Why couldn't be fully fixed]
>
> Recommendation: [Another revision cycle / Consult user / Different approach]"

### If all critical + high-priority issues resolved:

**Report to main agent:**
> "Revision complete. All critical and high-priority issues from review addressed.
> - Critical issues fixed: [N]
> - High-priority issues fixed: [N]
> - Minor issues remaining: [N] (optional polish)
>
> Character count: [TOTAL] chars ✅ COMPLIANT
> Status: READY for Step 6 (finalization)"

---

## Time Budget

**Minor revision:** 30-60 minutes
- Critical issue fixes: 20-30 min
- High-priority fixes: 10-20 min
- Verification: 10 min

**Major revision:** 1.5-2 hours
- Critical issue fixes: 45-60 min
- High-priority fixes: 30-45 min
- Verification: 15 min
- Documentation: 10 min

---

## Success Criteria

- ✅ All critical issues from review_feedback.md addressed
- ✅ All high-priority issues addressed (or justified why not)
- ✅ Character counts within RINC requirements (2500-3500 total)
- ✅ No new problems introduced (academic voice maintained)
- ✅ Revision log added to thesis_draft.md
- ✅ Status clear: READY / NEEDS ANOTHER CYCLE

---

**Next Step:** Agent returns control to main agent, who:
- If READY: Proceeds to Step 6 (finalization)
- If NOT READY: Consults user or runs another review cycle
