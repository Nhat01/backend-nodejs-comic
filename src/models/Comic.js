const mongoose = require("mongoose");

const ComicSchema = new mongoose.Schema({
   title: String,
   description: String,
   cover: String,
   createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comic", ComicSchema);
