const mongoose = require('mongoose');

const testSubmissionSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    answers: Map,
    submittedAt: Date,
    evaluated: { type: Boolean, default: false },
});

const TestSubmission = mongoose.model('TestSubmission', testSubmissionSchema);
module.exports = TestSubmission;
