var express = require('express');
const User = require('../models/User');
const Creator = require('../models/Creator');
var router = express.Router();
// api key goes to .env
const API_KEY = "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"

router.get('/update-creator-img', (req, res) => {
    res.render("creator-auth/update-creator-img.hbs")
})
router.post('/update-creator-img', async (req, res, next) => {
    console.log(req.body)
        const options ={
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "prompt": req.body.userPrompt,
                "n": 4,
                "size": "1024x1024"
    
            })
        }

        try {
          const response = await fetch("https://api.openai.com/v1/images/generations", options)
          const data = await response.json()
          console.log(data)
          res.render("AI-Images/image-selector.hbs", {images: data.data})
        //   res.render("AI-Images/image-selector.hbs", {images: [1, 2, 3, 4]}) //if you want to make it actually work delete this and uncomment above
          }   
         catch (error) {
            console.error(error)
        }
    

})

router.post("/update/profile-image", (req, res)=> {
    console.log(req.session)
    Creator.findByIdAndUpdate(req.session.creator._id, {profileImage: req.body.selectedImage}, {new : true})
    .then((user) => {
        console.log(user)
        res.redirect("/creators/creator-profile")
    })
})



module.exports = router;



