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
const fs = require('fs');
const Busboy = require('busboy');
const { thumb } = require('node-thumbnail');

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
    process.nextTick(() => done(null, profile));
  }
));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/../dist')));

app.get('/api/feedback/images', async (req, res) => {
  const { imageIds } = req.query;
  const files = await fse.readdir('./dist/images/feedback/processed');
  const imagesById = {};
  imageIds.forEach((id) => {
    const images = files.filter(file => file.slice(0, id.length) === id);
    imagesById[id] = images;
  });
  res.send(imagesById);
});

app.post('/api/feedback/images', (req, res) => {
  const tempId = req.query.id;
  const busboy = new Busboy({ headers: req.headers });
  // handle all incoming `file` events, which are thrown when a FILE field is encountered
  // in multipart request
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const saveTo = path.join('./dist/images/feedback/new', tempId + path.extname(filename));
    console.log(`Saving file at ${saveTo}`);
    // write file to disk
    file.pipe(fs.createWriteStream(saveTo));
  });

  busboy.on('finish', () => {
    res.writeHead(200, { Connection: 'close' });
    res.end('Image uploaded!');
  });

  return req.pipe(busboy);
});

app.delete('/api/feedback/images', async (req, res) => {
  const { username } = req.user;
  const files = await fse.readdir('./dist/images/feedback/new');
  let targets;
  if (req.query.target) {
    targets = files.filter(file => file.includes(req.query.target));
  } else {
    targets = files.filter(file => file.includes(username));
  }
  await targets.forEach(target => fse.remove(`./dist/images/feedback/new/${target}`, err => console.log(err)));
  res.end();
});

