# Task: Revise Post2 Delegation Blog with Adaptation Framing

## Content Type: Blog Post Revision (Major Reframing)

---

## Scope Calibration Check ✅

**Content type:** Blog Post (revision/reframing)

**Reference metrics (from /.claude/reference/content-scoping-guide.md):**
- Tasks: 6-8 research tasks (for new blog)
- Time: 12-18 hours total
- Citations: 12-20 final (from 100-200 reviewed)

**This plan (revision, not new research):**
- Tasks: 0 new research tasks (reframe existing 240+ sources)
- Time: 6-8 hours (rewriting with new framing)
- Citations: 40-50 (same evidence base, reframed presentation)

**Ratio:** 0/8 (research), ~0.4/15 (time), 2.5/18 (citations - higher because organizational complexity)

**Assessment:** ✅ Calibrated for revision task

**Justification:**
- NOT starting from scratch - have 240+ sources from 8 completed tasks
- Task is reframing, not new research
- Higher citation count justified: organizational topic naturally more source-dense than individual psychology
- User correction requires framing change, not evidence change
- All evidence supports both framings (inversion OR adaptation)

---

## Context

**Project:** AI Presentation Repository + Blog Series
**Existing Work:**
- 8 completed research tasks (240+ sources)
- IMPROVED_POST_PLAN.md created (but framing wrong per user)
- All task summaries (task1-8_summary.md) available

**User Correction:**
User identified critical framing error in IMPROVED_POST_PLAN.md:
- Current framing: "Five inversions" / "everything breaks with AI" → Creates PANIC
- Desired framing: "Adapt existing management knowledge" → Builds CONFIDENCE
- Key principle: "You already know how to delegate - here's how to adapt it"

**Problem:**
IMPROVED plan emphasizes revolutionary replacement. User wants evolutionary adaptation.

**Solution:**
Reframe existing research to show:
- What TRANSFERS from human delegation (Drucker, Mintzberg principles)
- What needs ADAPTATION for AI properties
- How to EVOLVE proven frameworks (not abandon them)

---

## Files to Create/Update

### Primary Deliverables (Already Created by Director)
- ✅ `tasks/post2-revised-plan/REVISED_POST_PLAN.md` (adaptation-focused structure)
- ✅ `tasks/post2-revised-plan/research-gaps-assessment.md` (no new research needed)

### Execution Files (Director Creates Below)
- `tasks/post2-revised-plan/plan.md` (THIS FILE - main agent instructions)
- `tasks/post2-revised-plan/agent-instructions-write.md` (for content-writer)
- `tasks/post2-revised-plan/agent-instructions-review.md` (for content-reviewer)

---

## Execution Steps for Main Agent

### IMPORTANT: This is a REFRAMING task, not new content creation

**Existing assets:**
- 240+ sources researched (Tasks 1-8)
- All evidence documented in task summaries
- IMPROVED_POST_PLAN.md (wrong framing but good structure)
- User feedback on what to change

**Task:** Rewrite blog post with adaptation framing using SAME research base

---

### Step 1: Read User Correction & Assessment Files

**Agent:** Main agent (no specialist)
**Duration:** 10 minutes

**Main agent should:**
1. Read user's feedback (in task description above)
2. Read `tasks/post2-revised-plan/research-gaps-assessment.md`
3. Read `tasks/post2-revised-plan/REVISED_POST_PLAN.md`
4. Understand: Same evidence, different framing

**Key insight from assessment:**
"NO new research needed. Reframe existing research to show adaptation, not inversion."

**Success criteria:**
- Main agent understands framing change
- Main agent confirms no new research required
- Main agent ready to invoke content-writer with revised instructions

---

### Step 2: Invoke Content-Writer for Revised Draft

**Agent:** content-writer
**Instructions file:** `agent-instructions-write.md`
**Duration:** 4-5 hours

**Main agent should:**

1. **TodoWrite:** Mark "Rewrite blog post with adaptation framing" as in_progress

2. **Read instruction file:**
   - `tasks/post2-revised-plan/agent-instructions-write.md`

3. **Invoke content-writer:**
   ```
   description: "Rewrite delegation blog post with adaptation (not inversion) framing"
   prompt: |
     EXECUTION CONTEXT:
     - Part of plan: tasks/post2-revised-plan/plan.md
     - Step: 2
     - Content type: Blog post (major reframing)
     - Task: Rewrite existing IMPROVED plan with USER-REQUESTED adaptation framing

     CRITICAL USER CORRECTION:
     User feedback: Current framing creates PANIC ("everything inverts").
     User wants: Build CONFIDENCE ("adapt what you know").

     AGENT INSTRUCTIONS:
     [Main agent: paste content of agent-instructions-write.md here]
   ```

4. **Wait for completion**

