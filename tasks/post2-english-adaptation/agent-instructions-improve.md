# Agent Instructions: Improve English Adaptation Based on Review

## Content Type: Blog Post (Revision)

## Voice Requirements

**Dr. Elena Cognitive (English):**
- Warm, accessible technical writing
- Peer-to-peer tone
- Technically confident but approachable
- Matches Post 1 English voice

---

## Context Files to Read (MANDATORY)

**Files to revise:**
1. `papers/blog1/post2_delegation/DRAFT_v3_HITL_FOCUS_EN.md` - Current English draft

**Review feedback:**
2. `tasks/post2-english-adaptation/review-report.md` - Reviewer's specific feedback (READ FIRST)

**Reference materials:**
3. `papers/blog1/post2_delegation/DRAFT_v3_HITL_FOCUS_RU.md` - Russian original (for accuracy)
4. `papers/blog1/post1_bias/DRAFT_v3_EN.md` - Post 1 English (for voice consistency)
5. `tasks/post2-english-adaptation/translation-notes.md` - Original adaptation decisions

---

## Task: Revise English Adaptation Per Review Feedback

### Your Mission

Address all issues identified in the review report while maintaining:
- Technical accuracy (100%)
- Voice consistency with Post 1
- English naturalness
- Cultural appropriateness

**Priority order:**
1. **CRITICAL issues** (must fix) - technical errors, accuracy problems
2. **HIGH-IMPACT issues** (strongly recommended) - voice, naturalness, structure
3. **POLISH issues** (optional) - minor improvements if time permits

---

## Revision Process

### Step 1: Read Review Report Thoroughly (10 minutes)

**Read:** `tasks/post2-english-adaptation/review-report.md`

**Categorize issues:**

**CRITICAL (must address):**
- [ ] Statistical errors
- [ ] Definition inaccuracies
- [ ] Logic errors
- [ ] Missing citations
- [ ] Factual mistakes

**HIGH-IMPACT (strongly recommended):**
- [ ] English naturalness problems
- [ ] Voice inconsistencies
- [ ] Cultural adaptation issues
- [ ] Structural problems

**POLISH (optional):**
- [ ] Minor phrasing improvements
- [ ] Transition smoothing
- [ ] Formatting tweaks

**Create mental checklist:** What needs fixing in what order?

---

### Step 2: Address Critical Issues First (Immediate)

**For each CRITICAL issue:**

1. **Locate in document:**
   - Find section/line identified in review
   - Understand context

2. **Verify against sources:**
   - Check Russian original for accuracy
   - Verify statistics against source citations
   - Confirm technical definitions

3. **Fix with zero tolerance:**
   - Statistics: Match Russian EXACTLY
   - Definitions: Preserve meaning precisely
   - Citations: Ensure all present and correct
   - Logic: Maintain decision tree accuracy

4. **Document fix:**
   - What was wrong
   - What you changed
   - How you verified accuracy

**No CRITICAL issues can remain.** These are publication blockers.

---

### Step 3: Address High-Impact Issues (Priority)

**For each HIGH-IMPACT issue:**

#### English Naturalness Problems

**If review found translation artifacts:**

**Example issue:**
> Line 42: "The AI that reliable is creates strong anchor"
> (Word order unnatural)

**Fix process:**
1. Read surrounding context
2. Rewrite in natural English: "Reliable AI creates a strong anchor"
3. Check flow with adjacent sentences
4. Verify meaning unchanged

**Common patterns to fix:**
- Awkward word order → Natural English structure
- Overly long sentences → Break into shorter units
- Literal idioms → English equivalents
- Stilted transitions → Natural markers

#### Voice Inconsistency Problems

**If review found voice deviations from Post 1:**

**Example issue:**
> Section "HITL Failures": Tone too formal, doesn't match Post 1 warmth

**Fix process:**
1. Read comparable Post 1 section
2. Identify voice characteristics (warmth, engagement)
3. Rewrite section matching that voice
4. Maintain technical accuracy while adjusting tone

