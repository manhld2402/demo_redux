const {
  insertLike,
  insertFollow,
  deleteLike,
} = require("../models/action.model");

module.exports.likeComment = async (req, res) => {
  console.log(req.headers.authorization);
  console.log("action.controller Like", req.headers.authorization);
  let { comment_id } = req.body;
  insertLike(comment_id, req.headers.authorization)
    .then(() => res.status(201).json({ status: "Like success" }))
    .catch((err) => res.status(500).json({ err }));
};
module.exports.dislikeComment = async (req, res) => {
  let { id } = req.params;
  console.log("action.controller disLike", id);
  deleteLike(id, req.headers.authorization)
    .then(() => res.status(201).json({ status: "Dislike success" }))
    .catch((err) => res.status(500).json({ err }));
};
module.exports.followUser = async (req, res) => {
  console.log(req.headers.authorization);
  let { user_is } = req.body;
  insertFollow(user_is, req.headers.authorization)
    .then(() => res.status(201).json({ status: "Follow success" }))
    .catch((err) => res.status(500).json({ err }));
};
