# CI/CD Demo: Calculator API

A deliberately simple project for a CI/CD and QA session. It shows the whole
pipeline from start to end: write code, build, test, deploy, and monitor.

The app itself is tiny on purpose: a few calculator functions wrapped in a small
web server. The star of the show is the pipeline, not the app.

## What is inside

```
ci-cd-demo/
├── src/
│   ├── calculator.js     plain add, subtract, multiply, divide functions
│   └── server.js         a tiny web server (built-in http, no dependencies)
├── tests/
│   └── calculator.test.js  5 simple unit tests (this is QA)
├── .github/workflows/ci.yml  the pipeline: build, test, deploy, monitor
├── package.json
├── INSTRUCTIONS.md       full setup, start to end
├── DEMO_SCRIPT.md        minute by minute plan for class
└── MONITORING.md         how the monitoring part works
```

## The pipeline in one picture

```
  git push
     |
     v
  Build   (install dependencies)
     |
     v
  Test    (run the 5 tests, the QA gate)
     |  pass
     v
  Deploy  (release to Render)
     |
     v
  Monitor (check the live /health URL)
```

If any stage fails, the stages below it do not run.

## Run it locally

Needs Node.js 20 or newer.

```bash
npm install     # build: get dependencies
npm test        # test: run the 5 unit tests
npm start       # run the server on http://localhost:3000
```

Then open in a browser or use curl:

```bash
curl http://localhost:3000/health
curl "http://localhost:3000/add?a=2&b=3"
```

Full step by step instructions are in INSTRUCTIONS.md.
# ci-cd-demo
