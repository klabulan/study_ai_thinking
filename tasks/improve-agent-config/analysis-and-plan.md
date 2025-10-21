# Agent Configuration Improvement Plan
**Based on Anthropic's "Effective Context Engineering for AI Agents"**

**Date:** 2025-01-12
**Status:** Analysis Complete - Awaiting User Review

---

## Executive Summary

Analyzed current CLAUDE.md and agent definitions against Anthropic's best practices for context engineering. Found **7 major gaps** requiring attention:

1. **Context Bloat** - Files too long (CLAUDE.md: 650+ lines, agents: 500+ lines each)
2. **Unclear Altitude** - Mixing strategic and tactical guidance
3. **Redundancy** - Repeated information across files
4. **Tool Overlap** - Some agents have unnecessary tools
5. **Weak Error Handling** - Limited guidance on failure scenarios
6. **No Compaction Strategy** - No protocol for long-horizon tasks
7. **Suboptimal Organization** - Not using structured sections effectively

**Recommended Actions:** 11 specific improvements across CLAUDE.md, agent files, and workflow protocols.

---

## Anthropic Best Practices Summary

### Core Principles

1. **Minimal Context**: "Smallest possible set of high-signal tokens" - treat context as finite resource
2. **Right Altitude**: Balance between overly rigid and overly vague instructions
3. **Progressive Disclosure**: Just-in-time context loading, not front-loading everything
4. **Self-Contained Tools**: Clear, robust, unambiguous tool designs
5. **Long-Horizon Techniques**: Compaction, structured notes, sub-agent architectures
6. **Context Rot Awareness**: Accuracy degrades as context length increases

### Structural Recommendations

- Use distinct sections (e.g., `<background_information>`, `<instructions>`)
- Start minimal, add specifics based on testing
- Avoid bloated tool sets with overlapping functionality
- Leverage metadata and file system signals
- Enable incremental exploration over front-loading

---

## Gap Analysis

### 1. Context Bloat (HIGH PRIORITY)

**Current State:**
- CLAUDE.md: **650+ lines** - mixes project overview, quality standards, examples, development log, agent reference
- content-director.md: **549 lines** - extensive examples and workflows
- content-writer.md: **617 lines** - three content types with full examples
- content-reviewer.md: **745 lines** - three review frameworks with templates
- research-coordinator.md: **560 lines** - detailed protocols

**Anthropic Principle Violated:**
> "Strive for the minimal set of information that fully outlines your expected behavior"

**Impact:**
- Context window waste on every invocation
- Decreased accuracy due to "context rot"
- Main agent sees huge prompt every time
- Harder to update and maintain

**Recommendation:**
- **Target lengths**: CLAUDE.md: 300 lines, Agents: 200-250 lines each
- **Strategy**: Extract examples, templates, and detailed workflows to separate reference files

---

### 2. Unclear Altitude (HIGH PRIORITY)

**Current State:**
CLAUDE.md mixes multiple levels:
- Strategic (project goals, philosophy)
- Tactical (step-by-step protocols)
- Operational (exact command syntax)
- Historical (development log)
- Reference (agent descriptions)

**Anthropic Principle Violated:**
> "Find the 'right altitude' between overly rigid and overly vague instructions"

**Impact:**
- Main agent confused about what to prioritize
- Strategic guidance buried in tactical details
- Hard to locate critical decision points

**Recommendation:**
```
CLAUDE.md (Strategic Layer - 300 lines):
- Gatekeeper protocol (when to invoke agents)
- Project principles
- Agent orchestration flow
- Quality standards (high-level)

tactical-guides/ (Tactical Layer - separate files):
- presentation-creation-guide.md
- paper-creation-guide.md
- blog-creation-guide.md
- research-coordination-guide.md

reference/ (Reference Layer - separate files):
- examples-presentation.md
- examples-papers.md
- development-log.md
- troubleshooting.md
```

---

### 3. Redundancy (MEDIUM PRIORITY)

