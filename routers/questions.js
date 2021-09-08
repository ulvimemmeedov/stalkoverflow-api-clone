// Library import
const express = require('express');
// Router instance
const router = express.Router();
//Questions routers
router.get('/',function (req,res) {

    res.send('Questions home page')

});

router.get('/delete',function (req,res) {

    res.send('delete Questions page')

});

module.exports = router;