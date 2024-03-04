const router = require("express").Router();
const userController = require("../controllers/user.controllers");
const { fileUpload } = require("../middlewares/fileuploader");
const { validateView } = require("../middlewares/validate");
const userValidation = require("../validations/validations");

router
  .route("/signup")
  .get((req, res) => {
    res.render("signup");
  })
  .post(validateView(userValidation.signupValidSchema), fileUpload, userController.signup);

router
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(validateView(userValidation.loginValidSchema), userController.login);

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/login");
});

module.exports = router;
