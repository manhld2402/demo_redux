const { db } = require("../utils/dataBase.utils");
const mysql = require("mysql2");

module.exports.findByProperty = (table, key, value) => {
  let sql = "SELECT * FROM ?? WHERE ??=?";
  let inserts = [table, key, value];
  sql = mysql.format(sql, inserts);
  return db.execute(sql);
};
module.exports.deleteByProperty = (table, key, value) => {
  let sql = "DELETE FROM ?? WHERE ??=?";
  let inserts = [table, key, value];
  sql = mysql.format(sql, inserts);
  return db.execute(sql);
};
