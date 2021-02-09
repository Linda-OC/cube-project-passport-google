var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');

/*GET create page */
router.get('/', function (req, res, next) {
    res.render('create', { title: 'Create' });
});

/*POST new Cube */
router.post('/', function (req, res, next) {
    console.log("incoming form submission", req.body);//to show info from form

    const newCube = new Cube({
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: req.body.difficultyLevel,
        accessories: [],
    });

    newCube.save()
        .then((result) => {
            res.redirect('/');
        });
});

module.exports = router;