**Current State:**
- Agent orchestration flow explained 3 times (CLAUDE.md lines 300-330, 537-585, agent frontmatter)
- Quality standards repeated in CLAUDE.md and each agent file
- Voice requirements (Dr. Elena) repeated in CLAUDE.md, content-director, content-writer
- Source verification criteria in CLAUDE.md, content-writer, content-reviewer

**Anthropic Principle Violated:**
> "Smallest possible set of high-signal tokens"

**Impact:**
- Wasted context on every invocation
- Update burden (must change in multiple places)
- Version skew risk

**Recommendation:**
**Single Source of Truth (SSOT) Strategy:**

```
CLAUDE.md:
- Agent orchestration flow (once, clear)
- Quality standards (high-level only)

/presentation/persona.md:
- Dr. Elena voice (detailed) - agents READ this file

/reference/source-verification.md:
- Source criteria (detailed) - agents READ this file

Agent files:
- Role-specific interpretation only
- Reference SSOT files: "Read /presentation/persona.md for voice requirements"
```

---

### 4. Tool Overlap / Misassignment (MEDIUM PRIORITY)

**Current State:**
- **content-director** has `Edit` tool - but FORBIDDEN from using it
- **content-director** has `TodoWrite` - but main agent manages todos
- **research-coordinator** has `Bash` - unclear when to use vs Task tool

**Anthropic Principle Violated:**
> "Avoid bloated tool sets with overlapping functionality" + "Extremely clear in intended use"

**Impact:**
- Agents might use tools they shouldn't
- Unclear boundaries increase error probability
- More tokens wasted on unused tool descriptions

**Recommendation:**

```yaml
content-director:
  tools: [Read, Glob, Grep, Write] # Remove Edit, TodoWrite, Bash
  rationale: ONLY planning - writes plans to /tasks/, reads context

content-writer:
  tools: [Read, Write, Edit, Glob, Grep] # Keep as-is
  rationale: Creates/edits content, reads context

content-reviewer:
  tools: [Read, Write, Glob, Grep] # Keep as-is
  rationale: Reviews content, writes review files

research-coordinator:
  tools: [Read, Write, Task, Glob, Grep] # Remove Bash, TodoWrite
  rationale: Coordinates research, invokes research-intelligence-agent
```

---

### 5. Weak Error Handling (MEDIUM PRIORITY)

**Current State:**
- No guidance on "what if agent instructions file missing?"
- No protocol for "content-writer fails mid-creation"
- No recovery steps for "reviewer finds critical errors"
- No escalation path for blocked agents

**Anthropic Principle Violated:**
> "Robust to errors"

**Impact:**
- Agents fail silently or loop
- Main agent doesn't know how to recover
- User sees confusing partial results

**Recommendation:**

Add to CLAUDE.md and each agent:

```markdown
## Error Handling Protocol

### Agent Invocation Errors

**If agent instructions file missing:**
1. Main agent: Check plan.md for correct path
2. If still missing: Report to user, ask content-director to regenerate
3. DO NOT proceed without instructions

**If agent returns incomplete output:**
1. Main agent: Check if agent reported specific blocker
2. If technical error: Retry once
3. If content issue: Re-invoke with clarification
4. If persistent: Report to user with diagnostics

**If quality review fails critically:**
1. Main agent: Read review file
2. If fixable: Re-invoke content-writer with review feedback
3. If structural: Re-invoke content-director for revised plan
4. If requirements unclear: Escalate to user
```

---

### 6. No Compaction Strategy (LOW PRIORITY - Future)

**Current State:**
- No protocol for summarizing conversation history
- No structured note-taking between agent invocations
- Long multi-step tasks accumulate context

**Anthropic Principle Violated:**
> "Compaction: Summarize conversation history periodically"

**Impact:**
- Context window grows unbounded on complex tasks
- Accuracy degrades (context rot)
- Later steps may "forget" earlier decisions

**Recommendation (Future Enhancement):**

