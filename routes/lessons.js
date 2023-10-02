var express = require('express');
var router = express.Router();

const Lesson = require('../models/Lesson')

const {isCreatorLoggedIn} = require('../middleware/creator-route-guard')

const isCreatorOwner = require('../middleware/isCreatorOwner')

const canCreatorEdit = require('../middleware/canCreatorEdit')

router.get('/all', (req,res,next) => {
    
    Lesson.find()
    .populate('owner')
    .then((lessons) => {
        res.render('lessons/all-lessons.hbs', lessons)
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
})

router.get('/new', isCreatorLoggedIn, (req, res, next) => {

    res.render('lessons/new-lesson.hbs')
    
})

router.post('/new', isCreatorLoggedIn, (req,res,next) => {

    const { name, description, imageUrl } = req.body

    Lesson.create({
        name,
        description,
        imageUrl,
        owner: req.session.creator._id
    })
    .then((createdLesson) => {
        //
        res.redirect('/lessons/all')
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
})

router.get('/details/:lessonId', isCreatorLoggedIn, canCreatorEdit, (req,res,next) => {

    Lesson.findById(req.params.lessonId)
    .populate('owner')
    .populate({
        path:'reviews',
        populate: {path: 'creator'}
    })
    .then((lesson) => {
        res.render('lessons/lesson-details.hbs', {lesson, canCreatorEdit: req.session.creator.canCreatorEdit, reviews: lesson.reviews})
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
})

router.get('/edit/:lessonId', isCreatorLoggedIn, isCreatorOwner, (req,res,next) => {

    Lesson.findById(req.params.lessonId)
    .then((lesson) => {
        res.render('lessons/edit-lesson.hbs', lesson)
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })

})

router.post('/edit/:lessonId', isCreatorLoggedIn, isCreatorOwner, (req,res,next) => {

    Lesson.findByIdAndUpdate(
        req.params.lessonId,
        req.body,
        {new: true}
    )
    .then(updatedLesson => {
        res.redirect(`/lessons/details/${updatedLesson._id}`)
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
})

router.get('/delete/:lessonId', isCreatorLoggedIn, isCreatorOwner, (req,res,next) => {

    Lesson.findByIdAndRemove(req.params.lessonId)
    .then((deletedLesson) => {
        console.log("Deleted room ==>", deletedLesson)
        res.redirect('/lessons/all')
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
})

module.exports = router;
