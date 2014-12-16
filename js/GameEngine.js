/// <reference path="C:\Users\Nikki\Desktop\Telerik\Ilian\JavaScriptUIAndDOM\JSTeamWork\JSTeamWork\KineticRenderForCorrectAnswer.js" />
var GameEngine = function () {
    var WIDTH = 800,
        HEIGHT = 600,
        isTimerJokerUsed = false,
        isChangeQuestionJokerUsed = false;
    

    var stage = new Kinetic.Stage({
        container: 'container',
        width: WIDTH,
        height: HEIGHT
    });

    var stageForCorrectAnswer = new Kinetic.Stage({
        container: 'answer-state',
        width: WIDTH,
        height: HEIGHT
    });

    var kineticForCorrectAnswer = new KineticRenderForCorrectAnswer(stageForCorrectAnswer);
    var generator = new QuestionGeneration();
    var arrWithQuestions = generator.getQuestions();
    console.log(arrWithQuestions[0].question);
    var kineticRender = new KineticRender(stage);
    var questionNumber = 0;
    var question = arrWithQuestions[questionNumber];
    var svgRender = new SvgRender();
    var drawCurrentAnswer = function (question) {
        setTimeout(function () { svgRender.startProgressBar(whenAnswerIsChoosen); }, 350);
        var arrayWithAnswer = [];
        arrayWithAnswer.push(question.answerA);
        arrayWithAnswer.push(question.answerB);
        arrayWithAnswer.push(question.answerC);
        arrayWithAnswer.push(question.answerD);
        if (!isTimerJokerUsed) {
            kineticRender.drawJoker(602, 0, 99, 40, 'images/stop_timer.png', whenTimerIsStopped);
        }
        if (!isChangeQuestionJokerUsed) {
            kineticRender.drawJoker(701, 0, 99, 40, 'images/change_question.png', whenQuestionIsChanged);
        }
        kineticRender.drawRightPanel(600, 40, 200, 560, 15, 100, questionNumber + 1);
        kineticRender.drawAnswersBox(10, 470, 600, 150, arrayWithAnswer, whenAnswerIsChoosen);
        kineticRender.drawQuestionBox(20, 120, 560, 230, question.question);
    };

    var whenAnswerIsChoosen = function (rectID) {
        if (rectID == question.correctAnswer) {
            if (questionNumber === 14) {
                svgRender.clearPaper();
                kineticForCorrectAnswer.finalWinScreen();
                addScore(calculatePlayerScore(questionNumber));
            } else {
                kineticForCorrectAnswer.correctAnswer(question.description);
                questionNumber++;
                question = arrWithQuestions[questionNumber];
                svgRender.clearPaper();
            }
        } else {
            kineticForCorrectAnswer.incorrectAnswer(question.description);
            svgRender.clearPaper();
            addScore(calculatePlayerScore(questionNumber));
        }
    };

    var calculatePlayerScore = function(levelNumber){
        var score = 0;
        var currentLevel = levelNumber | 0;
        for (var i = 1; i <= currentLevel; i++) {
            score += i * 100;
        }
        return score;
    };

    var whenTimerIsStopped = function () {
        isTimerJokerUsed = true;
        svgRender.pauseTimer();
    };

    var whenQuestionIsChanged = function () {
        isChangeQuestionJokerUsed = true;
        svgRender.clearPaper();
        question = arrWithQuestions[15];
        drawCurrentAnswer(question);
    };

    var nextQuestion = function () {
        drawCurrentAnswer(question);
    };
    return {
        nextQuestion: nextQuestion
    }
};