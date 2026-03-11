# I Tried (New) Claude Code /btw Command (Now You Can Chat As You Code)

Claude Code `/btw` is a new feature that creates side-chain conversations while Claude is working.

If you’ve ever been mid-task in Claude Code, watching it work through a complex operation, and suddenly had a question, you either wait or interrupt the task, and neither option feels great.

Anthropic just released a new command that fixes this: `/btw`.

It lets you ask side questions while Claude Code is working. The answer appears in an overlay. Your main task keeps running, and the conversation history is clean.

Erik Schluntz from the Anthropic team built this as a side project, and it’s one of those small features that make a big difference in daily workflow.

In this article, I’ll show you how `/btw` works, walk through the setup, and test it with real examples so you can see what to expect.

---

## What is /btw and How It Works

The `/btw` command lets you ask Claude a quick question without stopping your current task.

Here’s the command:

```
/btw <question>
```

For example:

```
/btw what does retry logic do?
```

When you run this, Claude Code opens an overlay with the answer. Your main task continues running in the background.

Once you read the response, press Space, Enter, or Escape to dismiss it.

### Key features

- **Runs in parallel** — Your main task doesn’t pause or wait
- **Overlay response** — Answer appears in a pop-up, not inline
- **No history pollution** — The side question doesn’t get added to your main conversation context
- **Single-turn only** — You get one response, no back-and-forth
- **No tool access** — The response comes from Claude’s knowledge and current session context

`/btw` doesn't have tool access; it won’t read files, run commands, or make API calls. It’s for quick knowledge lookups and clarifications.

This design keeps the feature lightweight and cost-efficient. You’re not spinning up a full agent interaction.

The command pulls from your current session context, so if you’ve been working on a Python project, Claude knows that. Ask `/btw` what's the difference between `list` and `tuple` and you'll get a relevant, contextual response.

## Setting Up and Using /btw

The `/btw` command is available in Claude Code version 2.1.72 and later.

Check your version by running:

```bash
claude --version
```

If you’re on an older version, update with:

```bash
claude update
```

Once you’re on the right version, launch Claude Code as usual:

```bash
claude
```

You’ll see `/btw` available in the command list.

Type `/btw` and Claude Code shows the description: “Ask a quick side question without interrupting the main conversation.”

```
/btw <question>
```

Replace `<question>` with whatever you want to ask.

## Test — /btw in Action

Let me show you how `/btw` works with a practical example.

I ran a simple test asking about FastAPI:

```
/btw whats is fast api
```

The response appeared instantly in an overlay, covering the terminal with a detailed breakdown of FastAPI — core features, a simple code example, why developers use it, and how it compares to Flask and Django.

The overlay includes everything you’d expect from a quick lookup: bullet points, code snippets, and practical context.

Press Space, Enter, or Escape to dismiss it and return to your main session.

## Use Cases

This command is ideal for certain situations:

- Quick syntax lookups while writing code
- Clarifying a concept without breaking your flow
- Checking what a library or function does mid-task
- Getting a definition or explanation on the fly

Each `/btw` call is a single-turn response with no tool access, so you're not burning tokens on full agent interactions.

If you're working through a long coding session, you can fire off quick questions without worrying about context bloat or runaway costs.

## Final Thoughts

The `/btw` command is a small addition, but it solves a real annoyance in Claude Code workflows.

Without this command, asking a side question means either waiting for your task to finish or interrupting it. Now you can stay in flow, get your answer, and keep moving.

If you’re on version 2.1.72 or later, give it a try. Run a task, hit `/btw` with a question, and see how it fits your workflow.

Share your experience in the comments below.
