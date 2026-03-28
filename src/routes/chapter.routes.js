const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
   uploadChapter,
   getChapters,
   getChapterDetail,
   getChapterNavigation,
   deleteChapter,
   updateChapterPages,
   updateChapterFull,
} = require("../controllers/chapter.controller");

const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * /api/chapters:
 *   post:
 *     summary: Upload chapter with images
 *     tags: [Chapters]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - comicId
 *               - chapterNumber
 *               - images
 *             properties:
 *               comicId:
 *                 type: string
 *               title:
 *                 type: string
 *               chapterNumber:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Chapter uploaded
 */
router.post("/", upload.array("images"), uploadChapter);

/**
 * @swagger
 * /api/chapters/comic/{comicId}:
 *   get:
 *     summary: Get chapters by comic
 *     tags: [Chapters]
 *     parameters:
 *       - in: path
 *         name: comicId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of chapters
 */
router.get("/comic/:comicId", getChapters);

/**
 * @swagger
 * /api/chapters/{id}:
 *   get:
 *     summary: Get chapter detail
 *     tags: [Chapters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chapter detail
 */
router.get("/:id", getChapterDetail);

router.get("/:id/navigation", getChapterNavigation);

router.delete("/:id", deleteChapter);
router.put("/:id/pages", updateChapterPages);
router.put(":id/full", updateChapterFull);

module.exports = router;
