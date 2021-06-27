const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.shortlink = require("./shortlink.model");

module.exports = db;