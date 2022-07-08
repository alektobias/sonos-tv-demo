const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(
    "/api/*",
    createProxyMiddleware({
      target: "https://dev.onawhim.com",
      changeOrigin: true,
      secure: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      logLevel: "debug",
    })
  );

  server.all("*", (req, res) => handle(req, res));

  server.listen(port, () => console.log(`Running on http://localhost:${port}`));
});
