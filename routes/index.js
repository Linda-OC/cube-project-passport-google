var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');

/* GET home page */
router.get('/', function (req, res, next) {
    Cube.find()
        .then((cubes) => {
            res.render('indexPage', {
                title: 'Browser',
                cube: cubes,
            });
        });
});

module.exports = router;
