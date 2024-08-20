const express = require('express');
const TestSubmission = require('../models/TestSubmission');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/submit', authMiddleware, async (req, res) => {
    const submission = new TestSubmission({
        userId: req.userId,
        answers: req.body.answers,
        submittedAt: new Date(),
    });
    await submission.save();
    res.send('Test submitted');
});

module.exports = router;
