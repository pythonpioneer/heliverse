// importing requirements
const router = require('express').Router();


// Route 1: To fetch all users by search:  '/api/v1/filter/search?name=<name>' [using GET] (login not required)
router.get('/search', (req, res) => {
    res.send("ok")
})

// export the router
module.exports = router;