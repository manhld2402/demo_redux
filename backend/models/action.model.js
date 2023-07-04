const { db } = require("../utils/dataBase.utils");
const mysql = require("mysql2");

module.exports.insertFollow = (user_id, follower_id) => {
  return db.execute(
    `INSERT INTO tb_user_follower(user_id,follower_id) VALUE(?,?)`,
    [user_id, follower_id]
  );
};
module.exports.insertLike = (comment_id, user_id) => {
  return db.execute(
    `INSERT INTO tb_like_comment(comment_id,user_id) VALUE(?,?)`,
    [comment_id, user_id]
  );
};
module.exports.deleteLike = (comment_id, user_id) => {
  return db.execute(
    `DELETE FROM tb_like_comment WHERE comment_id=? AND user_id=?`,
    [comment_id, user_id]
  );
};
