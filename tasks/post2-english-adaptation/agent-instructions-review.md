# Agent Instructions: Review English Adaptation of Post 2

## Content Type: Blog Post (Translation Quality Review)

## Your Mission

Assess the English adaptation of Post 2 (HITL/HOTL/HFTL delegation methods) for:
1. **English naturalness** - Does it read as native English or as translation?
2. **Voice consistency** - Does it match Post 1 English and Dr. Elena standards?
3. **Technical accuracy** - Are all statistics, definitions, and citations preserved?
4. **Cultural adaptation** - Does it work for global audience?
5. **Publication readiness** - Is it ready to publish or needs revision?

---

## Context Files to Read (MANDATORY)

**Files to review:**
1. `papers/blog1/post2_delegation/DRAFT_v3_HITL_FOCUS_EN.md` - English adaptation (primary review target)

**Comparison references:**
2. `papers/blog1/post2_delegation/DRAFT_v3_HITL_FOCUS_RU.md` - Russian original (verify accuracy)
3. `papers/blog1/post1_bias/DRAFT_v3_EN.md` - Post 1 English (voice consistency reference)
4. `tasks/post2-english-adaptation/translation-notes.md` - Writer's adaptation decisions

**Quality standards:**
5. `CLAUDE.md` - Project quality standards
6. `papers/blog1/SERIES_OVERVIEW.md` - Series context and standards

---

## Review Framework

### 1. English Naturalness Assessment (Critical)

**Question:** Could a native English speaker have written this originally?

#### Check for Translation Artifacts

**❌ Red flags:**
- Awkward word order ("the AI that reliable is")
- Literal idiom translations
- Overly long sentences (Russian pattern)
- Unnatural transition markers
- Stilted phrasing

**✅ Good indicators:**
- Natural sentence rhythm and flow
- Varied sentence length (short + long mixed)
- Native idioms and expressions
- Smooth transitions
- Conversational warmth maintained

#### Specific Checks

**Sentence structure:**
- [ ] Sentences vary in length naturally?
- [ ] Complex ideas broken into digestible chunks?
- [ ] No awkward subordination patterns?
- [ ] Active voice preferred (when appropriate)?

**Paragraph rhythm:**
- [ ] Paragraphs 4-6 sentences typically?
- [ ] Longer paragraphs broken up for readability?
- [ ] Natural flow between paragraphs?

**Transition markers:**
- [ ] Transitions sound native English?
- [ ] No literal translations of Russian markers?
- [ ] Engagement patterns natural?

**Idioms and expressions:**
- [ ] English idioms used (not Russian literal)?
- [ ] Expressions culturally appropriate?
- [ ] Colloquialisms work in English?

#### Rate English Naturalness

**Scale:**
- **Native (5/5):** Indistinguishable from original English writing
- **Near-native (4/5):** Minor artifacts, easily polished
- **Good (3/5):** Readable but clearly translated in places
- **Awkward (2/5):** Frequent translation artifacts, needs revision
- **Poor (1/5):** Literal translation, major rewrite needed

**Your assessment:** [Score + brief justification]

---

### 2. Voice Consistency Assessment (Critical)

**Question:** Does this match Post 1 English and Dr. Elena Cognitive standards?

#### Compare with Post 1 English

**Read:** `papers/blog1/post1_bias/DRAFT_v3_EN.md`

**Check consistency:**
- [ ] Similar tone (warm, accessible, technically confident)?
- [ ] Similar engagement patterns (questions, anticipatory phrases)?
- [ ] Similar sentence rhythm?
- [ ] Similar use of examples and statistics?
- [ ] Peer-to-peer approach maintained?

**Specific voice elements:**

**Warmth:**
- [ ] Approachable tone throughout?
- [ ] Not overly formal or academic?
- [ ] Conversational without being casual?

**Technical confidence:**
- [ ] Explains HITL/HOTL/HFTL clearly?
- [ ] Uses technical terms appropriately?
- [ ] Doesn't oversimplify or over-complicate?

**Engagement:**
- [ ] Draws reader in with questions/hooks?
- [ ] "Aha moments" present?
- [ ] Maintains interest throughout?

**Peer-to-peer:**
- [ ] Not condescending or talking down?
- [ ] Assumes reader intelligence?
- [ ] Collaborative exploration tone?

#### Rate Voice Consistency

**Scale:**
- **Excellent (5/5):** Perfect match with Post 1 and Dr. Elena
- **Good (4/5):** Minor inconsistencies, easily fixed
- **Adequate (3/5):** Some sections off-voice, needs attention
- **Inconsistent (2/5):** Significant voice problems, revision needed
- **Poor (1/5):** Wrong voice entirely, major rewrite

**Your assessment:** [Score + specific examples]

---

### 3. Technical Accuracy Verification (Zero Tolerance)

