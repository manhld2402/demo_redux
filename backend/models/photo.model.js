const { db } = require("../utils/dataBase.utils");
const mysql = require("mysql2");
const { findByProperty } = require("./general.model");
module.exports.selectAllPhoto = () => {
  return db.execute(`SELECT * FROM tb_photo ORDER BY photo_create_time DESC`);
};

module.exports.insertPhoto = (
  photo_id,
  user_id,
  photo_path,
  photo_title,
  photo_content,
  photo_create_time,
  album_id
) => {
  console.log("insert", user_id);
  return db.execute(
    `INSERT INTO tb_photo(photo_id,user_id,photo_path,photo_title,photo_content,photo_create_time,album_id)VALUE(?,?,?,?,?,?,?)`,
    [
      photo_id,
      user_id,
      photo_path,
      photo_title,
      photo_content,
      photo_create_time,
      album_id,
    ]
  );
};
module.exports.setPhoto = (photo_title, photo_content, photo_id) => {
  return db.execute(
    `UPADTE tb_photo SET(photo_title=?,photo_content=?) WHERE photo_id=? `,
    [photo_title, photo_content, photo_id]
  );
};
module.exports.insertTag = (
  photo_id,
  photo_tag1,
  photo_tag2,
  photo_tag3,
  photo_tag4
) => {
  return db.execute(
    `INSERT INTO tb_tag(photo_id,photo_tag1,photo_tag2,photo_tag3,photo_tag4) VALUE(?,?,?,?,?)`,
    [photo_id, photo_tag1, photo_tag2, photo_tag3, photo_tag4]
  );
};
module.exports.findTag = async (photo_id) => {
  const findTag = await db.execute(
    `SELECT photo_tag1 FROM tb_tag WHERE photo_id=?`,
    [photo_id]
  );
  let [photoId] = findTag[0];
  return photoId;
};
module.exports.searchTag = async (tag) => {
  try {
    const searchTag = await db.execute(
      `SELECT photo_id FROM tb_tag WHERE photo_tag1 LIKE ? OR photo_tag2 LIKE ? OR photo_tag3 LIKE ? OR photo_tag4 LIKE ?`,
      [`%${tag}%`, `%${tag}%`, `%${tag}%`, `%${tag}%`]
    );
    let arrPhoto = searchTag[0];
    let arrPhotoReturn = [];
    console.log("arrPhoto", arrPhoto);
    if (arrPhoto) {
      for (let i = 0; i < arrPhoto.length; i++) {
        const resultFind = await findByProperty(
          "tb_photo",
          "photo_id",
          arrPhoto[i].photo_id
        );
        arrPhotoReturn.push(resultFind[0][0]);
      }
    }
    return arrPhotoReturn;
  } catch (err) {
    console.log(err);
  }
};
// require("dotenv").config();
// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = process.env.REDIRECT_URI;
// const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
