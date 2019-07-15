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
        return (Math.exp(-1 * lambda) * Math.pow(lambda, X) / this.fact(X));
    },

    getGrid: function(team1ATK, team1DEF, team2ATK, team2DEF) {
        var grid = [];
        for(var i = 0; i < 6; i++ ){
            grid[i] = [];
            for(var j = 0; j < 6; j++) {
                team1Esp = team1ATK * team2DEF;
                team2Esp = team2ATK * team1DEF;
                var proba = this.poisson(team1Esp, j) * this.poisson(team2Esp, i) * 100;
                grid[i].push(proba.toFixed(2) + ' %');
            }
        }
        return grid;
    }
}

module.exports = KlausMath;