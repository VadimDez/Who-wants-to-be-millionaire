/**
 * Created by Vadym on 16/12/14.
 */
var path = require('path'),
    Question = require('./js/Models/Question'),
    Player = require('./js/Models/Player'),
    btoa = require('btoa');

module.exports = function (app) {

    // get all
    app.get('/api/question/get16', function (req, res) {

        Question
            .findRandom()
            .limit(16)
            .exec(function (err, questions) {
                if (err)
                    res.send(err);

                res.json(questions);
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
            correctAnswer:  btoa(req.body.correctAnswer)
        }, function (err, question) {
            if (err)
                res.send(err);

            res.json(question);
        });
    });

    // get players
    app.get('/api/player', function (req, res) {
        Player
            .find()
            .sort({points: 'desc'})
            .limit(16)
            .exec(function (err, players) {
                if (err)
                    res.send(err);

                res.json(players);
            });
    });

    // save result
    app.post('/api/player', function (req, res) {
        Player.create({
            name: req.body.name,
            points: req.body.points
        }, function (err, player) {
            if (err)
                res.send(err);

            res.json(player)
        });
    });

    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, '../public') }); // load public/index.html file
    });
};