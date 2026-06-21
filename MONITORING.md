# Monitoring: Knowing the App Is Healthy

Deploying is not the finish line. Monitoring is how you know the app is still
working after it goes live. This demo shows monitoring in three simple layers,
from basic to always on.

---

## Layer 1: The health endpoint

The server has a `/health` route that returns a small response:

```json
{ "status": "ok" }
```

This is the standard way an app says "I am alive." Both the hosting platform and
our monitoring use it. Visit it any time:

```
https://your-app.onrender.com/health
```

---

## Layer 2: The pipeline checks health after every deploy

The Monitor stage in `.github/workflows/ci.yml` runs right after Deploy. It waits
a few seconds for the new version to come up, then calls `/health`:

```bash
curl -f "$SERVICE_URL/health"
```

If that check fails, the pipeline goes red and you know immediately that the new
release did not come up correctly. This is monitoring built into the pipeline.

---

## Layer 3: Always on uptime monitoring (free)

The pipeline only checks once, at deploy time. To watch the app day and night,
use a free uptime monitor. UptimeRobot is the simplest:

1. Go to https://uptimerobot.com and create a free account.
2. Click Add New Monitor.
3. Monitor type: HTTP(s).
4. URL: your `https://your-app.onrender.com/health`.
5. Checking interval: every 5 minutes.
6. Add your email for alerts.

Now the monitor pings `/health` every 5 minutes. If the app ever goes down, you
get an email within minutes, without anyone having to watch a screen.

---

## What real teams also watch

Once the basics are in place, production monitoring usually adds:

- Logs: the stream of messages the app prints, viewable in the Render dashboard.
- Metrics: response time, memory, and CPU, also in the dashboard.
- Alerts: rules that notify the team when something crosses a threshold.

The idea is always the same. The app reports how it is doing, something watches
those reports, and people get told when attention is needed. What you learn from
monitoring feeds back into the next code change, which starts the whole cycle
again.
