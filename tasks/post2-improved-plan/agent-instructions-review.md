# Agent Instructions: Review Blog Post Draft

## Content Type: Blog Post Quality Review (Part 2 of AI Trust Gap Series)

---

## Mission

Conduct comprehensive quality review of DRAFT_v1.md against:
1. Research evidence accuracy and completeness
2. Voice consistency with post1_bias
3. Structural effectiveness and flow
4. Citation quality and recency
5. Engagement strategy execution
6. Framework actionability

Provide specific, actionable improvement recommendations rated by priority.

---

## Context Files to Read (MANDATORY)

**The Draft:**
- `papers/blog1/post2_delegation/DRAFT_v1.md` - The draft to review

**Quality Standards:**
- `tasks/post2-improved-plan/IMPROVED_POST_PLAN.md` - Blueprint it should follow
- `tasks/post2-improved-plan/agent-instructions-write.md` - Requirements writer should meet
- `CLAUDE.md` - Project-wide blog post standards
- `papers/blog1/post1_bias/README.md` - Post 1 quality bar

**Research Verification:**
- All 8 task summaries (task1-8_summary.md) - To verify claims

---

## Review Framework: 6 Dimensions

### Dimension 1: Evidence Accuracy & Completeness (Critical)

**Check:**
- [ ] Every factual claim has a source citation
- [ ] Citations trace to research summary files
- [ ] Statistics are accurate (cross-check with summaries)
- [ ] Organizational examples match research (names, dates, numbers)
- [ ] 75%+ of citations from 2024-2025
- [ ] No invented or embellished facts

**Specific Verifications:**

**Opening Hook (Replit Case):**
- [ ] Jason Lemkin name correct
- [ ] July 2025 date correct
- [ ] 1,200+ executives, 1,190+ companies numbers correct
- [ ] AI confession quote accurate
- [ ] Code freeze context accurate
- Source: task1_opening_hook_summary.md

**5 Counterintuitive Findings:**
- [ ] Finding #1: g=-0.23 meta-analysis, GPT-4 90% vs 76% correct
- [ ] Finding #2: 88% vs 5% dishonesty correct (17.6x)
- [ ] Finding #3: 21% redesign workflows, 78% adoption, 95% pilots fail
- [ ] Finding #4: 79.7% → 19.8% accuracy swing, $67.4B losses
- [ ] Finding #5: 50% → 25% task variation collapse
- Source: task8_surprise_factor_summary.md

**Comparison Table Evidence:**
- [ ] All 5 dimensions have research backing
- [ ] Air Canada case accurate (chatbot, lawsuit, tribunal)
- [ ] McDonald's case accurate (3 years, July 2024 shutdown)
- [ ] 40% agentic AI cancellation (Gartner) correct
- Source: task3_comparison_table_summary.md

**Framework Validation:**
- [ ] Amazon 70-90% cost reduction accurate
- [ ] RAND 80% failure rate accurate
- [ ] Ponemon 2.3x cost for unsupervised accurate
- [ ] OpenAI GDPval, METR findings accurate
- Source: task5_framework_validation_summary.md

**Organizational Examples:**
- [ ] Lumen: 94% reduction, $50M savings, 3,000+ sellers
- [ ] ATB Financial: 2 hrs/week, 40% usage, 5,000+ employees
- [ ] MAIRE: 800 → 1,600 hrs/month
- [ ] Zalando: Honest hallucination admission
- Source: task4_organizational_examples_summary.md

**Assessment:**
- Rate: PASS / MINOR ISSUES / MAJOR ISSUES
- List any inaccuracies found with line numbers
- Suggest corrections with source references

---

### Dimension 2: Voice Consistency (High Priority)

**Compare against post1_bias reference:**

**Voice Characteristics to Match:**
- [ ] Warm but rigorous tone
- [ ] "Exploring together" framing (not directive)
- [ ] Uses "we" inclusively, not "you" prescriptively
- [ ] Poses questions to engage reader
- [ ] Admits uncertainty/limitations honestly
- [ ] Presents evidence, lets reader conclude
- [ ] Creates "aha" moments through surprises
- [ ] Maintains peer-level respect (not condescending)

**Specific Voice Checks:**

**Opening (Act I):**
- [ ] Hooks with surprise (not fear-mongering)
- [ ] Specific and vivid (not generic)
- [ ] Creates cognitive dissonance effectively
- [ ] Establishes credibility through precision

