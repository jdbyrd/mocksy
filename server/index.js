const express = require('express');

const app = express();
var bodyParser = require('body-parser');
var db = require('../database/db.js');

app.use(express.static(__dirname + '/../dist'));

// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Mocksy listening on port 3000!'));
