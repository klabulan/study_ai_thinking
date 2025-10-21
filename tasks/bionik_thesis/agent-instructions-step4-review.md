# Agent Instructions: Review Thesis Quality

## Content Type: Academic Thesis Review (RINC Compliance)

## Task Overview
Conduct comprehensive quality review of thesis draft against:
1. **RINC requirements** - Structural, formatting, citation compliance
2. **Academic voice** - Rigorous scholarly tone
3. **Biocybernetics positioning** - Clear bionics connection
4. **Content accuracy** - Statistics, claims, evidence quality
5. **Character count** - Page limits compliance

## Context Files to Read (MANDATORY)

### Thesis Draft to Review
- **tasks/bionik_thesis/thesis_draft.md**
  - Complete draft from Step 3
  - All sections written

### Quality Standards
- **tasks/bionik_thesis/requirements.md**
  - RINC requirements checklist
  - Formatting specifications
  - Citation format rules

- **tasks/bionik_thesis/bionics_positioning.md**
  - Biocybernetic framing strategy
  - Expected terminology

- **tasks/bionik_thesis/source_selection.md**
  - Which sources should be cited
  - Citation justifications

### Source Material (for fact-checking)
- **papers/blog1/post1_bias/DRAFT_v3_RU.md**
  - Original source of statistics
  - Verify no errors introduced in adaptation

---

## Review Framework: 5-Dimensional Assessment

### Dimension 1: RINC Structural Compliance

#### Checklist (Each item: PASS / FAIL / NEEDS REVISION)

**Metadata Section:**
- [ ] УДК code present and appropriate for biocybernetics
- [ ] Title: 6-15 words, Russian only, no forbidden elements
- [ ] Author template provided (awaiting user completion)
- [ ] Annotation: ~600 characters, proper format ("Рассмотрено..., показано...")
- [ ] Keywords: 5-7 items, no unapproved abbreviations, characterize content

**Введение Section:**
- [ ] Clear problem statement present
- [ ] Актуальность (relevance) explicitly stated
- [ ] Новизна (novelty) explicitly stated
- [ ] Цель (goal) explicitly stated
- [ ] Научная значимость (scientific significance) mentioned
- [ ] Character count: 700-800 (acceptable range: 650-850)

**Методы и материалы; результаты Section:**
- [ ] Methodology described (synthesis approach, not claimed as original empirical)
- [ ] Materials/sources specified (which studies analyzed)
- [ ] Results presented with evidence (mechanisms described)
- [ ] Statistics included with proper citations
- [ ] Character count: 1000-1200 (acceptable range: 950-1300)

**Заключение Section:**
- [ ] Conclusions synthesize findings (not just repeat)
- [ ] Practical applications described
- [ ] Achievement of stated goals addressed
- [ ] NO verbatim repetition from Результаты
- [ ] Character count: 500-600 (acceptable range: 450-650)

**Список источников Section:**
- [ ] Minimum 3 sources (target: 4-6)
- [ ] English sources: DOI included and functional
- [ ] Russian sources: transliterated properly (BGN standard)
- [ ] Citation format matches RINC examples exactly
- [ ] Citations numbered in order of text mention (not alphabetical)

**Total Character Count:**
- [ ] Main text: 2500-3500 characters (strict requirement)
- [ ] Individual sections within target ranges

#### Assessment Output (Dimension 1)

```markdown
## RINC Structural Compliance: [PASS / FAIL / NEEDS REVISION]

### Critical Issues (Must fix before submission)
- [List any failures in required sections]
- [Any missing elements]
- [Character count violations]

### Medium Issues (Should fix for quality)
- [Sections slightly out of range]
- [Formatting inconsistencies]

### Minor Issues (Polish)
- [Stylistic improvements]

### Compliance Score: [X/Y] required elements present
```

---

### Dimension 2: Academic Voice Quality

#### Assessment Criteria

**ELIMINATE these blog-style elements (if found):**
- Rhetorical questions ("Знакомо?", "Что это значит?")
- Personal address ("вы", "мы" when rhetorical)
- Exclamation marks for emphasis
- Storytelling devices ("Представьте...", "А теперь...")
- Metaphors/analogies for accessibility ("невидимый советник")
- Meta-commentary ("Вот что важно понять...")
- Dramatic reveals ("Результат оказался шокирующим")

**REQUIRE these academic elements:**
- Passive/declarative constructions ("Установлено", "Выявлено", "Показано")
- Evidence-first structure (claim → citation, not story → evidence)
- Technical terminology (no simplifications)
- Formal register throughout
- Objective tone (no value judgments without evidence)