```markdown
## Long-Horizon Task Protocol

**For tasks >5 agent invocations:**

After every 3 agent completions:
1. Main agent writes tasks/[name]/progress-checkpoint.md:
   - What's completed
   - Key decisions made
   - Current state
   - Next steps

2. Main agent can reference checkpoint instead of full history

3. Agents read checkpoint for context, not entire conversation
```

---

### 7. Suboptimal Organization (HIGH PRIORITY)

**Current State:**
- Using markdown headers throughout
- No XML-style structured sections for critical parts
- Gatekeeper protocol buried at line 195 (now moved to top, good!)
- No clear visual hierarchy for "MUST READ" vs "reference"

**Anthropic Principle Violated:**
> "Organize prompts into distinct sections (e.g. <background_information>, <instructions>)"

**Impact:**
- Critical protocols not visually distinct
- Hard for AI to parse priority levels
- Important decisions mixed with examples

**Recommendation:**

Use XML-style sections for critical parts:

```markdown
# CLAUDE.md Structure

<!-- CRITICAL: Read this first -->
<gatekeeper_protocol>
🛑 STOP: Check trigger patterns before ANY action
[Table of patterns]
</gatekeeper_protocol>

<agent_orchestration>
Main Agent → content-director (planning)
Main Agent → specialists (execution)
[Flow diagram]
</agent_orchestration>

<quality_standards priority="high">
- Source verification required
- Voice requirements by content type
- Review cycle mandatory
</quality_standards>

<!-- REFERENCE: Read as needed -->
## Project Background
[Lower priority context]

## Examples
[Reference material - agents can skip if not needed]
```

---

## Recommended Improvements (Prioritized)

### Priority 1: IMMEDIATE (Context Reduction)

#### 1.1 Restructure CLAUDE.md (HIGH IMPACT)

**Action:** Split CLAUDE.md into focused files

**Current:** 650+ lines in single file
**Target:** 300 lines core + separate reference files

**Implementation:**
```
CLAUDE.md (300 lines):
├─ Gatekeeper protocol with trigger table
├─ Agent orchestration flow
├─ Content type definitions (brief)
├─ Quality standards (high-level)
├─ Agent roles (brief descriptions)
└─ Error handling basics

NEW FILES to create:
├─ .claude/tactical-guides/
│   ├─ presentation-creation-guide.md (examples, workflows)
│   ├─ paper-creation-guide.md
│   └─ blog-creation-guide.md
├─ .claude/reference/
│   ├─ source-verification-standards.md
│   ├─ voice-guidelines.md (detailed Dr. Elena, Academic, Blog)
│   ├─ examples-presentation.md
│   ├─ examples-papers.md
│   └─ development-log.md
└─ .claude/docs/
    └─ troubleshooting.md
```

**Changes:**
- Move presentation philosophy → tactical-guides/presentation-creation-guide.md
- Move source verification details → reference/source-verification-standards.md
- Move development log → reference/development-log.md
- Move detailed examples → reference/examples-*.md
- Keep only essential decision points in CLAUDE.md

**Benefit:** 50% context reduction, faster parsing, clearer priorities

---

#### 1.2 Streamline Agent Files (HIGH IMPACT)

**Action:** Reduce each agent to 200-250 lines, extract details to references

**Current:** 500-750 lines per agent
**Target:** 200-250 lines per agent

**Implementation Pattern (for each agent):**

```markdown
Agent File Structure (200-250 lines):

1. IDENTITY & ROLE (30 lines)
   - What you are
   - What you do
   - What you DON'T do

2. CAPABILITIES & TOOLS (20 lines)
   - Allowed tools
   - Forbidden actions
   - Tool usage boundaries

3. AGENT INSTRUCTIONS PRIORITY (15 lines)
   - Check for instructions first
   - How to parse them
   - What overrides what

4. WORKING PROCESS (80-100 lines)
   - Core workflow steps
   - Context gathering rules
   - Output requirements
   - File location logic

5. QUALITY CHECKLIST (20 lines)
   - Essential checks only
   - Reference detailed standards

6. ERROR HANDLING (25 lines)
   - Common errors
   - Recovery steps
   - Escalation path

7. MINIMAL EXAMPLES (20 lines)
   - One clear example
   - Reference detailed examples file

Total: ~210 lines
```

