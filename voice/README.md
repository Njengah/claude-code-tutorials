# /voice — Push-to-Talk Coding in Claude Code

> Companion project for the Medium article: **"I Finally Tested Claude Code /voice — It’s Faster than Typing (Don’t Waste Time)"**

---

## What /voice Is

`/voice` is Claude Code's native push-to-talk mode that lets you speak instructions instead of typing them. Hold the spacebar, talk, release — and your words become code.

## Why It Helps

- **Faster than typing** — Dictate complex instructions in seconds (e.g., "build a FastAPI backend with menu and order endpoints").
- **Accurate transcription** — Handles technical terms like "FastAPI" and "Pydantic" well.
- **Hybrid workflow** — Use voice for ideas, typing for precision.
- **No extra setup** — Built-in, no API keys or MCP servers needed.

---

## Setup

`/voice` is available in Claude Code (rolled out to all users as of March 12, 2026).

Just run:

```bash
claude
```

Then type:

```bash
/voice
```

---

## Quick Start

1. Activate voice mode: `/voice`
2. Hold **Spacebar** and speak your instruction
3. Release Spacebar — Claude transcribes and executes

Example instruction:

> "Create a FastAPI app with a menu endpoint that returns food items with id, name, price, and description"

Claude generates the code instantly.

---

## Test Project: Food Ordering System

I tested `/voice` by building a complete app:

- **Backend:** FastAPI with menu and order endpoints
- **Frontend:** Vanilla JS to display menu and place orders

Three voice commands total — from idea to working app in minutes.

---

## Notes

- Speak clearly at a steady pace for best transcription.
- Shorter, focused commands work better than long rambles.
- Voice understands intent even with minor transcription errors (e.g., "manual" → "menu").
- Still type when you need exact precision or code snippets.
- Every solution was sitting on top, not inside Claude Code

## Native `/voice` Mode

The native voice mode in Claude Code solves all these problems by being built directly into the tool.

### How to Enable
Simply type `/voice` to toggle voice mode on or off.

### Features

#### Push-to-Talk
- Hold Space, speak your instruction, release
- Your words stream in real-time at your cursor position as a transcript
- Push-to-talk is by design — hands-free continuous listening in a terminal environment would be a mess

#### Hybrid Prompts
You're not forced to choose between typing and speaking. You can type half a prompt, hold Space to voice the messy middle part, then keep typing.

**Example workflow:**
```
Fix the auth middleware in [hold Space] — the token validation is failing silently 
when the expiry timestamp is malformed, it should throw a proper 401 [release] — 
and add a test for it.
```

#### No Extra Cost
- Voice transcription tokens do not count against your rate limits
- No additional charge on top of your existing Pro, Max, Team, or Enterprise plan

#### Cross-Platform
- Runs locally on macOS, Linux, and Windows
- No cloud dependency for the voice capture itself
- Works inside your existing Claude Code session on whatever OS you are on

## Getting Started

### Check if You Have Access
When you open Claude Code, check the welcome screen. If you are in the 5% rollout, you will see a note confirming voice mode is available. The rollout is expanding over the coming weeks.

### Basic Usage
1. Open Claude Code
2. Type `/voice` to enable voice mode
3. Hold Space and speak your instructions
4. Release to convert to text

## Key Benefits

✨ **Native Integration** - Built directly into Claude Code, not a workaround  
💰 **No Extra Cost** - Included with existing Claude subscription  
🔗 **Hybrid Workflow** - Mix typing and voice naturally  
🖥️ **Cross-Platform** - Works on macOS, Linux, and Windows  
⚡ **Real-Time** - Words stream as you speak  

## Final Thoughts

Claude Code voice mode represents a paradigm shift in how we interact with AI coding assistants. It's faster, more natural, and seamlessly integrated into your development workflow. The ability to talk and type interchangeably opens up new possibilities for productivity and expressiveness in coding tasks.

---

**Original Article:** [Claude Code Voice Is Here — You Can Now Talk & Stop Typing](https://medium.com/@joe.njenga/claude-code-voice-is-here-voice-you-can-now-talk-stop-typing-43a586f26f56)
