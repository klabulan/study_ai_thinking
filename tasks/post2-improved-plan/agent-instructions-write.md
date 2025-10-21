# Agent Instructions: Create Blog Post Draft from Improved Plan

## Content Type: Blog Post (Part 2 of AI Trust Gap Series)

---

## Mission

Create a 4,500-5,000 word blog post on AI delegation that:
1. Integrates 8 completed research tasks into compelling narrative
2. Features 5 counterintuitive findings as engagement hooks
3. Presents evidence-backed three-stage delegation framework
4. Matches post1_bias style and quality bar
5. Is ready for publication after review cycle

---

## Context Files to Read (MANDATORY)

**Primary Guidance:**
- `tasks/post2-improved-plan/IMPROVED_POST_PLAN.md` - Your blueprint for the post
- `papers/blog1/post2_delegation/FINAL_POST_PLAN.md` - Original plan (for context)

**Research Evidence (All 8 Tasks):**
- `papers/blog1/post2_delegation/task1_opening_hook_summary.md` - Replit case (July 2025)
- `papers/blog1/post2_delegation/task2_hitl_summary.md` - HITL effectiveness/limitations
- `papers/blog1/post2_delegation/task3_comparison_table_summary.md` - 5 dimension comparison
- `papers/blog1/post2_delegation/task4_organizational_examples_summary.md` - 12 real cases
- `papers/blog1/post2_delegation/task5_framework_validation_summary.md` - Three-stage validation
- `papers/blog1/post2_delegation/task6_management_baseline_summary.md` - Traditional delegation
- `papers/blog1/post2_delegation/task7_2025_context_summary.md` - Why now urgency
- `papers/blog1/post2_delegation/task8_surprise_factor_summary.md` - 5 counterintuitive findings

**Style Reference:**
- `papers/blog1/post1_bias/README.md` - Post 1 overview (voice, tone, structure)
- `papers/blog1/post1_bias/DRAFT_v3_EN.md` - Post 1 English draft (if available)

**Project Requirements:**
- `CLAUDE.md` - Blog post standards and quality criteria

---

## Target Specifications

**Length:** 4,500-5,000 words (roughly 20-25 minute read)

**Voice:** Dr. Elena Cognitive
- Warm but rigorous
- Exploratory, not prescriptive ("let's explore" vs "you should")
- Research-backed insights delivered conversationally
- Honest about limitations and complexity
- Creates "aha" moments through counterintuitive findings

**Audience:**
- Organizational leaders and managers deploying AI
- Technical team leads making delegation decisions
- Tech-savvy professionals managing AI integration
- Peer-level (not condescending, not basic)

**Tone:**
- Opening: Surprising, creates cognitive dissonance
- Body: Methodical evidence presentation with engagement hooks
- Framework: Practical, actionable, validated
- Conclusion: Honest, invitational, forward-looking

---

## Required Structural Elements

### Opening Hook (800-1,000 words)
**Source:** task1_opening_hook_summary.md

**Must include:**
- Replit database deletion case (July 2025)
  * Jason Lemkin, code freeze, explicit instructions
  * 1,200+ executives, 1,190+ companies affected
  * AI confession: "catastrophic failure on my part"
  * The paradox: safeguards created confidence that enabled disaster
- "Why now?" establishment (from task7)
  * 78% organizational adoption
  * 56.4% incident jump (233 in 2024)
  * EU AI Act enforcement timeline
- Core question: "How do you decide what to delegate to AI?"
- Thesis: Human delegation frameworks actively mislead with AI

### Comparison Table Heart (Section within Act II)
**Source:** task3_comparison_table_summary.md

**Must include:**
- Full 5-dimension table presented visually
- Deep dive on 3 dimensions with real examples:
  1. Task Understanding (overconfident when wrong)
     - Air Canada chatbot case
     - NYC MyCity illegal advice
  2. Error Patterns (sudden capability cliffs)
     - McDonald's 3-year failure
     - Model collapse research
  3. Autonomy Boundaries (discovered through failure)
     - 40% agentic AI projects canceled by 2027
     - Audit trail challenges
- Integration of Finding #5 (50% → 25% brittleness)

### 5 Counterintuitive Findings (Distributed Throughout)
**Source:** task8_surprise_factor_summary.md

**Distribution strategy:**
1. **Finding #1** (Human-AI worse, g=-0.23): HITL section
   - GPT-4 alone 90%, physicians + GPT-4 76%
   - Meta-analysis: 370 experiments
2. **Finding #2** (Dishonesty 17.6x): Comparison table motivation dimension
   - 88% vs 5% in die-roll experiment
   - Moral disengagement mechanism
3. **Finding #3** (Only 21% redesign workflows): Organizational examples intro
   - 78% adoption, 80% no impact, 95% pilots fail
   - Lumen ($50M) vs McDonald's (failure)
4. **Finding #4** (Reliable AI = worse bias): HITL section
   - 79.7% → 19.8% accuracy swing
   - $67.4B losses despite high performance
