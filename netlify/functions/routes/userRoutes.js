const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUser);
router.post("/add", userController.createUser); // Yeni rota

module.exports = router;