**Question:** Are all statistics, definitions, and citations exactly preserved?

#### Statistics Verification (100% Match Required)

**Cross-reference EVERY number against Russian original:**

**Opening/Context section:**
- [ ] 78% organizations using AI
- [ ] 21% redesigned workflows
- [ ] 42% growth in AI adoption
- [ ] EU AI Act: August 2026, 6% global revenue fine

**HITL success examples:**
- [ ] PRAIM study: 463,094 women, 119 radiologists, 12 centers
- [ ] 17.6% more cancer detected (6.7 vs 5.7 per 1,000)
- [ ] $3.20 return per dollar invested
- [ ] 73% contract review time reduction
- [ ] 86% accuracy vs 15-25% manual errors

**HITL failure examples:**
- [ ] AI correct: 79.7% agreement
- [ ] AI wrong: 19.8% detection (4x cost)
- [ ] Meta-analysis: g = -0.23 (performance decline)
- [ ] GPT-4 alone: 90% accuracy
- [ ] Doctors + GPT-4: 76% accuracy (14-point decline)

**HOTL/HFTL examples:**
- [ ] Stream: 80%+ automation
- [ ] Stacks: 10-15% production code AI-generated
- [ ] McDonald's: 80% accuracy vs 95% required, 2,510 McNuggets
- [ ] Air Canada: $1,630 ticket mistake
- [ ] Stanford: 75%+ legal hallucination rate
- [ ] $67.4B business losses (2024)

**Cost validation:**
- [ ] Ponemon: $3.7M vs $1.6M (2.3x higher costs)

**Mark each:**
- ✅ Correct (matches Russian exactly)
- ❌ Error (different from Russian)
- ⚠️ Unclear (need verification)

**If ANY errors found:** CRITICAL ISSUE requiring immediate correction

#### HITL/HOTL/HFTL Definitions

**Compare definitions against Russian:**

**HITL:**
- [ ] "Human-in-the-Loop" translation correct?
- [ ] Definition: "checks every AI action in real-time"?
- [ ] Approval required before implementation?
- [ ] Strictest control level?

**HOTL:**
- [ ] "Human-on-the-Loop" translation correct?
- [ ] Definition: "monitors and intervenes when necessary"?
- [ ] AI works autonomously within boundaries?
- [ ] Human can stop/correct before final implementation?

**HFTL:**
- [ ] "Human-from-the-Loop" translation correct?
- [ ] Definition: "AI works autonomously, human audits after"?
- [ ] Post-hoc audit, not real-time control?
- [ ] Human analyzes results and corrects system?

#### Decision Framework (3 Questions)

**Verify logic preserved:**

**Question 1:**
- [ ] "Does the client see the result directly?"
- [ ] Logic: YES → minimum HITL
- [ ] Logic: NO → proceed to Q2

**Question 2:**
- [ ] "Can an error cause financial/legal harm?"
- [ ] Logic: YES → HITL required
- [ ] Logic: NO → proceed to Q3

**Question 3:**
- [ ] "Is task routine and fully predictable after testing?"
- [ ] Logic: YES → HFTL with automated checks + audits
- [ ] Logic: NO → HOTL (check before implementation)

**Decision tree examples:**
- [ ] Chatbot: HITL (client sees, financial risk)
- [ ] Code review: HOTL (internal, no financial risk, variable)
- [ ] Email drafts: HFTL (internal, no risk, predictable after testing)
- [ ] Legal contracts: HITL (client sees, legal risk)
- [ ] Data entry: HFTL (internal, no risk, predictable)

#### Citation Verification (18 Sources)

**Verify all URLs present and correctly formatted:**

