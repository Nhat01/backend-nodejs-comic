const express = require("express");
const router = express.Router();
const {
   createComic,
   getComics,
   updateComic,
   deleteComic,
} = require("../controllers/comic.controller");

/**
 * @swagger
 * /api/comics:
 *   get:
 *     summary: Get all comics
 *     tags: [Comics]
 *     responses:
 *       200:
 *         description: List of comics
 */
router.get("/", getComics);

/**
 * @swagger
 * /api/comics:
 *   post:
 *     summary: Create a comic
 *     tags: [Comics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comic created
 */
router.post("/", createComic);

router.put("/:id", updateComic);
router.delete("/:id", deleteComic);

module.exports = router;
