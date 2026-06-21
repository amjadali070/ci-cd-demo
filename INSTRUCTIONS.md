# CI/CD and QA Session: Step by Step Instructions

This guide takes you all the way from unzipping the project to a live URL that is
automatically deployed and monitored. Follow it in order.

The whole pipeline has four stages, and this guide sets up each one:
Build, Test, Deploy, Monitor.

---

## 1. Unzip the project

Extract `ci-cd-demo.zip` anywhere on your machine. You should see:

```
ci-cd-demo/
├── .github/workflows/ci.yml
├── src/calculator.js
├── src/server.js
├── tests/calculator.test.js
├── package.json
├── README.md
├── DEMO_SCRIPT.md
└── MONITORING.md
```

---

## 2. Install Node.js (if you do not have it)

Download the LTS version from https://nodejs.org and verify:

```bash
node -v
npm -v
```

---

## 3. Install dependencies (the Build stage)

Open a terminal inside the `ci-cd-demo` folder:

```bash
npm install
```

This downloads Jest, the testing tool. The app itself has no dependencies.

---

## 4. Run the tests locally (the Test stage)

```bash
npm test
```

You should see all 5 tests pass. Run this once before class so you are not
debugging live.

---

## 5. Run the app locally (optional but nice to show)

```bash
npm start
```

Then in another terminal, or a browser:

```bash
curl http://localhost:3000/health
curl "http://localhost:3000/add?a=2&b=3"
```

Stop the server with Ctrl C when done.

---

## 6. Create a GitHub repository

1. Go to https://github.com and log in.
2. Click New repository.
3. Name it `ci-cd-demo`.
4. Leave it empty (no README, no .gitignore), your folder already has files.
5. Click Create repository and keep the page open for the URL.

---

## 7. Push the project to GitHub

Inside the `ci-cd-demo` folder:

```bash
git init
git add .
git commit -m "Initial commit: calculator API plus full pipeline"
git branch -M main
git remote add origin https://github.com/yourname/ci-cd-demo.git
git push -u origin main
```

Replace the URL with your actual repo URL.

---

## 8. Confirm the pipeline runs (Build and Test)

1. On GitHub, open your repository.
2. Click the Actions tab.
3. You will see a run named "CI/CD Pipeline" that started automatically.
4. Open it. The `build-and-test` job runs install then test.

At this point Deploy and Monitor will show as skipped, because we have not given
them the secrets yet. That is expected. The next steps turn them on.

---

## 9. Create a free Render web service (sets up Deploy)

1. Go to https://render.com and sign in with GitHub.
2. Click New, then Web Service.
3. Connect your `ci-cd-demo` repository.
4. Fill in:
   - Build command: `npm install`
   - Start command: `npm start`
   - Render fills in the PORT automatically, our server already reads it.
5. Click Create Web Service and wait for the first deploy to finish.
6. Copy your live URL, it looks like `https://ci-cd-demo-xxxx.onrender.com`.

Test it in a browser:

```
https://ci-cd-demo-xxxx.onrender.com/health
https://ci-cd-demo-xxxx.onrender.com/add?a=2&b=3
```

Render already redeploys on every push by default. The next step makes the
deploy a visible stage inside our own pipeline too.

---

## 10. Turn on the Deploy and Monitor stages

We add two secrets so the pipeline can deploy and then check the live app.

1. In Render, open your service, go to Settings, and copy the Deploy Hook URL.
2. In GitHub, go to your repo Settings, then Secrets and variables, then Actions.
3. Add two repository secrets:
   - `RENDER_DEPLOY_HOOK_URL` = the deploy hook URL from Render
   - `SERVICE_URL` = your live Render URL (no trailing slash)
4. Push any small change to `main`.

Now the full pipeline runs end to end:

- Build and Test
- Deploy triggers Render to release the new version
- Monitor waits a moment, then checks the live `/health` and confirms it is up

---

## 11. Set up simple uptime monitoring (optional, recommended)

The pipeline checks health once, right after a deploy. To watch the app around
the clock, see MONITORING.md for a free UptimeRobot setup that pings `/health`
every few minutes and emails you if it ever goes down.

---

## 12. In class

Open DEMO_SCRIPT.md for the minute by minute flow, including the moment where you
break a test on purpose and watch the pipeline refuse to deploy.

---

## Quick troubleshooting

| Problem                      | Likely fix                                              |
| ---------------------------- | ------------------------------------------------------- |
| `npm install` fails          | Check Node.js is installed (`node -v`)                  |
| Push rejected                | Make sure the GitHub repo was created empty             |
| Actions tab shows nothing    | Settings, then Actions, then allow all actions          |
| Deploy step says skipped     | Add the RENDER_DEPLOY_HOOK_URL secret                   |
| Monitor step says skipped    | Add the SERVICE_URL secret                              |
| First Render request is slow | Free services sleep when idle, the first hit wakes them |