**Body (Act II-III):**
- [ ] Evidence presented methodically but engagingly
- [ ] Technical terms explained when used
- [ ] Transitions maintain flow between sections
- [ ] Counterintuitive findings create "wait, WHAT?" moments
- [ ] Comparison table digestible (not overwhelming)
- [ ] Framework practical (not just theoretical)

**Conclusion (Act IV):**
- [ ] Honest about complexity
- [ ] Invitational (not prescriptive)
- [ ] Forward-looking (not doom-and-gloom)
- [ ] Connects back to opening (callback)

**Assessment:**
- Rate: EXCELLENT / GOOD / NEEDS IMPROVEMENT
- Identify sections where voice drifts from post1_bias
- Suggest specific rewrites to align voice

---

### Dimension 3: Structural Effectiveness (High Priority)

**Check Against Required Structure:**

**Act I: The Paradox (800-1,000 words)**
- [ ] Actual word count: [____]
- [ ] Opens with Replit case effectively
- [ ] Establishes "why now?" urgency
- [ ] States core question clearly
- [ ] Presents thesis explicitly
- [ ] Transitions smoothly to Act II

**Act II: The Problem Space (1,800-2,000 words)**
- [ ] Actual word count: [____]
- [ ] HITL section (500-600): Germany PRAIM + automation bias
- [ ] Comparison Table section (1,000-1,200): 5 dimensions with deep dives
- [ ] Integrates Finding #1 and #4 in HITL section
- [ ] Integrates Finding #2 and #5 in comparison table
- [ ] Transitions effectively between sections

**Act III: Toward New Models (1,200-1,400 words)**
- [ ] Actual word count: [____]
- [ ] Success patterns (400-500): Finding #3 + real examples
- [ ] Three-stage framework (800-900): All stages validated
- [ ] Framework application example included
- [ ] Practical and actionable (not just descriptive)

**Act IV: Conclusion (500-600 words)**
- [ ] Actual word count: [____]
- [ ] Reality check honest
- [ ] Invitation collaborative
- [ ] Closing question memorable
- [ ] Series hook effective

**Overall Structure:**
- [ ] Total word count: 4,500-5,000 words (actual: [____])
- [ ] Sections proportioned appropriately
- [ ] Flow maintained throughout
- [ ] Engagement sustained (not front-loaded)
- [ ] Counterintuitive findings distributed effectively

**Assessment:**
- Rate: WELL-STRUCTURED / MINOR ADJUSTMENTS / MAJOR RESTRUCTURING
- Identify sections over/under target length
- Suggest structural improvements

---

### Dimension 4: Engagement Strategy Execution (Medium Priority)

**Check 5 Counterintuitive Findings Integration:**

**Finding #1 (Human-AI worse, g=-0.23):**
- [ ] Placed in HITL section (Act II)
- [ ] Pattern interrupt technique used:
  * States conventional wisdom (oversight improves)
  * Presents counterintuitive data (g=-0.23, 90% vs 76%)
  * Explains mechanism (automation bias)
  * Shows implication (HITL task-specific)
- [ ] Creates "wait, WHAT?" moment
- [ ] Backed with evidence (Nature Human Behaviour, JAMA)

**Finding #2 (Dishonesty 17.6x):**
- [ ] Placed in comparison table motivation dimension
- [ ] Pattern interrupt technique used
- [ ] Creates surprise effectively
- [ ] Backed with evidence (Nature 2025)

