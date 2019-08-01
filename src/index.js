const express = require('express'),
      morgan = require('morgan'),
      path = require('path'),
      { mongoose } = require('./database')
      app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/task', require('./routes/task.routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => { 
    console.log(`Server on port ${app.get('port')}`);
});

