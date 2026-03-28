const Chapter = require("../models/Chapter");
const { uploadToCloudinary } = require("../utils/upload");

exports.getChapterNavigation = async (req, res) => {
   const { id } = req.params;

   const current = await Chapter.findById(id);
   if (!current) {
      return res.status(404).json({ message: "Not found" });
   }

   // chapter trước
   const prev = await Chapter.findOne({
      comicId: current.comicId,
      chapterNumber: { $lt: current.chapterNumber },
   })
      .sort({ chapterNumber: -1 })
      .select("_id chapterNumber");

   // chapter sau
   const next = await Chapter.findOne({
      comicId: current.comicId,
      chapterNumber: { $gt: current.chapterNumber },
   })
      .sort({ chapterNumber: 1 })
      .select("_id chapterNumber");

   res.json({
      prev,
      next,
   });
};

exports.uploadChapter = async (req, res) => {
   const { comicId, title, chapterNumber } = req.body;

   const files = req.files;
   const pages = [];

   for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const url = await uploadToCloudinary(file.buffer);

      pages.push(url);
   }

   const chapter = await Chapter.create({
      comicId,
      title,
      chapterNumber,
      pages,
   });

   res.json(chapter);
};

exports.getChapters = async (req, res) => {
   const chapters = await Chapter.find({ comicId: req.params.comicId }).sort({
      chapterNumber: -1,
   });

   res.json(chapters);
};

exports.getChapterDetail = async (req, res) => {
   const chapter = await Chapter.findById(req.params.id);

   res.json(chapter); // pages đã là URL đầy đủ
};

exports.deleteChapter = async (req, res) => {
   const { id } = req.params;

   await Chapter.findByIdAndDelete(id);

   res.json({ message: "Deleted chapter" });
};

exports.updateChapterPages = async (req, res) => {
   const { id } = req.params;
   const { pages } = req.body; // array string

   const chapter = await Chapter.findByIdAndUpdate(
      id,
      { pages },
      { new: true },
   );

   res.json(chapter);
};

exports.updateChapterFull = async (req, res) => {
   const { id } = req.params;

   const oldPages = req.body.oldPages || [];
   const newFiles = req.files || [];

   const uploaded = [];

   // upload ảnh mới
   for (let file of newFiles) {
      const key = `chapters/${id}/${Date.now()}-${file.originalname}`;

      // upload lên cloudinary
      // const url = await upload(file.buffer);

      uploaded.push(key);
   }

   const finalPages = [...oldPages, ...uploaded];

   const chapter = await Chapter.findByIdAndUpdate(
      id,
      { pages: finalPages },
      { new: true },
   );

   res.json(chapter);
};
