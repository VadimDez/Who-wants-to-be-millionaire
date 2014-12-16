$('#create-btn').click(function () {
    var question = $('#question').val();
    var answerA = $('#answerA').val();
    var answerB = $('#answerB').val();
    var answerC = $('#answerC').val();
    var answerD = $('#answerD').val();
	var description = $('#description').val();
    var difficulty = $('#diff').find('option:selected').val();
    var correctAnswer = $('#correct-answer').find('option:selected').val();
    var questionAsObject = {
        question: question,
        answerA: answerA,
        answerB: answerB,
        answerC: answerC,
        answerD: answerD,
        difficulty: difficulty,
        correctAnswer: correctAnswer,
		description: description,
    };
    var questionAsJson = JSON.stringify(questionAsObject)+',';
    var url = 'data:text/json;charset=utf8,' + encodeURIComponent(questionAsJson);
    window.open(url, '_blank');
    window.focus();
});