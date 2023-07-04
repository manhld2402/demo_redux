const express = require("express");
const {
  validateBody,
  isExisted,
  isNotExisted,
} = require("../middleware/auth.middleware");
const { signup, login } = require("../controller/auth.controller");
const router = express.Router();

router.post("/signup", validateBody, isExisted, signup);
router.post("/login", validateBody, login);

module.exports = router;
