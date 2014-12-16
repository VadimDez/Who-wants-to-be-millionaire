var KineticRenderForCorrectAnswer = function (stage) {
    var stage = stage;
    var layer = new Kinetic.Layer();
    var correctAnswer = function (strCorrectAnswerDescription) {
        layer.clear();
        $('#container').fadeOut(1000);

        if (strCorrectAnswerDescription === undefined) {
            strCorrectAnswerDescription = 'Congratulations, you answer correctly.';
        }

        var corectAnswerBox = new Kinetic.Rect({
            x: 150,
            y: 150,
            width: 500,
            height: 300,
            fill: '#ff9840',
            stroke: '#004a4d',
            strokeWidth: 3,
            opacity: 1
        });

        var corectAnswerText = new Kinetic.Text({
            x: 150,
            y: 200,
            text: 'Answer Correct!',
            fontSize: 45,
            fontFamily: 'Arial',
            width: 500,
            align: 'center',
            fill: '#004a4d',
        });

        var corectAnswerDescriptionText = new Kinetic.Text({
            x: 150,
            y: 300,
            text: strCorrectAnswerDescription,
            fontSize: 30,
            fontFamily: 'Arial',
            width: 500,
            align: 'center',
            fill: '#1D7074',
        });

        var nextQuestion = new Kinetic.Rect({
            x: 250,
            y: 500,
            width: 300,
            height: 70,
            fill: '#004a4d',         
            fontStyle: 'bold',
            stroke: '#004a4d',
            strokeWidth: 5
        });

        var nextQuestionText = new Kinetic.Text({
            x: 275,
            y: 510,
            text: 'Next Question',
            fontSize: 26,
            fontFamily: 'Arial',
            fill: '#ff9840',
            width: 250,
            padding: 10,
            align: 'center'
        });

        var nextQuestionInvisible = new Kinetic.Rect({
            x: 250,
            y: 500,
            width: 300,
            height: 70,
            opacity: 0,
        });

        nextQuestionInvisible.on('click', function () {
            gameEngine.nextQuestion();
            $('#container').fadeIn(1000);
        })
        nextQuestionInvisible.on('mouseover', function () {
            nextQuestion.fill('#1D7074');
            layer.draw();
        })
        nextQuestionInvisible.on('mouseout', function () {
            nextQuestion.fill('#004a4d');
            layer.draw();
        })
        layer.add(nextQuestion, nextQuestionText, nextQuestionInvisible, corectAnswerBox, corectAnswerText, corectAnswerDescriptionText);
        stage.add(layer);
        
    };

    var incorrectAnswer = function (strIncorrectAnswerDescription) {
        layer.clear();
        if (strIncorrectAnswerDescription === undefined) {
            strIncorrectAnswerDescription = 'You may have more luck next time.';
        }

        $('#container').fadeOut(1500);

        var incorectedAnswerBox = new Kinetic.Rect({
            x: 150,
            y: 150,
            width: 500,
            height: 300,
            fill: '#ff9840',
            stroke: '#004a4d',
            strokeWidth: 2,
            align: 'center',
            opacity: 1
        });

        var incorectAnswerText = new Kinetic.Text({
            x: 150,
            y: 200,
            text: 'Incorrect Answer!',
            fontSize: 45,
            fontFamily: 'Arial',
            fill: 'red',
            width: 500,
            align: 'center'
        });

        var incorectAnswerDescriptionText = new Kinetic.Text({
            x: 150,
            y: 300,
            text: strIncorrectAnswerDescription,
            fontSize: 30,
            fontFamily: 'Arial',
            width: 500,
            align: 'center',
            fill: '#1D7074',
        });

        var nextQuestion = new Kinetic.Rect({
            x: 250,
            y: 500,
            width: 300,
            height: 70,
            fill: '#004a4d',
            stroke: '#004a4d',
            strokeWidth: 5,
        });

        var nextQuestionText = new Kinetic.Text({
            x: 275,
            y: 510,
            text: 'Back to Menu',
            fontSize: 26,
            fontFamily: 'Arial',
            fill: '#ff9840',
            fontStyle: 'bold',
            width: 250,
            padding: 10,
            align: 'center'
        });

        var nextQuestionInvisible = new Kinetic.Rect({
            x: 250,
            y: 500,
            width: 300,
            height: 70,
            opacity: 0,
        });

        nextQuestionInvisible.on('click', function () {
            location.reload();
        })
        nextQuestionInvisible.on('mouseover', function () {
            nextQuestion.fill('#1D7074');
            layer.draw();
        })
        nextQuestionInvisible.on('mouseout', function () {
            nextQuestion.fill('#004a4d');
            layer.draw();
        })

        layer.add(nextQuestion, nextQuestionText, nextQuestionInvisible, incorectedAnswerBox, incorectAnswerText, incorectAnswerDescriptionText);
        stage.add(layer);
    };

    var finalWinScreen = function () {
        layer.clear();

        $('#container').fadeOut(1500);
        var nextQuestion = new Kinetic.Rect({
            x: 250,
            y: 500,
            width: 300,
            height: 70,
            fill: '#004a4d',
            stroke: '#004a4d',
            strokeWidth: 5,
        });

        var nextQuestionText = new Kinetic.Text({
            x: 275,
            y: 510,
            text: 'Back to Menu',
            fontSize: 26,
            fontFamily: 'Arial',
            fill: '#ff9840',
            fontStyle: 'bold',
            width: 250,
            padding: 10,
            align: 'center'
        });

        var nextQuestionInvisible = new Kinetic.Rect({
            x: 250,
            y: 500,
            width: 300,
            height: 70,
            opacity: 0,
        });

        nextQuestionInvisible.on('click', function () {
            location.reload();
        })
        nextQuestionInvisible.on('mouseover', function () {
            nextQuestion.fill('#1D7074');
            layer.draw();
        })
        nextQuestionInvisible.on('mouseout', function () {
            nextQuestion.fill('#004a4d');
            layer.draw();
        })

        layer.add(nextQuestion, nextQuestionText, nextQuestionInvisible);

        var imageObj = new Image();
        imageObj.onload = function () {
            var image = new Kinetic.Image({
                x: 150,
                y: 120,
                image: imageObj,
                width: 500,
                height: 333
            });

            layer.add(image);
            layer.draw();
        };

        imageObj.src = '/images/certificate.png';
        stage.add(layer);

    };

    return {
        correctAnswer: correctAnswer,
        incorrectAnswer: incorrectAnswer,
        finalWinScreen: finalWinScreen
    }
};