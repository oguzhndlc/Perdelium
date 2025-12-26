const express = require("express");
const router = express.Router();

const fileController = require("../controllers/file.controller");

// 👇 BU ŞART
router.get("/users", fileController.getUsers);
router.post("/users", fileController.saveUser);
router.delete("/users", fileController.deleteUser);
router.put("/users", fileController.updateUser);

module.exports = router;
