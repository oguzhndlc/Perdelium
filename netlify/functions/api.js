const express = require("express");
const serverless = require("serverless-http");
const path = require("path");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

// DEBUG: Terminale hangi yolun geldiğini görelim
app.use((req, res, next) => {
  console.log(`Gelen İstek: ${req.url}`);
  next();
});

// ÇÖZÜM: Express'e hem Netlify'ın tam yolunu hem de kısa yolu tanıtıyoruz
const router = express.Router();
router.use("/users", userRoutes);

// 1. Durum: /api/users olarak gelen istekler için
app.use("/api", router);

// 2. Durum: /.netlify/functions/api/users olarak gelen istekler için
app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);