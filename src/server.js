// A tiny web server so our calculator can be DEPLOYED and MONITORED.
// It uses only Node's built-in "http" module, so there is nothing extra to
// install. That keeps the demo simple while still giving us a real, live URL.

const http = require("http");
const { add } = require("./calculator");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  res.setHeader("Content-Type", "application/json");

  // /health is what the platform and our monitoring use to check the app is alive.
  if (url.pathname === "/health") {
    res.writeHead(200);
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  // /add?a=2&b=3 returns the sum. A tiny live feature to show after deployment.
  if (url.pathname === "/add") {
    const a = Number(url.searchParams.get("a"));
    const b = Number(url.searchParams.get("b"));
    res.writeHead(200);
    res.end(JSON.stringify({ a, b, result: add(a, b) }));
    return;
  }

  // Home page.
  if (url.pathname === "/") {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        message: "Calculator API is running",
        try: "/add?a=2&b=3",
      }),
    );
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
