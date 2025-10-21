# Task: English Adaptation of Post 2 (HITL/HOTL/HFTL Delegation Methods)

## Content Type: Blog Post (Translation + Adaptation)

## Scope Calibration Check ✅

**Reference metrics:** (from /.claude/reference/content-scoping-guide.md)
- Tasks: 8
- Time: 15 hours
- Citations: 18

**This plan:**
- Tasks: 3
- Time: 3-4 hours
- Citations: 18 (kept from Russian version)

**Ratio:** 0.38, 0.23, 1.0

**Assessment:** ✅ Under-scope (justified for translation/adaptation)

**Justification:**
This is translation + cultural adaptation, NOT new content creation:
- Source content fully developed (95% quality, 2,400 words)
- All research complete and cited (18 sources verified)
- Structure proven effective in Russian version
- No new research needed
- Single write-review-improve cycle sufficient

**Why under-scope is appropriate:**
- Translation work (not original creation)
- Adaptation work (cultural/linguistic, not structural)
- Quality control focus (maintaining source accuracy)
- Time estimates realistic for skilled translation

---

## Context

**Project:** AI Trust Gap Blog Series - Post 2 of 3
**Source:** `papers/blog1/post2_delegation/DRAFT_v3_HITL_FOCUS_RU.md`
**Target:** Global English-speaking audience (international tech professionals)
**Series Context:** Post 1 already published in English (`DRAFT_v3_EN.md`)

**Russian version status:**
- 95% publication-ready
- ~2,400 words
- Structure: Lemkin opening hook → Problem → 3 methods (HITL/HOTL/HFTL) → Decision framework → Conclusion
- All sources verified (English sources, no translation needed)
- Natural Russian flow with peer-to-peer warmth

**Voice:** Dr. Elena Cognitive - warm, accessible technical (adapted for English)

---

## Files to Create/Update

**Primary deliverable:**
- `papers/blog1/post2_delegation/DRAFT_v3_HITL_FOCUS_EN.md` - English adaptation

**Task memory:**
- `tasks/post2-english-adaptation/translation-notes.md` - Adaptation decisions documented

---

## Execution Steps for Main Agent

### Step 1: Translate and Adapt Content

**Agent:** content-writer
**Instructions file:** agent-instructions-translate.md

**Main agent should:**

1. **TodoWrite:** Mark "Translate and adapt Post 2 to English" as in_progress

2. **Read agent instructions:**
   - `tasks/post2-english-adaptation/agent-instructions-translate.md`

3. **Invoke content-writer:**
   ```
   description: "Translate and adapt Post 2 (HITL/HOTL/HFTL) to English"
   prompt: |
     EXECUTION CONTEXT:
     - Part of plan: tasks/post2-english-adaptation/plan.md
     - Step: 1
     - Content type: blog

     AGENT INSTRUCTIONS:
     [Main agent will paste agent-instructions-translate.md content here]
   ```

4. **Wait for completion** - content-writer will:
   - Read source document
   - Read Post 1 English version for voice consistency
   - Translate while adapting for English patterns
   - Maintain technical accuracy
   - Preserve warmth and engagement
   - Create `DRAFT_v3_HITL_FOCUS_EN.md`
   - Document adaptation decisions in `translation-notes.md`

5. **Verify outputs created:**
   - ✅ `papers/blog1/post2_delegation/DRAFT_v3_HITL_FOCUS_EN.md`
   - ✅ `tasks/post2-english-adaptation/translation-notes.md`

6. **TodoWrite:** Mark as completed

---

### Step 2: Review English Adaptation

**Agent:** content-reviewer
**Instructions file:** agent-instructions-review.md

**Main agent should:**

1. **TodoWrite:** Mark "Review English adaptation quality" as in_progress

2. **Read agent instructions:**
   - `tasks/post2-english-adaptation/agent-instructions-review.md`

3. **Invoke content-reviewer:**
   ```
   description: "Review English adaptation of Post 2"
   prompt: |
     EXECUTION CONTEXT:
     - Part of plan: tasks/post2-english-adaptation/plan.md
     - Step: 2
     - Content type: blog

     AGENT INSTRUCTIONS:
     [Main agent will paste agent-instructions-review.md content here]
   ```

4. **Wait for completion** - content-reviewer will:
   - Assess English naturalness (translation vs native quality)
   - Verify voice consistency with Post 1 English
   - Check technical accuracy maintained
   - Evaluate cultural adaptation effectiveness
   - Verify citation accessibility for international readers
   - Create review file with specific recommendations

5. **Read review file:**
   - `tasks/post2-english-adaptation/review-report.md`

