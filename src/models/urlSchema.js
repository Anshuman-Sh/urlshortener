const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortUrl: { type: String },
    redirectUrl: { type: String, required: true },
    visitors: [{ user: { type: String }, timestamp: { type: String } }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Url = mongoose.model("urls", urlSchema);

module.exports = Url;
