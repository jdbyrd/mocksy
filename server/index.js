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
const deletes = require('../database/deletes');
const update = require('../database/updates');
const screen = require('./screenshot_scraper');
const fse = require('fs-extra');

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID || config.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET || config.GITHUB_CLIENT_SECRET,
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

const allSockets = {};

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
    insert.user(req.user)
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
  if (req.query.sort === 'true') {
    query.sortProjects().then((projects) => {
      console.log('projects: ', projects)
      res.send(projects);
    });
  }
  query.projects(id).then((projects) => {
    console.log('projects: ', projects)
    if (id) {
      const projectFeedback = { project: projects[0] };
      if (req.user) {
        query.users(req.user.username).then((user) => {
          query.feedback(id, user[0].id).then((feedback) => {
            projectFeedback.list = feedback;
            res.send(projectFeedback);
          });
        });
      } else {
        query.feedback(id).then((feedback) => {
          projectFeedback.list = feedback;
          res.send(projectFeedback);
        });
      }
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
  query.userProjects(name).then((projects) => {
    const profile = { projects };
    query.userFeedback(name).then((feedback) => {
      profile.feedbackList = feedback;
      query.users(name).then((user) => {
        profile.user = user[0];
        res.send(profile);
      });
    });
  });
});

app.get('/api/tags', (req, res) => {
  query.tags().then(dbRes => res.send(dbRes));
});

app.get('/api/search', (req, res) => {
  const q = `${req.query.query}%`;
  query.searchUsers(q).then((users) => {
    const results = { users };
    query.searchProjects(q).then((project) => {
      results.projects = project;
      res.send(results);
    });
  });
});

app.get('/api/screenshot', async (req, res) => {
  const { url, tempId } = req.query;
  const message = await screen.getScreenshot(url, tempId);
  res.send(message);
});

app.delete('/user/screenshot', async (req, res) => {
  console.log('request to delete screenshot!');
  const files = await fse.readdir('./dist/images');
  const targets = files.filter(file => file.includes(req.user.username));
  targets.map(target => fse.remove(`./dist/images/${target}`, err => console.log(err)));
  res.end();
});

app.post('/api/project', (req, res) => {
  if (req.user) {
    req.body.name = req.user.username;
    insert.project(req.body)
      .then((data) => {
        fse.rename(`./dist/images/${req.body.tempId}.png`, `./dist/images/${data[0].id}.png`);
      });
  }
  res.end();
});

app.post('/api/feedback', (req, res) => {
  if (req.user) {
    req.body.name = req.user.username;
    insert.feedback(req.body);
    insert.updateNumFeedback(req.body.projectId);
  }
  res.end();
});

app.post('/api/notified', (req, res) => {
  if (req.user) {
    console.log('Finish this later. I need to figure out the feedback ID so I can update the database')
  }
  res.end();
});

app.post('/api/votes', (req, res) => {
  const differenceIncrementer = (diff) => {
    if (diff > 0) {
      if (req.body.vote === true) {
        update.incrementFeedbackUp(req.body.feedback_id);
      } else {
        update.decrementFeedbackDown(req.body.feedback_id);
      }
      if (diff > 1) {
        update.decrementFeedbackDown(req.body.feedback_id);
      }
    } else if (diff < 0) {
      if (req.body.vote === false) {
        update.incrementFeedbackDown(req.body.feedback_id);
      } else {
        update.decrementFeedbackUp(req.body.feedback_id);
      }
      if (diff < -1) {
        update.decrementFeedbackUp(req.body.feedback_id);
      }
    }
  };

  if (req.user) {
    if (req.body.votes_id === null) {
      query.users(req.user.username).then((user) => {
        query.votes(user[0].id, req.body.feedback_id).then((vote) => {
          if (vote.length === 0) {
            insert.vote(req.user.username, req.body.feedback_id, req.body.vote);
            differenceIncrementer(req.body.difference);
            res.end();
          } else if (vote[0].vote !== req.body.vote) {
            update.vote(vote[0].votes_id, req.body.vote);
            differenceIncrementer(req.body.difference);
            res.end();
          }
        });
      });
    } else {
      query.votesById(req.body.votes_id).then((vote) => {
        if (vote[0].vote !== req.body.vote) {
          update.vote(req.body.votes_id, req.body.vote);
          differenceIncrementer(req.body.difference);
          res.end();
        }
      });
    }
  }
});

app.delete('/api/project', (req, res) => {
  if (req.user) {
    const { id } = req.query;
    deletes.projectFeedback(id).then(() => {
      deletes.project(id)
        .then(() => res.end());
    });
  }
});

app.delete('/api/feedback', (req, res) => {
  if (req.user) {
    const { id } = req.query;
    const { projectid } = req.query;
    insert.decreaseNumFeedback(projectid);
    deletes.feedbackVotes(id).then(() => {
      deletes.feedback(id)
        .then(() => res.end());
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

const server = app.listen(3000, () => {
  console.log('Mocksy listening on port 3000!');
});

const io = require('socket.io').listen(server);

io.on('connection', (socket) => {
  console.log('User connected!!!!');
  console.log('socket.id: ', socket.id);

  app.post('/api/sockets', (req, res) => {
    const { username } = req.body;
    const { socketid } = req.body;
    socket.socketid = socketid;
    allSockets[username] = socket;
    res.end();
  });

  socket.on('post feedback', (fromUser, project, userid) => {
    if (typeof userid === 'number') {
      query.getUserFromId(userid).then((data) => {
        const socketId = allSockets[data.name].socketid;
        socket.broadcast.to(socketId).emit('notification', fromUser, project);
      });
    } else {
      const socketId = allSockets[userid].socketid;
      socket.broadcast.to(socketId).emit('notification', fromUser, project);
    }
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  // handle a new message
  socket.on('new:message', (msgObject) => {
    io.emit('new:message', msgObject);
  });
});