6. **Assess review findings:**
   - Critical issues requiring revision?
   - Minor polish needed?
   - Ready for publication?

7. **TodoWrite:** Mark as completed

---

### Step 3: Improve Based on Review (Conditional)

**Agent:** content-writer (if needed) OR main agent (if trivial)
**Instructions file:** agent-instructions-improve.md (if major revisions)

**Main agent should:**

1. **Decision point:** Review severity?

   **IF critical issues found (native English quality problems, voice inconsistency, technical errors):**

   a. **TodoWrite:** Mark "Revise English adaptation per review" as in_progress

   b. **Read agent instructions:**
      - `tasks/post2-english-adaptation/agent-instructions-improve.md`

   c. **Invoke content-writer:**
      ```
      description: "Revise English adaptation per reviewer feedback"
      prompt: |
        EXECUTION CONTEXT:
        - Part of plan: tasks/post2-english-adaptation/plan.md
        - Step: 3
        - Content type: blog

        AGENT INSTRUCTIONS:
        [Main agent will paste agent-instructions-improve.md content here]
      ```

   d. **Wait for completion**

   e. **TodoWrite:** Mark as completed

   **ELSE IF minor polish needed (typos, minor phrasing):**

   a. Main agent applies minor improvements directly using Edit tool

   b. Document changes in `tasks/post2-english-adaptation/minor-improvements.md`

   **ELSE (ready for publication):**

   a. Skip improvement step

   b. Proceed to Step 4

---

### Step 4: Verify Final Quality

**Agent:** Main agent (no specialist needed)

**Main agent should:**

1. **TodoWrite:** Mark "Verify final English quality" as in_progress

2. **Read created file:**
   - `papers/blog1/post2_delegation/DRAFT_v3_HITL_FOCUS_EN.md`

3. **Quality verification checklist:**

   **English Naturalness:**
   - [ ] Reads as native English (not translation)?
   - [ ] Sentence rhythm varies (English prefers more variation)?
   - [ ] Transition phrases natural for English readers?
   - [ ] No awkward literal translations?

   **Voice Consistency:**
   - [ ] Dr. Elena Cognitive warmth maintained?
   - [ ] Peer-to-peer tone (not condescending)?
   - [ ] Technical confidence balanced with accessibility?
   - [ ] Matches Post 1 English voice (`DRAFT_v3_EN.md`)?

   **Technical Accuracy:**
   - [ ] All HITL/HOTL/HFTL definitions preserved?
   - [ ] Statistics unchanged from Russian (verified)?
   - [ ] Technical terms natural in English dev context?
   - [ ] Examples resonate with international audience?

   **Cultural Adaptation:**
   - [ ] Intesa Sanpaolo kept (international bank)?
   - [ ] Cultural references adjusted if needed?
   - [ ] Idioms adapted to English equivalents?
   - [ ] Engagement patterns natural for English readers?

   **Citation Accessibility:**
   - [ ] All 18 source URLs working?
   - [ ] Sources accessible to international readers?
   - [ ] Citation format consistent?
   - [ ] Academic sources = English originals (Nature, Fortune, etc.)?

   **Structure & Length:**
   - [ ] Overall structure maintained (Lemkin → Methods → Framework)?
   - [ ] Word count: ~2,400-2,600 words? (English typically 10-15% longer)
   - [ ] Decision framework (3 questions) clear?
   - [ ] Conclusion actionable?

   **Series Integration:**
   - [ ] Labeled "Part 2 of 3"?
   - [ ] Series context maintained?
   - [ ] Transition to Part 3 (shadow AI) included?

4. **IF any checklist item fails:**
   - Return to Step 3 (improvement phase)
   - Document specific issues
   - Re-invoke content-writer if needed

5. **TodoWrite:** Mark as completed

---

### Step 5: Document Completion

**Agent:** Main agent

**Main agent should:**

1. **Create completion summary:**
   - File created: `papers/blog1/post2_delegation/DRAFT_v3_HITL_FOCUS_EN.md`
   - Word count: [actual count]
   - Quality: Publication-ready English adaptation
   - Voice: Dr. Elena Cognitive (English)
   - Citations: 18 verified sources maintained
   - Time spent: [actual time]

2. **Report to user:**
   ```
   English adaptation complete: papers/blog1/post2_delegation/DRAFT_v3_HITL_FOCUS_EN.md

   Key deliverables:
   - Natural English (not literal translation)
   - Voice consistent with Post 1 English
   - Technical accuracy verified
   - ~2,500 words (target length)
   - All 18 citations maintained
   - Publication-ready quality

   Task memory: tasks/post2-english-adaptation/
   - translation-notes.md (adaptation decisions)
   - review-report.md (quality assessment)
   ```

