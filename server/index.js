let config = {};
try {
  config = require('../config.js');
} catch (err) {
  console.log('cant find config file: ', err);
}

const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const db = require('../database/db');
const query = require('../database/queries');
const insert = require('../database/inserts');

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

passport.use(new GitHubStrategy(
  {
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      return done(null, profile);
    });
  }
));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/../dist')));

app.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  (req, res) => {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  }
);

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    console.log(req.user.username);
    insert.user(req.user.username)
      .then(() => console.log(`inserted ${req.user.username} into database`))
      .catch(() => console.log(`didn't insert ${req.user.username} into db, probably cus they're already in there`));
    res.redirect('/');
  }
);

app.get('/auth/verify', (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.send(null);
  }
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/api/projects', (req, res) => {
  const { id } = req.query;
  query.projects(id).then((projects) => {
    if (id) {
      const projectFeedback = { project: projects[0] };
      query.feedback(id).then((feedback) => {
        projectFeedback.list = feedback;
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

app.get('/api/profile', (req, res) => {
  const { name } = req.query;
  console.log(name);
  query.userProjects(name).then((projects) => {
    const profile = { projects };
    query.userFeedback(name).then((feedback) => {
      profile.feedbackList = feedback;
      res.send(profile);
    });
  });
});

app.get('/api/tags', (req, res) => {
  res.send(query.tags());
});

app.post('/api/project', (req, res) => {
  if (req.user) {
    req.body.name = req.user.username;
    console.log('POST REQUEST FOR PROJECT', req.body);
    insert.project(req.body);
  }
  res.end();
});

app.post('/api/feedback', (req, res) => {
  if (req.user) {
    req.body.name = req.user.username;
    console.log('POST REQUEST FOR PROJECT', req.body);
    insert.feedback(req.body);
  }
  res.end();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

app.listen(3000, () => console.log('Mocksy listening on port 3000!'));
