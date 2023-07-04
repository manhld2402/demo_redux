const { db } = require("../utils/dataBase.utils");
const mysql = require("mysql2");
module.exports.setUser = async (
  user_firstname,
  user_lastname,
  user_about,
  user_id
) => {
  const setUser = await db.execute(
    `UPDATE tb_user SET user_firstname=? user_lastname=? user_about=? WHERE user_id=?`,
    [user_firstname, user_lastname, user_about, user_id]
  );
  const resultSet = setUser[0];
  return resultSet;
};
module.exports.setAvatar = async (user_avatar, user_id) => {
  const setAvatar = await db.execute(
    `UPDATE tb_user SET user_avatar=? WHERE user_id=?`,
    [user_avatar, user_id]
  );
  const resultSet = setAvatar[0];
  return resultSet;
};
