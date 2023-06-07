const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser")
// const cors = require('cors')

const DialogController = require('../controllers/DialogController')


// CORS
router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

/**
 * @swagger
 * /:
 *  get:
 *    description: Home route
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', DialogController.home)

/**
 * @swagger
 * /allchats:
 *  get:
 *    description: Get all chats
 *    responses:
 *      '200':
 *        description: Success
 */
router.get('/allchats', DialogController.getAll)

/**
 * @swagger
 * /create:
 *  post:
 *      summary: Create Dialog
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              question:
 *                  type: string
 *                  description: La question à poser
 *                  example: Comment vas-tu ?
 *              answer:
 *                  type: string
 *                  description: La réponse à la question
 *                  example: Je vais bien, merci
 * 
 *      responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *                     question:
 *                       type: string
 *                       description: Comment ça va ?.
 *                       example: Comment ça va ?
 *                     answer:
 *                       type: string
 *                       description: Réponse à la question
 *                       example: Je vais bien, merci
 * 
 */
router.post('/create', DialogController.add)

module.exports = router