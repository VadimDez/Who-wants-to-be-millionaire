/**
 * Created by Vadym on 17/12/14.
 */

var mongoose = require('mongoose'),
    random = require('mongoose-random'),
    Schema = new mongoose.Schema({
        question: {type: String},
        answerA: {type: String},
        answerB: {type: String},
        answerC: {type: String},
        answerD: {type: String},
        correctAnswer: {type: String}
    });

Schema.plugin(random, { path: 'r' }); // enable random
module.exports = mongoose.model('Question', Schema);