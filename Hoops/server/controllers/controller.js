"use strict";

// The older account listing and authentication handlers have been removed.
// The Expo application currently uses local demo sessions rather than this API.
// Implement authenticated endpoints only after server-side authorization,
// request validation, and rate limiting have been added and tested.
exports.health = (_req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ status: "ok" });
};
