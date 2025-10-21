# Content Scoping Guide

**Purpose:** Objective reference for content-director to prevent scope creep
**Usage:** MANDATORY FIRST STEP before planning any content
**Updated:** 2025-10-13

---

## MANDATORY FIRST STEP: Check Past Success Metrics

Before planning ANY content, content-director must:
1. ✅ Identify content type (blog/presentation/paper)
2. ✅ Check relevant section below
3. ✅ Use as calibration (not rigid constraint)
4. ✅ Justify deviations explicitly in plan.md

---

## Blog Post Success Formula (Post 1: Delegation)

### Scope Metrics

**Core Structure:**
- **Central question:** ONE focused question deeply explored (not multiple questions)
- **Research tasks:** 6-8 tasks
- **Time budget:** 12-18 hours total
- **Source collection:** 100-200 sources reviewed
- **Final citations:** 12-20 (rigorously selected from collected sources)

**Currency Requirements:**
- **Recency:** 75-80% from last 18 months (current research)
- **Foundation:** 20-25% classic/foundational sources

### Task Breakdown Pattern

**1. Hook Task** (1 task, 5-6 hours)
- Find paradox or surprising real-world case
- Recent example preferred (2024-2025)
- Named organizations better than anonymous
- Explicit paradox better than inferred

**2. Framework Tasks** (2-3 tasks, 4-6 hours)
- Core comparison model or organizing principle
- Validation across dimensions
- Example: Comparison table with 5 dimensions

**3. Evidence Tasks** (2-3 tasks, 4-6 hours)
- Real organizational examples
- Empirical validation
- Domain-specific applications

**4. Discovery Task** (1 task, 1.5-2 hours)
- Counterintuitive findings
- "Wait, WHAT?" moments
- Surprise factor for memorability

### Quality Standards

**Source Tier Distribution:**
- **Tier 1-2 sources:** 90%+ (academic peer-reviewed + major industry reports)
- **Real examples:** Named organizations > anonymous composites
- **Verification:** 2+ independent sources for major claims

### Red Flags (Scope Creep Indicators)

⚠️ **More than 10 tasks** → Likely dissertation scope, not blog post
⚠️ **More than 20 hours** → Comprehensive survey, not focused exploration
⚠️ **More than 25 final citations** → Academic paper density, not accessible blog
⚠️ **Multiple central questions** → Scattered focus, not deep single insight
⚠️ **Less than 70% recency** → Historical review, not timely urgency

### When to Deviate (Justification Required)

**Valid reasons:**
- Topic genuinely requires more depth (emerging field, no existing synthesis)
- Novel area with sparse research (need broader exploration)
- Framework development (not just application of existing models)
- User explicitly requested comprehensive scope

**Deviation Template (required in plan.md):**
```markdown
## Scope Calibration Check

Content type: Blog Post
Reference metrics: 8 tasks, 15 hours, 18 citations
This plan: [X] tasks, [Y] hours, [Z] citations
Ratio: [X/8], [Y/15], [Z/18]

⚠️ DEVIATION NOTICE: This plan exceeds reference metrics
Justification: [Specific reason why this topic requires more scope]
Mitigation: [How we'll maintain focus despite larger scope]
Risk: [What could go wrong with over-scoping]
```

---

## Presentation Slide Success Formula (Tasks 1-6)

### Per-Slide Scope

**Time Budget:**
- **Total time per slide:** 2-4 hours (research + write + review + improve)
- **Research phase:** 30-60 minutes (if new research needed)
- **Writing phase:** 60-90 minutes (analysis + speech + design)
- **Review phase:** 30-45 minutes
- **Improve phase:** 30-45 minutes

**Deliverables:**
- **Extended analysis:** 2-3 pages with cognitive parallels and verified sources
- **Speech notes:** 2-3 min minimum delivery time with [СЛАЙД] and [КЛИК] markers
- **Slide design:** Progressive disclosure system, dense information-rich layout

### Quality Standards

**Voice Compliance:**
- **Dr. Elena Cognitive:** 100% compliance (cognitive focus, not business ROI)
- **Tone:** Technically confident, cognitively focused, efficiently engaging
- **Language:** Natural code-switching (English tech terms, Russian concepts)

**Source Verification:**
- **Every statistic cited:** Academic + industry sources with working URLs
- **Cognitive parallels verified:** CogniFit, IHB RAN, peer-reviewed studies
- **No invented examples:** All claims must be traceable

**Audience Appropriateness:**
- **Russian tech audience:** Peer-level (not condescending)
- **Complexity:** Dense but accessible
- **Cultural fit:** References familiar to Russian tech community

### Red Flags

⚠️ **More than 6 slides per task** → Over-scoping (should be 1-2 slides max)
⚠️ **Less than 2 min speech** → Too shallow, needs more depth
⚠️ **Business ROI focus** → Wrong voice (should be cognitive understanding)
⚠️ **Unverified statistics** → Quality violation (all stats must have sources)
⚠️ **Generic examples** → Should use verified research, not invented analogies

### Scope Calibration for Presentation

```markdown
## Scope Calibration Check

Content type: Presentation Slide
Reference metrics: 1-2 slides, 3 hours, 2-3 min speech each
This plan: [X] slides, [Y] hours, [Z] min speech
Ratio: [X/1.5], [Y/3], [Z/2.5]

Assessment: [Calibrated / Under-scope / Over-scope]
Justification: [If deviating, explain why]
```

