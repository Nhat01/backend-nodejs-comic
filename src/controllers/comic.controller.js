const Comic = require("../models/Comic");
const Chapter = require("../models/Chapter");

exports.getComics = async (req, res) => {
   try {
      const comics = await Comic.find().lean();

      const result = await Promise.all(
         comics.map(async (comic) => {
            // đếm số chapter
            const chapterCount = await Chapter.countDocuments({
               comicId: comic._id,
            });

            // lấy chapter mới nhất
            const latestChapter = await Chapter.findOne({
               comicId: comic._id,
            })
               .sort({ chapterNumber: -1 })
               .lean();

            return {
               ...comic,
               chapterCount,
               thumbnail: latestChapter?.pages?.[0] || null,
            };
         }),
      );

      res.json(result);
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error" });
   }
};

exports.createComic = async (req, res) => {
   const comic = await Comic.create(req.body);
   res.json(comic);
};

exports.updateComic = async (req, res) => {
   const { id } = req.params;

   const comic = await Comic.findByIdAndUpdate(id, req.body, {
      new: true,
   });

   res.json(comic);
};

exports.deleteComic = async (req, res) => {
   const { id } = req.params;

   await Comic.findByIdAndDelete(id);
   await Chapter.deleteMany({ comicId: id });

   res.json({ message: "Deleted" });
};
