# Claude Code /loop — How I Create New Native Autonomous Loops That Work!

Just before we mastered Ralph loop, Claude Code introduced their native `/loop` command that runs autonomous loops for hours.

Things are getting interesting, and we are just at the beginning of a new phase of autonomous AI coding.

I just tested it, and the results are what you’d expect from a natively integrated loop — clean, reliable, and flexible enough to cover a lot of real workflows.

If you’ve been manually checking builds, polling deployments, or watching PRs inside a Claude Code session, `/loop` takes you to the next level.

### What you can do with /loop

- Monitor a deployment and get notified when it finishes
- Watch a PR — detect build failures and fix them automatically
- Check back on a long-running test suite every 30 minutes
- Get a daily Slack summary using the Slack MCP

---

## How /loop Works

`/loop` is a bundled skill in Claude Code.

You give it a task, an optional interval, and it schedules a recurring job that runs in the background — while your session stays open.

Example:

```
/loop 2m run npm run build and tell me if it passed or failed
```

Claude parses the interval, converts it to a cron expression, schedules the job, and confirms the cadence and job ID.

### Interval Syntax

The interval is optional. You can lead with it, trail with it, or leave it out entirely.

Supported units are `s` for seconds, `m` for minutes, `h` for hours, and `d` for days.

Seconds are rounded up to the nearest minute since cron has one-minute granularity.

Intervals that don’t divide in a smart way — like `7m` or `90m` — get rounded to the nearest clean interval, and Claude tells you what it picked.

### How the Scheduler Runs

The scheduler checks every second for due tasks and queues them at low priority.

A scheduled prompt fires between your turns, not while Claude is mid-response. If Claude is busy when a task comes due, it waits until the current turn ends.

All times run in your local timezone. A cron expression like `0 9 * * *` means 9 am wherever you are running Claude Code, not UTC.

### 3-Day Limit

Recurring tasks automatically expire 3 days after creation.

The task fires one final time, then deletes itself. This keeps forgotten loops from running indefinitely.

If you need a loop to run longer, cancel and recreate it before it expires — or use Desktop scheduled tasks for durable scheduling that survives session restarts.

### Loop Over Another Command

You can point `/loop` at another command or skill.

```
/loop 20m /review-pr 1234
```

Each time the job fires, Claude runs `/review-pr 1234` as if you typed it.

### Testing /loop — Build Monitor in Action

Now let’s see `/loop` in action with a real project.

#### Test Project

The setup is minimal — a Node.js project with a single build script.

```bash
mkdir loop && cd loop
npm init -y
```

`package.json`:

```json
{
  "name": "loop-test",
  "version": "1.0.0",
  "description": "Test project for Claude Code /loop command",
  "main": "index.js",
  "scripts": {
    "build": "node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

`index.js`:

```js
console.log("Build successful");
```

Verify the build works before opening Claude Code:

```bash
npm run build
```

Now open Claude Code inside the project:

```bash
claude
```

### Starting the Loop

With Claude Code running, type:

```
/loop 2m run npm run build and tell me if it passed or failed
```

Claude scheduled the job immediately and returned a clean summary:

- Job ID: `0d7f7026`
- Cron: `*/2 * * * *`
- Cadence: Every 2 minutes
- Task: Run `npm run build` and report pass/fail
- Auto-expires: After 3 days

### Loop Running

Every 2 minutes, Claude fires the build in the background and reports back.

The output was consistent across every run:

- ✅ PASSED — `npm run build` completed successfully with output: `Build successful.`

This is `/loop` doing what it promises — running a task on a schedule and reporting the result, without you watching the terminal.

### Breaking the Build

Now let’s make it fail.

Update `index.js` with a syntax error:

```js
console.log("Build successful"
```

Save the file and wait for the next loop cycle.

Claude detects the failure and reports it immediately on the next cycle. You don’t need to be watching — the loop catches it and surfaces the result.

### Managing Your Loops

Once you have loops running, you need to know how to check and cancel them.

Claude handles this in plain English — no commands to memorize.

#### List Active Loops

```
what scheduled tasks do I have?
```

Claude returns all active jobs with their IDs, schedules, and the task each one is running.

#### Cancel a Loop

```
cancel the build monitor job
```

Or if you know the job ID:

```
CronDelete 0d7f7026
```

The natural language version is easier when you have multiple loops running and don’t want to look up the ID.

### One-Time Reminders

`/loop` is for recurring tasks, but Claude can also schedule one-shot reminders without it.

Just describe what you want in plain English:

- `in 45 minutes, check whether the integration tests passed`
- `remind me at 3pm to push the release branch`

Claude pins it to a specific minute, confirms when it will fire, and deletes the task automatically after it runs.

### Final Thoughts

`/loop` is session-scoped. That's the most important thing to understand before you build workflows around it.

If you don’t want the scheduler running at all, set this environment variable:

```
CLAUDE_CODE_DISABLE_CRON=1
```

This disables the cron tools and `/loop`. Any already-scheduled tasks stop firing.

Have you tried Claude Code `/loop`? What is your experience? Let me know in the comments below.
