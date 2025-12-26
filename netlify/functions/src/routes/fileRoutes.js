const express = require("express");
const router = express.Router();

const fileController = require("../controllers/file.controller");

// 👇 BU ŞART
router.get("/", fileController.getFile);
router.post("/", fileController.saveFile);
router.delete("/", fileController.deleteFile);
router.put("/", fileController.updateFile);

module.exports = router;
