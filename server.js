var express = require('express');
var fs = require('fs');
const {Dataset} = require('data.js');
var interceptor = require('stream-interceptor');

var app = express();

const PASSWORD = fs.readFileSync('pwd.txt', 'utf8').trim();
const ligue1Path = { path: 'https://datahub.io/sports-data/french-ligue-1/datapackage.json', name : 'Ligue1' };
const premierLeaguePath =  { path: 'https://datahub.io/sports-data/english-premier-league/datapackage.json', name : 'PremierLeague' };
const bundesligaPath = { path: 'https://datahub.io/sports-data/german-bundesliga/datapackage.json', name : 'Bundesliga' }

// --------------------------- Routes -----------------------------------------------------------------------------
// Check authentication
app.get('/auth', function(req, res) {
    if (req.query.pwd == PASSWORD) {
        res.send( { status: 'OK', token: token });
    } else {
        res.send( {status: 'error' } );
    }
});

// Calculate probabilities for two teams
app.get('/probabilities', function(req, res) {
    var team1 = req.query.team1;
    var team2 = req.query.team2;
    console.log('Calculating probabilities for a match between', team1, 'and', team2, '...');
    // ...
    var fakeData = [
        ['2.5%', '2.2%', '1.5%', '1.6%', '0.8%', '0.01%'],
        ['2.5%', '2.2%', '1.5%', '1.6%', '0.8%', '0.01%'],
        ['2.5%', '2.2%', '1.5%', '1.6%', '0.8%', '0.01%'],
        ['2.5%', '2.2%', '1.5%', '1.6%', '0.8%', '0.01%'],
        ['2.5%', '2.2%', '1.5%', '1.6%', '0.8%', '0.01%']
    ];
    // ...
    console.log('Sending probabilities for a match between', team1, 'and', team2);
    res.send(JSON.stringify(fakeData));
});


// --------------------- Functions called periodically to update dataset and statistics ---------------------------
// Init the dataset with all games
var initData = async function(path) {
    const dataset = await Dataset.load(path.path)
    for (const id in dataset.resources) {
        console.log(dataset.resources[id]._descriptor.name)
      }
      // get all tabular data(if exists any)
      for (const id in dataset.resources) {
        if (dataset.resources[id]._descriptor.format === "json") {
          const writeStream = fs.createWriteStream('data/' + path.name + '-' + dataset.resources[id]._descriptor.name.replace('_', '.'));
          const file = dataset.resources[id]
          // Get a raw stream
          const stream = await file.stream()

          const buffer = await file.buffer;
          stream.pipe(writeStream)
        }
      }
      updateAtkDef(path);
}

// Calculate the ATK and DEF for all teams
var updateAtkDef = function(path) {
    console.log('[', path.name, '] : Calculate ATK and DEF...');
    // ...
    console.log('[', path.name, '] : ATK and DEF updated');
}

/*
// Update the dataset one time per day
initData(ligue1Path);
initData(premierLeaguePath);
initData(bundesligaPath);
*/

// Serve static folder and listen
app.use(express.static('client-react/build'));
app.listen(8080);