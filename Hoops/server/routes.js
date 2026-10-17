"use strict";

const { health } = require("./controllers/controller");

module.exports = function registerRoutes(app) {
  app.get("/health", health);
};
