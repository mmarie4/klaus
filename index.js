var express = require('express');
var fs = require('fs');

var app = express();

var PASSWORD = fs.readFileSync('pwd.txt');

// Serve static folder
app.use(express.static('client-react/build'));


// Check authentication
app.get('/auth', function(req, res) {
    if (req.query.pwd == PASSWORD) {
        res.send( { status: 'OK', token: 'lkESF7855hbnefS544SrefESue11Wm' });
    } else {
        res.send( {status: 'error' } );
    }
});


app.listen(8080);