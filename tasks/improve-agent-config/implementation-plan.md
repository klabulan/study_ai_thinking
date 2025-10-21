# Agent Configuration: Implementation Plan

**Focus:** Core improvements with specific changes to make

---

## Part 1: Core Improvements (Priority)

### 1.1 Fix Tool Assignments

**File: `.claude/agents/content-director.md`**
**Line 6:**
```yaml
# CHANGE FROM:
tools: Read, Bash, Glob, Grep, TodoWrite, Write, Edit

# CHANGE TO:
tools: Read, Glob, Grep, Write
```

**Rationale:** Director plans, doesn't execute. Doesn't need Edit/Bash/TodoWrite.

**Add after line 50 (after "✅ ALLOWED:"):**
```markdown
**❌ FORBIDDEN (by design):**
- Edit - You plan, don't modify project files
- Bash - Main agent creates directories
- TodoWrite - Main agent manages todos
- Task - You create plans, main agent invokes agents
```

---

**File: `.claude/agents/research-coordinator.md`**
**Line 6:**
```yaml
# CHANGE FROM:
tools: Read, Write, Bash, Task, Glob, Grep, TodoWrite

# CHANGE TO:
tools: Read, Write, Task, Glob, Grep
```

**Rationale:** Coordinator orchestrates research, doesn't need Bash or todo management.

---

### 1.2 Reduce Redundancy in CLAUDE.md

**Current:** 672 lines
**Target:** ~550 lines (remove ~120 lines)

#### Change 1: Simplify Agent Orchestration Section

**Location:** Lines 260-332 (Agent Orchestration Protocol)

**BEFORE (72 lines):**
```markdown
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
```

**AFTER (35 lines):**
```markdown
### Mandatory Task Flow

**Simple workflow:**
1. Main agent invokes content-director → creates plan in /tasks/[name]/
2. Main agent reads plan → executes step by step
3. Each step invokes specialist (writer/reviewer/coordinator)
4. Main agent verifies → reports to user

**Key rules:**
- Director: PLANS only (creates plan.md + agent-instructions-*.md)
- Main agent: EXECUTES plan (invokes specialists, tracks progress)
- Specialists: CREATE content (write/review/research)

**File structure:**
```
tasks/[task-name]/
├── plan.md                      # From director
├── agent-instructions-*.md      # From director
└── [outputs].md                 # From specialists
```

**See `.claude/agents/` files for detailed agent-specific workflows.**
```

**Lines saved:** ~37 lines

---

#### Change 2: Simplify Content Type Definitions

**Location:** Lines 95-104 (Project Context Understanding)

**BEFORE:**
```markdown
### Content Types You Plan For

1. **Presentation Materials**:
   - Location: `/presentation/`
   - Voice: Dr. Elena Cognitive (see `/presentation/persona.md`)
   - Requirements: Cognitive science focus, Russian tech audience
   - Outputs: Slides, speech notes, extended analysis

2. **Research Papers**:
   - Location: `/papers/`
   - Voice: Academic, technically rigorous
   - Requirements: Source verification, proper citations
   - Outputs: Papers, technical documents

3. **Blog Posts**:
   - Location: `/papers/blog*/`
   - Voice: Accessible technical writing
   - Requirements: Engaging, practical insights
   - Outputs: Articles, essays
```

**AFTER:**
```markdown
### Content Types

- **Presentation** (`/presentation/`) - Dr. Elena voice (see persona.md), cognitive focus
- **Papers** (`/papers/`) - Academic voice, rigorous citations
- **Blogs** (`/papers/blog*/`) - Accessible technical, practical insights

See agent files for detailed requirements per content type.
```

**Lines saved:** ~15 lines

---

#### Change 3: Consolidate Quality Standards

**Location:** Lines 395-404 (Quality Control Checklist)

**Keep this section** but add reference to agent-specific details:

**Add after line 404:**
```markdown
For content-type specific quality criteria, see:
- Presentation: `.claude/agents/content-writer.md` (Dr. Elena voice requirements)
- Papers: `.claude/agents/content-reviewer.md` (academic standards)
- Blogs: `.claude/agents/content-writer.md` (accessibility criteria)
```

