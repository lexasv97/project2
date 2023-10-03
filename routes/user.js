var express = require('express');
var router = express.Router();

const Lesson = require('../models/Lesson')

const {isUserLoggedIn} = require('../middleware/user-route-guard')

router.get('/user-profile', isUserLoggedIn, (req, res, next) => {
  
    Lesson.find({
        owner: req.session.creator._id
    })
    .then((lessons) => {
        console.log("Found lessons ===>", lessons)
        res.render('users/user-profile.hbs', {creator: req.session.creator, lessons: lessons})
    })
    .catch((err) => {
        console.log(err)
        next(err)
      })
});

module.exports = router;
