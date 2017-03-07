'use strict';

/*
 * nodejs-express-mongoose
 * Copyright(c) 2015 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 */

require('dotenv').config();

const fs = require('fs');
const join = require('path').join;
const express = require('express');
//const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config');

const models = join(__dirname, 'app/models');
const port = process.env.PORT || 3002;

const app = express();
//const connection = connect();
//console.log(connection);
/**
 * Expose
 */

module.exports = {
  app
};

require('./config/express')(app, passport);
require('./config/routes')(app, passport);
/*
connection
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);
*/
function listen () {
  if (app.get('env') === 'test') return;
  app.listen(port);
  console.log('Express app started on port ' + port);
}

//console.log('statrted at port: ' + port);
listen()
/*
function connect () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  var connection = mongoose.connect(config.db, options).connection;
  return connection;
}
*/
