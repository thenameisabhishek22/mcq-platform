const mongoose = require('mongoose');
const nodeCron = require('node-cron');
const nodemailer = require('nodemailer');
require('dotenv').config();

const Question = require('./models/Question');
const TestSubmission = require('./models/TestSubmission');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

nodeCron.schedule('0 * * * *', async () => {
    const submissions = await TestSubmission.find({ evaluated: false });
    for (const submission of submissions) {
        const questions = await Question.find();
        const answers = submission.answers;
        let score = 0;

        questions.forEach(question => {
            if (answers[question._id] === question.correctOption) {
                score++;
            }
        });

        submission.evaluated = true;
        await submission.save();

        const user = await User.findById(submission.userId);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Your Test Score',
            text: `Your test score is: ${score}/${questions.length}`,
        };

        await transporter.sendMail(mailOptions);
    }
});