app.put('/api/feedback/images', async (req, res) => {
  const { id } = req.body;
  const { username } = req.user;
  const feedbackPath = './dist/images/feedback';
  const files = await fse.readdir(`${feedbackPath}/new`);
  const submittedImages = files.filter(file => file.includes(username));
  await Promise.all(submittedImages.map((file, i) => fse.rename(`${feedbackPath}/new/${file}`, `${feedbackPath}/new/${id}_${i}${path.extname(file)}`)));
  const renamedFiles = await fse.readdir(`${feedbackPath}/new`);

  await thumb({
    source: `${feedbackPath}/new`, // could be a filename: dest/path/image.jpg
    destination: `${feedbackPath}/thumbnails`,
    concurrency: 1,
    overwrite: true,
    ignore: true,
    suffix: '',
  }, (files, err) => {
    console.log('err:', err);
    console.log('files:', files);
  });

  await renamedFiles.forEach(file => fse.move(`${feedbackPath}/new/${file}`, `${feedbackPath}/processed/${file}`));
  res.end();
});

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
  const { sortFeedback } = req.query;
  if (req.query.sort === 'true') {
    query.sortProjects().then((projects) => {
      res.send(projects);
    });
  }
  query.projects(id).then((projects) => {
    if (id) {
      const projectFeedback = { project: projects[0] };
      query.contributors(id).then((contributors) => {
        projectFeedback.contributors = contributors;
        if (req.user) {
          query.users(req.user.username).then((user) => {
            query.feedback(id, user[0].id, sortFeedback).then((feedback) => {
              projectFeedback.list = feedback;
              res.send(projectFeedback);
            });
          });
        } else {
          query.feedback(id, undefined, sortFeedback).then((feedback) => {
            projectFeedback.list = feedback;
            res.send(projectFeedback);
          });
        }
      });
    } else {
      query.tags()
        .then((tags) => {
          projects.forEach((project) => {
            project.tags = tags.reduce((memo, tag) => {
              if (tag.project_id === project.id) {
                return [...memo, tag];
              }
              return memo;
            }, []);
          });
          res.send(projects);
        });
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
  const message = await screen.getScreenshot(url, tempId, './dist/images/apps/new/');
  res.send(message);
});

app.get('/api/notifications', (req, res) => {
  query.users(req.user.username).then((users) => {
    query.getNotifications(users[0].id).then((data) => {
      console.log('get data', data);
      res.send(data);
    });
  });
});

app.post('/api/notifications', (req, res) => {
  const { feedbackid } = req.body;
  console.log(req.body);
  update.wasNotified(feedbackid, 't')
    .then(() => {
      query.users(req.user.username).then((users) => {
        query.getNotifications(users[0].id).then((data) => {
          res.send(data);
        });
      });
    });
});

app.delete('/user/screenshot', async (req, res) => {
  const files = await fse.readdir('./dist/images/apps/new');
  const targets = files.filter(file => file.includes(req.user.username));
  targets.forEach(target => fse.remove(`./dist/images/apps/new/${target}`, err => console.log(err)));
  res.end();
});

app.post('/api/bio', async (req, res) => {
  await update.bio(req.user.username, req.body.text);
  res.end();
});

app.post('/api/project', async (req, res) => {
  if (req.user) {
    console.log(req.body);
    req.body.name = req.user.username;
    const data = await insert.project(req.body);
    const appsPath = './dist/images/apps';
    await fse.rename(`${appsPath}/new/${req.body.tempId}.png`, `${appsPath}/new/${data[0].id}.png`);
    const renamedFiles = await fse.readdir(`${appsPath}/new`);
    req.body.projectId = data[0].id;
    insert.contributors(req.body);
    insert.tags(req.body);

    await thumb({
      source: `${appsPath}/new`, // could be a filename: dest/path/image.jpg
      destination: `${appsPath}/thumbnails`,
      concurrency: 1,
      overwrite: true,
      ignore: true,
      suffix: '',
    }, (files, err, stdout, stderr) => {
      console.log('files:', files);
      console.log('err:', err);
      console.log('stdout:', stdout);
      console.log('stdeer:', stderr);
    });

    await renamedFiles.forEach(file => fse.remove(`${appsPath}/new/${file}`));
  }
  res.end();
});

app.post('/api/feedback', async (req, res) => {
  let feedbackId;
  if (req.user) {
    req.body.name = req.user.username;
    feedbackId = await insert.feedback(req.body);
    [feedbackId] = feedbackId;
    console.log('feedbackId:', feedbackId);
    insert.updateNumFeedback(req.body.projectId);
    res.send({ feedbackId });
  } else {
    res.end();
  }
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
            insert.vote(req.user.username, req.body.feedback_id, req.body.vote, req.body.project_id);
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

app.post('/api/issues', (req, res) => {
  if (req.user) {
    update.issue(req.body.feedback_id, req.body.marked);
    res.end();
  }
});

app.post('/api/feedback/update', (req, res) => {
  if (req.user) {
    update.feedback(req.body);
  }
  res.end();
});

app.post('/api/project/update', (req, res) => {
  if (req.user) {
    update.project(req.body);
  }
  res.end();
});

app.delete('/api/project', (req, res) => {
  if (req.user) {
    const { id } = req.query;
    deletes.contributors(id).then(() => {
      deletes.tags(id).then(() => {
        deletes.projectVotes(id).then(() => {
          deletes.projectFeedback(id).then(() => {
            deletes.project(id)
              .then(() => {
                fse.remove(`./dist/images/apps/thumbnails/${id}.png`);
                res.end();
              });
          });
        });
      });
    });
  }
});

app.delete('/api/feedback', async (req, res) => {
  if (req.user) {
    const { id } = req.query;
    const { projectid } = req.query;
    await insert.decreaseNumFeedback(projectid);
    await deletes.feedbackVotes(id);
    await deletes.feedback(id);
    const feedbackPath = './dist/images/feedback';

    const processedFiles = await fse.readdir(`${feedbackPath}/processed`);
    let targets = processedFiles.filter(file => file.substring(0, file.indexOf('_')) === id);
    targets.forEach(target => fse.remove(`${feedbackPath}/processed/${target}`, err => console.log(err)));

    const thumbnailFiles = await fse.readdir(`${feedbackPath}/thumbnails`);
    targets = thumbnailFiles.filter(file => file.substring(0, file.indexOf('_')) === id);
    targets.forEach(target => fse.remove(`${feedbackPath}/thumbnails/${target}`, err => console.log(err)));
  }
  res.end();
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

  socket.on('post feedback', (fromUser, project, userid, feedback, projectid) => {
    console.log('userid: ', userid)
    if (typeof userid === 'number') {
      console.log('RUNNING')
      query.getUserFromId(userid).then((data) => {
        const username = data.name;
        const socketId = allSockets[data.name].socketid;
        query.getFeedbackId(fromUser, project, feedback, projectid).then((res) => {
          console.log('THE RESPONSE ########: ', res[0]);
          query.getNotifications(username).then((data) => {
            console.log('getNotifications query running')
            socket.broadcast.to(socketId).emit('notification', fromUser, project, res[0], data);
            console.log('logging this after emit')
          });
        });
      });
    } else {
      const socketId = allSockets[userid].socketid;
      query.getFeedbackId(fromUser, project, feedback, projectid).then((res) => {
        console.log('getFeedbackId query running')
        query.getNotifications(userid).then((data) => {
          console.log('getNotifications query running')
          socket.broadcast.to(socketId).emit('notification', fromUser, project, res[0], data);
          console.log('logging this after emit')
        });
      });
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

