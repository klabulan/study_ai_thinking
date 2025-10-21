# Agent Reflection & Memory System

## Purpose

Capture rich, actionable learnings from every significant task to enable continuous system improvement. This is NOT passive logging - it's an active learning system that feeds back into agent behavior.

## System Architecture

```
.claude/reflections/
├── README.md (this file)
├── task-history/          # Rich reflections per task
│   └── YYYY-MM-DD-task-name.md
├── patterns/              # Synthesized learnings
│   ├── successful-strategies.md
│   └── common-mistakes.md
└── improvements/          # Change tracking
    ├── suggestions.md
    └── implemented.md
```

## When to Write Reflections

**MANDATORY after:**
- Every completed task (presentation/paper/blog/research)
- Every multi-agent workflow
- Every significant revision or improvement
- Any failure or unexpected behavior

**Written by:** Main agent (after task completes)

---

## Rich Reflection Format

Use this detailed format for maximum learning value:

```markdown
# Task Reflection: [Task Name]

**Date:** YYYY-MM-DD
**Duration:** X hours (planned: Y hours)
**Outcome:** [Success/Partial/Failure]

---

## Context

**Task type:** [Presentation/Paper/Blog/Research/Revision]
**Scope:** [New creation/Major revision/Minor update]
**Agents used:** [List with sequence]
**Iterations:** [Number of review cycles]

**User request:**
"[Original user request verbatim]"

**Interpretation:**
[How we understood and scoped the task]

---

## What Worked Well ✅

### [Success Pattern 1]
**What:** [Specific thing that worked]
**Why it worked:** [Root cause analysis]
**Reusable lesson:** [How to apply in future]
**Applied to:** [Which agent/workflow]

### [Success Pattern 2]
[Same structure]

---

## What Didn't Work ❌

### [Problem 1]
**What happened:** [Specific issue]
**Impact:** [Time lost/quality issue/confusion]
**Root cause:** [Why it happened]
**Prevention:** [How to avoid next time]
**Affects:** [Which agent/workflow]

### [Problem 2]
[Same structure]

---

## Actionable Learnings

### For content-director:
- [ ] [Specific planning improvement]
- [ ] [Time estimation adjustment]
- [ ] [Workflow optimization]

### For content-writer:
- [ ] [Writing process improvement]
- [ ] [Template to create/use]
- [ ] [Quality check to add]

### For content-reviewer:
- [ ] [Review criteria update]
- [ ] [Pattern to watch for]

### For research-coordinator:
- [ ] [Research process improvement]

### For project improvement:
- [ ] [System-level change]
- [ ] [Tool to develop]
- [ ] [Documentation to update]

---

## Metrics

**Time efficiency:**
- Planned: X hours
- Actual: Y hours
- Variance: +/-Z%
- Trend: [Improving/Stable/Declining]

**Quality:**
- Iterations to approval: N
- Critical issues found: N
- User satisfaction: [1-5]

**Pattern recognition:**
- Similar to tasks: [List IDs if any]
- New pattern identified: [Yes/No]
- Recurring issue: [Yes/No - if yes, note frequency]

---

## User Feedback

**Satisfaction:** [1-5]
**Quotes:**
"[Specific user feedback verbatim]"

**Requests for next time:**
[Any user suggestions or preferences noted]

---

## Follow-up Actions

### Immediate (This week):
- [ ] [Action item 1]
- [ ] [Action item 2]

### Short-term (This month):
- [ ] [Pattern to implement]
- [ ] [Template to create]

### Long-term (Consider for future):
- [ ] [System improvement]
- [ ] [Capability to develop]

---

## Pattern Recognition

**Is this a recurring issue?**
[Yes/No - if yes, link to similar reflections]

**Pattern identified:**
[Name the pattern if it's recurring]

**Frequency:**
[How many times has this pattern appeared?]

**Action required:**
[If 3+ occurrences, update agent instructions]

---

## Knowledge Captured

**Templates created:**
- [Link to any reusable templates]

**Verified sources:**
- [Any sources that proved reliable]

**Cognitive analogies that worked:**
- [For presentation content]

**Time estimates learned:**
- [Actual times for similar work]

---

**Reflection completed by:** [Main agent]
**Review scheduled:** [Next weekly review date]
```

---

## Weekly Synthesis Process

**Every Monday:**

1. **Review all reflections** from past week
2. **Identify patterns** (3+ occurrences)
3. **Prioritize improvements** by impact
4. **Update agent instructions** for systemic issues
5. **Create templates** for proven patterns
6. **Document in** improvements/implemented.md

---

## How Agents Use This Memory

### Before starting a task:
```markdown
1. content-director reads relevant past reflections
2. Extracts: Time estimates, successful patterns, pitfalls to avoid
3. Incorporates learnings into current plan
4. References past tasks in plan
```

### During a task:
```markdown
1. content-writer checks for proven templates
2. content-reviewer checks for common mistakes pattern
3. Apply learned patterns proactively
```

### After a task:
```markdown
1. Main agent writes rich reflection
2. Updates pattern files if needed
3. Flags systemic issues for agent instruction updates
```

---

## Success Metrics

**System is working when:**
- Time estimation accuracy improving (±10% or better)
- Iteration cycles decreasing (fewer revisions needed)
- Quality scores stable or increasing
- Pattern library growing
- Agent instructions evolving based on learnings

---

## Anti-Patterns to Avoid

❌ **Shallow reflections** - "It worked" doesn't teach anything
❌ **No root cause** - "It was slow" without analyzing why
❌ **No action items** - Observations without improvements
❌ **No follow-through** - Writing reflections but never reviewing them
❌ **Passive logging** - Recording events without learning

✅ **Rich analysis** - Understand WHY things worked/failed
✅ **Actionable items** - Specific improvements to implement
✅ **Pattern synthesis** - Connect learnings across tasks
✅ **Feedback loop** - Reflections → agent updates → better performance
✅ **Active learning** - System gets smarter over time

---

**This is a learning system, not a log. The value is in APPLYING learnings, not just recording them.**
