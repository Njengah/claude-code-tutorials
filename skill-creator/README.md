# Anthropic Skill-Creator: Test & Measure Your Agent Skills

Tutorial for the new Anthropic Skill-Creator plugin — a testing framework for validating and improving agent skills.

## Overview

Agent skills are notorious for fooling you into believing they work when, in reality, they sometimes fail silently. The Anthropic Skill-Creator plugin brings the rigor of software development to skill authoring without requiring you to write testing code from scratch.

It enables you to test, measure, and refine your agent skills through evals, benchmarks, and A/B comparisons.

## The Problem with Skills

Skills live in markdown files (usually SKILL.md) and tell Claude how to handle specific tasks. The current problem is knowing whether those instructions produce good results.

### Common Issues
- Skills may appear to work but fail silently on different inputs
- Models and skills change often — what worked last week might break today
- Without proper testing, you're flying blind
- Easy to overlook important details in skill performance

The Skill-Creator solves these problems by formalizing skill testing and measurement.

## Getting Started with Skill-Creator

### Installation Options

**Option 1: Claude Code Plugin**
```bash
/plugin install skill-creator@anthropic-agent-skills
```

**Option 2: Manual Installation**
```bash
# Clone the repository
git clone https://github.com/anthropics/skills.git
cd skills/skills/skill-creator
```

**Option 3: Claude.ai or Cowork**
No installation needed — just ask Claude to use the Skill-Creator plugin.

### Directory Structure
```
skill-creator/
├── SKILL.md           # Main instructions
├── agents/            # Subagent configs (grader, comparator, analyzer)
├── assets/            # HTML templates for eval review
├── eval-viewer/       # Scripts to generate test result viewers
├── references/        # Schema documentation
└── scripts/           # Core testing and benchmarking scripts
```

## Testing Your First Skill

### Define Test Prompts
Specify the tasks you want your skill to handle:
- "Fill out this job application form with the provided data"
- "Extract all tables from this multi-page report"
- "Merge these three PDFs and add bookmarks for each section"

### Set Expectations
Define what success looks like for each prompt:
- "All six form fields should contain the correct data"
- "Text should be positioned inside or adjacent to each field label"
- "Output should be a valid, readable PDF"

### Run Evals
The Skill-Creator stores these as evals — assertions that get checked against the output.

## Two Types of Skills

### Capability Uplift Skills
Help Claude do something the base model either can't do or can't do consistently.

**Examples:** Document creation skills (PDF, DOCX, PPTX)

**What evals tell you:**
- Whether the skill still works after model updates
- Whether the skill is still necessary at all
- If the base model now passes evals without the skill, the skill may no longer be adding value

### Encoded Preference Skills
Document workflows where Claude can already handle each piece, but the skill sequences them according to your process.

**Examples:** NDA review workflows, weekly update drafts pulling from multiple MCPs

**What evals verify:**
- Are you following your actual workflow?
- Did a recent edit accidentally skip a step?
- These skills are more durable since they encode your process, not Claude's capabilities

## Core Features

### Benchmarks
Track how well skills perform and whether they add value:

- **Pass rate** — How many evals succeeded
- **Elapsed time** — How long each test took
- **Token usage** — How many tokens were consumed

**Side-by-Side Comparison:** Benchmark the same evals with and without the skill loaded.

Example results:
- **With skill:** 5/5 pass rate (100%), 17,204 tokens
- **Without skill:** 2/5 pass rate (40%), 15,160 tokens

### Multi-Agent Testing
Spin up independent agents to run evals in parallel:

- Each agent gets a clean context (no cross-contamination)
- Isolated execution environments prevent context bleed
- Faster results than sequential testing
- More reliable measurements

**Performance gain:** A 5-eval benchmark that took 3 minutes sequentially might finish in under a minute with parallel agents.

### A/B Comparisons
Blind testing between skill versions:

1. Two executors run the same prompt — one with skill version A, one with version B
2. Comparator agent receives both outputs without knowing which is which
3. Scores outputs against your rubric and picks a winner
4. Blind comparison avoids bias — purely based on output quality

### Description Optimization
Improve skill triggering accuracy:

- Analyzes current description against sample prompts
- Suggests edits to reduce false positives (unwanted triggers)
- Cuts false negatives (missed triggers when skill should activate)
- Iterates up to 5 times or until all training queries pass

**Example improvements:**
- XLSX skill: 6/8 → 8/8 on held-out test prompts
- DOCX skill: 3/7 → 5/7 after description optimization

## Real-World Example: PDF Form-Filling

The PDF skill previously struggled with non-fillable forms (where Claude had to place text at exact coordinates).

### Testing Process
1. Created a job application form (non-fillable PDF)
2. Ran the skill with test data
3. Observed the skill:
   - Detected no actual form fields
   - Extracted form structure and converted to images
   - Created field mappings with coordinates
   - Filled the form using coordinate-based text placement

### Results
- **Before optimization:** Text scattered and misaligned
- **After optimization:** Clean, properly positioned entries
- Without evals, this edge case might have lingered for months

## Code Architecture

### Scripts Folder
Core logic for skill evaluation:

- **run_eval.py** — Tests if your skill triggers when it should
- **run_loop.py** — Optimization engine combining evaluation and improvement
- **improve_description.py** — Proposes better descriptions using extended thinking

### Agents Folder
Specialized evaluation tasks:

- **grader.md** — Scores outputs against expectations
- **comparator.md** — Blind A/B judging between skill versions

### Eval-Viewer Folder
- **generate_review.py** — Creates HTML reports for visualizing test results

## Key Workflow

1. **Evals run queries** — Watch for skill triggers
2. **Graders check expectations** — Validate output quality against defined criteria
3. **Comparators judge blindly** — Compare versions without bias
4. **Loop ties it together** — Iterates to optimize descriptions and skills

## Why This Matters

Before evals, skill authoring was largely guesswork. Hundreds of skill markdown files are shared with no way to evaluate quality.

Now you can:
✅ Test whether your skill produces good output  
✅ Benchmark uplift compared to base model capabilities  
✅ Compare skill versions with blind A/B testing  
✅ Optimize descriptions for reliable triggering  
✅ Catch regressions before they hit your team  

## Final Thoughts

Testing turns a skill that seems to work into one you know works. The Skill-Creator transforms skill authoring from vibes-based to evidence-based development, enabling you to build more reliable, effective agent skills.

---

**Original Article:** [Anthropic (New) Skill-Creator Measures If Your Agent Skills Work (No More Guesswork)](https://medium.com/@joe.njenga/[article-slug])

**Learn More:** [Skill-Creator GitHub Repository](https://github.com/anthropics/skills)
