const express = require("express");
const server = express();
const port = 8000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const googleApi = require("googleapis");
//use thir-party middleware
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(morgan("dev"));
server.use(cors());
server.use(express.static("public"));
//import Router
const authRoutes = require("./routes/auth.routes");
const { checkToken } = require("./middleware/auth.middleware");
const { login } = require("./controller/auth.controller");
const mediaRoutes = require("./routes/photo.routes");
const commentRoutes = require("./routes/comment.routes");
const actionRoutes = require("./routes/action.routes");
const userRoutes = require("./routes/user.routes");
//use Router
server.use("/api/v1/auth", authRoutes);
server.use("/api/v1/media", mediaRoutes);
server.use("/api/v1/comment", commentRoutes);
server.use("/api/v1/action", actionRoutes);
server.use("/api/v1/user", userRoutes);
server.post("/test", login);

server.listen(8000, () => {
  console.log("listen port : 8000");
});
