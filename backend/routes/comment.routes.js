const express = require("express");
const {
  createComment,
  deleteComment,
} = require("../controller/comment.controller");
const { checkOwnerComment } = require("../models/comment.model");
const { isOwner } = require("../middleware/comment.middleware");
const router = express.Router();

router.post("/post", createComment);
router.delete("/delete/:id", isOwner, deleteComment);

module.exports = router;
