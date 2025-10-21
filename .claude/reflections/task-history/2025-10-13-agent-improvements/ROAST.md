# 🔥 BRUTAL ROAST: Agent Process Improvement Plan

**Date:** 2025-10-13
**Target:** tasks/agent-process-improvement-2025-10-13/IMPROVEMENT_PLAN.md
**Roaster:** Critical Reviewer Agent (Simulation)
**Mode:** Maximum Brutality

---

## ⚡ TL;DR: THE HARSH TRUTH

**Overall Assessment:** 6.5/10 - Solid evidence base, but overconfident about solutions, underestimates implementation complexity, and has some dangerous blind spots.

**What's Right:**
- Evidence-based problem identification ✅
- Focus on recurring issues (not speculation) ✅
- Codifying successful patterns ✅

**What's Wrong:**
- Assumes protocols will be followed (they won't under pressure) ⚠️
- Underestimates "change fatigue" risk ⚠️
- Some proposed solutions don't match root causes ❌
- Missing biggest problem: main agent cognitive load ❌
- Implementation timeline optimistic by ~40% ❌

**Core Flaw:** Treating symptoms (role confusion) instead of disease (unclear decision boundaries under time pressure).

---

## 🎯 PROBLEM IDENTIFICATION: MOSTLY SOLID

### ✅ What You Got Right

**Issue #1: Role Confusion**
- Evidence: Solid (3 documented instances)
- Impact assessment: Accurate
- Root cause: Partially correct

**Issue #2: Scope Creep**
- Evidence: Excellent (30 vs 10 tasks, explicit user correction)
- Impact: Well-quantified
- Root cause: Spot on

**Issue #3: Self-Critique Violation**
- Evidence: Clear
- Impact: Correct
- Pattern: Real

**Issue #4-6:** All evidence-based, good.

### ⚠️ What You Missed: THE ELEPHANT IN THE ROOM

**Missing Issue #0: Main Agent Cognitive Overload**

You identified 6 symptoms but missed the underlying disease:

**The REAL Problem:**
Main agent is trying to:
1. Interpret user request
2. Check CLAUDE.md for relevant protocols (4000+ lines)
3. Decide which agent to invoke
4. Read agent configs (400-600 lines each)
5. Craft appropriate prompts
6. Coordinate multiple agents
7. Track todos
8. Verify outputs
9. Report to user

**Under time pressure, this is IMPOSSIBLE to do perfectly.**

**Evidence you already have:**
> "Over-complex initial prompts: First research-intelligence-agent invocation was too detailed, got interrupted." (Line 40)

This isn't a "prompt length" problem. This is **cognitive load exceeded capacity**.

**Your proposed fix:** Add more protocols, decision trees, checklists.

**Actual effect:** You're INCREASING cognitive load while trying to reduce errors caused by cognitive overload.

**This is like giving a drowning person a swimming manual.**

---

## 🔧 SOLUTION ANALYSIS: MIXED BAG

### Priority 1 Improvements

#### 1.1: Role-Checking Protocol

**Proposed:** Decision tree in CLAUDE.md

**The Roast:**

**Problem 1: Won't be read under pressure**
- Main agent already has CLAUDE.md (4000+ lines)
- Under time pressure: skips to action
- Adding decision tree to CLAUDE.md = adding to ignored doc

**Problem 2: False confidence in "forcing functions"**
> "Forcing function prevents role confusion"

No, it doesn't. A forcing function that can be skipped isn't forcing anything. You need:
- Tool-level constraints (not documentation)
- OR Pre-invocation checklist (visible in UI)
- OR Separate "orchestrator" agent (architectural)

**Problem 3: Decision tree is obvious in retrospect**
Example:
> "Multi-hour research needed? YES → Invoke research agent"

Main agent KNOWS this. The problem isn't lack of knowledge. It's:
- Action bias under pressure
- Unclear boundaries in gray-area cases
- Cost/benefit calculation ("faster if I do it myself")

**What would actually work:**
- Pre-invocation prompt: "Before executing, answer: Should I delegate this?"
- Tool-level: Task tool requires `justification` parameter
- Clear time thresholds: ">30 min = delegate, <30 min = do directly"

**Verdict:** 4/10 - Addresses symptom, not cause. Will help in calm situations, fail under pressure.

---

#### 1.2: Scope Calibration Reference

**Proposed:** Reference file with past success metrics

**The Roast:**

**This one is actually good. Surprised?**

**What's right:**
- content-director DOES have time to check reference
- Objective metrics prevent rationalization
- "Check this FIRST" is clear protocol
- Low cognitive load (quick lookup)

**What could go wrong:**
1. **Sample size problem:** Post 1 success = n=1. What if Post 1 was lucky outlier?
2. **Context dependency:** Maybe next blog post SHOULD be 15 tasks because topic demands it?
3. **Cargo cult risk:** "Post 1 was 8 tasks, so all blog posts must be 8 tasks"

**What would make it better:**
- Add "Justification for deviation" field
- Include Post 1 context: topic complexity, audience, goals
- After 3 posts: statistical range (not single point)
- Explicit: "These are GUIDELINES, not constraints"

**Verdict:** 8/10 - Best proposal in Priority 1. Just needs "deviation justification" field.

---

#### 1.3: Self-Critique Prevention

**Proposed:** Explicit rule against self-critique

**The Roast:**

**This is solving a problem that ALREADY SHOULDN'T EXIST.**

Look at content-director.md line 6: `tools: Read, Bash, Glob, Grep, TodoWrite, Write`

**NO TASK TOOL. Director literally CAN'T invoke content-reviewer.**

So how did self-critique happen?

**Answer:** Main agent let director write `plan_critique.md` instead of invoking reviewer.

**The actual problem:** Main agent misunderstood "roast each" instruction.

**Your proposed fix:** Add text saying "don't self-critique"

**Why this is weak:**
- The problem wasn't director thinking it SHOULD self-critique
- Problem was main agent not orchestrating correctly
- Adding text to director file doesn't help main agent orchestration

**What would actually work:**
- Fix main agent orchestration logic (Issue #1, role confusion)
- Make "roast" a reserved keyword → auto-invokes content-reviewer
- Better: content-director OUTPUTS a "review request" → main agent auto-invokes reviewer

**Verdict:** 3/10 - Technically correct but addresses wrong layer. The problem is one level up (main agent orchestration).

---

#### 1.4: Agent Prompt Templates

**Proposed:** Template library for common invocations

**The Roast:**

**This is decent BUT underestimates the actual problem.**

**What you correctly identified:**
> "Over-complex prompts cause interruptions"

**Your proposed fix:**
Templates showing concise formats

**What's wrong:**

1. **The complexity isn't in the prompt structure**

   Look at your template:
   ```
   description: "Research [topic]"
   prompt: |
     Research: [1-2 sentence question]
     Requirements: [...]
   ```

   Main agent already knows this format. The complexity is in:
   - Determining what to put in requirements
   - How much context to include
   - Which files to reference
   - What output format to specify

2. **Templates work for routine cases, fail for novel ones**

   Your template works great for: "Research tokenization"

   Your template fails for: "Research attention mechanisms with cognitive parallels for Russian tech audience using verified sources from Vaswani and CogniFit"

   Guess which one main agent actually needs to do?

3. **You're solving the 20% easy cases, ignoring the 80% hard ones**

**What would actually work:**
- Template for ROUTINE cases (good - keep this)
- For complex cases: **Agent-instructions files** (you already have this!)
- Guidance: "Prompt <50 lines = inline, >50 lines = agent-instructions file"
- Main agent: "When in doubt, shorter prompt + read agent-instructions"

**Verdict:** 6/10 - Useful for routine cases, doesn't solve complex case problem. Keep it but set expectations lower.

---

### Priority 2 Improvements

#### 2.1: Roast-Before-Implement

**Proposed:** Mandatory protocol for major changes

**The Roast:**

**Oh, the irony.**

You're proposing a "roast-before-implement" protocol.

**Did you use it for THIS improvement plan?**

I mean, you literally wrote this plan WITHOUT going through the roast cycle you're proposing.

**Meta-lesson:** Protocols work when convenient, get skipped when inconvenient.

**Practicality check:**

When will main agent skip this protocol?
- User says "just do it" (pressure)
- Change seems "obviously correct" (overconfidence)
- Deadline approaching (time pressure)
- After 5 successful changes without roasting (complacency)

**How to make it stick:**

Instead of "MANDATORY STEPS" (which will be skipped), try:

**Graduated approach:**
- **Small changes (<1 hour impact):** Optional roast
- **Medium changes (1-5 hour impact):** Recommended roast
- **Large changes (>5 hour impact):** Required roast OR document why skipped

**Accountability:**
- If change fails without roast: reflection must explain why roast was skipped
- Track: % of changes that skip roast, % that fail
- If skip rate >50%: protocol isn't working, revise

**Verdict:** 7/10 - Good idea, but overconfident it'll be followed. Needs graduated approach + accountability.

---

#### 2.2: Discovery Time Budgeting

**Proposed:** Mandatory "surprise factor" research task

**The Roast:**

**This is actually pretty good. Two problems though:**

**Problem 1: "Mandatory" is a lie**

You say:
> "ALWAYS include 'surprise factor' research task"

Reality check:
- What if user explicitly requests targeted research only?
- What if budget is 8 hours, discovery would push to 10?
- What if timeline is tight?

Answer: It'll get cut. And it should be cutable.

**Better framing:**
> "DEFAULT: Include discovery task. SKIP only with explicit justification."

**Problem 2: 10-15% is arbitrary**

Post 1 found Nature paper serendipitously - timeline unknown.
You're extrapolating from n=1 to claim "10-15% is right amount".

**What if:**
- Some topics need 20% discovery time?
- Some topics have no discovery potential (documentation tasks)?
- Some discoveries happen in first 5%, others need 25%?

**Better approach:**
- "Allocate discovery time based on topic novelty"
- Low novelty (well-studied topic): 5-10%
- Medium novelty (emerging area): 10-15%
- High novelty (bleeding edge): 15-25%

**Verdict:** 7/10 - Good pattern, but "mandatory" and "10-15%" too rigid. Needs flexibility.

---

#### 2.3: Parallel Execution Preference

**Proposed:** Make parallel execution default

**The Roast:**

**This is great. Almost no complaints.**

Evidence is solid (8 hour savings, 50% speedup).
Implementation is clear.
Risk is low.

**Tiny nitpick:**

You say:
> "Expected speedup: ~50-70% wall time reduction"

Where does 70% come from? Evidence shows 50% (5-6 hours vs 11-15 hours).

Don't inflate numbers. Makes reader skeptical of everything.

**Also:**
> "No quality degradation if parts truly independent"

**BURIED ASSUMPTION:** Main agent correctly identifies independence.

What if main agent thinks parts are independent but they're not?

**Example:**
- Part 1: Research AI capabilities
- Part 2: Research management methods
- Assumption: Independent
- Reality: Management methods depend on capability understanding

**What happens:**
- Both researched in parallel
- Part 2 makes assumptions about Part 1
- Assumptions wrong
- Need to redo Part 2
- Time savings lost

**Missing:** Validation step to verify independence assumption.

**Verdict:** 9/10 - Solid proposal. Just needs "verify independence" step and honest speedup numbers.

---

### Priority 3 Improvements

#### 3.1: Todo Maintenance Protocol

**Proposed:** Update todos after each parallel task completion

**The Roast:**

**Cute. This will last exactly 2 tasks.**

**Why:**

Main agent is coordinating 5 parallel research tasks.

Task 2 completes → "I should update todos... BUT Task 3 just finished too... I'll batch them... BUT Task 4 is about to finish... I'll wait for all 5... THEN I'll update."

Result: Exact same behavior as before.

**The real problem:**
Updating todos feels like busywork when you're trying to coordinate 5 agents.

**What would actually work:**

**Option A: Automatic todo updates**
- When agent completes, completion message triggers todo update
- Main agent just has to notice completion (which it does anyway)

**Option B: User-visible agent status**
- User sees "Research Task 2: Running (Agent #42)"
- User sees "Research Task 3: Completed ✓"
- Todos become redundant

**Option C: Coarser granularity**
- Don't have separate todos for each parallel task
- Have one todo: "Parallel research (5 tasks)" → track progress in description
- Update once: when all complete

**Verdict:** 4/10 - Addresses real UX problem but solution won't stick. Needs different approach.

---

#### 3.2: Instruction File Size Limits

**Proposed:** Guidelines on agent-instructions file sizes (100-150 lines)

**The Roast:**

**This is fine but misses the point.**

**The question isn't "How long should instructions be?"**
**The question is "What should instructions contain?"**

**Example:**

**Bad 150-line instructions:**
```markdown
# Agent Instructions

## Project Context
[50 lines of background]

## Quality Standards
[30 lines from CLAUDE.md]

## Voice Requirements
[30 lines from persona.md]

## Task
Create a slide about tokenization.

## Requirements
Make it good.
```

**Good 200-line instructions:**
```markdown
# Agent Instructions

## Task
Create extended analysis + speech notes for tokenization slide.

## Context Files (Read These First)
- /presentation/persona.md
- /research/background/tokenization.md

## Requirements
[150 lines of specific, actionable requirements]

## Output
- tasks/tokenization-slide/analysis.md
- tasks/tokenization-slide/speech.md
```

**The actual guideline should be:**

**Content Rules:**
- ✅ Specific task description
- ✅ Required reading (by path, not copying content)
- ✅ Concrete requirements
- ✅ Output specifications
- ✅ Quality criteria
- ❌ Copied context from other files
- ❌ Generic quality standards
- ❌ Redundant project overview

**Length guideline: Secondary concern**

**Verdict:** 5/10 - Right spirit, wrong focus. Should be about CONTENT, not LENGTH.

---

## 🚨 MISSING CONSIDERATIONS

### 1. Implementation Capacity Reality Check

You claim:
> "Total: 10-12 hours over 3 weeks"

**Let's reality-check this:**

| Task | Your Estimate | Realistic Estimate | Why |
|------|---------------|-------------------|-----|
| 1.1: Role-Checking Protocol | 1h | 2-3h | Need to test decision tree, iterate, get user feedback |
| 1.2: Scope Reference | 2h | 3-4h | Need Post 1 analysis, create format, validate with director |
| 1.3: Self-Critique Rule | 0.5h | 1h | Update 2 files + verify no edge cases |
| 1.4: Prompt Templates | 2h | 3-4h | Create templates, test with real scenarios, iterate |
| 2.1: Roast Protocol | 1h | 2h | Need to define what "major change" means, create template |
| 2.2: Discovery Budget | 1h | 1.5h | OK, this one is about right |
| 2.3: Parallel Preference | 1h | 1.5h | Add validation step for independence |
| 3.1: Todo Protocol | 0.5h | 1h | Need to think through automatic vs manual |
| 3.2: Instruction Guidelines | 0.5h | 1h | Content rules more complex than length rules |
| **Testing & Integration** | 1h | 4-6h | YOU FORGOT THIS ENTIRELY |
| **Documentation** | 0h | 2-3h | YOU FORGOT THIS TOO |

**Your total:** 10-12 hours
**Realistic total:** 20-28 hours

**You underestimated by 40-60%. Classic planning fallacy.**

---

### 2. Change Fatigue

You mention this in risks but don't take it seriously.

**Reality:** 8 improvements in 3 weeks is A LOT.

**Each improvement requires:**
- Learning new protocol
- Remembering to use it
- Overriding existing habits
- Accepting extra friction

**After 3-4 improvements, team will:**
- Start skipping steps
- Simplify protocols unofficially
- Revert to old habits under pressure

**What actually happens:**
- Week 1: Enthusiastic adoption
- Week 2: Starting to slip
- Week 3: Back to 60% of old habits
- Week 4: "Remember that improvement plan?"

**Better approach:**
- Implement 2-3 HIGH-IMPACT changes
- Let them settle for 2-3 weeks
- Measure effectiveness
- Then add 2-3 more

**Your plan: 8 changes in 3 weeks**
**Reality: 3 changes will stick, 5 will be forgotten**

---

### 3. The "Gray Zone" Problem

Your decision tree works great for clear cases:
- 20-hour research? → Obviously delegate
- Fix typo? → Obviously do directly

**But most cases are gray:**

**Example:**
> "Update the presentation slide to include recent 2024 research on attention mechanisms"

**Questions:**
- Is this "major content creation" (delegate to director)?
- Or "small improvement" (do directly with Edit)?
- How recent is "recent"? (1 paper vs 10 papers)
- How much is "include"? (1 citation vs full section rewrite)

**Your protocols don't help here.**

**What's needed:**
- Time-based heuristic: "If >30 min, delegate"
- Scope-based heuristic: "If changes >20% of content, delegate"
- Uncertainty-based: "If unsure, delegate"

**Missing from plan:**
Guidance for gray-zone decisions where protocols give ambiguous answers.

---

### 4. The Success Measurement Problem

You define success metrics like:
> "Role confusion errors: 3 per 10 tasks → <1 per 10 tasks"

**Problem 1: How do you measure "role confusion error"?**
- Only count user corrections?
- Count when main agent does work specialist should do?
- Count when output quality is lower than specialist would produce?

**Problem 2: Small sample size**
- 10 tasks might take 2-3 months
- By then, you've forgotten what protocols you implemented
- By then, other variables have changed (new team members, new project type)

**Problem 3: Survivorship bias**
- Tasks that fail badly don't get completed
- Metrics only count completed tasks
- Missing: "How many tasks were abandoned due to process issues?"

**Better metrics:**
- **Leading indicators** (process compliance):
  - % of tasks where role-checking used
  - % of plans with scope reference check
  - % of changes with roast cycle
- **Lagging indicators** (outcomes):
  - User corrections per task (quantitative)
  - Task completion time (adjust for complexity)
  - Agent invocation success rate

**Your plan:** Only lagging indicators, poorly defined.
**Needed:** Leading + lagging, well-defined, measurable.

---

## 🎯 WHAT YOU SHOULD ACTUALLY DO

### Option A: Implement Plan As-Is (Not Recommended)

**Pros:**
- Addresses documented issues
- Evidence-based

**Cons:**
- Underestimated by 40-60%
- Change fatigue likely
- Some solutions don't match root causes
- Missing biggest issue (cognitive load)

**Expected outcome:** 3-4 improvements stick, 4-5 forgotten.

---

### Option B: Revised Priority Approach (Recommended)

**Phase 1: High-Impact Trio (Week 1-2)**

Implement ONLY these 3:
1. **Scope Calibration Reference** (1.2)
   - Highest confidence in solution
   - Clear ROI (prevents 30→8 task blow-ups)
   - Low risk

2. **Roast-Before-Implement** (2.1)
   - Already proven (saved 16-20 hours)
   - With graduated approach (not mandatory)
   - Builds quality culture

3. **Discovery Time Budgeting** (2.2)
   - Enables "aha moments"
   - Low risk
   - Clear benefit

**Measure for 3-5 tasks. Did they help?**

**Phase 2: Orchestration Fixes (Week 3-4)**

IF Phase 1 successful:
1. **Role-Checking** (1.1) - BUT with time-based heuristics, not just decision tree
2. **Parallel Execution** (2.3) - with independence validation

**Phase 3: Polish (Week 5-6)**

IF Phase 2 successful:
1. **Prompt Templates** (1.4)
2. **Instruction Guidelines** (3.2)

**SKIP:**
- Self-Critique Prevention (already prevented by tool restrictions)
- Todo Protocol (needs architectural solution, not process)

**Total time:** 12-16 hours spread over 6 weeks
**Change fatigue:** Low (2-3 changes per phase)
**Success probability:** High (focusing on highest-confidence improvements)

---

### Option C: Address Root Cause (Bold Recommendation)

**Root cause:** Main agent cognitive overload

**Symptoms you're treating:**
- Role confusion
- Over-complex prompts
- Inconsistent todo tracking
- Process mistakes

**Real solution:**

**Create "Task Orchestrator" role:**

```
Main Agent (Human-Facing)
    ↓
Task Orchestrator Agent (Coordination Specialist)
    ↓
Specialist Agents (content-director, content-writer, etc.)
```

**Task Orchestrator responsibilities:**
- Read user request
- Check CLAUDE.md for relevant protocols
- Apply decision tree (should delegate?)
- Select appropriate specialist agent
- Craft prompts using templates
- Coordinate multi-agent workflows
- Track todos
- Report to main agent → user

**Why this solves everything:**

1. **Role confusion:** Orchestrator's JOB is knowing which agent for what
2. **Over-complex prompts:** Orchestrator has time to craft proper prompts
3. **Todo tracking:** Orchestrator not distracted by content creation
4. **Scope decisions:** Orchestrator checks reference, not under user pressure

**Trade-off:**
- More complex architecture
- Additional coordination layer
- BUT: Solves root cause, not symptoms

**Verdict:** Consider for Phase 4 (after Protocol approach proven insufficient).

---

## 📊 FINAL GRADES

| Improvement | Evidence | Solution Quality | Implementation | Overall |
|-------------|----------|------------------|----------------|---------|
| 1.1: Role-Checking | A | C | B | B- |
| 1.2: Scope Reference | A | A | A | A |
| 1.3: Self-Critique | A | D | A | C+ |
| 1.4: Prompt Templates | A | B | B | B |
| 2.1: Roast Protocol | A | B+ | B | B+ |
| 2.2: Discovery Budget | A | B+ | A | A- |
| 2.3: Parallel Execution | A | A | A | A |
| 3.1: Todo Protocol | B | D | C | D+ |
| 3.2: Instruction Limits | B | C | B | C+ |

**Overall Plan Grade: B-**

**Why not higher:**
- Underestimates implementation by 40-60%
- Treats symptoms, not root cause (cognitive overload)
- Change fatigue risk underestimated
- Some solutions don't match problem root causes
- Missing measurement plan details

**Why not lower:**
- Strong evidence base
- Addresses real, documented issues
- Some proposals are excellent (1.2, 2.3)
- Quarterly review approach is right
- Philosophy (evidence-based) is correct

---

## 💡 RECOMMENDATIONS

### DO THIS:
1. **Implement Phase 1 only** (Scope Reference, Roast Protocol, Discovery Budget)
2. **Measure for 3-5 tasks** - do they actually help?
3. **Revise** Phase 2 based on evidence
4. **Add time-based heuristics** to role-checking (>30 min = delegate)
5. **Define success metrics properly** (leading + lagging indicators)
6. **Be honest about implementation time** (20-28 hours, not 10-12)

### DON'T DO THIS:
1. **Don't implement all 8 at once** - change fatigue
2. **Don't assume protocols will be followed** - need accountability
3. **Don't ignore the cognitive load problem** - it's the root cause
4. **Don't forget testing/documentation time** - it's 30% of total
5. **Don't measure only lagging indicators** - need process compliance too

### CONSIDER:
1. **Task Orchestrator agent** - architectural solution to root cause
2. **Graduated approach** to protocols - not everything "mandatory"
3. **Tool-level constraints** - more reliable than documentation
4. **3-month review** - what actually worked? What got forgotten?

---

## 🎬 CONCLUSION

**This plan is B- work.**

It's **evidence-based** (good), **overconfident** (bad), addresses **real problems** (good), but **some solutions miss the root cause** (bad).

**Best path forward:**
- Implement **3 high-confidence improvements** (not 8)
- Measure rigorously
- Iterate based on evidence
- Consider architectural solution (Task Orchestrator) for root cause

**Remember:** Perfect planning is procrastination in disguise. Ship something, measure, iterate.

**The plan's own advice applies to itself:**
> "Remember: The goal is solving real problems, not creating impressive-looking process documentation."

This plan is 95% impressive documentation, 60% good solutions, 40% wishful thinking.

**Ship Phase 1. Measure. Iterate. Don't get attached to the plan.**

---

**Rating: 6.5/10**
**Recommendation: REVISE (implement Phase 1 only, measure, then reassess)**
**Confidence: High (based on 15+ hours of documented task execution)**
