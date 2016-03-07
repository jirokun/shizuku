var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var express = require('express');
var bodyParser = require('body-parser');

var pg = require('pg');
var conString = "postgres://jiro:@localhost/test";

var app = new (express)();
var port = 3000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('www'));
app.use('/node_modules/', express.static('node_modules'));
app.use('/bower_components/', express.static('bower_components'));
/*
app.get("/", function(req, res) {
  res.sendFile(__dirname + 'www/index.html')
})
app.get("/runtime", function(req, res) {
  res.sendFile(__dirname + 'www/runtime.html')
})
app.get("/editor", function(req, res) {
  res.sendFile(__dirname + 'www/editor.html')
})
*/
app.post("/executeSQL", function(req, res) {
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    var sql = req.body.sql;
    console.log(sql);
    client.query(sql, [], function(err, result) {
      //call `done()` to release the client back to the pool 
      done();
      if(err) {
        return console.error('error running query', err);
      }
      res.send({result: result.rows});
      //output: 1 
    });
  });
})

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
})
