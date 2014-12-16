$('#new-game-button').on('click', function () {
    if (isValidField($('#input-name'))) {
        $('#wrapper').fadeOut(1000);
        gameEngine.nextQuestion();
    }   
});
$('#leaderboard-button').on('click', function () {
    $('#leaderboard-screen').fadeIn(1000);
});
$('#leaderboard-back-button').on('click', function () {
    $('#leaderboard-screen').fadeOut(1000);
});
var isValidField = function (field) {
    var fieldData = field.val().trim();
    var isValid = fieldData.length !== 0 && fieldData !== "";
    if (!isValid) {
        alert("Only a certified ninja can become anonymous! Enter your name!");
    }
    return isValid;
};