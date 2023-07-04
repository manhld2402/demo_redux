const { findByProperty } = require("../models/general.model");

module.exports.getUser = async (req, res) => {
  try {
    let { id } = req.params;
    let findUser = await findByProperty("tb_user", "user_id", id);
    let [resultFindUser] = findUser[0];
    let findPhoto = await findByProperty("tb_photo", "user_id", id);
    let resultFindPhoto = findPhoto[0];
    console.log(resultFindPhoto);
    res
      .status(200)
      .json({ dataUser: resultFindUser, dataPhoto: resultFindPhoto });
  } catch (err) {
    console.log(err);
  }
};
module.exports.updateUser = async (req, res) => {
  try {
    let dataUser = { ...JSON.parse(req.body.text) };
  } catch (err) {
    console.log(err);
  }
};
