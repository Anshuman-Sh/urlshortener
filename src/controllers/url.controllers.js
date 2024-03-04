const {
  STATUS_CODES,
  ERROR_MESSAGES,
} = require("../config/appConstants");
const Url = require("../models/urlSchema");
const { NotFoundError } = require("../utils/errors");
const { catchAsync } = require("../utils/universalFunction");
const shortid = require("shortid");

const createShortUrl = catchAsync(async (req, res) => {
  const { redirectUrl } = req.body;

  const shortId = shortid();

  const data = {
    shortUrl: shortId,
    redirectUrl,
    createdBy: req.user.id,
  };

  await Url.create(data);

  res.redirect("./allurls")
});

const allshortUrls = catchAsync(async (req, res) => {
  const allUrls = await Url.find({ createdBy: req.user.id }).select(
    "shortUrl redirectUrl visitors"
  );

  res.render("myUrls", { urls: allUrls });
});

const redirectUrl = catchAsync(async (req, res) => {
  const { shortId } = req.params;
  const urlDoc = await Url.findOne({
    shortUrl: shortId,
    createdBy: req.user.id,
  });

  // console.log(shortId, "Parameters............................")

  if (!urlDoc)
    throw new NotFoundError(
      STATUS_CODES.NOT_FOUND,
      ERROR_MESSAGES.URL_NOT_FOUND
    );

  await Url.updateOne(
    { shortUrl: urlDoc.shortUrl },
    {
      $push: {
        visitors: { user: req.user.id, timestamp: new Date().toUTCString() },
      },
    }
  );

  res.redirect(urlDoc.redirectUrl);
});

module.exports = { createShortUrl, allshortUrls, redirectUrl };