**Voice elements to check:**
- Warmth: Conversational without being casual
- Engagement: Questions, anticipatory phrases
- Confidence: Technical but not arrogant
- Peer-to-peer: Collaborative, not condescending

#### Cultural Adaptation Issues

**If review found global audience problems:**

**Example issue:**
> Reference assumes familiarity with US-only context

**Fix process:**
1. Identify problematic reference
2. Add context OR replace with international example
3. Verify accessibility for non-US readers
4. Maintain example's illustrative power

#### Structural Problems

**If review found flow issues:**

**Example issue:**
> Transition from HOTL to HFTL abrupt

**Fix process:**
1. Read sections before and after
2. Add/improve transition marker
3. Ensure logical progression
4. Maintain narrative momentum

---

### Step 4: Address Polish Issues (If Time Permits)

**Only after all CRITICAL and HIGH-IMPACT issues resolved.**

**Minor improvements:**
- Smoother phrasing
- Better word choice
- Transition polish
- Formatting consistency

**Guideline:** Don't spend >20 minutes on polish. Diminishing returns.

---

### Step 5: Document Revisions (Required)

**Update:** `tasks/post2-english-adaptation/translation-notes.md`

**Add revision section:**

```markdown
## Revision Based on Review (2025-10-13)

### Critical Issues Addressed

**Issue 1:** [Description]
- **Problem:** [What was wrong]
- **Location:** [Section/line]
- **Fix:** [What changed]
- **Verification:** [How confirmed correct]

[Repeat for each critical issue]

### High-Impact Improvements Made

**Improvement 1:** [Description]
- **Location:** [Section]
- **Before:** [Original text]
- **After:** [Revised text]
- **Reason:** [Why changed]

[Repeat for each high-impact improvement]

### Polish Applied

- [List minor improvements made]

### Issues Not Addressed

**IF ANY optional suggestions skipped:**
- [Issue]: [Why not addressed - e.g., time constraints, disagree with suggestion]

### Verification Checklist

- [x] All critical issues resolved
- [x] All high-impact issues addressed
- [x] Technical accuracy verified
- [x] Voice consistency confirmed
- [x] English naturalness improved
- [x] Citations still intact (18/18)
- [x] Statistics unchanged
- [x] Structure maintained

### Changes Summary

**Lines modified:** [Approximate count]
**Sections revised:** [List]
**Time spent:** [Actual time]
**Confidence in revision:** [High/Medium/Low]
```

---

## Revision Guidelines

### What CAN Change

**Language and phrasing:**
- Sentence structure for naturalness
- Word choice for clarity
- Idioms for cultural fit
- Transitions for flow

**Tone adjustments:**
- Warmth level (to match Post 1)
- Engagement markers
- Formality level
- Voice consistency

### What CANNOT Change

