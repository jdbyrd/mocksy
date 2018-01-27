const path = require('path');
const express = require('express');
const db = require('../database/db');
const query = require('../database/queries');

const app = express();
// const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '/../dist')));

app.get('/api/projects', (req, res) => {
  const { id } = req.query;
  query.projects(id).then((projects) => {
    if (id) {
      const projectFeedback = projects[0];
      query.feedback(id).then((feedback) => {
        projectFeedback.feedback = feedback;
        res.send(projectFeedback);
      });
    } else {
      res.send(projects);
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

app.listen(3000, () => console.log('Mocksy listening on port 3000!'));
