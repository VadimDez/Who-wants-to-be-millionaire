var QuestionGeneration = function () {
    //In production with Start menu its good to be Async...
    jQuery.ajaxSetup({ async: false });
    var arrayWithQuestion = [];

    var getRandomIndexFromArray = function (arrayLength) {
        return (Math.random() * arrayLength) | 0;
    };

    var getQuestionsFromFile = function (filePath , countOfNeededQuestions) {
        var arrayWithChoosenQuestions = [];
        $.getJSON(filePath, function (data) {
            var arrayWithQuestion = data;
            for (var i = 0; i < countOfNeededQuestions; i++) {
                var dataLength = arrayWithQuestion.length;
                var indexFromArray = getRandomIndexFromArray(dataLength);
                arrayWithChoosenQuestions.push(arrayWithQuestion[indexFromArray]);
                arrayWithQuestion.splice(indexFromArray, 1);
            }
        });
        return arrayWithChoosenQuestions;
    };

    var getQuestions = function () {
        var arrWithEasy = getQuestionsFromFile("Questions/Level1.html", 5);
        var arrWithMedium = getQuestionsFromFile("Questions/Level2.html", 5);
        var arrWithHard = getQuestionsFromFile("Questions/Level3.html", 5);
        var bonusQuestion = getQuestionsFromFile("Questions/Level4.html", 1);
        arrayWithQuestion = arrayWithQuestion.concat(arrWithEasy, arrWithMedium, arrWithHard , bonusQuestion);
        return arrayWithQuestion;
    };

    return {
        getQuestions: getQuestions
    }

};