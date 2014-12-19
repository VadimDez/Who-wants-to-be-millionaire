/**
 * Created by Vadym on 16/12/14.
 */
var path = require('path'),
    Question = require('./js/Models/Question');
module.exports = function (app) {

    // get all
    app.get('/api/question', function (req, res) {

        Question.find(function (err, quesstions) {
            if (err)
                res.send(err);

            res.json(quesstions);
        });
    });

    // add new question
    app.post('/api/question', function (req, res) {
        Question.create({
            question:       req.body.question,
            answerA:        req.body.answerA,
            answerB:        req.body.answerB,
            answerC:        req.body.answerC,
            answerD:        req.body.answerD,
            correctAnswer:  req.body.correctAnswer
        }, function (err, question) {
            if (err)
                res.send(err);

            res.json(question);
        });
    });

    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, '../public') }); // load public/index.html file
    });
};