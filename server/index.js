const express = require('express');
const db = require('../database/db.js');
const path = require('path');

const app = express();
// const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '/../dist')));

// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Mocksy listening on port 3000!'));
