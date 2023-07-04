const express = require("express");
const { insertComment, setComment } = require("../models/comment.model");
const { deleteByProperty } = require("../models/general.model");

module.exports.createComment = async (req, res) => {
  let comment_id = Math.floor(Math.random() * 10000000);
  let { photo_id, user_id, comment_content, now } = req.body;
  console.log(req.body);
  console.log("comment line 10");
  insertComment(comment_id, photo_id, user_id, now, comment_content)
    .then(() =>
      res.status(201).json({
        data: {
          comment_id,
          photo_id,
          user_id,
          comment_create_time: now,
          comment_content,
        },
      })
    )
    .catch((err) => res.status(500).json({ err }));
};
module.exports.updateComment = async (req, res) => {
  let { property, value, comment_id } = req.body;
  await setComment(property, value, comment_id)
    .then(() =>
      res.status(201).json({ status: true, message: "Update successfully " })
    )
    .catch((err) => res.status(500).json({ err }));
};
module.exports.deleteComment = async (req, res) => {
  let { id } = req.params;

  deleteByProperty("tb_comment", "comment_id", id)
    .then(() =>
      res.status(201).json({ status: true, message: "Delete successfully " })
    )
    .catch((err) => res.status(500).json({ err }));
};
