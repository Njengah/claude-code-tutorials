# /claude-api — Claude Code Anthropic SDK Reference

> Companion project for the Medium article: **"Claude Code /claude-api (You Can Now Build Claude Apps 3x Faster)"**

---

## What /claude-api Is

`/claude-api` is a Claude Code built-in skill that loads the full Anthropic SDK reference directly into your session. It removes the need to tab-switch to external docs by injecting the API docs into Claude’s context.

## Why It Helps

- **Zero context switching** — Docs live inside the session.
- **Language-aware** — Loads Python, TypeScript, Java, Go, Ruby, C#, PHP, or cURL reference depending on your project.
- **Agent SDK support** — For Python/TypeScript, it also injects agent SDK docs so you can build workflows with tools and streaming.

---

## Setup

To use `/claude-api`, you need:

- Claude Code **v2.1.69+**
- An Anthropic API key set in your environment

If you’re not on the latest version run:

```bash
claude update
```

---

## Quick Start

Open Claude Code in a project folder and run:

```bash
/claude-api
```

If the folder is empty, Claude will ask you which language you want to work with.

If your project already imports Anthropic libraries, `/claude-api` will automatically activate.

---

## Auto-Activation Triggers

Claude detects an existing Anthropic import and loads the reference automatically:

- `import anthropic` (Python)
- `import Anthropic from '@anthropic-ai/sdk'` (TypeScript)
- `from claude_agent_sdk import query` (Agent SDK)

---

## Notes

This folder is meant to provide supplementary snippets and notes for `/claude-api` workflows. The actual documentation and reference content is delivered inside the Claude Code session when you invoke the command.
