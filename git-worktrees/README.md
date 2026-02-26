# Git Worktrees — Parallel Agents with Claude Code

> Companion project for the Medium article: **"I Tried (New) Claude Code Git Worktree (I Now Run Smooth Parallel Agents)"**

---

##  Structure

```
git-worktrees/
├── README.md          ← You are here
└── demo-project/      ← Task manager app used in the article
    ├── index.html
    └── src/
        ├── app.js
        └── styles.css
```

---

##  Setup

```bash
# From the repo root
cd git-worktrees/demo-project

# Make sure git is initialized (if cloned, it already is)
# You need at least one commit — make one if starting fresh
git add .
git commit -m "initial commit: task manager starter"
```

>  Git worktrees require at least one commit on the main branch before they'll work.

---

##  Running the Demo

The demo shows two Claude agents running in parallel — each on their own branch — without blocking each other.

### Terminal 1 — Agent 1: Dark Mode Feature

```bash
claude --worktree feature/dark-mode
```

Prompt:
> "Add a dark mode toggle to the task manager. Store the preference so it persists on reload."

### Terminal 2 — Agent 2: Local Storage Persistence

```bash
claude --worktree feature/local-storage
```

Prompt:
> "Add local storage so tasks survive a page refresh."

Both agents work simultaneously in isolated environments. Check active worktrees anytime:

```bash
git worktree list
```

---

##  Useful Commands

| Command | What it does |
|---------|-------------|
| `claude --worktree feature/name` | Start a new isolated worktree session |
| `claude --worktree feature/name --dir` | Start and cd into the worktree directory |
| `git worktree list` | List all active worktrees |
| `git worktree remove .claude/worktrees/feature-name` | Remove a worktree after merging |
| `git worktree prune` | Clean up stale references |

---

##  Cleanup

```bash
git worktree remove .claude/worktrees/feature-dark-mode
git worktree remove .claude/worktrees/feature-local-storage
git worktree prune
```