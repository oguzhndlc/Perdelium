const express = require("express");

const userRoutes = require("./routes/userRoutes");
const fileRoutes = require("./routes/fileRoutes");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// 👇 BUNLAR ŞART
app.use("/users", userRoutes);
app.use("/files", fileRoutes);

app.get("/debug", (req, res) => {
  res.json({ debug: true });
});


module.exports = app;
