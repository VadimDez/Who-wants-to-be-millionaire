var SvgRender = function () { 
    var progressLevel, progressBar,paper;
    var startProgressBar = function (callback) {
        paper = Raphael(80, 370, 500, 100);
        progressBar = paper.rect(30, 50, 399, 50, 5);
        paper.setStart();
        var zero = paper.text(30, 40, '30');
        var ten = paper.text(169, 40, '20');
        var twenty = paper.text(302, 40, '10');
        var thirty = paper.text(430, 40, '0');
        var set = paper.setFinish();
        set.attr({
            'font-size': '20px',
        })
        progressLevel = paper.rect(31, 51, 1, 48, 5);
        progressLevel.attr({
            fill: '#23FF2E',
        }).animate({
            fill: '#B50000',
            width: 398
        }, 30000, callback)
        var lineForTenAndTwenty = paper.path('M 169 50 L 169 100 M 302 50 L 302 100');
        
    }
    function clearPaper() {
        progressLevel.stop();
        paper.remove();
    }
    function pauseTimer() {
        progressLevel.pause();
    }
    return {
        startProgressBar: startProgressBar,
        clearPaper: clearPaper,
        pauseTimer: pauseTimer
    }
}