5. **Finding #5** (50% → 25% collapse): Comparison table + opening
   - Task variation brittleness
   - Explains 70-85% failure rates

### Three-Stage Framework (Act III)
**Source:** task5_framework_validation_summary.md

**Must include:**
- **Stage 1: Task Decomposition & Risk Assessment**
  - Amazon: 70-90% cost reduction evidence
  - RAND: 80% failure without decomposition
  - NIST AI RMF, MIT AI Risk Repository
  - Consequence × Capability × Verification matrix

- **Stage 2: Capability Mapping**
  - OpenAI GDPval real-world testing
  - METR: 100% <4min, <10% >4hr tasks
  - SVI (Statistical Volatility Index)
  - Benchmark limitations (gaming evidence)

- **Stage 3: Oversight Protocol Design**
  - HITL/HOTL/HIC taxonomy
  - Ponemon: 2.3x cost for unsupervised
  - Anthropic RSP as gold standard
  - EU AI Act requirements

### Organizational Examples (Act III)
**Source:** task4_organizational_examples_summary.md

**Success Cases (choose 3-4):**
- Lumen: 94% time reduction, $50M savings (workflow redesign)
- ATB Financial: 2 hrs/week, 40% daily usage (pilot-test-scale)
- MAIRE: 800→1,600 hrs/month (HITL portal)
- Zalando: Postmortem analysis (honest about hallucinations)

**Failure Cases (choose 2-3):**
- McDonald's: 3 years, shut down July 2024 (over-delegation)
- Air Canada: Legal liability (no verification)
- Legal AI: 75% hallucination rate (Stanford)

**Key Pattern:** Success = workflow redesign + careful task selection + oversight

---

## Critical Requirements

### Citation Standards
- **Every factual claim needs a source**
- **75%+ citations from 2024-2025**
- Format: Inline with source attribution
  - Example: "Meta-analysis of 370 experiments found human-AI combinations performed worse than AI alone (Hedges' g = -0.23) [Nature Human Behaviour, October 2024]"
- **Trace to research summaries:** When citing, reference the task summary file
  - Example internal note: `[From task3_comparison_table_summary.md, lines 30-35]`

### Engagement Strategy
- **Pattern Interrupt Technique** for each counterintuitive finding:
  1. State conventional wisdom
  2. Present counterintuitive data
  3. Explain mechanism
  4. Show implication

- **Example Structure:**
  > "Every AI deployment guide tells you: implement human oversight. It's common sense.
  >
  > But a 2024 meta-analysis found something shocking: human-AI combinations performed worse than AI alone (g = -0.23).
  >
  > The mechanism is automation bias—humans defer rather than complement.
  >
  > The implication: HITL isn't universal. For decision-making, oversight can degrade performance."

### Voice Consistency Checklist
- [ ] Uses "we" (inclusive) not "you" (directive)
- [ ] Poses questions to reader for engagement
- [ ] Admits uncertainty where appropriate
- [ ] Presents evidence, lets reader conclude
- [ ] Maintains warmth while being rigorous
- [ ] Avoids jargon or explains technical terms
- [ ] Creates "aha" moments through surprising data
- [ ] Ends sections with transition that maintains flow

---

## Section-by-Section Requirements

### Act I: The Paradox (800-1,000 words)

**Opening (150-200 words):**
- Replit case in vivid detail
- Specific dates, numbers, names
- AI's own confession as dramatic hook

**The Reveal (300-400 words):**
- Thesis statement clear
- Pattern recognition: success → credit management, failure → blame AI
- Reality: the delegation model is the problem
- Why this matters in 2025 (from task7)

**Transition (150-200 words):**
- Preview comparison table concept
- Preview three-stage framework
- Bridge to Act II

### Act II: The Problem Space (1,800-2,000 words)

**Section 1: HITL Reality Check (500-600 words)**
- Lead with Germany PRAIM success (17.6% improvement)
- Contrast with automation bias (79.7% → 19.8%)
- Integrate Finding #1 (human-AI worse than AI alone)
- Integrate Finding #4 (reliable AI = worse complacency)
- Conclusion: "HITL works tactically but fails strategically"
- Bridge: "Here's what breaks with AI delegation"

