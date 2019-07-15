var KlausMath = {
    fact: function(n) {
        if (n < 0) return 'erreur';
        // We save factorials results to avoid wasting time in calculation since we just have n between 0 and 5...
        else if (n == 0) return 1;
        else if(n == 1) return 1;
        else if (n == 2) return 2;
        else if (n == 3) return 6;
        else if (n == 4) return 24;
        else if (n == 5) return 120;
        // Real factorial just in case...
        else {
            var res = 1;
            for (var i = 1; i < n+1; i++) {
                res = res * i;
            }
            return res;
        }
    },

    poisson: function(lambda, X) {
        Math.exp(-1 * lambda) * Math.pow(lambda, X) / fact(X);
    },

    getGrid: function(team1ATK, team1DEF, team2ATK, team2DEF, avgGoalsHome, avgGoalsAway) {
        var grid = [];
        for(var i = 0; i < 5; i++ ){
            grid[i] = [];
            for(var j = 0; j < 5; j++) {
                team1Esp = team1ATK * team2DEF * avgGoalsHome;
                team2Esp = team2ATK * team1DEF * avgGoalsAway;
                grid[i].push(poisson(team1Esp, j) * poisson(team2Esp, i));
            }
        }
    }
}

module.exports = KlausMath;