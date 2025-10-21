# AI Presentation Repository Configuration

---

# ⚠️ MANDATORY FIRST CHECK - READ THIS BEFORE ANY ACTION ⚠️

## 🛑 STOP: Is This Major Content Work?

**Before doing ANYTHING, check if the user request matches ANY of these patterns:**

### 🚨 **TRIGGER PATTERNS → MUST INVOKE content-director**

| User Says | Pattern Match | Action |
|-----------|---------------|--------|
| "create a post/blog/article" | ✅ Blog post creation | 🛑 INVOKE content-director |
| "write a paper/document" | ✅ Paper creation | 🛑 INVOKE content-director |
| "create a slide/presentation" | ✅ Presentation creation | 🛑 INVOKE content-director |
| "create a plan for X" | ✅ Planning major content | 🛑 INVOKE content-director |
| "design/outline/structure X" | ✅ Planning major content | 🛑 INVOKE content-director |
| "research and write X" | ✅ Research + content | 🛑 INVOKE research-coordinator |
| "improve/rewrite/revise X" (major) | ✅ Major revision | 🛑 INVOKE content-director |

### ✅ **OK TO DO DIRECTLY**

| User Says | Pattern Match | Action |
|-----------|---------------|--------|
| "fix typo in X" | ✅ Minor edit | ✅ Use Edit tool directly |
| "change 'foo' to 'bar'" | ✅ Small correction | ✅ Use Edit tool directly |
| "read/analyze/explain X" | ✅ Read-only | ✅ Use Read/Grep/analysis directly |
| "search for X" | ✅ Search task | ✅ Use Glob/Grep directly |

### 🔥 **CRITICAL KEYWORDS THAT DEMAND AGENT INVOCATION**

```
create | write | design | plan | outline | structure | compose | draft | develop
```

**If user request contains ANY of these + content type (post/blog/paper/slide), you MUST invoke content-director.**

---

## Project Overview
This repository contains materials for the presentation **"Парадокс Умного Незнакомца: Как ИИ Понимает, Думает и Отвечает"** - a comprehensive exploration of Large Language Model mechanics designed for an intellectually curious Russian-speaking audience with basic AI knowledge.

## Repository Structure
```
presentation/
├── 1/                 # Opening slide materials
├── slides/            # Individual slide files with speaker notes
├── work_breakdown.md  # Complete task structure for all slides
├── overview.md        # Presentation description and structure
├── persona.md         # Dr. Elena Cognitive presenter guidelines
└── assets/           # Visual materials and illustrations

research/
├── index.md          # Annotated research guide
├── 3_2_errors/       # Prompting errors and cognitive biases
├── 4_1_interpret/    # AI interpretability breakthroughs
├── 5_1_cognitive/    # Cognitive perception studies
├── background/       # Foundational materials
└── extensions/       # Advanced topics for Q&A

tasks/
├── init/            # Initial planning materials
└── development/     # Development notes and iterations
```

## Presentation Format & Approach

### Core Identity
- **Title**: "Парадокс Умного Незнакомца: Как ИИ Понимает, Думает и Отвечает"
- **Target Audience**: Russian meetup community - tech-savvy professionals who appreciate clever humor and practical insights
- **Duration**: 45-60 minutes including Q&A
- **Style**: TED-talk meets Russian tech meetup - professional yet warm, with strategic humor
- **Language**: Russian with occasional English tech terms where natural
- **Framework**: Three-phase journey (Encoding → Thinking → Generation)

### Key Differentiators
- **Not selling AI** - revealing paradoxes and creating "aha" moments
- **Not explaining basics** - diving into surprising contradictions
- **Not drowning in jargon** - using cognitive parallels and real examples
- **Not boring** - strategic humor and memorable metaphors

## Content Excellence Standards

### Research Integration Requirements
- **AI-focused content first** - technical details about tokenization, layers, generation mechanisms
- **Transform academic insights** into accessible stories with concrete examples
- **Cognitive science emphasis** - human-AI parallels using verified research (CogniFit, IHB RAN, cognitive studies)
- **Cite specific studies** when building credibility (Anderson cognitive science, Anthropic interpretability, Vaswani attention mechanisms)
- **Focus on understanding mechanisms** - each AI concept explained through cognitive analogies