**Section 2: The Comparison Table (1,000-1,200 words)**
- Introduce full 5-dimension table
- Deep dive on 3 dimensions (400 words each):
  * Task Understanding (with Air Canada, NYC examples)
  * Error Patterns (with McDonald's, brittleness evidence)
  * Autonomy Boundaries (with Gartner 40%, audit challenges)
- Acknowledge other 2 dimensions briefly (150 words)
- Integrate Finding #2 (dishonesty) in motivation dimension
- Integrate Finding #5 (brittleness) in error patterns
- Section conclusion: "Five dimensions break—how do orgs actually decide?"

### Act III: Toward New Delegation Models (1,200-1,400 words)

**Section 1: What Actually Works (400-500 words)**
- Lead with Finding #3: Only 21% redesign workflows
- Present 3 success patterns from task4:
  * Lumen (workflow redesign)
  * ATB (pilot-test-scale)
  * MAIRE (HITL portal)
- Pattern synthesis
- Bridge to framework

**Section 2: Three-Stage Framework (800-900 words)**
- Framework introduction (100 words)
- **Stage 1** (250 words):
  * Amazon 70-90% cost reduction
  * RAND 80% failure without planning
  * Consequence × Capability × Verification
  * Addresses comparison table dimensions
- **Stage 2** (250 words):
  * OpenAI GDPval, METR findings
  * Benchmark limitations
  * Performance distribution matters
  * Test on real samples
- **Stage 3** (250 words):
  * HITL/HOTL/HIC taxonomy
  * Ponemon 2.3x cost evidence
  * Anthropic RSP example
  * Match oversight to risk
- **Framework Application Example** (150 words):
  * Concrete example (AI-assisted code review)
  * Show all three stages applied

### Act IV: The Uncomfortable Truth (500-600 words)

**Reality Check (200-250 words):**
- This is harder than hiring humans (and must accept that)
- What framework addresses
- What framework doesn't solve
- Honesty about current state

**The Invitation (150-200 words):**
- Shift to collaborative tone
- Your experience is valuable data
- Sharing helps collective understanding

**Closing Question (100-150 words):**
- Callback to Replit opening
- 60-second pause before delegation
- Three questions framework
- "That's the choice."

**Series Hook (50 words):**
- Bridge to Post 3
- Shadow AI tease

---

## Quality Criteria (Self-Check Before Submission)

### Content Quality
- [ ] Every major claim has citation from research summaries
- [ ] All 5 counterintuitive findings integrated
- [ ] Comparison table has evidence for all 5 dimensions
- [ ] Three-stage framework validated with research
- [ ] Organizational examples specific (names, numbers, dates)
- [ ] "Why now?" urgency clearly established
- [ ] 75%+ citations from 2024-2025

### Structure Quality
- [ ] Length: 4,500-5,000 words
- [ ] Act I hooks reader effectively
- [ ] Act II presents evidence methodically
- [ ] Act III provides actionable framework
- [ ] Act IV concludes honestly
- [ ] Sections flow with transitions
- [ ] Counterintuitive findings distributed for engagement

### Voice Quality
- [ ] Matches post1_bias warmth and rigor
- [ ] "Exploring together" not "here's what you should do"
- [ ] Questions engage reader
- [ ] Admits limitations appropriately
- [ ] Maintains peer-level tone (not condescending)
- [ ] Technical terms explained when used
- [ ] Creates "aha" moments

### Evidence Quality
- [ ] All facts traced to research summaries
- [ ] Real organizations named (not "a company")
- [ ] Specific numbers and dates provided
- [ ] Statistics contextualized (not just thrown in)
- [ ] Failure cases treated respectfully
- [ ] Success cases credited appropriately

---

## Output Specifications

**File Location:** `papers/blog1/post2_delegation/DRAFT_v1.md`

**File Structure:**
```markdown
# [Title: TBD based on improved plan]

**Part 2 of AI Trust Gap Series**
**Word Count:** [actual count]
**Read Time:** [minutes]

---

[Body of post following structure above]

---

## Sources

[Comprehensive citation list organized by section]

---

**Author:** Dr. Elena Cognitive
**Series:** AI Trust Gap (2 of 3)
**Next:** Shadow AI and organizational blind spots
```

---

## Common Pitfalls to Avoid

❌ **Don't:** Generic "be aware of AI limitations" advice
✅ **Do:** Specific, evidence-backed framework with measurements

❌ **Don't:** Fear-mongering or AI dismissal
✅ **Do:** Honest assessment with practical solutions

❌ **Don't:** Academic tone or jargon-heavy writing
✅ **Do:** Accessible expertise with explained technical terms

❌ **Don't:** Invented examples or anonymous "a company" cases
✅ **Do:** Real organizations with verifiable sources

❌ **Don't:** Scattered counterintuitive findings randomly
✅ **Do:** Strategic distribution for sustained engagement

❌ **Don't:** Framework without validation evidence
✅ **Do:** Each stage backed by research (Amazon, Ponemon, etc.)

---

## Success = Ready for Review Cycle

When you finish DRAFT_v1.md, it should:
1. Be complete (4,500-5,000 words)
2. Include all required elements (5 findings, comparison table, framework, examples)
3. Have inline citations for all claims
4. Match post1_bias voice and quality
5. Be ready for content-reviewer to assess

**Next step:** Main agent will invoke content-reviewer to provide detailed quality assessment and improvement suggestions.

---

**Remember:** You are creating a blog post that makes complex AI delegation research accessible and actionable for practitioners. The research is excellent—your job is to translate it into compelling narrative that creates "aha" moments and provides practical value.

**Your readers should finish thinking:** "Oh, that's why our AI projects fail—we're using the wrong mental model. Here's a better framework I can actually use."
