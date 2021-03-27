/* const { check } = require('express-validator');

const express = require('express');
const indexController = require('../controllers/index')
const router = express.Router();



router.get('/', indexController.home);

module.exports = router; */


module.exports = function(application){

    application.get('/', function(req, res){
        application.app.controllers.index.home( application, req, res);
    });

}