#### Voice Quality Scoring

For each section (Введение, Методы/Результаты, Заключение), rate:

**Score 3 (Excellent):** Pure academic voice, zero blog elements
**Score 2 (Good):** Mostly academic, minor slips (1-2 instances)
**Score 1 (Needs work):** Mixed voice, several blog elements remain
**Score 0 (Fail):** Still reads like popular science

#### Assessment Output (Dimension 2)

```markdown
## Academic Voice Quality

### Введение: [Score 0-3]
**Issues found:**
- [Quote problematic passage]
- [Why it's not academic voice]
- **Suggested revision:** [Academic alternative]

### Методы и материалы; результаты: [Score 0-3]
**Issues found:**
- [Quote problematic passage]
- [Why it's not academic voice]
- **Suggested revision:** [Academic alternative]

### Заключение: [Score 0-3]
**Issues found:**
- [Quote problematic passage]
- [Why it's not academic voice]
- **Suggested revision:** [Academic alternative]

### Overall Voice Quality: [Average score] / 3.0
**Recommendation:** [ACCEPTABLE / NEEDS MINOR REVISION / NEEDS MAJOR REVISION]
```

---

### Dimension 3: Biocybernetics Positioning

#### Assessment Criteria

**Must verify:**
1. **Cybernetic framing established in Введение** (opening paragraph)
2. **Cybernetic terminology used appropriately** throughout
3. **Human-AI as biocybernetic system** clearly argued
4. **Feedback loop concept** explicit
5. **Regulatory mechanisms** (structural practices) framed as bio-inspired

#### Required Terminology Check

**Should appear:**
- биокибернетическая система (biocybernetic system)
- обратная связь (feedback)
- адаптация когнитивной системы (cognitive system adaptation)
- гомеостаз (homeostasis) or регуляция (regulation)
- механизмы управления/контроля (control mechanisms)

**Frequency check:**
- "биокибернетическ*" : minimum 2-3 occurrences
- "обратная связь" : minimum 1-2 occurrences
- Cybernetic concepts: present in all 3 main sections

#### Strength of Connection

**Strong (IDEAL):**
- Opens with cybernetic system description
- Mechanisms explained through cybernetic concepts
- Solutions framed as bio-inspired regulatory mechanisms
- Suitable for Section #1 (Theoretical Bionics) without question

**Medium (ACCEPTABLE):**
- Cybernetic framing present but not leading
- Terminology used but could be stronger
- Connection arguable but needs explicit statement

**Weak (NEEDS REVISION):**
- Bionics connection only in keywords/title
- Reads more like psychology paper
- Cybernetic terminology sparse or absent
- Reviewers might reject as "not bionics"

#### Assessment Output (Dimension 3)

```markdown
## Biocybernetics Positioning: [STRONG / MEDIUM / WEAK]

### Terminology Audit
- "биокибернетическ*": [N] occurrences [✅ ≥2 / ⚠️ =1 / ❌ =0]
- "обратная связь": [N] occurrences [✅ ≥1 / ⚠️ =0]
- Other cybernetic terms: [List found terms]

### Section-by-Section Assessment

**Введение:**
- [ ] Opens with biocybernetic framing (first 2-3 sentences)
- [ ] Establishes human-AI as feedback system
- **Strength:** [Strong / Medium / Weak]

**Методы и материалы; результаты:**
- [ ] Mechanisms related to cybernetic concepts
- [ ] Feedback loop dynamics explained
- **Strength:** [Strong / Medium / Weak]

**Заключение:**
- [ ] Solutions framed as regulatory mechanisms
- [ ] Bio-inspired control mentioned
- **Strength:** [Strong / Medium / Weak]

### Overall Bionics Connection: [STRONG / MEDIUM / WEAK]

**Conference Section Suitability:**
- Section #1 (Theoretical Bionics): [SUITABLE / QUESTIONABLE / UNSUITABLE]
- Section #4 (Humanitarian Bionics): [FALLBACK OPTION / PRIMARY FIT]

**Recommendation:**
[If WEAK: Specific revisions to strengthen cybernetic framing]
[If MEDIUM: Enhancements to make connection explicit]
[If STRONG: Ready for submission to Section #1]
```

---

### Dimension 4: Content Accuracy & Evidence Quality

#### Fact-Checking Against Source Material