**Extract to separate files:**
```
.claude/agent-references/
├─ content-director-examples.md (detailed scenarios)
├─ content-writer-templates.md (full templates)
├─ content-reviewer-templates.md (review formats)
└─ research-coordinator-workflows.md (complex scenarios)
```

**Agent files reference these:**
```markdown
## Detailed Examples
See: .claude/agent-references/content-director-examples.md
```

**Benefit:** 60% context reduction per agent, clearer core logic

---

### Priority 2: HIGH (Clarity & Organization)

#### 2.1 Add XML Sections for Critical Protocols (MEDIUM IMPACT)

**Action:** Wrap critical sections in XML tags for visual hierarchy

**Implementation:**
```markdown
# CLAUDE.md

<critical_gatekeeper>
🛑 MANDATORY FIRST CHECK
[Trigger patterns table]
</critical_gatekeeper>

<agent_orchestration priority="critical">
[Flow diagram - when to invoke which agent]
</agent_orchestration>

<error_handling>
[What to do when agents fail]
</error_handling>

<!-- Reference material below -->
## Project Background
[Can skip if understanding context]
```

**Benefit:** AI can identify critical sections faster, reduced parsing errors

---

#### 2.2 Create Single Source of Truth (SSOT) Files (MEDIUM IMPACT)

**Action:** Eliminate redundancy by creating authoritative reference files

**Implementation:**
```
.claude/reference/
├─ voice-guidelines.md (SSOT for voice requirements)
│   ├─ Dr. Elena Cognitive (detailed)
│   ├─ Academic Voice (detailed)
│   └─ Accessible Technical (detailed)
│
├─ source-verification-standards.md (SSOT for source criteria)
│   ├─ Academic sources (peer-review requirements)
│   ├─ Industry sources (credibility checks)
│   └─ Cognitive science sources (verified only)
│
└─ quality-standards.md (SSOT for quality criteria)
    ├─ Presentation standards
    ├─ Paper standards
    └─ Blog standards
```

**Update strategy:**
- CLAUDE.md: Reference only ("See voice-guidelines.md for details")
- Agent files: "Read /reference/voice-guidelines.md before writing"
- NO duplication of detailed criteria

**Benefit:** Update once, apply everywhere; no version skew

---

#### 2.3 Fix Tool Assignments (LOW EFFORT, HIGH CLARITY)

**Action:** Remove unnecessary tools from agent definitions

**Changes:**
```yaml
# content-director.md
---
name: content-director
tools: [Read, Glob, Grep, Write]  # REMOVE: Edit, TodoWrite, Bash
---

# research-coordinator.md
---
name: research-coordinator
tools: [Read, Write, Task, Glob, Grep]  # REMOVE: Bash, TodoWrite
---
```

**Update agent instructions:**
```markdown
## YOUR TOOLS

**✅ YOU HAVE:**
- Read - Read context files
- Glob - Find files
- Grep - Search content
- Write - Create plan files in /tasks/ ONLY

**❌ YOU DON'T HAVE (by design):**
- Edit - You don't modify existing project files
- TodoWrite - Main agent manages todos
- Task - You don't invoke other agents (main agent does)
```

**Benefit:** Clearer boundaries, fewer mistakes, less context per invocation

---

### Priority 3: MEDIUM (Robustness)

#### 3.1 Add Comprehensive Error Handling (MEDIUM EFFORT)

**Action:** Add error protocols to CLAUDE.md and each agent

**Implementation:**

