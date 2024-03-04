const express = require("express");
const router = require("./routers");
const {
  errorHandler,
  routeNotFoundHandler,
} = require("./middlewares/errorHandler");
const checkForAuth = require("./middlewares/authentication");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const app = express();

//fileupload
app.use(fileupload({
  createParentPath: true,
}))

//Parse body data
app.use(express.json());

//Parse form data
app.use(express.urlencoded({ extended: false }));

//Parse cookies
app.use(cookieParser());

//Serve static files
app.use(express.static("public"));

//Authentication middleware
app.use(checkForAuth("token"));

//View engine
app.set("view engine", "ejs");

//Log the request
app.use(morgan("dev"));

//Routes
app.use("/", router);

//Invalid api request
app.use((req, res, next) => {
  routeNotFoundHandler(req, res, next);
});

//Errors
app.use(errorHandler);

module.exports = app;
