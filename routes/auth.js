var express = require('express');
var router = express.Router();
const passport = require('passport');

// router.get('/login',(req, res) => {
//     res.render('loginPage');
// });

//auth logout
router.get('/logout', (req, res) => {
    //handle with passport login
    res.send('logging out');
});

//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google', {
    scope: ['profile']
    // res.send('you reached the callback URI');
}));


module.exports = router;