---

#### Change 4: Shorten Development Log

**Location:** Lines 459-506 (Development Log & Lessons Learned)

**Current:** 48 lines of Task 6 refinement experience

**Keep:** Key lessons (10 lines)
**Remove:** Detailed narrative (38 lines)

**AFTER:**
```markdown
## Development Lessons

**Key learnings from project evolution:**
- Facts first: Every claim needs verifiable sources (no invented statistics)
- Cognitive parallels: Human thinking analogies > business case studies
- Streamlined structure: Dense, information-rich content preferred by audience
- Source credibility: Academic backing creates trust foundation
- Eliminate redundancy: Cross-reference previous tasks to avoid duplication

**Detailed development history:** See `.claude/reflections/improvements/implemented.md` (when created)
```

**Lines saved:** ~38 lines

---

**Total CLAUDE.md reduction:** ~90 lines → **672 to ~580 lines**

---

### 1.3 Reduce Redundancy in Agent Files

#### content-director.md

**Current:** 548 lines
**Target:** ~440 lines (remove ~100 lines)

**Change 1: Shorten orchestration explanation**

**Location:** Lines 15-33 (CRITICAL ARCHITECTURE)

**BEFORE (18 lines):**
```markdown
**CRITICAL ARCHITECTURE:**
```
User → Main Agent
        ↓
  Main Agent → YOU (create plan)
        ↓
  YOU → Main Agent (return plan)
        ↓
  Main Agent executes plan:
    - Calls content-writer
    - Calls content-reviewer
    - Calls research-coordinator (if needed)
    - Creates deliverables
    - Verifies results
    - Reports to user
```
```

**AFTER (5 lines):**
```markdown
**YOUR ROLE:**
Main agent invokes you for planning → you create plan → main agent executes.
See CLAUDE.md "Agent Orchestration Protocol" for complete workflow.
```

**Lines saved:** ~13 lines

---

**Change 2: Reduce content type descriptions**

**Location:** Lines 73-103 (Content Types You Plan For)

**BEFORE:** 30 lines with detailed descriptions

**AFTER (10 lines):**
```markdown
### Content Types You Plan For

1. **Presentation** - Dr. Elena voice (see `/presentation/persona.md`), cognitive focus
2. **Research Papers** - Academic voice, rigorous citations
3. **Blog Posts** - Accessible technical, practical insights

See CLAUDE.md for project principles and detailed requirements.
```

**Lines saved:** ~20 lines

---

**Change 3: Consolidate examples**

**Location:** Lines 446-526 (Example Planning Scenarios)

**Current:** 2 detailed examples (80 lines)

**Keep:** Example 1 (presentation slide) - most common
**Shorten:** Remove verbose workflow steps, keep structure

**AFTER (40 lines):**
```markdown
## Example: New Presentation Slide

**User:** "Create slide explaining attention mechanisms"

**Your workflow:**
1. Read: /presentation/persona.md, /research/4_1_interpret/
2. Create: mkdir -p tasks/attention-mechanisms-slide/
3. Write plan.md with steps:
   - Research review
   - Create slide (content-writer)
   - Create speech notes (content-writer)
   - Review (content-reviewer)
   - Revise if needed (content-writer)
4. Write agent-instructions-*.md for each step
5. Return: "Plan ready at tasks/attention-mechanisms-slide/plan.md"

**Key points:**
- Dr. Elena voice mandatory
- Cognitive parallels required
- Source verification critical
- Include speech timing
```

**Lines saved:** ~40 lines

---

**Total content-director.md reduction:** ~70 lines → **548 to ~475 lines**

---

#### content-writer.md

**Current:** 617 lines
**Target:** ~490 lines (remove ~125 lines)

**Change 1: Consolidate voice descriptions**

**Location:** Lines 50-104 (Content Type: Presentation Materials)

**Current:** Detailed Dr. Elena description (54 lines)

