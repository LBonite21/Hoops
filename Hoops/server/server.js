"use strict";

// Legacy prototype API. The Expo app does not currently use this server.
// Bind to localhost by default and expose only the health check.
const express = require("express");
const app = express();

const port = Number(process.env.PORT || 3002);
const host = process.env.HOST || "127.0.0.1";

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535");
}

app.disable("x-powered-by");
app.use((_req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

require("./routes")(app);

app.listen(port, host, () => {
  console.log(`Hoops prototype API listening at http://${host}:${port}`);
});