---

## Success Criteria

- [x] English adaptation created at `papers/blog1/post2_delegation/DRAFT_v3_HITL_FOCUS_EN.md`
- [x] Reads as native English (not translation)
- [x] Dr. Elena Cognitive voice maintained (adapted for English)
- [x] Voice consistent with Post 1 English (`DRAFT_v3_EN.md`)
- [x] Technical accuracy preserved (HITL/HOTL/HFTL definitions, statistics)
- [x] Cultural adaptation successful (examples resonate with global audience)
- [x] All 18 sources verified and accessible
- [x] Word count: ~2,400-2,600 words
- [x] Structure maintained (opening hook → methods → framework → conclusion)
- [x] Review cycle completed
- [x] Publication-ready quality

---

## Translation vs Adaptation Guidelines

**This is NOT literal translation. This is cultural and linguistic adaptation.**

### What Changes

**Sentence Structure:**
- Russian: Longer sentences, complex subordination common
- English: Prefer varied rhythm, mix of short punchy and detailed

**Paragraph Flow:**
- Russian: Can build longer paragraphs before breaking
- English: Prefer more frequent paragraph breaks (readability)

**Transition Markers:**
- Russian: "Представьте:", "Окей", "Вот что стоит понять"
- English: "Picture this:", "Here's the thing:", "What matters:"

**Directness vs Engagement:**
- Russian: Direct statements work well
- English: More engagement markers ("you might think...", "here's what's surprising...")

**Cultural References:**
- Keep: Intesa Sanpaolo (international), Fortune, Nature, McKinsey
- Verify: Any Russian-specific references → adjust if needed

### What Stays Exactly the Same

**Statistics:** Every number identical (verified sources)
**Technical Terms:** HITL/HOTL/HFTL definitions unchanged
**Citations:** All 18 sources exactly as-is (already English)
**Structure:** Opening → Methods → Framework → Conclusion
**Examples:** Lemkin/Replit, McDonald's, Air Canada (already international)

---

## Quality Standards

**"Native English" Test:**
- Could this have been written originally in English?
- Do transitions feel natural (not translated)?
- Does sentence rhythm match English reading patterns?
- Are idioms English-native (not literal translations)?

**"Voice Consistency" Test:**
- Does this match Post 1 English voice?
- Same warmth and peer-to-peer tone?
- Same technical confidence level?
- Same engagement patterns?

**"Technical Accuracy" Test:**
- All definitions preserved exactly?
- Statistics unchanged (verified)?
- Examples maintain same meaning?
- Framework (3 questions) identical logic?

**"Global Audience" Test:**
- Examples resonate internationally (not US-only)?
- Cultural references accessible worldwide?
- Technical terms universal (not regional)?
- Idioms work for non-native English speakers?

---

## Notes for Content-Writer

**Key Challenge:** Maintain warmth and engagement while ensuring native English quality

**Voice Calibration:**
- Read Post 1 English (`DRAFT_v3_EN.md`) first
- Match tone, rhythm, engagement markers
- Dr. Elena warmth translates well (keep it)
- Peer-to-peer approach universal (maintain)

**Translation Philosophy:**
- Translate meaning, not words
- Adapt idioms to English equivalents
- Adjust sentence rhythm for English patterns
- Keep technical precision absolute

**Length Expectation:**
- Russian: ~2,400 words
- English: ~2,400-2,600 words (typically 10-15% longer)
- Reason: English often requires more words for same meaning

**Common Pitfalls to Avoid:**
- ❌ Literal translation of idioms
- ❌ Overly long sentences (Russian pattern)
- ❌ Awkward transition markers
- ❌ Changing statistics or examples
- ❌ Losing warmth in pursuit of formality

---

## Time Estimates

**Step 1: Translation + Adaptation:** 2 hours
- Reading source: 15 min
- Reading Post 1 English: 15 min
- Translation: 60 min
- Adaptation polish: 30 min

**Step 2: Review:** 45 minutes
- Reading draft: 15 min
- Quality assessment: 20 min
- Review report: 10 min

**Step 3: Improvement (if needed):** 30-45 minutes
- Minor polish: 30 min
- Major revision (unlikely): 45 min

**Step 4: Verification:** 15 minutes

**Total:** 3-4 hours (realistic for quality translation + adaptation)

---

**PLAN STATUS:** Ready for execution
**ESTIMATED COMPLETION:** 3-4 hours
**CONFIDENCE:** High (source quality 95%, clear adaptation guidelines, Post 1 voice reference available)

**I (content-director) am now DONE. Main agent should execute this plan step by step.**
