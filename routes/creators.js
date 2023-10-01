var express = require('express');
var router = express.Router();

const Lesson = require('../models/Lesson')

const {isCreatorLoggedIn} = require('../middleware/creator-route-guard')

router.get('/creator-profile', isCreatorLoggedIn, (req, res, next) => {
  
    Lesson.find({
        owner: req.session.creator._id
    })
    .then((lessons) => {
        console.log("Found lessons ===>", lessons)
        res.render('users/creator-profile.hbs', {creator: req.session.creator, lessons: lessons})
    })
    .catch((err) => {
        console.log(err)
        next(err)
      })
});

module.exports = router;
