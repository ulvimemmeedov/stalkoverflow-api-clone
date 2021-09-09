// Library import
const express = require('express');
// Router instance
const router = express.Router();
// Router import
const questions = require('./questions');

const auth = require('./auth');
// config
router.use("/questions", questions)

router.use("/auth", auth)


module.exports = router;