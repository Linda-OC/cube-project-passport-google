var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');

/* GET home page. */
router.get('/', function (req, res, next) {
    Cube.find()
        .then((cubes) => {
            res.render('index', {
                title: 'Browser',
                cube: cubes,
            });
        });
});

module.exports = router;