---

## Research Paper Success Formula

**Status:** Template to be added after first successful paper completion

**Placeholder guidance:**
- Academic voice and rigor
- Extensive citation requirements
- Peer-review standards
- Technical depth expectations

---

## Usage Protocol for content-director

### Step 1: Identify Content Type

Determine from user request or context:
- **Blog post** → Check "Blog Post Success Formula"
- **Presentation slide** → Check "Presentation Slide Success Formula"
- **Research paper** → Check "Research Paper Success Formula"

### Step 2: Compare Plan Against Metrics

Calculate ratio:
```
My plan: X tasks, Y hours, Z citations/deliverables
Reference: A tasks, B hours, C citations/deliverables
Ratio: X/A, Y/B, Z/C
```

### Step 3: Apply Decision Rules

**Ratio Interpretation:**
- **<0.5** → Plan might be too shallow (verify scope is adequate)
- **0.5-1.5** → Plan is well-calibrated (proceed with confidence)
- **1.5-2.5** → Plan might be too broad (review for scope creep)
- **>2.5** → Plan is over-scope (revise OR provide strong justification)

### Step 4: Document in plan.md (MANDATORY)

Every plan.md must include:

```markdown
## Scope Calibration Check ✅

**Content type:** [Blog Post / Presentation / Paper]

**Reference metrics:**
- Tasks: [A]
- Time: [B hours]
- Citations/Deliverables: [C]

**This plan:**
- Tasks: [X]
- Time: [Y hours]
- Citations/Deliverables: [Z]

**Ratio:** [X/A], [Y/B], [Z/C]

**Assessment:** [Calibrated / Under-scope / Over-scope]

**Justification:** [If ratio >1.5, explain why deviation is necessary]

**Mitigation:** [If over-scope, how will focus be maintained?]
```

### Step 5: Main Agent Verification (Automatic)

Main agent checks returned plan:
- ✅ Does plan.md contain "Scope Calibration Check" section?
- ✅ If ratio >2.5, is justification strong?
- ❌ If missing, request director to run scope check first

---

## Examples of Proper Scope Calibration

### Example 1: Well-Calibrated Blog Post

```markdown
## Scope Calibration Check ✅

Content type: Blog Post
Reference metrics: 8 tasks, 15 hours, 18 citations
This plan: 8 tasks, 14 hours, 16 citations
Ratio: 1.0, 0.93, 0.89

Assessment: ✅ Calibrated (all ratios 0.5-1.5)
Justification: Not needed - plan matches reference metrics
```

### Example 2: Over-Scope with Justification

```markdown
## Scope Calibration Check ✅

Content type: Blog Post
Reference metrics: 8 tasks, 15 hours, 18 citations
This plan: 12 tasks, 22 hours, 25 citations
Ratio: 1.5, 1.47, 1.39

Assessment: ⚠️ Over-scope (ratios at upper boundary)

Justification:
Topic is emerging field (AI delegation) with no existing synthesis.
Requires original framework development (comparison table with 5 dimensions).
2025 research explosion requires more currency checking (7 dimensions vs usual 3).

Mitigation:
- Aggressive consolidation after research (12 tasks → pare to 8 core insights)
- Discovery task time-boxed strictly (no scope creep during exploration)
- Final citations will be 15-18 (current 25 is collection, not final)
- Each task has clear "must answer" question (prevents tangent exploration)

Risk: May take 20 hours instead of 22 if consolidation is effective
```

### Example 3: Justifiable Deviation

```markdown
## Scope Calibration Check ✅

Content type: Blog Post
Reference metrics: 8 tasks, 15 hours, 18 citations
This plan: 4 tasks, 8 hours, 10 citations
Ratio: 0.5, 0.53, 0.56

Assessment: ⚠️ Under-scope (all ratios at lower boundary)

Justification:
User explicitly requested "quick tactical piece, not comprehensive research."
Topic is update/extension of previous Post 1 (building on existing foundation).
Target: 2000 words vs Post 1's 4500 words (shorter format).

Quality assurance:
- 10 citations still maintains Tier 1-2 source quality (90%+)
- 4 tasks are focused but deep (2 hours each avg)
- Not sacrificing quality for speed - different scope, not lower quality
```

---

## Quarterly Review & Updates

**This reference evolves based on evidence:**

After every 3 successful projects:
1. Review actual metrics vs. reference
2. Calculate new averages/ranges
3. Update reference if patterns change
4. Add new content types (papers, etc.)

**Do not:**
- Treat reference as immutable truth
- Ignore context-specific needs
- Cargo cult past successes

**Do:**
- Use as calibration starting point
- Justify deviations thoughtfully
- Update based on accumulated evidence

---

## Quick Reference Card

**Before planning:**
1. What content type? → Check that section
2. Calculate ratio (my plan / reference)
3. Ratio 0.5-1.5? → Proceed
4. Ratio outside range? → Justify in plan.md
5. Document scope check → In every plan.md

**Remember:**
- Reference = calibration, not constraint
- Strong justification = deviation OK
- No justification = revise plan
- Main agent checks scope section

---

**Updated:** 2025-10-13
**Next Review:** After 3 more blog posts OR 5 more presentation tasks
**Owner:** content-director (with main agent verification)