5. **Verify outputs:**
   - Check: `papers/blog1/post2_delegation/DRAFT_v2_ADAPTED.md` created
   - Check: File uses adaptation language (not inversion language)
   - Check: 4,500-5,000 words
   - Check: 40-50 citations from existing research base

6. **TodoWrite:** Mark as completed

**Success criteria:**
- Draft rewritten with adaptation framing
- Same research base (240+ sources), reframed presentation
- Reader feels: "I can adapt what I know" not "start from scratch"

---

### Step 3: Invoke Content-Reviewer for Framing Assessment

**Agent:** content-reviewer
**Instructions file:** `agent-instructions-review.md`
**Duration:** 1-2 hours

**Main agent should:**

1. **TodoWrite:** Mark "Review adaptation framing" as in_progress

2. **Read instruction file:**
   - `tasks/post2-revised-plan/agent-instructions-review.md`

3. **Invoke content-reviewer:**
   ```
   description: "Review delegation blog for adaptation framing correctness"
   prompt: |
     EXECUTION CONTEXT:
     - Part of plan: tasks/post2-revised-plan/plan.md
     - Step: 3
     - Content type: Blog post review (framing assessment)

     CRITICAL REVIEW FOCUS:
     User corrected framing from "inversion/panic" to "adaptation/confidence"

     AGENT INSTRUCTIONS:
     [Main agent: paste content of agent-instructions-review.md here]
   ```

4. **Wait for completion**

5. **Read review output:**
   - Location: `tasks/post2-revised-plan/review-adaptation-framing.md`
   - Check: Framing assessment (panic vs. confidence scoring)
   - Check: Specific language corrections needed
   - Note: Severity (critical/major/minor issues)

6. **TodoWrite:** Mark as completed

**Success criteria:**
- Review confirms adaptation framing throughout
- Or: identifies specific sections still using "inversion" language
- Clear guidance for Step 4 (improve or approve)

---

### Step 4: Conditional Improvement or Approval

**Agent:** Main agent decides based on review
**Duration:** Varies

**Main agent should:**

**IF review shows critical framing issues:**

1. **Read:** `tasks/post2-revised-plan/review-adaptation-framing.md` (specific issues)

2. **TodoWrite:** Mark "Improve framing based on review" as in_progress

3. **Invoke content-writer for targeted revision:**
   ```
   description: "Fix framing issues in specific sections"
   prompt: |
     EXECUTION CONTEXT:
     - Part of plan: tasks/post2-revised-plan/plan.md
     - Step: 4 (conditional improvement)

     REVIEW FEEDBACK:
     [Main agent: paste specific framing issues from review]

     TASK:
     Rewrite only sections with framing problems.
     Maintain adaptation language throughout.
     Preserve evidence quality.

     SECTIONS TO FIX:
     [List specific sections from review]
   ```

4. **Wait for completion**

5. **TodoWrite:** Mark as completed

**ELSE IF review shows only minor issues:**

1. **Main agent applies minor fixes directly** (use Edit tool)
   - Change "inversion" → "adaptation" language
   - Add confidence-building transitions
   - Fix comparison table headers if needed

2. **Document changes** in commit message

**ELSE IF review approves framing:**

1. **Proceed to Step 5** (finalization)

**Success criteria:**
- All framing issues resolved
- Language consistently emphasizes adaptation
- Reader confidence-building achieved

---

### Step 5: Finalize and Document

**Agent:** Main agent (no specialist)
**Duration:** 30 minutes

**Main agent should:**

1. **Final verification checks:**
   - [ ] Framing: "Adaptation" not "inversion" throughout
   - [ ] Tone: Confidence-building, not panic-inducing
   - [ ] Structure: Follows REVISED_POST_PLAN.md
   - [ ] Evidence: 40-50 citations from existing research
   - [ ] Voice: Matches post1_bias warmth + precision
   - [ ] Length: 4,500-5,000 words

2. **Create completion summary:**
   - Write: `tasks/post2-revised-plan/completion-summary.md`
   - Document: Framing changes made
   - Document: User vision achieved
   - Document: Evidence reused (not researched anew)
   - Document: Time spent vs. estimated

3. **Move final draft to canonical location:**
   - From: `papers/blog1/post2_delegation/DRAFT_v2_ADAPTED.md`
   - To: `papers/blog1/post2_delegation/FINAL_DRAFT_ADAPTED.md`

4. **TodoWrite:** Mark all tasks completed

**Success criteria:**
- Final draft achieves user's vision
- "Adaptation, not revolution" framing throughout
- Reader feels: "I can adapt what I know"

---

## Success Criteria for Entire Task

**Framing achievement (PRIMARY):**
- [ ] User vision restored: "Adapt existing knowledge, don't abandon it"
- [ ] Tone: Confidence-building, not panic-inducing
- [ ] Message: "You already know delegation - here's how to adapt it"
- [ ] Language: "Adaptation" not "inversion" throughout
- [ ] Examples: 21% ADAPTED workflows (not revolutionized them)

