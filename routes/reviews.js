var express = require('express');
var router = express.Router();

const Review = require('../models/Review')
const Lesson = require('../models/Lesson')

const {isCreatorLoggedIn} = require('../middleware/creator-route-guard')

const isCreatorOwner = require('../middleware/isCreatorOwner')


//router.post ('/new/lessonId', isCreatorLoggedIn, isCreatorOwner, (req,res,next) => {})


module.exports = router;
