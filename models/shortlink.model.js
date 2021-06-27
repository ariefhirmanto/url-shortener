const mongoose = require("mongoose");
const shortId = require('shortid');
const { shortlink } = require(".");
const collectionName = 'shortlink';

const Shortlink = mongoose.model(
  "Shortlink",
  new mongoose.Schema({
    full_url: {
        type: String,
        required: true
        },
    short_url: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
  },
  { timestamps: true })
  ,collectionName
);

module.exports = Shortlink;