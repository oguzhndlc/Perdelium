// netlify/functions/src/app.js
const express = require("express");
const router = express.Router();
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

router.use("/users", userRoutes);

app.use("/api", router);

app.use("/.netlify/functions/api", router);

module.exports = app;