var express = require('express');
var router = express.Router();

router.get('/profile', (req, res, next) => {
  
  res.render('creator-profile.hbs')

});

module.exports = router;
