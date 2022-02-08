import express from "express";
import userCtrl from "../controllers/user";
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         userId:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of user
 *         email:
 *           type: string
 *           description: The email of user
 *         password:
 *           type: string
 *           description: The password of user
 *       example:
 *         id: d5fE_asz
 *         name: Alexander K. Dewdney
 *         email:  Dewdney@yahho.com
 *         password: passcode
 */

 /**
  * @swagger
  * tags:
  *   name: User
  *   description: The User managing API
  */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Signup for user 
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was signedUp successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Some server error
 */

router.post('/signup', userCtrl.signup);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: login for user 
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was login successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Some server error
 */

router.post('/login', userCtrl.login);

export default router;