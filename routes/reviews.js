var express = require('express');
var router = express.Router();

const Review = require('../models/Review')
const Lesson = require('../models/Lesson')

const { isCreatorLoggedIn } = require('../middleware/creator-route-guard')

const isCreatorNotOwner = require('../middleware/isCreatorNotOwner')


router.post('/new/:lessonId', isCreatorLoggedIn, isCreatorNotOwner, (req, res, next) => {      // isUserLoggedIn !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    Review.create({
        creator: req.session.creator._id,
        comment: req.body.comment
    })
        .then((newReview) => {
            return Lesson.findByIdAndUpdate(
                req.params.lessonId,
                {
                    $push: { review: newReview._id }
                },
                { new: true }
            )
        })
        .then((lessonWithReview) => {
            res.redirect(`/lessons/details/${lessonWithReview._id}`)
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
})

module.exports = router;
