const { db } = require("../utils/dataBase.utils");
const sql = require("mysql2");

module.exports.insertAuth = (
  user_id,
  user_firstname,
  user_email,
  password,
  user_birthdate
) => {
  return db.execute(
    `INSERT INTO tb_user(user_id,user_firstname,user_email,password,user_birthdate)VALUE(?,?,?,?,?)`,
    [user_id, user_firstname, user_email, password, user_birthdate]
  );
};
module.exports.setAuth = (
  user_id,
  user_name,
  user_avatar,
  user_about,
  user_web
) => {
  return db.execute(
    `UPDATE tb_user SET(user_id, user_name,user_avatar,user_about,user_web)VALUE(?,?,?,?,?) `,
    [user_id, user_name, user_avatar, user_about, user_web]
  );
};
