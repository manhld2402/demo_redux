const express = require("express");
const multer = require("multer");

// config storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../public/assits`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let ext = file.mimetype.split("/")[file.mimetype.split("/").length - 1];
    cb(null, file.fieldname + "-" + uniqueSuffix + `.${ext}`);
  },
  // path: function (req, file, cd) {
  //   // Truy cập đường dẫn file đã lưu
  //   const filePath = file.path;

  //   // Tạo đường dẫn tới file dựa trên thư mục uploads và tên file
  //   const fileUrl = path.join(__dirname, filePath)
  // },
  // textPost: function (req, file) {
  //   let formData = req.body;
  //   let text = formData.get("text");
  //   console.log("photocontroller", text);
  // },
});
const upload = multer({ storage: storage }).single("file");

module.exports.uploadFile = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({ err });
    } else {
      next();
    }
  });
};
