var express = require('express');
var router = express.Router();

const Review = require('../models/Review')
const Lesson = require('../models/Lesson')

const { isUserLoggedIn } = require('../middleware/user-route-guard');

router.post('/new/:lessonId', isUserLoggedIn, (req, res, next) => {      

    Review.create({
        user: req.session.user._id,
        comment: req.body.comment,
        rating: req.body.rating
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
