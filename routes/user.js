var express = require('express');
var router = express.Router();

const Lesson = require('../models/Lesson')

const {isUserLoggedIn} = require('../middleware/user-route-guard')

router.get('/user-profile', isUserLoggedIn, (req, res, next) => {
  
    res.render('users/user-profile.hbs', {user: req.session.user})
});

module.exports = router;
