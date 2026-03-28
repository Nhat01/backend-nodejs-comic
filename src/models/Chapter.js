const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
   comicId: mongoose.Schema.Types.ObjectId,
   title: String,
   chapterNumber: Number,
   pages: [String],
   createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chapter", ChapterSchema);
