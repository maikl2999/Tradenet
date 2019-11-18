const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:63342"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

require('./routes')(app);

const PORT = process.env.PORT || 3091;

const server = http.createServer(app);
server.listen(PORT, function () {
    console.log('Listening on PORT:' + PORT)
});