const express = require("express");
const { uploadFile } = require("../middleware/photo.middleware");
const {
  getDetailPhoto,
  uploadSingle,
  deletePhoto,
  updatePhoto,
  getAllPhoto,
  testTag,
  searchPhoto,
} = require("../controller/photo.controller");
const { checkToken } = require("../middleware/auth.middleware");
const router = express.Router();
const multer = require("multer");
router.get("/", checkToken, getAllPhoto);
router.post("/post", uploadFile, uploadSingle);
router.get("/search", searchPhoto);
router.get("/detail/:id", getDetailPhoto);
router.put("/detail/:id", updatePhoto);
router.delete("/:id", deletePhoto);
router.get("/test", testTag);

module.exports = router;