### Examples Philosophy - COGNITIVE FOCUS
- **Human thinking analogies** - reading comprehension, selective attention, multi-layered understanding
- **Verified cognitive science only** - no invented psychological claims, all research sourced
- **Current AI developments** - 2024-2025 breakthroughs in attention mechanisms and interpretability
- **Practical understanding** - every analogy demonstrates how AI mechanisms work like human cognition

### Speech Optimization for Russian Meetup Audience

#### Opening Formula
```
1. Warm greeting with light self-irony
2. Relatable tech frustration story
3. Promise of practical understanding
4. "Let's figure this out together" vibe
```

#### Humor Guidelines
- **Timing**: One light joke per major section (not forced)
- **Style**: Observational humor about AI quirks
- **Topics**: Shared tech experiences, AI "personality" quirks
- **Avoid**: Overused memes, forced wordplay, excessive jokes

#### Metaphor Strategy
- **Primary**: AI as "умный незнакомец" (smart stranger) - consistent throughout
- **Supporting**: Jazz improvisation, factory/конвейер, танец (dance)
- **Cultural**: References familiar to Russian tech community
- **Balance**: Enough to clarify, not so many to confuse

### NLP Optimization for Russian Tech Audience

#### Language Patterns
```
Engagement Triggers:
- "Все мы знаем, что..." (shared experience)
- "А теперь самое интересное..." (attention spike)
- "Представьте себе..." (visualization)
- "Знакомо?" (recognition moments)

Transition Phrases:
- "Но есть нюанс..." (plot twist)
- "И вот тут начинается магия..." (excitement building)
- "Окей, а что дальше?" (maintaining flow)
- "Собственно, к чему я это..." (connecting to practical value)
```

#### Cognitive Anchors
- **Repetition with variation**: Key concepts in slightly different words
- **Rule of three**: Three examples, three paradoxes, three takeaways
- **Callback references**: Return to opening story in conclusion
- **Memory hooks**: Vivid images tied to abstract concepts

## Three-Act Presentation Structure

### Act I: Hook & Framework (10-12 minutes)
- Opening paradox to create cognitive dissonance
- Three-phase framework introduction (Encoding → Thinking → Generation)
- Promise of practical value

### Act II: Deep Dive (25-30 minutes)
#### Phase 1: Encoding - "How AI Reads the World"
- Tokenization as "breaking text into AI alphabet"
- Attention mechanisms as "selective focus"
- Multimodality as "unified sensory processing"

#### Phase 2: Thinking - "AI's Mental Processes"
- Layers of understanding building complexity
- Pattern recognition vs logical reasoning
- Memory and context limitations

#### Phase 3: Generation - "How AI Speaks"
- Word-by-word prediction process
- Creativity vs recombination debate
- Quality control and hallucinations

### Act III: Practical Application (8-10 minutes)
- Real-world usage strategies
- Common pitfalls and solutions
- Future implications

### Q&A Buffer (10-15 minutes)
- Anticipated questions preparation
- Deep dive topics from /research/extensions/

## Visual Design Philosophy

### Slide Economy Principles - STREAMLINED APPROACH
- **Maximum efficiency** - prefer fewer, dense slides over many simple ones
- **2-3 minute minimum per slide** with dynamic content reveal
- **Progressive disclosure** - build complex concepts through click sequences
- **Practical integration** - every visual element connects to actionable advice

### Attention Management
```
70% - Speaker focus (eye contact, gestures, movement)
20% - Slide support (visual reinforcement)
10% - Audience interaction (questions, reactions)
```

### Color Psychology for Tech Audience
```css
--capability: #00a86b;    /* Teal green - positive but not cliché */
--limitation: #ff6b6b;    /* Soft red - concern without alarm */
--neutral: #4a5568;       /* Charcoal - professional depth */
--accent: #667eea;        /* Purple-blue - innovation */
```

## Quality Metrics

### Engagement Indicators
- **Laughs**: 3-5 genuine moments (not forced)
- **"Aha" moments**: 5-7 recognition points
- **Questions**: Active Q&A showing understanding
- **Body language**: Leaning forward, nodding

### Content Balance
- **60% Insights** - new understanding
- **25% Examples** - concrete applications
- **10% Humor** - tension release
- **5% Technical** - credibility anchors

## Implementation Guidelines