**Evidence quality (MAINTAINED):**
- [ ] Same 240+ source research base
- [ ] 40-50 citations in final draft (from existing research)
- [ ] All statistics verified and traceable
- [ ] Task 1-8 summaries integrated

**Structure quality:**
- [ ] Follows REVISED_POST_PLAN.md four-act structure
- [ ] Adaptation Framework table (not Comparison Table of failures)
- [ ] Five findings reframed as adaptation requirements
- [ ] Success cases show adapted competencies
- [ ] 4,500-5,000 words

**Voice consistency:**
- [ ] Matches post1_bias warmth
- [ ] Dr. Elena Cognitive tone maintained
- [ ] Collaborative exploration (not prescriptive)
- [ ] Honest about complexity

**Reader experience:**
- [ ] Feels: "My knowledge is valuable, just needs adaptation"
- [ ] Feels: "This is evolution, not revolution"
- [ ] Feels: "The 21% adapted - I can too"
- [ ] Does NOT feel: "Everything I know is wrong"

---

## Quality Control Checkpoints

**After Step 2 (Draft complete):**
- [ ] Quick scan: Is language "adaptation" or "inversion"?
- [ ] Quick scan: Does intro build confidence or create panic?
- [ ] Quick scan: Are success cases framed as "adapted" or "revolutionized"?

**After Step 3 (Review complete):**
- [ ] Review explicitly assesses framing (not just evidence quality)
- [ ] Review identifies specific language to change
- [ ] Review scores confidence-building vs. panic-inducing

**After Step 4 (Improvements applied):**
- [ ] All "inversion" language replaced with "adaptation"
- [ ] Comparison table reframed to show what transfers
- [ ] Five findings presented as "requirements to adapt" not "everything breaks"

**Before Step 5 (Finalization):**
- [ ] User's vision achieved: "Adapt what you know"
- [ ] Same evidence, better framing
- [ ] Reader empowered, not panicked

---

## Timeline Estimate

**Total time:** 6-8 hours

**Breakdown:**
- Step 1 (Read files): 10 minutes
- Step 2 (Rewrite draft): 4-5 hours
- Step 3 (Review framing): 1-2 hours
- Step 4 (Conditional improvement): 0-2 hours (depends on review)
- Step 5 (Finalize): 30 minutes

**Comparison to original estimate:**
- Original blog: 12-18 hours (research + write)
- This task: 6-8 hours (reframe only, no new research)
- Savings: Existing research base eliminates research phase

---

## Critical Reminders for Main Agent

**This is NOT a new blog post:**
- Don't research new sources
- Don't create new evidence
- Don't expand scope

**This IS a reframing task:**
- Use existing 240+ sources
- Change presentation, not content
- Same evidence, different message
- User correction: Confidence, not panic

**The user's key feedback:**
> "Show that existing management approaches are useful WITH AI, but should be ADAPTED. This removes panic of 'new empty area.' Many great things already exist in people and team management - you should just properly use and adopt them."

**Mantra:**
- KEEP: Evidence quality
- CHANGE: Framing from "inversion" to "adaptation"
- ACHIEVE: Reader confidence ("I can adapt what I know")

---

## Files Summary

**Input files (read these):**
- `tasks/post2-revised-plan/REVISED_POST_PLAN.md` (new structure)
- `tasks/post2-revised-plan/research-gaps-assessment.md` (no new research needed)
- `papers/blog1/post2_delegation/FINAL_POST_PLAN.md` (original plan)
- `papers/blog1/post2_delegation/FINAL_RESEARCH_PLAN.md` (research base)
- `papers/blog1/post2_delegation/task1-8_summary.md` (evidence)

**Output files (create these):**
- `papers/blog1/post2_delegation/DRAFT_v2_ADAPTED.md` (rewritten draft)
- `tasks/post2-revised-plan/review-adaptation-framing.md` (review output)
- `tasks/post2-revised-plan/completion-summary.md` (final summary)
- `papers/blog1/post2_delegation/FINAL_DRAFT_ADAPTED.md` (final location)

**Agent instruction files (director creates):**
- `tasks/post2-revised-plan/agent-instructions-write.md` (for Step 2)
- `tasks/post2-revised-plan/agent-instructions-review.md` (for Step 3)

---

**Plan Status:** ✅ COMPLETE
**Ready for Main Agent Execution:** ✅ YES
**Scope:** Reframing task (6-8 hours), not new research
**User Vision:** Adaptation/confidence, not inversion/panic
**Evidence Base:** 240+ existing sources (Tasks 1-8)
**Confidence Level:** HIGH - clear framing change, evidence supports both presentations
