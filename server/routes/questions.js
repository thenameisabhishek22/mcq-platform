const express = require('express');
const Question = require('../models/Question');
const router = express.Router();

router.get('/', async (req, res) => {
    const questions = await Question.find();
    res.send(questions);
});

module.exports = router;
