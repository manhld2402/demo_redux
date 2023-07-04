const Joi = require("joi");
const jwt = require("jsonwebtoken");
// const {} = require("../models/photo.model/");
const { findByProperty } = require("../models/general.model");
module.exports.validateBody = (req, res, next) => {
  let { user_email, password } = req.body;
  const schema = Joi.object({
    user_email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  let value = schema.validate({ user_email, password });
  if (!value.error) {
    next();
  } else {
    res
      .status(500)
      .json({ status: "fail", message: value.error.details[0].message });
  }
};
module.exports.isExisted = (req, res, next) => {
  let { user_email } = req.body;
  findByProperty("tb_user", "user_email", user_email).then((data) => {
    if (data[0].length == 1) {
      res.status(400).json({
        status: "fail",
        message: `User with email: ${user_email} isExisted`,
      });
    } else next();
  });
};
module.exports.isNotExisted = (req, res, next) => {
  let { user_email } = req.body;
  findByProperty("tb_user", "user_email", user_email).then((data) => {
    let [users] = data;
    if (users.length == 0) {
      res.status(400).json({
        status: "fail",
        message: `User with email: ${user_email} isNotExisted`,
      });
    } else next();
  });
};
module.exports.checkToken = (req, res, next) => {
  try {
    let { authorization } = req.headers;
    let checkToken = jwt.verify(authorization, "project");
    if (checkToken) {
      next();
    }
  } catch (err) {
    res.status(404).json({ status: "fail", message: "Please Login" });
  }
};