**Critical statistics to verify:**
1. **Gerlich correlation:** r = -0,68 (N = 666)
2. **Glickman & Sharot amplification:** 15-25% increase
3. **Management study anchoring:** 0,2 балла отклонение (N = 775)
4. **Confirmation bias:** +34% trust when AI agrees, 42% vs 89% acceptance
5. **Medical study:** 50 врачей, 47-63% → 65-80% accuracy, 38% better detection
6. **Structural practices effectiveness:** 20-45% reduction, specific percentages (45-52%, 35%, 43%, 40%, 31%)

**For each statistic in thesis:**
- [ ] Matches blog source exactly (no errors introduced)
- [ ] Cited to correct source
- [ ] Context preserved (not misrepresented)

#### Citation Verification

**Check each citation [1], [2], [3]... in text:**
1. Does it correspond to correct source in Список источников?
2. Is it the appropriate source for that claim?
3. Is the source from source_selection.md (approved list)?
4. Are multiple citations properly formatted? (max 3 per brackets per RINC rules)

#### Evidence Quality

**Assess:**
- All major claims backed by citations?
- Sources credible (peer-reviewed journals)?
- Evidence strength matches claim strength?
- No unsupported assertions?

#### Assessment Output (Dimension 4)

```markdown
## Content Accuracy & Evidence Quality

### Statistical Accuracy
**Checked against blog source:**
- r = -0,68 : [✅ CORRECT / ❌ ERROR: should be X]
- 15-25% amplification : [✅ / ❌]
- [Check all key statistics]

**Errors found:** [N]
**Critical errors (must fix):** [List any misreported statistics]

### Citation Quality
**Total citations in text:** [N]
**Sources in Список источников:** [N] [✅ MATCH / ❌ MISMATCH]

**Citation accuracy check:**
- Citation [1] corresponds to correct source: [✅ / ❌]
- Citation [2] corresponds to correct source: [✅ / ❌]
- [Check each]

**Miscitations found:** [List any errors]

### Evidence Coverage
- [ ] All major claims cited
- [ ] No unsupported assertions
- [ ] Sources appropriate for claims
- [ ] Evidence strength matches claim strength

**Gaps in evidence:** [List any unsupported claims]

### Overall Accuracy: [EXCELLENT / GOOD / NEEDS CORRECTION]
```

---

### Dimension 5: Technical Specifications

#### Character Count Verification

**Individual sections:**
- Введение: [X] characters [✅ 700-800 range / ⚠️ outside but acceptable / ❌ violates limits]
- Методы и материалы; результаты: [Y] characters [✅ 1000-1200 / ⚠️ / ❌]
- Заключение: [Z] characters [✅ 500-600 / ⚠️ / ❌]

**Total text:** [X+Y+Z] = [TOTAL] characters
**Target:** 2500-3500 characters
**Status:** [✅ COMPLIANT / ❌ VIOLATES (must fix)]

**If violates:**
- Over limit by: [N] characters → [Suggest cuts]
- Under limit by: [N] characters → [Suggest expansions]

#### Formatting Verification

- [ ] All section headers present and bold
- [ ] Spacing consistent
- [ ] No hyperlinks in text body (only in Список источников)
- [ ] No section breaks within text
- [ ] Author template clearly marked for user completion

#### MS Word Compatibility Check

- [ ] Content can be copy-pasted to MS Word .docx format
- [ ] No markdown-specific elements that won't transfer
- [ ] Estimated page count: [P] pages (12pt Times New Roman, 1.5 spacing, 2cm margins)
  - ✅ 1.5-2 pages target
  - ⚠️ Outside range

#### Assessment Output (Dimension 5)

```markdown
## Technical Specifications: [PASS / FAIL]

### Character Count Compliance
- Введение: [X] chars [STATUS]
- Методы/Результаты: [Y] chars [STATUS]
- Заключение: [Z] chars [STATUS]
- **Total:** [TOTAL] chars [✅ 2500-3500 / ❌ OUT OF RANGE]

**Action required:**
[If over: Specific suggestions for condensing]
[If under: Specific suggestions for expanding]

### Formatting Compliance
[List any formatting issues]

### Estimated Page Count: [P] pages
**Target compliance:** [✅ 1.5-2 pages / ❌ outside range]
```

---

## Overall Assessment Summary

### Final Recommendations Matrix

