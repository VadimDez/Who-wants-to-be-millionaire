    var LEADERBOARD_KEY = 'key';

    if (localStorage.getItem(LEADERBOARD_KEY) == null) {
        var leaderboard = {
            0: {
                name: 'unknown',
                score: 0
            },
            1: {
                name: 'unknown',
                score: 0
            },
            2: {
                name: 'unknown',
                score: 0
            },
            3: {
                name: 'unknown',
                score: 0
            },
            4: {
                name: 'unknown',
                score: 0
            }
        };

        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
    }
    
    setLeaderboard();

    function setLeaderboard() {
        var leaderboard = getLeaderboard();
        
        var playerArr = [];
        
        for (var player in leaderboard) {
            playerArr.push(leaderboard[player]);
        }
        
        playerArr.sort(function(a, b) {
            return b.score - a.score;
        });
        
             
        var list = document.createElement('ul');
        
        var i;
        var listItem;
        var name;
        var score;
        var position;
        for (i = 0; i < playerArr.length; i += 1) {
            position = (i + 1).toString();
            name = playerArr[i].name;
            score = playerArr[i].score;
            listItem = document.createElement('li');
            
            listItem.innerHTML = position + '. ' + name + ' - ' + score;
            list.appendChild(listItem);
        }
        
        var targetDiv = document.getElementById('leaderboard-screen');
        targetDiv.appendChild(list);
    }

    function getLeaderboard() {
        var leaderBoardString = localStorage.getItem(LEADERBOARD_KEY);
        return JSON.parse(leaderBoardString);
    }

    function addScore(score) {
        var name = $('#input-name').val();
        var currPlayer = {
            name: name,
            score: score
        };

        var playerArr = [];
        playerArr.push(currPlayer);

        var leaderboard = getLeaderboard();

        for (var player in leaderboard) {
            playerArr.push(leaderboard[player]);
        }

        playerArr.sort(function(a, b) {
            return b.score - a.score;
        });

        playerArr.pop();

        var i;
        var newLeaderboard = {};
        for (i = 0; i < 5; i += 1) {
            newLeaderboard[i] = {};
            newLeaderboard[i].name = playerArr[i].name;
            newLeaderboard[i].score = playerArr[i].score;
        }

        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(newLeaderboard));
    }