### Pre-Presentation Preparation
- [ ] Review /research/ materials for fresh insights
- [ ] Localize examples to venue/audience
- [ ] Prepare 3 versions: rushed (35min), standard (45min), extended (60min)
- [ ] Test all technical metaphors with non-technical person

### During Presentation
- [ ] Read the room - adjust humor/depth accordingly
- [ ] Use "parking lot" for deep technical questions
- [ ] Maintain energy through strategic movement
- [ ] Build rapport through shared experiences

### Post-Presentation
- [ ] Capture unexpected questions for research
- [ ] Note which examples resonated most
- [ ] Update materials based on audience feedback

---

## 🚨 CRITICAL: Main Agent Content Creation Protocol

### ⚠️ PRE-ACTION CHECKPOINT (MANDATORY)

**❌ FAILURE EXAMPLE - What NOT to Do:**

```
User: "create preliminary plan of post, research plan..."
Main Agent: *Creates todos, reads files, starts mkdir, plans to write directly*
❌ WRONG - This is major content creation (blog post planning)
```

**✅ CORRECT APPROACH:**

```
User: "create preliminary plan of post, research plan..."
Main Agent: "This matches 'create a plan' pattern → Major content creation
             I must invoke content-director first."
Main Agent: *Uses Task tool with content-director subagent*
✅ CORRECT - Director plans, then main agent executes
```

---

**BEFORE ANY Write/Edit tool use on content:**

```
Q1: Major content creation (new slides, papers, blog posts, analysis)?
    YES → 🛑 INVOKE content-director for planning
    NO  → Continue to Q2

Q2: Small improvement (typo fix, minor clarification, formatting)?
    YES → ✅ OK to edit directly
    NO  → Continue to Q3

Q3: Research task requiring multi-source investigation?
    YES → 🛑 INVOKE research-coordinator OR research-intelligence-agent
    NO  → Continue to Q4

Q4: Technical config file (.gitignore, package.json, metadata)?
    YES → ✅ OK to edit directly
    NO  → Continue to Q5

Q5: Read-only analysis (no file changes)?
    YES → ✅ OK to do directly
    NO  → 🛑 INVOKE content-director for planning
```

### Content Types Requiring Director Planning

**Must use content-director for:**
- **Presentation materials**: New slides, speech notes, extended analysis
- **Papers**: Research papers, technical documents, academic writing
- **Blog posts**: Articles, essays, structured blog content
- **Major revisions**: Restructuring, rewriting, significant content changes
- **Multi-file updates**: Changes affecting multiple files

**Can edit directly (small improvements):**
- Typo corrections
- Minor clarifications (1-2 sentences)
- Formatting fixes
- Broken link repairs
- Small factual corrections with clear source

### Absolute Rules

**❌ YOU (Main Agent) CANNOT:**
- Write new slides, papers, or blog posts directly
- Create major content without director planning
- Make significant revisions without review cycle
- Skip write-review-improve for quality-critical content

**✅ YOU CAN:**
- Read files, search (Glob/Grep)
- Analyze and answer questions
- Create task directories: `mkdir -p tasks/task-name/`
- Write planning docs in `/tasks/` ONLY
- Edit technical configs
- Make small improvements (see above)
- Coordinate research tasks

**NO EXCEPTIONS. QUALITY REQUIRES PROCESS.**

---

## Agent Orchestration Protocol

### Agent Roles & Responsibilities

```
Main Agent (YOU)
  └─ Gatekeeper: Distinguishes major vs minor work
  └─ Invoker: Launches director/coordinator for complex tasks
  └─ Executor: Runs specialists per plan
  └─ Reporter: Relays results to user
  └─ Direct Editor: Handles small improvements only

Content Director (content-director)
  └─ Planner: Creates detailed execution plans for all content
  └─ Coordinator: Writes agent-instructions files
  └─ Context Analyzer: Reviews existing materials
  └─ Workflow Designer: Plans write-review-improve cycles
  └─ NEVER: Creates content or executes plan

Content Writer (content-writer)
  └─ Presentation Specialist: Slides, speech notes (Dr. Elena voice)
  └─ Paper Specialist: Research papers, technical docs
  └─ Blog Specialist: Articles, essays, blog posts
  └─ Executor: Follows director's detailed instructions
  └─ Voice Maintainer: Adapts to content type requirements

Content Reviewer (content-reviewer)
  └─ Quality Critic: Detailed assessment per content type
  └─ Standards Verifier: Checks against project requirements
  └─ Improvement Recommender: Specific, actionable suggestions
  └─ Source Validator: Verifies citations and claims

Research Coordinator (research-coordinator)
  └─ Research Planner: Orchestrates multi-source research
  └─ Source Verifier: Ensures academic/industry credibility
  └─ Synthesis Director: Coordinates research-intelligence-agent
  └─ Memory Manager: Stores results in /tasks/ subfolders
```

