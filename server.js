var express = require('express');
var fs = require('fs');
const {Dataset} = require('data.js');
var KlausMath = require('./utils.js');

var app = express();

const PASSWORD = fs.readFileSync('pwd.txt', 'utf8').trim();
const leagues = [{
  path: 'https://datahub.io/sports-data/french-ligue-1/datapackage.json',
  name: 'Ligue1'
}, {
  path: 'https://datahub.io/sports-data/english-premier-league/datapackage.json',
  name: 'PremierLeague'
}, {
  path: 'https://datahub.io/sports-data/german-bundesliga/datapackage.json',
  name : 'Bundesliga' 
}];
var stats = {};

// --------------------------- Routes -----------------------------------------------------------------------------
// Check authentication
app.get('/auth', function(req, res) {
    if (req.query.pwd == PASSWORD) {
        initAll();
        res.send( { status: 'OK' });
    } else {
        res.send( {status: 'error' } );
    }
});

// Calculate probabilities for two teams
app.get('/probabilities', function(req, res) {
    var team1 = req.query.team1;
    var team2 = req.query.team2;
    console.log('Calculating probabilities for a match between', team1, 'and', team2, '...');
    // Get stats for this team
    if(stats[req.query.league][team1] == undefined) {
      res.send(JSON.stringify({ missing: 'No home team in database'}))
    } else if(stats[req.query.league][team2] == undefined) {
      res.send(JSON.stringify({ missing: 'No away team in database'}))
    } else {
      var grid = KlausMath.getGrid(stats[req.query.league][team1].homeATK, stats[req.query.league][team1].homeDEF, stats[req.query.league][team2].awayATK, stats[req.query.league][team2].awayDEF);
      console.log('Sending probabilities for a match between', team1, 'and', team2);
      res.send(JSON.stringify(grid));
    }
});


// --------------------- Functions called periodically to update dataset and statistics ---------------------------
// Init the dataset with all games
var initData = async function(league) {
    const dataset = await Dataset.load(league.path)
    for (const id in dataset.resources) {
        console.log(dataset.resources[id]._descriptor.name)
      }
      // get all tabular data(if exists any)
      for (const id in dataset.resources) {
        if (dataset.resources[id]._descriptor.name === "season-1819_json") {
          const writeStream = fs.createWriteStream('data/' + league.name + '-' + dataset.resources[id]._descriptor.name.replace('_', '.'));
          const file = dataset.resources[id]
          // Get a raw stream
          const stream = await file.stream();
          stream.on('finish', () => {
            return updateAtkDef(league);
          })
          const buffer = await file.buffer;
          stream.pipe(writeStream)
        }
      }
}


// Counts average goals for a league and a season, and counts avg goals for each team (when away and home)
var countStatsFromFile = function(league, season) {
    var data = fs.readFileSync('data/' + league.name + '-season-'+ season + '.json');
        var leagueJsonObj = JSON.parse(data);
        var leagueHomeGoals = 0;
        var leagueAwayGoals = 0;
        var teams = [];
        // Get avg goals for whole league and count goals per team, number of match per team, and global stats for the league (goals from home team and away team)
        for(var j = 0; j < leagueJsonObj.length; j++) {
            var awayTeam = leagueJsonObj[j].AwayTeam;
            var homeTeam = leagueJsonObj[j].HomeTeam;
            var awayGoal = leagueJsonObj[j].FTAG;
            var homeGoal = leagueJsonObj[j].FTHG;
            // Count global league stats
            leagueHomeGoals += homeGoal;
            leagueAwayGoals += awayGoal;
            // Count goals for homeTeam
            if (teams.hasOwnProperty(homeTeam)) {
                teams[homeTeam].goalsScoredHome += homeGoal;
                teams[homeTeam].goalsTakenHome += awayGoal;
                teams[homeTeam].nbMatchHome++;
            } else {
                teams[homeTeam] = { goalsScoredHome: homeGoal, goalsTakenHome: awayGoal, nbMatchHome: 1 , goalsScoredAway: 0, goalsTakenAway: 0, nbMatchAway: 0 };
            }
            // Count goals for awayTeam
            if (teams.hasOwnProperty(awayTeam)) {
                teams[awayTeam].goalsScoredAway += awayGoal;
                teams[awayTeam].goalsTakenAway += homeGoal;
                teams[awayTeam].nbMatchAway++;
            } else {
                teams[awayTeam] = { goalsScoredAway: awayGoal, goalsTakenAway: homeGoal, nbMatchAway: 1 , goalsScoredHome: 0, goalsTakenHome: 0, nbMatchHome: 0 };
            }
        }
        var leagueAvgHomeGoals = leagueHomeGoals / leagueJsonObj.length;
        var leagueAvgAwayGoals = leagueAwayGoals / leagueJsonObj.length;
        // Do averaging
        for(name in teams) {
          var team = teams[name];
          //team.homeATK = (team.goalsScoredHome / team.nbMatchHome) * leagueAvgHomeGoals;
          //team.awayATK = (team.goalsScoredAway / team.nbMatchAway) * leagueAvgAwayGoals;
          team.homeATK = (team.goalsScoredHome / team.nbMatchHome);
          team.awayATK = (team.goalsScoredAway / team.nbMatchAway);
          team.homeDEF = team.goalsTakenHome / team.nbMatchHome;
          team.awayDEF = team.goalsTakenAway / team.nbMatchAway;
        }
        return teams;
}

// Calculate the ATK and DEF for all teams
var updateAtkDef = function(league) {
    console.log('[', league.name, '] : Calculate ATK and DEF...');
    
    var stats1819 = countStatsFromFile(league, '1819');
    //countStatsFromFile(league, '1920');
    
    return stats1819;
}

var initAll = function() {
  leagues.forEach(league => {
    stats[league.name] = initData(league);
  });
}

var computeStatsFromFiles = function() {
  leagues.forEach(league => {
    stats[league.name] = updateAtkDef(league);
  })
}


// Get the data
initAll();

// Update stats from data
/*
setTimeout(function() {
    stats = computeStatsFromFiles(leagues)
  } , 10000);
*/
// Serve static folder and listen
app.use(express.static('client-react/build'));
app.listen(80);