**In CLAUDE.md:**
```markdown
## Error Handling & Recovery

<error_recovery>

### Missing Agent Instructions
**Symptom:** Agent can't find agent-instructions-*.md file
**Recovery:**
1. Check tasks/[name]/plan.md for correct path
2. If missing: Re-invoke content-director to regenerate plan
3. DO NOT proceed without instructions - report to user

### Agent Returns Incomplete Output
**Symptom:** File created but missing sections
**Recovery:**
1. Read agent output for error messages
2. Check if agent hit tool limitation
3. Re-invoke with explicit "complete previous work"
4. If persistent after 2 tries: Report to user

### Critical Quality Issues
**Symptom:** Reviewer marks content as "MAJOR REWRITE"
**Recovery:**
1. Read review file for specific issues
2. If fixable: Re-invoke writer with review + "address all critical issues"
3. If plan flawed: Re-invoke content-director for revised plan
4. If requirements unclear: Escalate to user with specifics

### Agent Invocation Fails
**Symptom:** Task tool returns error
**Recovery:**
1. Check agent name spelling (exact match required)
2. Verify prompt format (proper structure)
3. Retry once with corrected parameters
4. If persistent: Report to user with error details

</error_recovery>
```

**In Each Agent File:**
```markdown
## Error Scenarios & Responses

### You Can't Find Required Context File
**DO:**
1. Report specific missing file to main agent
2. Suggest alternative context sources if applicable
3. STOP - don't proceed with incomplete context

**DON'T:**
- Make up information
- Proceed without required context
- Silently skip missing files

### You Receive Unclear Agent Instructions
**DO:**
1. Return to main agent with specific questions
2. Note which parts are clear, which are ambiguous
3. Suggest clarifications needed

**DON'T:**
- Guess at intentions
- Make assumptions
- Proceed with ambiguous requirements
```

**Benefit:** Graceful degradation, clear escalation paths, user confidence

---

#### 3.2 Improve Return Value Standardization (LOW EFFORT)

**Action:** Standardize what each agent returns to main agent

**Implementation:**

**Standard Return Format for All Agents:**
```markdown
## Return Value Format

**ALWAYS return in this structure:**

```
✅ [AGENT NAME] COMPLETED: [Task Description]

📁 FILES CREATED/MODIFIED:
- path/to/file1.md - [description]
- path/to/file2.md - [description]

📊 SUMMARY:
[2-3 sentence summary of what was accomplished]

⚠️ ISSUES ENCOUNTERED:
[If any - otherwise state "None"]

➡️ NEXT STEP RECOMMENDATION:
[What main agent should do next per plan]

🔗 REFERENCE:
Task folder: tasks/[name]/
```

**Example:**
```
✅ CONTENT-WRITER COMPLETED: Attention Mechanisms Slide

📁 FILES CREATED:
- tasks/attention-slide/analysis.md - Extended analysis with cognitive parallels
- tasks/attention-slide/speech-notes.md - Speech notes with timing

📊 SUMMARY:
Created slide content explaining attention mechanisms using cognitive science
parallels (selective attention in reading). All claims sourced from Vaswani 2017
and Anthropic 2024 interpretability work.

⚠️ ISSUES ENCOUNTERED:
None

➡️ NEXT STEP RECOMMENDATION:
Proceed to Step 3: Invoke content-reviewer to assess content quality

🔗 REFERENCE:
Task folder: tasks/attention-slide/
```
```

**Benefit:** Consistent communication, easier parsing, clear progress tracking

---

### Priority 4: FUTURE (Long-Horizon)

#### 4.1 Add Compaction Protocol (FUTURE ENHANCEMENT)

**Action:** Implement checkpoint system for tasks with >5 agent invocations

**Implementation:**
```markdown
## Long-Horizon Task Protocol

**Trigger:** Task requires >5 sequential agent invocations

**Process:**

After every 3 agent completions, main agent creates:
`tasks/[name]/checkpoint-N.md`

**Checkpoint Format:**
```markdown
# Task Checkpoint [N]

**Completed Steps:** [1, 2, 3]
**Current Step:** [4]

## Key Decisions:
- [Decision 1 and rationale]
- [Decision 2 and rationale]

## Outputs Created:
- [File 1] - [purpose]
- [File 2] - [purpose]

## State for Next Steps:
- [Critical context for remaining steps]

