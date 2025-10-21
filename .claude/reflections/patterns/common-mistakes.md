# Common Mistakes & How to Avoid Them

Patterns of failure. Learn from these to prevent recurrence.

---

## Mistake: Implementing Without Critical Review

**Observed in:** 2025-10-12 Agent Configuration (almost made this mistake)

**What happened:**
Created implementation plan without external validation. User requested review before implementation, which caught critical flaws.

**Impact if not caught:**
- Would have broken research-coordinator (Bash removal)
- Would have created inadequate reflection system
- Would have wasted 16-20 hours on flawed approach
- Would have reduced functionality without real benefit

**Root cause:**
- Pressure to "implement changes" led to action bias
- Didn't validate assumptions against best practices
- Conflated "minimal context" with "short files"
- Designed reflection system without understanding requirements

**Prevention:**
1. ALWAYS critical review before major changes
2. Validate assumptions against frameworks (Anthropic guidelines)
3. Measure current state BEFORE optimizing
4. Design systems based on requirements, not intuition
5. When user says "implement," pause and verify plan is sound

**Pattern:**
If recurring (3+ times) → Update agent workflow to require review step

---

## Mistake: Confusing "Minimal" with "Short"

**Observed in:** 2025-10-12 Agent Configuration Planning

**What happened:**
Interpreted Anthropic's "minimal context" as "make everything shorter"
Target: Reduce all files by 16% uniformly

**Why this is wrong:**
- Anthropic means: Remove irrelevant info, keep necessary detail
- Different roles need different detail levels (altitude principle)
- Examples and checklists serve important functions
- Removing them causes errors, doesn't save effective context

**Correct interpretation:**
- Minimal = No irrelevant info (not "as short as possible")
- Strategic roles: Can be more concise
- Implementation roles: Need templates and examples
- QA roles: Need comprehensive checklists

**Prevention:**
- Study source material carefully before applying
- Test understanding against examples in source
- Consider PURPOSE of content before removing it
- Use progressive disclosure instead of blanket reduction

---

## Mistake: Main Agent Doing Specialist Work

**Observed in:** 2025-10-12 Post 2 Delegation Planning

**What happened:**
Main agent let content-director self-critique (create plan_critique.md) instead of invoking content-reviewer

**Impact:**
- Self-critique not as brutal as external review
- Missed critical issues that content-reviewer caught
- Violated proper agent separation (director should never self-critique)
- User had to correct workflow error

**Root cause:**
- Misunderstood user request "roast each" as "director roasts itself"
- Action bias - jumped to doing work instead of proper orchestration
- Didn't follow CLAUDE.md agent roles protocol

**Prevention:**
1. Main agent: Pause and ask "which agent should do this?"
2. Rule: content-director NEVER self-critiques - always invoke content-reviewer
3. "Roast/critique/review" = content-reviewer's job, not director's
4. Re-read CLAUDE.md agent roles before multi-agent workflows

**Pattern:**
If recurring → Add forcing function in main agent for role checking

**User correction (verbatim):**
"you act incorrect. you should only create plans, review and roast are @agent-content-reviewer tasks"

---

## Mistake: Dissertation Scope for Blog Post

**Observed in:** 2025-10-12 Post 2 Delegation Planning

**What happened:**
Preliminary plan had 30 research tasks, 20-27 hours, targeting 40-60 citations
User requirement: <10 tasks, similar to Post 1 scope

**Impact:**
- 3x over constraint limit
- Would produce dissertation-quality research, not blog post
- Missed Post 1's success formula (focused scope)
- Wrong content type for medium

**Root cause:**
- Director's instinct for comprehensive coverage
- Didn't check Post 1 metrics first for calibration
- Underweighted user's explicit constraint (<10 tasks)
- Academic instinct (cover everything) vs. blog instinct (one insight deeply)

**Prevention:**
1. Check past success metrics FIRST (Post 1: ~8 tasks, 12 hours, 15-20 citations)
2. Treat user constraints as hard limits, not suggestions
3. Ask: "Is this blog post or research paper scope?"
4. Default to cutting, not adding
5. Blog post = ONE question deeply, not comprehensive survey

**Pattern:**
Watch for recurrence in blog post planning. If repeats → Update content-director instructions with scope guidelines by content type.

---

## Mistake: Insufficient Currency (Historical vs. Recent)

**Observed in:** 2025-10-12 Post 2 Delegation Planning

**What happened:**
Original plan: 40% recent research (2024-2025), 60% historical/foundational
User requirement: 75-80% focus on 2025 research
Post 1 success formula: 80% current, 20% foundational

**Impact:**
- Would feel like general theory, not timely insight
- Miss "what's urgent NOW" framing
- Lower impact (not addressing current challenges)

**Root cause:**
- Started with "build foundation first" mindset
- Didn't lead with "what changed in 2024-2025?"
- Didn't make recency explicit requirement for each task

**Prevention:**
1. Every research task must lead with "2024-2025 framing first"
2. Foundational research only for contrast (not starting point)
3. Ask: "What makes this urgent THIS year vs. last year?"
4. Time-based constraint: 75%+ of sources from last 18 months
5. For blog posts: timely urgency > timeless theory

**Pattern:**
Blog posts need currency. Academic papers can be more foundational.

---

## Mistake: Scattered Focus (Many Questions vs. One Question)

**Observed in:** 2025-10-12 Post 2 Delegation Planning

**What happened:**
Preliminary plan tried to answer 9 major questions in 4,500 words:
- How does HITL work?
- What are AI's capabilities?
- How do AI and humans differ in management?
- What are task qualification systems?
- Which management methods apply?
- How do you create accountability?
- What frameworks exist?
- How do you measure success?
- What's the future direction?

**Impact:**
- Each question gets shallow treatment (500 words each)
- No clear takeaway for reader
- Forgettable (nothing goes deep enough to stick)
- Comparison: Post 1 answered ONE question ("How does bias affect AI?")

**Root cause:**
- Tried to cover topic comprehensively
- Didn't identify single core question
- Missing blog structure mindset (one insight deeply)

**Prevention:**
1. Director: Always identify THE ONE QUESTION post answers
2. Everything else serves that central question
3. Ask: "If reader remembers one thing, what is it?"
4. Blog formula: One insight deeply > many insights shallowly
5. Other questions can be supporting material, not equal topics

**Pattern:**
Focused = memorable. Comprehensive = forgettable.

---

## Mistake: No Discovery Strategy (Pure Checklist)

**Observed in:** 2025-10-12 Post 2 Delegation Planning

**What happened:**
Preliminary plan was mechanical checklist: find X, find Y, find Z
No room for unexpected insights or serendipitous discoveries

**Impact:**
- Wouldn't allow "Nature paper" moments (Post 1's success factor)
- Mechanical execution vs. creative exploration
- Miss counterintuitive findings that make content compelling

**Root cause:**
- Planner mentality (list all tasks, check all boxes)
- Didn't account for research serendipity
- Too structured, not enough exploration

**Prevention:**
1. Always include "surprise factor" research task (10-15% of time)
2. Frame some tasks with open-ended exploration
3. Permission to follow interesting tangents
4. Time-box exploration to prevent endless wandering

**Pattern:**
Best insights often can't be planned. Plan for unplanned discoveries.

---

(More mistake patterns will accumulate here)
