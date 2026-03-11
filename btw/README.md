# /btw — Side Questions While Claude Works

> Companion project for the Medium article: **"I Tried (New) Claude Code /btw Command (Now You Can Chat As You Code)"**

---

## What /btw Is

`/btw` is a Claude Code command that lets you ask a quick, one-off question while your main task keeps running. The answer shows in a popup overlay, and the main session continues without interruption.

## Why It Matters

- **No context pollution** — side questions don’t become part of your main convo history.
- **Parallel workflow** — your task keeps running while you query something else.
- **Lightweight** — no tool access; just quick knowledge lookups.

---

## Setup (Required Version)

`/btw` is available in Claude Code **v2.1.72+**.

```bash
claude --version
# update if needed
claude update
```

---

## Quick Use

Start Claude Code as usual:

```bash
claude
```

Then type:

```bash
/btw <question>
```

Example:

```bash
/btw what does retry logic do?
```

You’ll see the answer in an overlay. Dismiss with **Space**, **Enter**, or **Escape**.

---

## Common Use Cases

- Quick syntax lookups while coding
- Clarifying library behavior without stopping a running task
- Getting definitions or short explanations mid-session

---

## Notes

- `/btw` does **not** run commands or access your filesystem.
- It is **single-turn** (no follow-up conversation).
- It uses your current session context, so it can answer questions relevant to the project you’re in.
