var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = Number(process.env.PORT || 5000);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname));

//ROUTING
var options = { root: __dirname };
app.get('/', function (req, res,next) {
 res.redirect('/');
});

app.get('/#!/characters', function (req, res) {
 res.sendFile('./index.html', options);
});

// Starting server
var server = http.createServer(app).listen(port, function() {
  console.log("Server is Running on 127.0.0.1:" + port);
});