**Finding #3 (Only 21% redesign):**
- [ ] Placed in organizational examples intro
- [ ] Contrasts success (Lumen) vs failure (McDonald's)
- [ ] Explains why 79% fail
- [ ] Backed with evidence (McKinsey)

**Finding #4 (Reliable AI = worse bias):**
- [ ] Placed in HITL section
- [ ] Paradox clearly articulated
- [ ] 17.6% improvement + 79.7% → 19.8% swing both shown
- [ ] $67.4B losses contextualizes impact
- [ ] Backed with evidence (RSNA, Nature Medicine, Ponemon)

**Finding #5 (50% → 25% collapse):**
- [ ] Placed in comparison table error patterns
- [ ] May also appear in opening (Replit brittleness)
- [ ] Explains 70-85% failure rates
- [ ] Backed with evidence (Carl Rannaberg, METR)

**Engagement Flow:**
- [ ] Opening hooks immediately
- [ ] Maintains interest throughout (not just front-loaded)
- [ ] Surprises distributed (not clustered)
- [ ] Questions posed to reader periodically
- [ ] Practical value builds toward framework

**Assessment:**
- Rate: HIGHLY ENGAGING / ENGAGING / NEEDS MORE HOOKS
- Identify sections that lose momentum
- Suggest additional engagement techniques

---

### Dimension 5: Framework Actionability (High Priority)

**Check Three-Stage Framework Quality:**

**Stage 1: Task Decomposition & Risk Assessment**
- [ ] Clear description of what it is
- [ ] Evidence backing effectiveness (Amazon 70-90%, RAND 80% failure)
- [ ] Practical application explained
- [ ] Addresses comparison table dimensions explicitly
- [ ] Actionable (reader knows what to do)

**Stage 2: Capability Mapping**
- [ ] Clear description of what it is
- [ ] Evidence backing (OpenAI GDPval, METR, SVI)
- [ ] Contrast with benchmark limitations
- [ ] Performance distribution emphasis (not just average)
- [ ] Actionable (test on real samples)

**Stage 3: Oversight Protocol Design**
- [ ] HITL/HOTL/HIC taxonomy clear
- [ ] Evidence backing (Ponemon 2.3x, Anthropic RSP, EU AI Act)
- [ ] Match oversight to risk principle clear
- [ ] Actionable (reader can implement)

**Framework Application Example:**
- [ ] Concrete example provided (e.g., AI-assisted code review)
- [ ] Shows all three stages applied
- [ ] Demonstrates delegation decisions based on evidence
- [ ] Realistic (not oversimplified)

**Overall Framework Assessment:**
- [ ] Validated with research (not just proposed)
- [ ] Practical (organizations can implement)
- [ ] Honest about limitations (what it doesn't solve)
- [ ] Differentiates from ad-hoc approaches
- [ ] Clear success criteria

**Assessment:**
- Rate: HIGHLY ACTIONABLE / ACTIONABLE / TOO THEORETICAL
- Identify areas needing more practical guidance
- Suggest examples to strengthen actionability

---

### Dimension 6: Citation Quality & Recency (Critical)

**Citation Standards Check:**

**Format:**
- [ ] All citations inline with source attribution
- [ ] Format consistent throughout
- [ ] Sources list at end comprehensive
- [ ] Working URLs provided (or references to summaries)

**Recency:**
- [ ] Count total citations: [____]
- [ ] Count 2024-2025 citations: [____]
- [ ] Percentage 2024-2025: [____]% (target: 75%+)
- [ ] Foundational citations justified (Parasuraman 2010, etc.)
- [ ] No outdated statistics used when recent available

**Source Quality:**
- [ ] Tier 1 (peer-reviewed) primary: Nature, JAMA, academic
- [ ] Tier 2 (institutional) acceptable: McKinsey, Gartner, Stanford
- [ ] Tier 3 (industry) used sparingly: vendor reports
- [ ] No unverified anecdotes or "a company" examples
- [ ] All organizational examples named and sourced

**Traceability:**
- [ ] Every major claim traces to research summary
- [ ] Statistics match summary files exactly
- [ ] Organizational examples match task4 details
- [ ] Framework validation traces to task5

**Assessment:**
- Rate: EXCELLENT / GOOD / NEEDS IMPROVEMENT
- Flag any weak/outdated citations
- Suggest replacements from research summaries

---

## Review Output Format

**File Location:** `tasks/post2-improved-plan/review-v1.md`

**Structure:**

```markdown
# Blog Post Draft Review: Post2_Delegation DRAFT_v1

**Reviewed:** [Date]
**Draft Length:** [actual word count]
**Target Length:** 4,500-5,000 words

---

## Overall Assessment

**Readiness:** [READY FOR PUBLICATION / MINOR REVISIONS NEEDED / MAJOR REVISIONS NEEDED]

**Summary:** [2-3 sentences on overall quality]

**Strengths:** [3-5 bullet points]

**Areas for Improvement:** [3-5 bullet points]

---

## Dimension 1: Evidence Accuracy & Completeness

**Rating:** [PASS / MINOR ISSUES / MAJOR ISSUES]

**Findings:**
- [List any inaccuracies with line numbers]
- [Note missing citations]
- [Verify key statistics]

**Recommendations:**
[Specific fixes needed]

---

## Dimension 2: Voice Consistency

**Rating:** [EXCELLENT / GOOD / NEEDS IMPROVEMENT]

**Findings:**
- [Sections matching post1_bias voice]
- [Sections drifting from target voice]
- [Specific voice issues]

**Recommendations:**
[Specific rewrites or adjustments]

---

## Dimension 3: Structural Effectiveness

**Rating:** [WELL-STRUCTURED / MINOR ADJUSTMENTS / MAJOR RESTRUCTURING]

**Act-by-Act Assessment:**
- Act I: [words] - [assessment]
- Act II: [words] - [assessment]
- Act III: [words] - [assessment]
- Act IV: [words] - [assessment]

**Recommendations:**
[Structural changes needed]

---

## Dimension 4: Engagement Strategy Execution

**Rating:** [HIGHLY ENGAGING / ENGAGING / NEEDS MORE HOOKS]

**Counterintuitive Findings Integration:**
- Finding #1: [assessment]
- Finding #2: [assessment]
- Finding #3: [assessment]
- Finding #4: [assessment]
- Finding #5: [assessment]

**Recommendations:**
[Engagement improvements]

---

## Dimension 5: Framework Actionability

**Rating:** [HIGHLY ACTIONABLE / ACTIONABLE / TOO THEORETICAL]

**Three-Stage Framework Quality:**
- Stage 1: [assessment]
- Stage 2: [assessment]
- Stage 3: [assessment]
- Application Example: [assessment]

**Recommendations:**
[Practical improvements needed]

---

## Dimension 6: Citation Quality & Recency

**Rating:** [EXCELLENT / GOOD / NEEDS IMPROVEMENT]

**Statistics:**
- Total citations: [count]
- 2024-2025 citations: [count] ([percentage]%)
- Target met: [YES/NO - need 75%+]

**Recommendations:**
[Citation improvements needed]

---

## Priority Action Items

### CRITICAL (Must Fix Before Publication):
1. [Specific issue with line number]
2. [Specific issue with line number]

### HIGH PRIORITY (Significantly Improves Quality):
1. [Specific improvement]
2. [Specific improvement]

### MEDIUM PRIORITY (Polish):
1. [Enhancement]
2. [Enhancement]

### LOW PRIORITY (Nice to Have):
1. [Optional improvement]

---

## Comparison to Post1_Bias Quality Bar

**Post 1 Characteristics:**
- Length: 1,168 words (shorter, individual focus)
- Voice: Warm, research-backed, practical ✓
- Hook: Cedars-Sinai study (June 2025) ✓
- Evidence: Nature Human Behaviour (Dec 2024) ✓
- Framework: 5-minute protocol (20-40% effective) ✓

**Post 2 Assessment:**
- Length: [actual] (longer, organizational focus) - [appropriate?]
- Voice: [matches Post 1?]
- Hook: [Replit case as strong as Cedars-Sinai?]
- Evidence: [75%+ 2024-2025 met?]
- Framework: [as actionable as 5-minute protocol?]

**Quality Match:** [YES / CLOSE / NEEDS WORK]

---

## Recommendation

**Final Verdict:** [APPROVE FOR PUBLICATION / REVISE AND RESUBMIT / MAJOR REWRITE NEEDED]

**Reasoning:** [2-3 sentences explaining verdict]

**Next Steps:**
[Clear action items for writer based on review]

---

**Reviewer Notes:**
[Any additional context or observations]
```

---

## Review Principles

**Be Specific:**
- Not: "Voice could be better"
- But: "Lines 45-67 shift from 'we' to 'you should'—rewrite to maintain exploratory tone"

**Be Constructive:**
- Not: "Framework section is weak"
- But: "Framework Stage 2 lacks concrete example—add capability mapping case from ATB Financial pilot testing"

**Be Evidence-Based:**
- Not: "This doesn't feel right"
- But: "Task8 summary shows 88% vs 5% (line 52), but draft says 85% vs 8% (line 234)—correct to match research"

**Prioritize:**
- Critical: Factual errors, major structural issues
- High: Voice inconsistencies, missing key elements
- Medium: Flow improvements, additional examples
- Low: Word choice, minor polish

---

## Success Criteria for Review

Your review is successful when:
1. Every dimension has clear rating and specific findings
2. Critical issues identified with line numbers
3. Recommendations actionable (writer knows what to fix)
4. Evidence backing all assessments (not just opinions)
5. Priority clear (writer knows what to fix first)
6. Comparison to post1_bias explicit
7. Final verdict justified and clear

**Remember:** Your role is quality assurance. Be thorough, specific, and constructive. The goal is to elevate good work to excellent, publication-ready work.