### Mandatory Task Flow

```
User Request (major content creation/revision)
    ↓
Main Agent: "I'll get plan from Content Director, then execute it."
    ↓
Main Agent invokes director:
  Task tool: subagent_type: content-director
  prompt: "Create execution plan for: [task description]
          Content type: [presentation/paper/blog]
          Scope: [new creation/major revision/improvement]"
    ↓
Director (PLANNING ONLY):
  - Reads context (presentation/, papers/, research/)
  - Creates task structure in /tasks/task-name/
  - Writes plan.md + agent-instructions-*.md
  - Returns plan
  - STOPS (does NOT execute)
    ↓
Main Agent (EXECUTION):
  - Reads tasks/[name]/plan.md
  - For each step:
    • Reads agent-instructions-stepN.md
    • Invokes specialist (content-writer/reviewer/research-coordinator)
    • Waits for completion
    • Stores intermediate results in /tasks/task-name/
    • Marks todo completed
  - Verifies results
  - Reports to user
```

**CRITICAL: Director PLANS. Main agent EXECUTES. Specialists CREATE.**

### Main Agent Verification: Scope Calibration Check

**When content-director returns a plan, main agent must verify:**

1. **Check for scope calibration section:**
   ```markdown
   Does plan.md contain "## Scope Calibration Check ✅" section?
   ```

2. **If missing:**
   - Don't proceed with execution
   - Ask director: "Please check /.claude/reference/content-scoping-guide.md and add scope calibration to plan"
   - Director re-submits plan with scope check

3. **If present, review assessment:**
   - **Ratio 0.5-1.5 (Calibrated):** ✅ Proceed with confidence
   - **Ratio >2.5 (Over-scope):** ⚠️ Review justification
     - Is justification strong and specific?
     - Are mitigation strategies clear?
     - If justification weak: Request director to revise scope OR strengthen justification

4. **Proceed with execution** once scope verified

**Purpose:** Prevent scope creep before time is invested in execution.

### Research Workflow

```
Research Request (multi-source investigation)
    ↓
Option A: Direct research-intelligence-agent
  - For straightforward research tasks
  - Single focused research question
  - Main agent invokes directly
    ↓
Option B: Through research-coordinator
  - For complex multi-phase research
  - Research requiring synthesis across phases
  - Coordinator directs research-intelligence-agent
  - Results stored in /tasks/research-name/
```

---

## Command Guidelines for AI Assistant

### Critical Development Principles - UPDATED APPROACH

When developing ANY content (presentation, papers, blogs):

1. **AI Content First Philosophy**:
   - **Technical depth** - explain tokenization, layer specialization, generation mechanics
   - **Remove methodology discussions** - focus on AI mechanisms, not pedagogical theory
   - **Business applications** - every technical concept linked to practical use cases
   - **Prompt engineering integration** - actionable advice under each AI phase

2. **Streamlined Structure Mandate**:
   - **Prefer fewer, dense slides** - 2 slides better than 6 simple ones
   - **Maximum efficiency** - eliminate redundant explanations
   - **Progressive building** - complex concepts through sequential reveals
   - **Immediate application** - theory → practice in same slide

3. **Visual-Speech Tight Integration**:
   - **Every click mapped** - precise timing for content reveals
   - **Practical advice placement** - prompt tips directly under AI phases
   - **Color coding consistency** - same colors for same concepts across tasks
   - **70/30 speaker focus** maintained

4. **Russian Tech Audience Precision**:
   - **Cognitive science focus** - human-AI parallel understanding as engagement anchor
   - **Verified examples only** - Яндекс, Сбер translation/AI systems with real technical specifications
   - **Natural code-switching** - technical terms in English, concepts in Russian
   - **Practical orientation** - every cognitive insight applicable to AI interaction immediately

