const { db } = require("../utils/dataBase.utils");
const mysql = require("mysql2");

module.exports.insertComment = (
  comment_id,
  photo_id,
  user_id,
  comment_create_time,
  comment_content
) => {
  console.log("model comment line 11");
  return db.execute(
    `INSERT INTO tb_comment(comment_id,photo_id,user_id,comment_create_time,comment_content)VALUE(?,?,?,?,?)`,
    [comment_id, photo_id, user_id, comment_create_time, comment_content]
  );
};
module.exports.setComment = (column, value, comment_id) => {
  let sql = "UPDATE ?? SET(??=?) WHERE comment_id=?";
  let inserts = ["tb_comment", column, value, comment_id];
  sql = mysql.format(sql, inserts);
  return db.execute(sql);
};
module.exports.checkOwnerComment = (comment_id, user_id) => {
  return db.execute(
    `SELECT * FROM tb_comment WHERE comment_id=? AND user_id=?`,
    [comment_id, user_id]
  );
};
module.exports.checkLikeComment = async (comment_id, user_id) => {
  const check = await db.execute(
    `SELECT * FROM tb_like_comment WHERE comment_id=? AND user_id=?`,
    [comment_id, user_id]
  );
  const result = check[0];
  return result;
};
