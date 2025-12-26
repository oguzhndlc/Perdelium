const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");

router.get("/", usersController.getUser);
router.post("/", usersController.saveUser);
router.delete("/", usersController.deleteUser);
router.put("/", usersController.updateUser);

module.exports = router;