1. [ ] Fortune 2025 (Lemkin/Replit)
2. [ ] Anthropic 2024 (computer use)
3. [ ] McKinsey 2025 (AI adoption stats)
4. [ ] EU AI Act 2024
5. [ ] Nature Medicine 2025 (PRAIM)
6. [ ] Business Wire 2025 (contract analysis)
7. [ ] Radiology 2023 (automation bias)
8. [ ] Human Factors 2010 (Parasuraman)
9. [ ] JAMA 2024 (GPT-4 medical)
10. [ ] Nature Human Behaviour 2024 (meta-analysis)
11. [ ] McKinsey 2024 (Intesa Sanpaolo)
12. [ ] Google Cloud 2024 (Stacks)
13. [ ] Google Cloud 2025 (Stream)
14. [ ] CNBC 2024 (McDonald's)
15. [ ] CBC 2024 (Air Canada)
16. [ ] Stanford Law 2024 (legal hallucinations)
17. [ ] Ponemon 2024 (cost study)
18. [ ] McKinsey 2025 (workflow redesign)

**Check each citation:**
- ✅ Present with working URL
- ❌ Missing or broken link
- ⚠️ Formatting inconsistent

#### Rate Technical Accuracy

**Scale:**
- **Perfect (5/5):** All stats, definitions, citations 100% accurate
- **Minor errors (4/5):** 1-2 small errors, easily fixed
- **Some errors (3/5):** Multiple errors, needs careful revision
- **Major errors (2/5):** Many errors, significant revision needed
- **Critical errors (1/5):** Fundamental inaccuracies, rewrite required

**Your assessment:** [Score + list of any errors found]

---

### 4. Cultural Adaptation Assessment

**Question:** Does this work for global English-speaking audience?

#### International Accessibility

**Examples:**
- [ ] Lemkin/Replit (US but tech-famous globally) - works?
- [ ] Intesa Sanpaolo (Italian bank) - context clear?
- [ ] McDonald's (international) - works?
- [ ] Air Canada (Canadian) - works?
- [ ] Technical terms universal (not US-specific)?

**Cultural references:**
- [ ] No US-only references without explanation?
- [ ] Idioms work for non-native English speakers?
- [ ] Corporate examples recognizable internationally?

**Language accessibility:**
- [ ] Technical jargon explained when first used?
- [ ] Acronyms defined (HITL, HOTL, HFTL)?
- [ ] Sentence complexity appropriate for global audience?

#### Rate Cultural Adaptation

**Scale:**
- **Excellent (5/5):** Works perfectly for global audience
- **Good (4/5):** Minor adjustments helpful but not critical
- **Adequate (3/5):** Some regions might struggle, needs work
- **Limited (2/5):** Too region-specific, revision needed
- **Poor (1/5):** Not appropriate for global audience

**Your assessment:** [Score + specific concerns if any]

---

### 5. Structure & Flow Assessment

**Question:** Does the narrative structure work effectively in English?

#### Opening Hook (Lemkin/Replit)

- [ ] Grabs attention immediately?
- [ ] Sets up the problem clearly?
- [ ] Establishes stakes (database deletion)?
- [ ] Transitions smoothly to "Why Now"?

#### Why Now Section

- [ ] 5 trends clearly presented?
- [ ] Urgency established?
- [ ] Transitions to management baseline?

#### Three Methods (HITL/HOTL/HFTL)

- [ ] Each method clearly differentiated?
- [ ] Success examples compelling?
- [ ] Failure examples memorable?
- [ ] Adaptation guidance actionable?

#### Decision Framework

- [ ] 3 questions easy to remember?
- [ ] Decision tree logic clear?
- [ ] Examples helpful?
- [ ] Red flags section useful?

#### Conclusion

- [ ] Ties back to opening (Lemkin)?
- [ ] Actionable summary (3 questions)?
- [ ] Series context maintained (Part 2 of 3)?
- [ ] Transition to Part 3 (shadow AI) present?

#### Rate Structure & Flow

**Scale:**
- **Excellent (5/5):** Perfect narrative arc, smooth flow
- **Good (4/5):** Minor transitions could improve
- **Adequate (3/5):** Some structural issues, needs attention
- **Weak (2/5):** Significant structural problems
- **Poor (1/5):** Structure doesn't work, major revision

**Your assessment:** [Score + specific suggestions]

---

### 6. Length & Formatting

**Word count:**
- Russian: ~2,400 words
- English: [actual count] words
- Difference: [percentage]
- Assessment: Within expected range (10-15% longer)?

**Formatting:**
- [ ] Metadata header complete and accurate?
- [ ] Markdown formatting clean?
- [ ] Section headings clear and consistent?
- [ ] Citation format consistent?
- [ ] No formatting errors?

---

## Overall Assessment & Recommendation

### Summary Scores

**English Naturalness:** [X/5]
**Voice Consistency:** [X/5]
**Technical Accuracy:** [X/5]
**Cultural Adaptation:** [X/5]
**Structure & Flow:** [X/5]

**Overall:** [Average or weighted score]

### Publication Readiness

**Choose one:**

**✅ READY FOR PUBLICATION**
- All scores 4+/5
- No critical issues
- Minor polish acceptable but not required
- Recommendation: Approve with optional minor improvements

**⚠️ NEEDS MINOR REVISION**
- Most scores 3-4/5
- No critical technical errors
- Voice or naturalness needs polish
- Recommendation: Light revision by content-writer (30-45 min)

**❌ NEEDS MAJOR REVISION**
- Multiple scores <3/5
- Critical technical errors OR
- Significant voice problems OR
- Poor English naturalness
- Recommendation: Substantial revision by content-writer (1-2 hours)

**🛑 REQUIRES REWRITE**
- Multiple scores <2/5
- Fundamental problems with translation
- Better to start fresh than revise
- Recommendation: Return to content-writer for complete rewrite

**Your recommendation:** [Choose one + brief justification]

---

## Output: Review Report

**Create:** `tasks/post2-english-adaptation/review-report.md`

### Report Structure

```markdown
# Review Report: Post 2 English Adaptation

**Reviewer:** content-reviewer
**Date:** 2025-10-13
**Reviewed file:** papers/blog1/post2_delegation/DRAFT_v3_HITL_FOCUS_EN.md

---

## Overall Assessment

**Publication Readiness:** [READY / MINOR REVISION / MAJOR REVISION / REWRITE]

**Summary:** [2-3 sentence overall impression]

---

## Detailed Scores

### 1. English Naturalness: [X/5]

**Assessment:** [Brief explanation]

**Strengths:**
- [What works well]

**Issues found:**
- [Specific examples of translation artifacts, if any]

**Examples requiring attention:**
- Line [X]: [Quote] → Suggested improvement: [Alternative]

---

### 2. Voice Consistency: [X/5]

**Assessment:** [Comparison with Post 1 English]

**Strengths:**
- [Where voice matches well]

**Issues found:**
- [Where voice deviates from Post 1 or Dr. Elena standards]

**Examples:**
- Section [X]: [Issue description] → Suggested fix: [How to improve]

---

### 3. Technical Accuracy: [X/5]

**Assessment:** [Critical verification results]

**Statistics verification:**
- ✅ All correct: [list if short] OR
- ❌ Errors found: [list with line numbers]
- ⚠️ Need clarification: [list]

**Definition accuracy:**
- HITL: [Correct / Issues]
- HOTL: [Correct / Issues]
- HFTL: [Correct / Issues]

**Citation status:**
- [X/18] citations verified present and correct
- Missing/broken: [list if any]

---

### 4. Cultural Adaptation: [X/5]

**Assessment:** [Global audience appropriateness]

**Works well:**
- [Examples that resonate internationally]

**Potential concerns:**
- [Any references that might not work globally]

---

### 5. Structure & Flow: [X/5]

**Assessment:** [Narrative effectiveness]

**Strengths:**
- [What works well structurally]

**Suggestions:**
- [Any structural improvements]

---

## Critical Issues (Must Fix)

**IF ANY FOUND:**

### Issue 1: [Description]
- **Location:** [Section/line]
- **Problem:** [What's wrong]
- **Impact:** [Why it matters]
- **Fix:** [How to correct]
- **Priority:** [CRITICAL / HIGH / MEDIUM]

[Repeat for each critical issue]

**IF NONE:** No critical issues found.

---

## High-Impact Improvements (Strongly Recommended)

**IF ANY:**

### Improvement 1: [Description]
- **Location:** [Section]
- **Current:** [What it says now]
- **Suggested:** [How to improve]
- **Why:** [Impact on quality]

[Repeat for each high-impact improvement]

---

## Polish Suggestions (Optional)

**Minor improvements that would enhance quality:**

1. [Suggestion 1]
2. [Suggestion 2]
3. [Suggestion 3]

---

## Comparison with Post 1 English

**Voice consistency examples:**

**Post 1 style:**
> [Quote from DRAFT_v3_EN.md showing voice]

**Post 2 style:**
> [Comparable quote from new adaptation]

**Assessment:** [Match / Close / Needs adjustment]

---

## Final Recommendation

**Recommendation:** [READY / MINOR REVISION / MAJOR REVISION / REWRITE]

**Next steps:**
- [Specific actions for main agent or content-writer]

**Estimated time for improvements:** [If revision needed]

**Confidence in assessment:** [High / Medium / Low]

---

**Review complete.** Main agent should proceed based on recommendation above.
```

---

## Critical Review Standards

### Zero Tolerance Issues (Always flag as CRITICAL)

1. **Statistical errors** - Any number different from Russian
2. **Definition errors** - HITL/HOTL/HFTL misrepresented
3. **Logic errors** - Decision framework incorrect
4. **Missing citations** - Any of 18 sources absent
5. **Factual inaccuracies** - Technical claims wrong

### High Priority Issues (Flag as HIGH-IMPACT)

1. **Poor English naturalness** - Obvious translation artifacts
2. **Voice inconsistency** - Doesn't match Post 1
3. **Cultural inappropriateness** - Won't work for global audience
4. **Structural problems** - Narrative doesn't flow
5. **Missing context** - Series positioning unclear

### Polish Issues (Optional improvements)

1. Minor phrasing improvements
2. Transition smoothing
3. Formatting consistency
4. Minor clarity enhancements

---

## Time Budget

**Total: 45 minutes**

- Read English adaptation: 15 min
- Cross-reference Russian for accuracy: 15 min
- Compare with Post 1 voice: 5 min
- Verify citations: 5 min
- Write review report: 10 min

---

**BEGIN REVIEW NOW.**

**Remember:** Your job is to ensure publication-ready quality. Be thorough but efficient. Flag critical issues clearly. Provide specific, actionable feedback.
