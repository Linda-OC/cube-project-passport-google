var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');

/* GET details page for selected cube. */
router.get('/:uid', function (req, res, next) {
    let id = req.params.uid; //5c39f1851ab3b24f5c03e183
    console.log("this is req", req);
    console.log("this is req.params", req.params);

    
    Cube.findOne({ _id: id }).populate('accessories')
        .then((thisCube) => {
            res.render('details', { title: "Details", cube: thisCube, accessories: thisCube.accessories});
    
        });
});

module.exports = router;