## Issues to Watch:
- [Any concerns or patterns]
```

**Usage:**
- Subsequent agents read checkpoint instead of full conversation
- Main agent references checkpoint in agent instructions
- Reduces context window growth
```

**When to implement:** After core improvements stabilized

---

## Implementation Roadmap

### Phase 1: Critical Context Reduction (Week 1)
- [ ] Split CLAUDE.md into core (300 lines) + tactical guides + reference
- [ ] Extract detailed examples to separate files
- [ ] Create SSOT files (voice-guidelines.md, source-verification-standards.md)
- [ ] Update agent files to reference SSOT files
- **Expected benefit:** 50% context reduction, clearer priorities

### Phase 2: Agent Streamlining (Week 2)
- [ ] Reduce content-director.md from 549 to ~210 lines
- [ ] Reduce content-writer.md from 617 to ~220 lines
- [ ] Reduce content-reviewer.md from 745 to ~230 lines
- [ ] Reduce research-coordinator.md from 560 to ~210 lines
- [ ] Extract detailed templates to agent-references/
- **Expected benefit:** 60% per-agent context reduction

### Phase 3: Organization & Clarity (Week 3)
- [ ] Add XML sections to CLAUDE.md for critical protocols
- [ ] Fix tool assignments (remove unnecessary tools)
- [ ] Standardize agent return value formats
- [ ] Add visual hierarchy (emoji, formatting)
- **Expected benefit:** Faster parsing, fewer errors

### Phase 4: Robustness (Week 4)
- [ ] Add comprehensive error handling to CLAUDE.md
- [ ] Add error scenarios to each agent file
- [ ] Create troubleshooting.md reference
- [ ] Document escalation paths
- **Expected benefit:** Graceful failures, user confidence

### Phase 5: Future Enhancements (Future)
- [ ] Implement compaction protocol
- [ ] Create progress checkpoint system
- [ ] Add context window monitoring
- **Expected benefit:** Better long-horizon task handling

---

## Metrics for Success

### Quantitative
- CLAUDE.md: 650 lines → **300 lines** (54% reduction)
- Average agent file: 590 lines → **220 lines** (63% reduction)
- Total context per invocation: ~3000 lines → **~800 lines** (73% reduction)

### Qualitative
- ✅ Critical protocols visually distinct (XML sections)
- ✅ Zero redundancy (SSOT pattern)
- ✅ Clear error handling (protocols documented)
- ✅ Optimal tool assignments (no unnecessary tools)
- ✅ Faster decision-making (clearer priorities)

---

## Risk Mitigation

### Risk: Breaking existing workflows
**Mitigation:**
1. Keep original files as .backup before changes
2. Test each phase incrementally
3. Run through existing task examples to verify
4. Maintain backward compatibility where possible

### Risk: Over-reduction losing critical info
**Mitigation:**
1. Extract to reference files, don't delete
2. Agents can still access detailed guides when needed
3. Review extracted content for critical-but-not-obvious info
4. User can restore from backup if needed

### Risk: Coordination overhead with many files
**Mitigation:**
1. Clear file naming conventions
2. Directory structure in CLAUDE.md
3. Agents know when to read references vs. core file
4. Main agent doesn't need to track all files

---

## Next Steps

1. **User Review:** Review this plan and provide feedback
2. **Pilot Test:** Implement Phase 1 on one file (CLAUDE.md) first
3. **Validate:** Run through 2-3 existing tasks to ensure nothing broke
4. **Full Implementation:** Roll out remaining phases
5. **Monitor:** Track context usage and error rates

---

## Questions for User

1. **Scope confirmation:** Implement all 4 phases or focus on Phase 1-2 (context reduction)?
2. **Timing:** Implement incrementally with validation, or all at once?
3. **Backup strategy:** Create .backup files or use git branches?
4. **Tool changes:** Comfortable removing Edit/TodoWrite from content-director?
5. **File structure:** Prefer `.claude/reference/` or `.claude/docs/` for extracted content?

---

**Analysis complete. Awaiting user approval to proceed with improvements.**