**Absolute preservations:**
- Statistics (every number)
- Technical definitions (HITL/HOTL/HFTL)
- Decision framework logic (3 questions)
- Citations (all 18 sources)
- Examples (Lemkin, McDonald's, etc.)
- Core structure (opening → methods → framework)

**Verify after each revision:**
- Did I change any numbers? (Undo if yes)
- Did I alter technical meaning? (Undo if yes)
- Did I remove/change citations? (Undo if yes)

---

## Common Revision Patterns

### Pattern 1: Breaking Long Sentences

**Before (too long):**
> "When you delegate to an employee, you check their qualifications through resume review, interviews, and reference checks, you assess the risk level based on task complexity and consequences, and you select appropriate oversight mechanisms ranging from close supervision to periodic check-ins depending on both capability and risk profile."

**After (natural rhythm):**
> "When you delegate to an employee, you check their qualifications. Resume, interviews, references. You assess the risk level based on task complexity. Then you select appropriate oversight—close supervision or periodic check-ins—depending on both capability and risk."

**Process:**
- Identify overly long sentence (>30 words typically)
- Find natural break points
- Separate into multiple sentences
- Add rhythm variation (short + longer)
- Verify meaning preserved

### Pattern 2: Naturalizing Transitions

**Before (literal translation):**
> "And here is what is most interesting..."

**After (natural English):**
> "Here's where it gets interesting."

**Common transformations:**
- "Окей" → "Now" / "Here's the thing:"
- "Вот что стоит понять:" → "What matters:" / "Here's what's critical:"
- "И самое интересное..." → "But here's the twist:" / "The surprising part:"
- "Представьте:" → "Picture this:" / "Imagine:"

### Pattern 3: Voice Warming

**Before (too formal):**
> "Research demonstrates that organizations implementing these methodologies achieve superior outcomes."

**After (Dr. Elena warmth):**
> "Here's what the research shows: organizations using these methods see better results."

**Process:**
- Identify overly formal phrasing
- Rewrite conversationally
- Add engagement marker if natural
- Maintain technical accuracy
- Verify matches Post 1 tone

### Pattern 4: Cultural Adaptation

**Before (potentially US-centric):**
> "Like the Super Bowl of tech failures..."

**After (internationally accessible):**
> "One of tech's most spectacular failures..."

**Process:**
- Identify region-specific reference
- Assess: Does global audience understand?
- If unclear: Replace with universal reference
- If clear: Keep (e.g., McDonald's works globally)

---

## Quality Self-Check After Revision

**Before submitting revised version:**

### Critical Verification

- [ ] All statistics match Russian EXACTLY
- [ ] HITL/HOTL/HFTL definitions accurate
- [ ] Decision framework logic preserved
- [ ] All 18 citations present
- [ ] No factual errors introduced

### High-Impact Verification

- [ ] English sounds natural (not translated)
- [ ] Voice matches Post 1 English
- [ ] Global audience can understand
- [ ] Narrative flows smoothly
- [ ] Transitions feel native

### Polish Verification

- [ ] Formatting clean
- [ ] Markdown correct
- [ ] Headings consistent
- [ ] No typos introduced

### Review Feedback Addressed

- [ ] All CRITICAL issues fixed
- [ ] All HIGH-IMPACT issues addressed
- [ ] POLISH issues addressed if time allowed
- [ ] Revision documented in translation-notes.md

---

## Output Files

**Update:** `papers/blog1/post2_delegation/DRAFT_v3_HITL_FOCUS_EN.md`
- Use Edit tool to revise existing file
- Preserve metadata header
- Update status if needed: "Status: Draft v3 - Revised [date]"

**Update:** `tasks/post2-english-adaptation/translation-notes.md`
- Add revision section (see Step 5)
- Document all changes
- Verification checklist

---

## Time Budget

**Depends on issue severity:**

**Minor revision (30-45 minutes):**
- Few high-impact issues
- No critical errors
- Mostly polish

**Major revision (1-2 hours):**
- Multiple high-impact issues
- Some critical errors
- Substantial rewriting needed

**Work efficiently:**
- Focus on critical first
- Address high-impact thoroughly
- Polish only if time permits
- Document as you go

---

## Final Checklist Before Completion

**Ask yourself:**

1. **Are all critical issues resolved?**
   - If NO: Keep working (publication blocker)
   - If YES: Proceed

2. **Are high-impact issues addressed?**
   - If NO: Why not? Valid reason?
   - If YES: Proceed

3. **Does it read as native English?**
   - If NO: More work needed
   - If YES: Proceed

4. **Does it match Post 1 voice?**
   - If NO: Compare again and adjust
   - IF YES: Proceed

5. **Is technical accuracy 100%?**
   - If NO: STOP and fix (zero tolerance)
   - If YES: Proceed

6. **Are revisions documented?**
   - If NO: Document now
   - If YES: Complete

**If all YES: Revision complete. Submit to main agent.**

---

**BEGIN REVISION NOW.**

**Remember:**
- Critical issues = publication blockers (fix all)
- High-impact issues = quality matters (address all)
- Polish = nice-to-have (if time permits)
- Document everything you change
- Verify accuracy constantly