5. **Source Verification Standards**:
   - **Academic credibility** - Anderson, Epley, Anthropic studies referenced
   - **Business data verification** - all statistics cross-checked
   - **Russian context accuracy** - local examples verified for realism
   - **No fabricated numbers** - source every claim

6. **Presentation Flow Evolution**:
   - **Paradox → Problem → Framework** - streamlined 3-act structure
   - **Known → Unknown** - familiar business processes → AI parallels
   - **Theory → Application** - immediate practical value in every section
   - **Continuous refinement** - eliminate anything not directly useful

### Quality Control Checklist

Before completing any task:

- [ ] **Fact-check all statistics** - cross-reference with /research/ sources
- [ ] **Review for duplications** - ensure no repetition with previous tasks
- [ ] **Verify slide-speech sync** - every visual element has speech reference
- [ ] **Check source citations** - all claims properly attributed
- [ ] **Test cognitive relevance** - analogies resonate with Russian tech audience understanding
- [ ] **Maintain visual consistency** - colors, fonts, style aligned with previous tasks

### Task Completion Standards - STREAMLINED APPROACH

Each deliverable must include:

1. **Extended Analysis** (AI-focused, 2-3 pages):
   - Technical AI mechanisms with cognitive science parallels
   - Verified statistics with proper source URLs from academic and industry sources
   - Cognitive analogies with human thinking processes
   - Clear understanding value proposition linking AI and human cognition

2. **Speech Notes** (efficiency-focused timing):
   - Precise slide structure with [СЛАЙД] markers
   - Click-by-click content reveals
   - Cognitive insights integration instead of prompt engineering advice
   - Dr. Elena Cognitive persona consistency

3. **Slide Design** (maximum efficiency):
   - Dense, information-rich layouts
   - Progressive disclosure systems
   - Cognitive analogies visually integrated with technical concepts
   - Color consistency across all tasks

4. **Sources Reference** (verification priority):
   - Academic sources for credibility (cognitive science + AI research)
   - Industry data with verification (AI systems specifications)
   - Russian context accuracy check
   - Cross-reference to speech content with proper citations

## Success Criteria

The presentation succeeds when:
- Complex AI concepts feel intuitively graspable
- Audience leaves with 3-5 actionable insights
- Technical accuracy maintained without drowning in details
- Russian tech community feels respected, not patronized
- Follow-up discussions happen organically
- Attendees share key insights with colleagues

## Cultural Adaptation Notes

### For Russian Tech Meetups
- **Opening**: Slightly self-deprecating, establishing peer relationship
- **Examples**: Mix of global tech giants and Russian companies naturally
- **Humor**: Dry, observational, never trying too hard
- **Closing**: Practical, forward-looking, community-building

### Language Nuances
- Use "мы" (we) to create inclusive atmosphere
- English terms where natural (API, token, prompt)
- Russian for emotional/conceptual points
- Code-switching as rapport building

---

## Development Log & Lessons Learned

### Task 6 Refinement Experience (January 2025)

**Initial Challenge**: User provided 12 specific improvement requirements for attention mechanisms content, requiring major structural and content overhaul.

**Key Requirements Addressed**:

1. **Source Verification Priority**: All facts must be backed by verified academic or industry sources with in-text citations
2. **Cognitive Science Focus**: Replace artificial business examples with human thinking analogies (reading, attention, multilayered understanding)
3. **Structural Efficiency**: Reduce from 5 slides to 3 slides with combined concepts
4. **Duplicate Prevention**: Avoid repeating "64 heads attention" from Task 4, maintain unique positioning
5. **Content Integration**: Combine attention matrix and multi-head concepts into unified explanation
6. **Business Metric Removal**: Eliminate McKinsey ROI and experimental Circuit Tracing content
7. **Visual Integration**: Create comprehensive illustration showing attention + layers working together

**Critical Success Patterns**:

- **Facts First**: Every claim must be sourceable - no invented statistics or examples
- **Cognitive Parallels**: Human thinking analogies resonate better than corporate case studies
- **Streamlined Structure**: Fewer, denser slides with progressive revelation work better
- **Academic + Industry Balance**: Combine peer-reviewed research with real AI system specifications
- **Visual Storytelling**: Complex diagrams that show integration between concepts

**Updated Methodology**:

