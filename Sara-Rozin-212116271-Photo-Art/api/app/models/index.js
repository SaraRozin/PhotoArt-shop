const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.order = require("./order.model");
db.userPicture = require("./userPicture.model");
db.picture = require("./picture.model");
module.exports = db;
