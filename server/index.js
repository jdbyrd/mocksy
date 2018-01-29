const path = require('path');
const express = require('express');
const db = require('../database/db');
const query = require('../database/queries');
const insert = require('../database/inserts');


const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
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

app.get('/api/users', (req, res) => {
  const { name } = req.query;
  query.users(name).then((users) => {
    if (name) {
      res.send(users[0]);
    } else {
      res.send(users);
    }
  });
});

app.post('/api/project', (req, res) => {
  const project =  req.body;
  req.body.name = 'TEST_USER';
  console.log(req.body);
  console.log('POST REQUEST FOR PROJECT');
  insert.project(req.body);
  res.end();
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

app.listen(3000, () => console.log('Mocksy listening on port 3000!'));