- Start with academic research verification before writing content
- Use cognitive science as primary metaphor system rather than business applications
- Create unified visualizations that combine multiple technical concepts
- Eliminate redundancy with previous tasks through careful cross-referencing
- Focus on "understanding how it works" rather than "how to use it practically"

**Quality Control Checklist Enhanced**:

- [ ] All facts cited with working URLs to authoritative sources
- [ ] No duplication with Tasks 1-5 content or examples
- [ ] Cognitive analogies tested for accuracy against actual cognitive science
- [ ] Technical accuracy verified against original research papers
- [ ] Visual elements directly support speech content with clear mapping

### Presentation Philosophy Evolution

**From Business ROI to Cognitive Understanding**: The audience values understanding mechanisms over immediate practical application. Technical curiosity drives engagement more than productivity metrics.

**Streamlined Efficiency**: Russian tech audiences prefer dense, information-rich content over multiple simple explanations. Trust their ability to follow complex technical analogies.

**Source Credibility**: Academic backing creates trust foundation, especially when explaining AI mechanisms that seem almost magical.

---

## 🔥 Major Changes Protocol: Roast-Before-Implement

**Before implementing changes affecting core project systems, follow graduated review protocol.**

### Change Classification

#### Small Changes (<2 hours, low risk)
**Examples:**
- Fix typo in agent file
- Clarify existing protocol
- Add example to documentation
- Update README formatting

**Protocol:**
- ✅ Implement directly
- ✅ Document in git commit message
- ❌ No roast required

---

#### Medium Changes (2-8 hours, medium risk)
**Examples:**
- Add new protocol section
- Modify agent responsibilities
- Create new template
- Update workflow guidance

**Protocol:**

1. **Create proposal** in `tasks/[change-name]/proposal.md`:
   ```markdown
   # Proposal: [Change Name]

   ## Problem
   [What's wrong? Evidence of the problem]

   ## Proposed Solution
   [What will change? How it addresses the problem]

   ## Implementation Plan
   [Step-by-step: what files, what changes, time estimate]

   ## Risks
   [What could go wrong? Breaking changes?]
   ```

2. **Self-review checklist:**
   - [ ] Clear evidence of problem? (not speculation)
   - [ ] Solution addresses root cause? (not symptom)
   - [ ] Acceptable risk/benefit ratio?
   - [ ] Could this break anything?
   - [ ] Are we solving right problem?

3. **Implement if checklist passes**

4. **Document** in `.claude/reflections/improvements/implemented.md`

**Optional:** Request roast if uncertainty high

---

#### Large Changes (>8 hours, high risk)
**Examples:**
- Major architectural changes
- New agent system
- Workflow overhaul
- Process framework changes

**Protocol: MANDATORY ROAST**

1. **Create detailed proposal** in `tasks/[change-name]/`:
   - `proposal.md` (problem, solution, implementation, risks)
   - `rationale.md` (evidence, alternatives considered)
   - `implementation-plan.md` (step-by-step with time estimates)
   - `risk-assessment.md` (worst-case scenarios, mitigation)

2. **Invoke content-reviewer for brutal assessment:**
   ```
   description: "Critical review: [change name]"
   prompt: |
     ROASTING MODE: Maximum brutality. Find every flaw.

     Review: tasks/[change-name]/proposal.md

     Critical Questions:
     1. Will this ACTUALLY solve the stated problem?
     2. What could go wrong? (worst-case scenarios)
     3. Are we solving the RIGHT problem?
     4. What are we MISSING?
     5. Is this premature optimization?
     6. What's the EVIDENCE supporting this?
     7. What ALTERNATIVES should we consider?
     8. Will this be followed under pressure? (if protocol)
     9. Time estimate realistic? (check planning fallacy)
     10. What's the simplest version that could work?

     Be skeptical. Find flaws. Suggest alternatives.

     Rate: [Critical Issues] / [High-Impact Issues] / [Polish Issues]
     Recommend: APPROVE / REVISE / REJECT / ALTERNATIVES
   ```

3. **Implement ONLY if review shows:**
   - ✅ Clear evidence of problem
   - ✅ Solution addresses root cause
   - ✅ Acceptable risk/benefit
   - ✅ No better alternatives
   - ✅ Critical issues resolved

4. **If review finds critical issues:**
   - Revise proposal addressing all critical points
   - Re-roast (can be lighter review focusing on changes)
   - Document iteration in proposal

