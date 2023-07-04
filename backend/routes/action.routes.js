const express = require("express");
const {
  likeComment,
  followUser,
  dislikeComment,
} = require("../controller/action.controller");
const { liked } = require("../middleware/comment.middleware");
const router = express.Router();

router.post("/like", liked, likeComment);
router.delete("/like/:id", dislikeComment);
router.post("/follow", followUser);
//thieu xoa
module.exports = router;
