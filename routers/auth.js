// Library import
const express = require('express');
// Router instance
const router = express.Router();
// Auth routers
router.get('/',function (req,res) {

    res.send('auth home page')

});

router.get('/register',function (req,res) {

    res.send('auth register page')

});

module.exports = router;