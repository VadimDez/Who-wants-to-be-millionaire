/// <reference path="C:\Users\Nikki\Desktop\Telerik\Ilian\JavaScriptUIAndDOM\JSTeamWork\JSTeamWork\Scripts/kinetic-v5.1.0.min.js" />
var KineticRender = function (stage) {
    var stage = stage;
    var layer = new Kinetic.Layer();

    var drawJoker = function (x, y, width, height, imgSrc , onClickFunc) {
        var timeJokerBackgroundImage = new Image();
        timeJokerBackgroundImage.onload = function () {
            stopTimerImage = new Kinetic.Image({
                x: x,
                y: y,
                width: width,
                height: height,
            });
            layer.add(backgroundRectForColor, timerRectangle, timerContainer);
            layer.draw();  
        };
        timeJokerBackgroundImage.src = imgSrc;
        var timerRectangle = new Kinetic.Rect({
            x: x,
            y: y,
            width: width,
            height: height,
            fillPatternImage: timeJokerBackgroundImage,
            stroke: '#004a4d',
            strokeWidth: 3
        });

        var backgroundRectForColor = new Kinetic.Rect({
            x: x,
            y: y,
            width: width,
            height: height,
            fill: '#1D7074'
        });

        var timerContainer = new Kinetic.Rect({
            x: x,
            y: y,
            width: width,
            height: height,
            opacity: 0
        });

        timerContainer.on('click', function () {
            timerContainer.off('mouseover');
            timerContainer.off('mouseout');
            timerContainer.off('click');
            onClickFunc();
            timerRectangle.opacity('0.2');
            backgroundRectForColor.fill('#1D7074');
            layer.draw();

        });

        timerContainer.on('mouseover', function () {
            backgroundRectForColor.fill('#CDCC00');
            layer.draw();
        });
        timerContainer.on('mouseout', function () {
            backgroundRectForColor.fill('#1D7074');
            layer.draw();
        });        

    };

    var drawQuestionBox = function (x, y, width, height, strQuestion) {
        if (strQuestion === undefined) {
            strQuestion = 'Some question?';
        }

        var bgColor = '#ffb473',
            textColor = '#006064',
            fontsize = '28',
            borderColor = '#004a4d',
            layer = new Kinetic.Layer();

        var questionRect = new Kinetic.Rect({
            x: x,
            y: y,
            width: width,
            height: height,
            fill: bgColor,
            stroke: borderColor,
            strokeWidth: 5,
            lineWidth: 5
        });

        var questionText = new Kinetic.Text({
            x: x,
            y: y + height / 2 - 40,
            align: 'center',
            fill: textColor,
            width: width - 20,
            height: height - 20,
            padding: 10,
            text: strQuestion,
            fontSize: fontsize,
            strokeWidth: 2
        });

        layer.add(questionRect, questionText);
        stage.add(layer);
    };

    var drawRightPanel = function (x, y, width, height, rows, startPoints, selectedRow) {
        var singleRowHeight = height / rows,
            topRowPoints = rows * startPoints,
            passedTextColor = '#01C3CD',
            selectedTextColor = '#006064',
            passedBackgroundColor = '#00939A',
            selectedBacgroundColor = '#CDCC00',
            passedBorderColor = '#00CFC4',
            specialTextColor = '#DAA520',
            standardTextColor = '#01C3CD',
            standardBackgroundColor = '#1D7074',
            standardBorderColor = '#004a4d';
        var layer = new Kinetic.Layer();
        for (var i = 0; i < rows; i++) {
            rows = rows | 0;
            if (isCurrentRow(rows, i, selectedRow)) {
                drawRightPanelRow(x, y + (singleRowHeight * i), width, singleRowHeight, rows - i, topRowPoints - (i * startPoints), 30, selectedTextColor, selectedBacgroundColor, standardBorderColor , layer);
            } else if (isThreshholdRow(rows, i, selectedRow)) {
                drawRightPanelRow(x, y + (singleRowHeight * i), width, singleRowHeight, rows - i, topRowPoints - (i * startPoints), 30, specialTextColor, standardBackgroundColor, standardBorderColor , layer);
            } else if (isPassedRow(rows, i, selectedRow)) {
                drawRightPanelRow(x, y + (singleRowHeight * i), width, singleRowHeight, rows - i, topRowPoints - (i * startPoints), 30, passedTextColor, passedBackgroundColor, passedBorderColor,layer);
            } else {
                // draw rows that are not yet passed
                drawRightPanelRow(x, y + (singleRowHeight * i), width, singleRowHeight, rows - i, topRowPoints - (i * startPoints), 30, standardTextColor, standardBackgroundColor, standardBorderColor,layer);
            }
        }

        stage.add(layer);

        function isThreshholdRow(rows, i, selectedRow) {
            return ((i === Math.floor(((rows ) / 3) * 2) || i === Math.floor((rows) / 3) || i === 0) && selectedRow < rows - i);
        }

        function isCurrentRow(rows, i, selectedRow) {
            return (selectedRow === rows - i);
        }

        function isPassedRow(rows, i, selectedRow) {
            return (selectedRow > rows - i);
        }
    };

    var drawRightPanelRow = function (x, y, width, height, rowNumber, rowPoints, fontSize, textColor, backgroundColor, borderColor , layer) {
        var backgroundRectangle = new Kinetic.Rect({
            x: x,
            y: y,
            width: width,
            height: height,
            fill: borderColor
        });

        var leftRectWidth = width / 3 - 5;
        var leftRectangle = new Kinetic.Rect({
            x: x + 3,
            y: y + 1,
            width: leftRectWidth,
            height: height - 2,
            fill: backgroundColor
        });

        var leftTextField = new Kinetic.Text({
            x: leftRectangle.x(),
            y: leftRectangle.y() - 5,
            text: rowNumber,
            fontSize: fontSize,
            fontFamily: 'Calibri',
            fill: textColor,
            width: leftRectangle.width() - 20,
            height: leftRectangle.height() - 20,
            padding: 5,
            align: 'center'
        });

        var rightRectangle = new Kinetic.Rect({
            x: x + leftRectWidth + 6,
            y: y + 1,
            width: width - (leftRectWidth + 8),
            height: height - 2,
            fill: backgroundColor
        });

        var rightTextField = new Kinetic.Text({
            x: rightRectangle.x(),
            y: rightRectangle.y() - 10,
            text: rowPoints,
            fontSize: fontSize,
            fontFamily: 'Calibri',
            fill: textColor,
            width: rightRectangle.width() - 20,
            height: rightRectangle.height() - 20,
            padding: 10,
            align: 'center'
        });

        
        layer.add(backgroundRectangle, leftRectangle, leftTextField, rightRectangle, rightTextField);

        
    };

    var drawAnswersBox = function (x, y, width, height, arrOfStrings, onClickFunc) {
        var singleAnswerWidth = (width / 2) - 20,
            singleAnswerHeight = (height / 2) - 20,
            maxStrLength = 0,
                fontSize = 10;

        for (var i = 0; i < 4; i++) {

            if (maxStrLength < arrOfStrings[i].length) {
                maxStrLength = arrOfStrings[i].length;
            }
        }

        if (maxStrLength < 10) {
            fontSize = 30;
        } else if (maxStrLength < 15) {
            fontSize = 25;
        } else if (maxStrLength < 20) {
            fontSize = 20;
        } else if (maxStrLength < 30) {
            fontSize = 18;
        }

        var index = 0;
        for (var i = 0; i < 2; i++) {

            for (var k = 0; k < 2; k++) {
                drawAnswer(x + ((singleAnswerWidth + 10) * i), y + ((singleAnswerHeight + 10) * k), singleAnswerWidth, singleAnswerHeight, arrOfStrings[index], fontSize, index+1,  onClickFunc);
                index++;
            }
        }
    };

    var drawAnswer = function (x, y, width, height, text, fontSize, rectID , onClickFunc) {

        var rectangle = new Kinetic.Rect({
            x: x,
            y: y,
            width: width,
            height: height,
            fill: '#FF9841',
            stroke: '#226F77',
            strokeWidth: 2
        });

        var textField = new Kinetic.Text({
            x: x,
            y: y,
            text: text,
            fontSize: fontSize,
            fontFamily: 'Arial',
            fontStyle: 'bold',
            fill: '#226F77',
            width: rectangle.width() - 20,
            height: rectangle.height() - 20,
            padding: 10,
            align: 'center'
        });

        var rectangleContainer = new Kinetic.Rect({
            x: x,
            y: y,
            width: width,
            height: height,
            id: rectID,
            opacity: 0
        });

        rectangleContainer.on('click', function () {
            rectangle.fill('yellowgreen');
            rectangleContainer.off('mouseover');
            rectangleContainer.off('mouseout');
            layer.draw();
            onClickFunc(rectangleContainer.id());
        });

        rectangleContainer.on('mouseover', function () {
            rectangle.fill('#226F77');
            rectangle.stroke('#FF9841');
            textField.fill('#FF9841');
            layer.draw();
        });
        rectangleContainer.on('mouseout', function () {
            rectangle.fill('#FF9841');
            rectangle.stroke('#226F77');
            textField.fill('#226F77');
            layer.draw();
        });

        
        layer.add(rectangle, textField, rectangleContainer);

        stage.add(layer);
    };

    return {
        drawJoker : drawJoker,
        drawRightPanel: drawRightPanel,
        drawAnswersBox: drawAnswersBox,
        drawQuestionBox: drawQuestionBox
    };
};