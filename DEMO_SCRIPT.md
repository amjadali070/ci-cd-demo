# CI/CD and QA Demo Script (about 12 minutes)

## Setup before class
1. Finish all steps in INSTRUCTIONS.md, including the Render service and the two
   secrets, so the full pipeline is live.
2. Open four tabs:
   - The repo Code view
   - The Actions tab
   - Your code editor
   - Your live Render URL (the `/health` page)
3. Do one practice run of the "break it" step below so you know the timing.

---

## Step by step demo flow

### 1. Show the project (2 min)
- Open `src/calculator.js`. Point out these are just plain functions.
- Open `tests/calculator.test.js`. Show the 5 tests, especially divide by zero.
  Say: "This is QA built into the codebase, not a separate manual step."
- Open `.github/workflows/ci.yml`. Walk through the four stages top to bottom:
  Build, Test, Deploy, Monitor. Say: "One push travels through all of these."

### 2. Show the live app (1 min)
- Open your Render URL `/health`. It says status ok.
- Open `/add?a=2&b=3`. It returns 5.
  Say: "This is the same calculator code, now deployed and reachable on the web."

### 3. Show a passing pipeline (3 min)
- Make a trivial change in the code (for example add a comment) and push to main.
- Switch to the Actions tab. Watch the run go through Build, Test, Deploy, Monitor.
- Point out that each stage only starts once the one before it passes.

### 4. Break it on purpose (4 min) - the key moment
- In `src/calculator.js`, change:
  ```js
  function add(a, b) {
    return a + b;
  }
  ```
  to:
  ```js
  function add(a, b) {
    return a - b; // bug introduced on purpose
  }
  ```
- Commit and push.
- Switch to the Actions tab. The Test stage turns red.
- Open the failed run and show the output: `Expected: 5, Received: -1`.
- Point out that Deploy and Monitor never ran.
  Say: "The broken version was never deployed. The pipeline stopped it at the
  test gate, in seconds, with no human needed."

### 5. Fix it and close the loop (2 min)
- Change the function back to `a + b`, commit, and push.
- Watch the pipeline go green through all four stages again.
- Refresh the live `/health` page to show the good version is back up.
- Recap the full loop: code, build, test, deploy, monitor, repeat.

---

## If the live demo is not possible
Pre-record steps 3 and 4 as a short screen capture, or walk through `ci.yml` and
the test file and narrate what would happen. The files alone make it clear.

---

## Talking point to land at the end
"Notice QA was never a separate phase. The test suite is QA, and it sits inside
the same pipeline as build, deploy, and monitor. That is the core idea: quality
checks happen continuously, and only code that passes them ever reaches users."