```markdown
# Review Summary

## Overall Quality: [READY / NEEDS MINOR REVISION / NEEDS MAJOR REVISION / REJECT]

---

## Critical Issues (MUST FIX - blocks submission)
Priority: URGENT

1. [Issue description]
   - **Section:** [Where found]
   - **Problem:** [Specific issue]
   - **Fix:** [Exact revision needed]
   - **Impact:** [Why critical]

[List all critical issues]

---

## High-Priority Issues (SHOULD FIX - quality impact)
Priority: Important

1. [Issue description]
   - **Section:** [Where found]
   - **Problem:** [Specific issue]
   - **Suggested fix:** [Revision recommendation]
   - **Impact:** [Why important]

[List all high-priority issues]

---

## Minor Issues (OPTIONAL - polish improvements)
Priority: Nice-to-have

1. [Issue description]
   - **Section:** [Where found]
   - **Suggested enhancement:** [How to improve]

[List minor issues]

---

## Strengths (What works well)

1. [Positive aspect]
2. [What's already good]
3. [Strong sections]

---

## Revision Strategy

**If READY:** No revisions needed, proceed to Step 6 (finalization)

**If NEEDS MINOR REVISION:**
- Time estimate: 30-60 minutes
- Main agent can apply minor fixes directly
- Focus on: [Specific areas]

**If NEEDS MAJOR REVISION:**
- Time estimate: 1.5-2 hours
- Requires content-writer (Step 5)
- Focus on: [Specific areas]
- Sections to rewrite: [Which sections]

**If REJECT:**
- Fatal flaws: [What cannot be salvaged]
- Recommendation: [Start over / Different approach]

---

## Score Summary

| Dimension | Score | Status |
|-----------|-------|--------|
| RINC Compliance | [X/Y elements] | [✅/⚠️/❌] |
| Academic Voice | [X.X/3.0] | [✅/⚠️/❌] |
| Bionics Positioning | [Strong/Medium/Weak] | [✅/⚠️/❌] |
| Content Accuracy | [Excellent/Good/Needs Fix] | [✅/⚠️/❌] |
| Technical Specs | [Pass/Fail] | [✅/❌] |

**Overall Recommendation:** [APPROVE / REVISE / REJECT]
```

---

## Output File: review_feedback.md

Create comprehensive review file with all assessments above, structured as:

1. Executive Summary (Overall recommendation)
2. Dimension 1: RINC Compliance (detailed checklist)
3. Dimension 2: Academic Voice (section scores + examples)
4. Dimension 3: Bionics Positioning (terminology audit + strength)
5. Dimension 4: Content Accuracy (fact-check results)
6. Dimension 5: Technical Specs (character counts + formatting)
7. Overall Assessment Summary (critical/high/minor issues)
8. Revision Strategy (what to fix, time estimate)

---

## Review Standards

### Be RIGOROUS but CONSTRUCTIVE

**Do:**
- Identify every deviation from RINC requirements
- Quote specific problematic passages
- Provide concrete revision suggestions
- Explain WHY something is problematic
- Acknowledge what works well

**Don't:**
- Be vague ("needs improvement" without specifics)
- Nitpick stylistic preferences (if RINC compliant)
- Suggest changes that violate character limits
- Recommend additions without suggesting what to cut

### Severity Calibration

**Critical (blocks submission):**
- Missing required RINC sections
- Character count violations (outside 2500-3500)
- Major statistical errors
- Weak bionics connection (would be desk-rejected)
- Academic voice failures (reads like blog)

**High-Priority (quality impact):**
- Section character counts slightly off
- Minor statistical inconsistencies
- Citation format errors
- Bionics terminology sparse
- Some blog-style elements remain

**Minor (polish):**
- Stylistic improvements
- Clearer phrasing opportunities
- Enhanced transitions
- Terminology optimization

---

## Time Budget
**Total: 1.5-2 hours**
- Reading thesis draft: 20 minutes
- RINC compliance check: 30 minutes
- Voice quality assessment: 20 minutes
- Bionics positioning audit: 20 minutes
- Content accuracy fact-check: 20 minutes
- Technical specs verification: 10 minutes
- Writing review report: 20 minutes

---

## Success Criteria

- ✅ All 5 dimensions assessed with specific scores
- ✅ Every critical issue identified with fix suggestion
- ✅ High-priority issues listed with recommendations
- ✅ Overall recommendation clear (READY / REVISE / REJECT)
- ✅ Revision strategy provided (what to fix, time estimate)
- ✅ review_feedback.md file created with comprehensive assessment

---

**Next Step:** Agent returns control to main agent, who reads review and decides:
- If READY: Proceed to Step 6 (finalization)
- If NEEDS REVISION: Proceed to Step 5 (improve based on feedback)
