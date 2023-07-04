const express = require("express");
const {
  checkOwnerComment,
  checkLikeComment,
} = require("../models/comment.model");
const { findByProperty } = require("../models/general.model");

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let [checkOwner] = await checkOwnerComment(id, req.headers.authorization);
  if (checkOwner) {
    next();
  } else {
    res.status(400).json({ messs: "You are not Owner" });
  }
};
module.exports.liked = async (req, res, next) => {
  let { comment_id } = req.body;
  const result = await checkLikeComment(comment_id, req.headers.authorization);
  if (result) {
    next();
  } else {
    res.status(404).json({ message: "Liked" });
  }
};