**AFTER (20 lines):**
```markdown
## CONTENT TYPE: PRESENTATION MATERIALS

### Voice: Dr. Elena Cognitive

**Read first:** `/presentation/persona.md` for complete voice requirements.

**Key characteristics:**
- Technically confident, cognitively focused
- Human-AI parallels, not business ROI
- Verified examples only (no invented stats)
- Russian tech audience (peer-level, code-switching natural)

**Deliverables:**
- Extended Analysis (2-3 pages, cognitive parallels, sourced)
- Speech Notes ([СЛАЙД] markers, [КЛИК] reveals, timing)
- Slide Design Specs (progressive disclosure, color consistency)
```

**Lines saved:** ~34 lines

---

**Change 2: Shorten examples**

**Location:** Lines 106-155, 205-233, 275-301

**Current:** 3 detailed examples (106 lines total)

**AFTER:** Keep structure, remove verbose explanations (60 lines total)

**Lines saved:** ~46 lines

---

**Change 3: Simplify quality checklist**

**Location:** Lines 419-453 (Quality Assurance Checklist)

**BEFORE:** 35 lines of detailed checks

**AFTER (15 lines):**
```markdown
## QUALITY ASSURANCE

Before finalizing:
- [ ] Content type correct, voice appropriate
- [ ] Sources verified (see CLAUDE.md standards)
- [ ] File saved to correct location with metadata
- [ ] For presentations: Dr. Elena voice, [СЛАЙД]/[КЛИК] markers, sources
- [ ] For papers: Academic voice, proper citations
- [ ] For blogs: Accessible style, practical value

See CLAUDE.md "Quality Control Checklist" for detailed standards.
```

**Lines saved:** ~20 lines

---

**Total content-writer.md reduction:** ~100 lines → **617 to ~515 lines**

---

#### content-reviewer.md

**Current:** 744 lines
**Target:** ~610 lines (remove ~130 lines)

**Change 1: Consolidate review frameworks**

**Location:** Lines 75-250 (Presentation Materials Review)

**Current:** Very detailed framework (175 lines)

**Strategy:** Keep structure, remove verbose explanations

**AFTER (100 lines):**
- Keep quality criteria list (essential)
- Keep output format structure (templates are necessary)
- Remove explanatory paragraphs (redundant with CLAUDE.md)

**Lines saved:** ~75 lines

---

**Change 2: Shorten example workflows**

**Location:** Lines 547-637 (Example Workflows)

**Current:** 2 detailed examples (90 lines)

**AFTER (45 lines):**
- Keep one example showing structure
- Remove verbose step-by-step descriptions

**Lines saved:** ~45 lines

---

**Total content-reviewer.md reduction:** ~120 lines → **744 to ~620 lines**

---

#### research-coordinator.md

**Current:** 560 lines
**Target:** ~450 lines (remove ~110 lines)

**Similar changes:**
- Shorten orchestration explanation (~15 lines)
- Consolidate examples (~50 lines)
- Simplify protocols (~45 lines)

**Total reduction:** ~110 lines → **560 to ~450 lines**

---

### Summary of Part 1 Improvements

**File size reductions:**
- CLAUDE.md: 672 → 580 (14% reduction)
- content-director.md: 548 → 475 (13% reduction)
- content-writer.md: 617 → 515 (17% reduction)
- content-reviewer.md: 744 → 620 (17% reduction)
- research-coordinator.md: 560 → 450 (20% reduction)

**Total:** 3,141 → 2,640 lines (16% reduction = ~500 lines saved)

**Estimated token savings:** 15-20% per agent invocation

---

## Part 2: Simple Reflection System (Secondary)

### 2.1 Minimal Structure

Create only:
```
.claude/reflections/
├── task-reflections.md    # All reflections in one file
└── improvements.md         # Suggestions and implemented changes
```

**No complex directory structure. Just two files.**

---

### 2.2 Add to CLAUDE.md (End of File)

**After line 613 (after final reminder):**

