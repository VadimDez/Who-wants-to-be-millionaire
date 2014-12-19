/**
 * Created by Vadym on 17/12/14.
 */

var mongoose = require('mongoose');

module.exports = mongoose.model('Question', {
    question: {type: String},
    answerA: {type: String},
    answerB: {type: String},
    answerC: {type: String},
    answerD: {type: String},
    correctAnswer: {type: String}
});