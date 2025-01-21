// Create web server
// npm install express
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var comments = require('./comments.json');

app.use(express.static('public'));
app.use(bodyParser.json());

// Get comments
app.get('/comments', function(req, res) {
    res.json(comments);
});

// Add comments
app.post('/comments', function(req, res) {
    comments.push(req.body);
    fs.writeFile('./comments.json', JSON.stringify(comments, null, 4), function(err) {
        if (err) {
            console.log(err);
        }
    });
    res.json(comments);
});

// Delete comments
app.delete('/comments', function(req, res) {
    comments = [];
    fs.writeFile('./comments.json', JSON.stringify(comments, null, 4), function(err) {
        if (err) {
            console.log(err);
        }
    });
    res.json(comments);
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});
