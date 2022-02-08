import express from "express";
import likeCtrl from "../controllers/likes";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       required:
 *         - articleId
 *         - userId
 *       properties:
 *         articleId:
 *           type: string
 *           description: The auto-generated id of the Article
 *         userId:
 *           type: string
 *           description: The mauto-generated id of the user
 *       example:
 *         articleId: d5fE_asz
 *         userId: sk5cd_58cny
 */

 /**
  * @swagger
  * tags:
  *   name: Like
  *   description: The Like managing API
  */


/**
 * @swagger
 * /api/like:
 *   post:
 *     summary: Send a like to the article
 *     tags: [Like]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Like'
 *     responses:
 *       201:
 *         description: The article was successfully liked
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *       400:
 *         description: Some server error
 */

router.post('/', likeCtrl.likeArticle );
/**
 * @swagger
 * /api/like:
 *   get:
 *     summary: Returns the list of all likes
 *     tags: [Like]
 *     responses:
 *       200:
 *         description: The list of the like
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Like'
 */

router.get('/', likeCtrl.getAllLikes);


export default router 