5. **Document decision** in `.claude/reflections/improvements/`:
   - Original proposal files
   - Roast review file
   - Revisions made (if any)
   - Final implementation notes
   - Measurement plan (check after 3-5 uses)

---

### Accountability & Measurement

**Track implementation compliance:**
- Small changes: No tracking needed (move fast)
- Medium changes: Log in improvements/ with self-review results
- Large changes: Full documentation required (all files)

**Measure outcomes quarterly:**
- Changes with roast: Success rate, issues encountered, time saved/wasted
- Changes without roast: Success rate, issues encountered
- Compare: Is roast worth the overhead?

**Adjust thresholds:**
- If roasts find no issues consistently: Raise threshold (fewer roasts)
- If changes without roast fail frequently: Lower threshold (more roasts)
- Base on data, not dogma

---

### Philosophy

**Not about perfection, about risk management:**
- Small changes: Low risk → move fast
- Medium changes: Medium risk → self-check
- Large changes: High risk → external validation

**ROI Evidence:**
- Roast cycle: 9 hours invested, 16-20 hours waste avoided = 78% efficiency gain
- Self-review: <30 min, catches obvious flaws
- No review: Fast but risky (some failures inevitable)

**Remember:** Process exists to prevent wasted effort, not to slow down good work.

---

## Agent System Reference

### Available Agents

**Located in:** `.claude/agents/`

1. **content-director** (`content-director.md`)
   - Role: Strategic planner for all content creation
   - Use: Plans presentation, papers, blogs with write-review-improve cycles
   - Returns: Detailed execution plans in `/tasks/`

2. **content-writer** (`content-writer.md`)
   - Role: Multi-format content specialist
   - Voices: Dr. Elena Cognitive (presentation), Academic (papers), Accessible (blogs)
   - Use: Creates content following director's plans

3. **content-reviewer** (`content-reviewer.md`)
   - Role: Quality assurance specialist
   - Use: Reviews content against project standards
   - Returns: Detailed assessments with actionable improvements

4. **research-coordinator** (`research-coordinator.md`)
   - Role: Research orchestration specialist
   - Use: Coordinates complex multi-phase research
   - Delegates: research-intelligence-agent for actual research

### Quick Usage Examples

#### Create New Presentation Slide

```
User: "Create a slide explaining tokenization"

Main Agent:
1. Recognizes: Major content creation
2. Invokes: content-director
   prompt: "Create execution plan for tokenization slide
           Content type: presentation"
3. Director returns: plan in tasks/tokenization-slide/
4. Main Agent executes plan:
   - Invokes content-writer (creates content)
   - Invokes content-reviewer (reviews quality)
   - Invokes content-writer again (improves based on review)
5. Reports: "Slide created at [path]"
```

#### Write Research Paper Section

```
User: "Write the introduction for my encoding paper"

Main Agent:
1. Recognizes: Major content creation
2. Invokes: content-director
   prompt: "Create execution plan for paper introduction
           Content type: paper"
3. Director returns: plan in tasks/paper-intro/
4. Main Agent executes plan:
   - Optional: research-coordinator (if new research needed)
   - Invokes content-writer (creates intro)
   - Invokes content-reviewer (reviews quality)
   - Invokes content-writer (revises)
5. Reports: "Introduction created at [path]"
```

#### Fix Typo (Direct Edit)

```
User: "Fix typo in slide 3"

Main Agent:
1. Recognizes: Small improvement
2. Uses Edit tool directly
3. Reports: "Typo fixed"

NO agent invocation needed for trivial changes.
```

### When to Use Each Agent

**content-director:**
- Always for new content creation
- Major revisions/rewrites
- Multi-file updates
- Anytime write-review-improve cycle needed

**content-writer:**
- Never invoke directly (main agent does)
- Always via content-director's plan
- Creates presentation/paper/blog content

**content-reviewer:**
- Never invoke directly (main agent does)
- Always via content-director's plan
- Reviews quality before finalization

**research-coordinator:**
- Complex multi-phase research
- Research needing synthesis
- Source verification critical
- Alternative: invoke research-intelligence-agent directly for simple research

---

*Remember: This presentation is a conversation with peers, not a lecture. The goal is shared understanding, not demonstrated expertise. Let the paradoxes do the heavy lifting while you guide the journey with warmth and wit.*