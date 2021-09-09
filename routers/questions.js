// Library import
const express = require('express');
// Controller import
const QuestionsController = require('../controllers/questions');
// Router instance
const router = express.Router();
//Questions routers
router.get('/',QuestionsController.getAllQuestions);

module.exports = router;