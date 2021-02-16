var express = require('express');
var router = express.Router();


/* create middleware "authCheck" to check if user is logged in*/
const authCheck = (req, res, next) => {
    if (!req.user) { //if user is not logged in
        res.redirect('/auth/login');
        } else { //if logged in
            next();
        }
};

/* GET profile page */
router.get('/', authCheck, (req, res) => {
   // res.send('You are logged in, here is your profile' + req.user);
    res.render('profilePage', {
        user: req.user.username,
        title:'Cubes'
    });
//     console.log('******profile.js RES: ', res);
//     console.log('******profile.js req.url: ', req.url);
// });
    // ;

});


module.exports = router;