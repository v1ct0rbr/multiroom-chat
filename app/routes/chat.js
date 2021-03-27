/* const { check } = require('express-validator');

const express = require('express');
const chatController = require('../controllers/chat')
const router = express.Router();

router.get('/chat', chatController.iniciaChat)
router.post('/chat', chatController.iniciaChat)

module.exports = router; */
const { check, validationResult } = require('express-validator');



const myValidationResult = validationResult.withDefaults({
    formatter: error => {
        return {
            myLocation: error.location,
        };
    },
});

module.exports = function (application) {
    application.post('/chat',
        check('apelido').trim().isLength({ min: 5, max: 50 }).withMessage('Tamanho do apelido (Entre 5 e 50 caracteres)'),

        function (req, res) {

            const result = validationResult(req);
            const hasErrors = !result.isEmpty();
            if (hasErrors) {
                res.render("index", { validacao: result.array() });
                return;
            } else
                application.app.controllers.chat.iniciaChat(application, req, res);
        });

    application.get('/chat', function (req, res) {


        application.app.controllers.chat.iniciaChat(application, req, res);
    });

}