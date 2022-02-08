import express from "express";
import articleCtrl from "../controllers/article";
const router = express.Router();
const auth = require('../middleware/auth');
/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - imageUrl
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the articles
 *         title:
 *           type: string
 *           description: this is title of articles 
 *         content:
 *           type: string
 *           description: this is content of articles
 *         imageUrl:
 *           type: string
 *           description: this is image url
 *         userId:
 *           type: string
 *           description: this is userId
 *           
 *       example:
 *         id: d5fE_asz
 *         title: Learning never ending
 *         content:  learn much as you can 
 *         imageUrl: this imageUrl
 *         userId: tskdjvn58516_dmf
 */

/**
  * @swagger
  * tags:
  *   name: Articles
  *   description: The Articles managing API
  */


router.get('/', auth, articleCtrl.getAllArticles);

/**
 * @swagger
 * /api/post:
 *   get:
 *     summary: Returns the list of all the posts for authorised user
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: The list of the Articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *         security:  
 *          -bearerToken: []  
 */
router.post('/', auth, articleCtrl.createArticle);
/**
  * @swagger
  * /api/post:
  *   post:
  *     summary: Create an articles for authorised user
  *     tags: [Articles]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/Article'
  *     responses:
  *       201:
  *         description: The article was successfully created
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Article'
  *       400:
  *         description: Some server error
  *       security:
  *        -bearerToken: []
  */

router.get('/:id',auth,articleCtrl.getOneArticle);
/**
 * @swagger
 * /api/post/{id}:
 *   get:
 *     summary: Get the article by id
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The article id
 *     responses:
 *       200:
 *         description: The article description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: The Article was not found
 *      
 *        
 */
router.put('/:id', auth,articleCtrl.modifyArticle);

 /**
 * @swagger
 * /api/post/{id}:
 *  put:
 *    summary: Update the Article by the id
 *    tags: [Articles]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Article id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Article'
 *    responses:
 *      200:
 *        description: The Article was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Article'
 *      404:
 *        description: The Article was not found
 *      500:
 *        description: Some error happened
 */
router.delete('/:id', auth, articleCtrl.deleteArticle);
/**
 * @swagger
 * /api/post/{id}:
 *   delete:
 *     summary: Remove the article by id
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The article id
 * 
 *     responses:
 *       200:
 *         description: The Article was deleted
 *       404:
 *         description: The Article was not found
 */





export default router;