const router = require("express").Router();
const urlController = require("../controllers/url.controllers");
const { validateView } = require("../middlewares/validate");
const User = require("../models/userSchema");
const { urlValidSchema } = require("../validations/validations");

router.route("/").get(async (req, res) => {
  const user = await User.findOne({ _id: req.user.id });
  res.render("home", { user });
});

router.get("/allurls", urlController.allshortUrls);

router.post(
  "/shortUrl",
  validateView(urlValidSchema),
  urlController.createShortUrl
);

router.get("/url/:shortId", urlController.redirectUrl);

module.exports = router;
