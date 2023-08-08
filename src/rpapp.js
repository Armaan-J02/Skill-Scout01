// ResumeParserApp.js
const http = require('http');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');

const app = express();

// Set up view engine and configurations
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'uwotm8'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Load routes
const index = require('./routes/index');
const users = require('./routes/users');
app.use('/', index);
app.use('/users', users);

// Error handling middleware should be loaded after loading the routes
if (app.get('env') === 'development') {
  app.use(errorHandler());
}

// Create the HTTP server
const server = http.createServer(app);

// Listen to the specified port
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
