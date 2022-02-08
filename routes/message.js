const express = require("express");
const router = express.Router();
import messageCtrl from "../controllers/message";
/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - message
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: The name of sender 
 *         email:
 *           type: string
 *           description: The email of sender
 *         message:
 *           type: string
 *           description: The message content
 *       example:
 *         id: d5fE_asz
 *         name: Alexander K. Dewdney
 *         email:  Dewdney@yahho.com
 *         message: hello admin
 */

 /**
  * @swagger
  * tags:
  *   name: Message
  *   description: The Message managing API
  */


/**
 * @swagger
 * /api/message:
 *   get:
 *     summary: Returns the list of all the messages
 *     tags: [Message]
 *     responses:
 *       200:
 *         description: The list of the Messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 */


router.get('/', messageCtrl.getAllMessage);

/**
 * @swagger
 * /api/message:
 *   post:
 *     summary: Send a message 
 *     tags: [Message]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       201:
 *         description: The Message was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Some server error
 */
router.post('/', messageCtrl.createMessage);








export default router;