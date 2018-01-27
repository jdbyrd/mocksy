const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('dev'));

app.use(express.static(__dirname + '/../dist'));

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname+'/../dist/index.html'))
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
