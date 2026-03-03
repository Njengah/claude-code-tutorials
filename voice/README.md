# Claude Code Voice: Talk & Stop Typing

Tutorial for the new native Claude Code voice feature.

## Overview

Claude Code voice is the ultimate feature we have all been waiting for — the ability to use voice input directly within Claude Code using the `/voice` command.

## The Journey

I knew the moment had come for us to get more from Claude Code by just talking. My journey trying to make Claude Code work with voice took me down a maze of all the possible options. I even built my own Claude Code voice input, which worked, but with limitations. But the newly built-in Claude Code voice mode will change what it means to be fast and more productive.

## Previous Voice Solutions

### VoiceMode MCP (Community-Built)
The most popular solution was VoiceMode, a community-built MCP server that bridges your microphone and Claude Code.

**Setup:**
```bash
# Install UV if you don't have it
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install VoiceMode
uvx voice-mode-install

# Add it to Claude Code
claude mcp add --scope user voicemode -- uvx --refresh voice-mode
```

**Limitations:**
- Requires OpenAI API key
- Additional costs for transcription on top of Claude subscription
- Not truly integrated into Claude Code

### System Dictation
The quickest option was turning on your system's built-in dictation:
- **macOS:** Double-tap Fn and start talking
- **Windows:** Win + H shortcut

**Limitations:**
- Zero setup required, but accuracy was poor
- Technical terms, variable names, and function names struggled
- Spent more time correcting than saved by not typing

### Browser Extensions
Tools like Voicy worked as a speech-to-text layer on top of any text field, including Claude's web interface.

**Limitations:**
- Claude Code runs as a terminal app, not browser
- Only useful for Claude.ai web interface
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
