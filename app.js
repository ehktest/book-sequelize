"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("./app/controllers/logEvents");
const { sequelize } = require("./app/models/bookModel");
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

// Logger
app.use(logger);

// Body receivers
// JSON -> Accept req.body data, convert it to object, assign object to req.body
app.use(express.json());
// Text -> Accept req.body data, assign it to req.body directly
app.use(express.text());
// Form -> Accept req.body data, convert it to object, assign object to req.body
app.use(express.urlencoded({ extended: true }));

// IIFE Server
(async () => {
  // checking database connection
  await sequelize
    .authenticate()
    .then(() => {
      console.log(" * DB Connected *");
    })
    .catch((err) => {
      console.error(err?.message);
      console.error("* DB Not Connected *");
      throw new Error(
        `DB Connection Error: ${err?.cause || err?.message || err}`
      );
    });

  // model - db synchronization
  await sequelize.sync({ alter: true }).catch((err) => {
    console.error(err?.message);
    console.error("* Sync Failed *");
    throw new Error(`Sync Error: ${err?.cause || err?.message || err}`);
  });

  // book routes
  app.use("/books", require("./app/routes/bookRoute"));

  // not found route handler
  app.all("*", (req, res) => {
    res.json({
      error: true,
      message: `${req.method} ${req.path} not found`,
    });
  });

  // error handler middleware via imported controller
  app.use(require("./app/controllers/errorHandler"));

  // request listener
  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
})();
