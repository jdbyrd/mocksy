const express = require('express');
// const morgan = require('morgan');
const path = require('path');
//const db = require('../database/db.js');

const app = express();
// const bodyParser = require('body-parser');

// app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

// app.get('/api/projects', (req, res) => {});

app.listen(3000, () => console.log('Mocksy listening on port 3000!'));
