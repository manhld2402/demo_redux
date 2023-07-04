const epress = require("express");
const multer = require("multer");
const fs = require("fs");
const { findByProperty, deleteByProperty } = require("../models/general.model");
const {
  setPhoto,
  selectAllPhoto,
  insertPhoto,
  findTag,
  insertTag,
  searchTag,
} = require("../models/photo.model");
module.exports.getAllPhoto = (req, res) => {
  selectAllPhoto()
    .then((data) =>
      res.status(200).json({ status: "success", dataPhotos: data[0] })
    )
    .catch((err) =>
      res.status(500).json({
        status: "fail",
        message: err,
      })
    );
};
module.exports.getDetailPhoto = async (req, res) => {
  let { id } = req.params;
  let resData = {
    dataPhoto: null,
    dataOwner: {},
    dataComment: [],
    relatedImages: [],
  };
  try {
    const dataPhoto = await findByProperty("tb_photo", "photo_id", id);
    let resDataPhoto = {};
    resDataPhoto = [...dataPhoto[0]];
    resData.dataPhoto = resDataPhoto[0];
    let [findOwner] = dataPhoto[0];
    const findDataOwner = await findByProperty(
      "tb_user",
      "user_id",
      findOwner.user_id
    );
    let [dataOwner] = findDataOwner[0];
    resData.dataOwner = {
      follower: dataOwner.follower,
      user_id: dataOwner.user_id,
      user_avatar: dataOwner.user_avatar,
      user_firstname: dataOwner.user_firstname,
      user_lastname: dataOwner.user_lastname,
    };
    const findFollow = await findByProperty(
      "tb_user_follower",
      "user_id",
      dataOwner.user_id
    );
    let checkFollow = findFollow[0].find(
      (e) => e.follower_id == req.headers.authorization
    );
    if (checkFollow) {
      resData.follower = true;
    } else {
      resData.follower = false;
    }
    console.log("photo.controller checkFollow", checkFollow);
    const comments = await findByProperty("tb_comment", "photo_id", id);
    if (comments[0]) {
      for (const comment of comments[0]) {
        const userComment = await findByProperty(
          "tb_user",
          "user_id",
          comment.user_id
        );
        const findLike = await findByProperty(
          "tb_like_comment",
          "comment_id",
          comment.comment_id
        );

        let checkLike = await findLike[0].filter(
          (e) => e.user_id == req.headers.authorization
        );

        let [dataUserComment] = userComment[0];
        if (checkLike.length > 0) {
          resData.dataComment.push({
            ...comment,
            likes: findLike[0].length,
            user_avatar: dataUserComment.user_avatar,
            user_firstname: dataUserComment.user_firstname,
            user_lastname: dataUserComment.user_lastname,
            checkLike: true,
          });
        } else {
          resData.dataComment.push({
            ...comment,
            likes: findLike[0].length,
            user_avatar: dataUserComment.user_avatar,
            user_firstname: dataUserComment.user_firstname,
            user_lastname: dataUserComment.user_lastname,
            checkLike: false,
          });
        }
      }
    }
    console.log("line 103", resDataPhoto[0].photo_id);
    const findTag1 = await findTag(resDataPhoto[0].photo_id);
    console.log("findTag1", findTag1);
    if (findTag1) {
      const relatedImages = await searchTag(findTag1.photo_tag1);
      console.log("line105", relatedImages);
      resData.relatedImages = [...relatedImages];
    }

    res.status(200).json({ ...resData });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.uploadSingle = async (req, res) => {
  try {
    let date = Date.now();
    let photo_id = Math.floor(Math.random() * 100000);
    let dataPhoto = { ...JSON.parse(req.body.text) };
    let path = `http://localhost:8000/assits/${req.file.filename}`;
    console.log(req.file.filename);
    const pushTbPhoto = await insertPhoto(
      photo_id,
      dataPhoto.user_id,
      path,
      dataPhoto.photoTitle,
      dataPhoto.photoContent,
      date,
      dataPhoto.album_id
    );
    console.log(pushTbPhoto);
    let arrTag = dataPhoto.tag.split(",");
    let tag = ["", "", "", ""];
    for (i = 0; arrTag.length >= 4 ? i < 4 : i < arrTag.length; i++) {
      tag[i] = arrTag[i];
    }
    const pushTbTag = await insertTag(photo_id, tag[0], tag[1], tag[2], tag[3]);
    res.status(201).json({
      status: "success",
      photo_id: photo_id,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};
module.exports.updatePhoto = (req, res) => {
  let { id } = req.params;
  let { photo_title, photo_content } = req.body;
  setPhoto(photo_title, photo_content, id)
    .then(() =>
      res.status(201).json({ status: true, message: "Update successfully" })
    )
    .catch((err) => res.status(500).json({ err }));
};
module.exports.deletePhoto = async (req, res) => {
  let { id } = req.params;
  try {
    findByProperty("tb_photo", "photo_id", id).then((data) => {
      fs.unlink(
        `./public/assits/${data[0][0].photo_path.split("assits")[1].slice(1)}`,
        (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          }
        }
      );
    });
    const deleteInMysql = await deleteByProperty("tb_photo", "photo_id", id);

    res
      .status(201)
      .json({ status: "success", message: "Delelte successfully" });
  } catch (err) {
    res.status(500).json({ err });
  }
};
module.exports.searchPhoto = (req, res) => {
  let { search } = req.query;
  searchTag(search)
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(500).json({ err }));
};
module.exports.testTag = (req, res) => {
  let tag = "lol";
  searchTag(tag)
    .then((data) => console.log("hihi", data))
    .catch((err) => console.log("sad", err));
};