```markdown
---

## 📝 Task Reflection (Post-Task Learning)

### After Completing Major Tasks

Main agent writes brief reflection in `.claude/reflections/task-reflections.md`:

**Format:**
```
## [Date] - [Task Type]
**What worked:** [1-2 sentences]
**What didn't:** [1-2 sentences]
**User feedback:** [If any]
**Suggestion:** [One improvement idea]
---
```

**Purpose:** Learn from real usage. Weekly review for improvement ideas.

**Keep it short** - 3-4 lines per task, not essays.
```

---

### 2.3 Create Initial Files

**File:** `.claude/reflections/task-reflections.md`

```markdown
# Task Reflections

Quick learnings from completed tasks. Format:

## [Date] - [Task Type]
**What worked:** [brief]
**What didn't:** [brief]
**User feedback:** [if any]
**Suggestion:** [one improvement]
---

(Reflections accumulate below)
```

---

**File:** `.claude/reflections/improvements.md`

```markdown
# Improvements Log

## Implemented Changes

### 2025-01-12: Context Reduction
- Fixed tool assignments (removed Edit from content-director)
- Reduced file sizes by ~16% (500 lines total)
- Improved clarity and organization
**Result:** [To be measured]

---

## Suggested Improvements

(From task reflections - prioritize weekly)

---
```

---

## Part 3: Implementation Order

### Step 1: Fix Tool Assignments (15 minutes)
- content-director.md: Remove Edit, Bash, TodoWrite from tools
- research-coordinator.md: Remove Bash, TodoWrite from tools
- Test: Run one task to verify agents still work

---

### Step 2: Reduce CLAUDE.md (45 minutes)
- Simplify agent orchestration section (~37 lines)
- Simplify content type definitions (~15 lines)
- Shorten development log (~38 lines)
- **Total: ~90 lines removed**

---

### Step 3: Reduce Agent Files (90 minutes)
- content-director.md: Remove ~70 lines (orchestration, examples)
- content-writer.md: Remove ~100 lines (voice details, examples, checklist)
- content-reviewer.md: Remove ~120 lines (verbose frameworks, examples)
- research-coordinator.md: Remove ~110 lines (similar patterns)

---

### Step 4: Add Minimal Reflection System (20 minutes)
- Create `.claude/reflections/` folder
- Create task-reflections.md and improvements.md
- Add reflection protocol to end of CLAUDE.md (5 lines)

---

### Step 5: Test & Validate (30 minutes)
- Run 2-3 test tasks (presentation, paper, blog)
- Verify agents work correctly
- Write first reflection
- Adjust if needed

---

**Total time: ~3 hours**

---

## Part 4: Validation Checklist

After implementation, verify:

- [ ] All 4 agent files updated (tool assignments fixed)
- [ ] CLAUDE.md reduced by ~90 lines
- [ ] Agent files reduced by total ~400 lines
- [ ] Reflection system created (2 files)
- [ ] Test task 1 (presentation) completes successfully
- [ ] Test task 2 (paper) completes successfully
- [ ] Test task 3 (blog) completes successfully
- [ ] First reflection written
- [ ] No quality regressions observed

If all checkboxes pass → SUCCESS
If any fail → Rollback specific changes, analyze, retry

---

## Key Differences from Previous Plans

**Removed:**
- Multi-phase approach (just do it all now)
- Baseline measurement (measure after changes)
- Complex file reorganization (keep current structure)
- 70 lines of error handling (add only when needed)
- Complex reflection system (simplified to 2 files)

**Kept:**
- Core improvements (tool assignments, redundancy reduction)
- Realistic 16% reduction target
- Simple learning system (minimal overhead)
- Focus on actual changes, not philosophy

**Added:**
- Specific line numbers and changes to make
- Clear before/after examples
- Step-by-step implementation order
- Time estimates per step

---

## Success Metrics

**Immediate (After implementation):**
- 500 lines removed (16% reduction)
- All test tasks pass
- Agents work correctly

**After 1 week:**
- 5+ reflections written
- 2-3 improvement ideas identified
- User satisfaction maintained or improved

**After 1 month:**
- 2-3 improvements implemented (based on reflections)
- System measurably better
- Continuous improvement loop established

---

**Implementation plan complete. Focus on changes, not philosophy.**
