// netlify/functions/src/app.js
const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

// ❗ api YOK, netlify/functions YOK
app.use("/users", userRoutes);

module.exports = app;
