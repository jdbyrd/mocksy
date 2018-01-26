const knex = require('./index');

const user = (name, password) => knex('users').insert({ name, password });

const project = (data) => {
  const { name } = data;
  const { title } = data;
  const { url } = data;
  const { github } = data;
  const { text } = data;
  const { contributor } = data;
  const userid = knex('users').where({ name }).select('id');
  knex('projects').insert({
    title,
    url,
    github_url: github,
    text,
    contributor,
    userid
  })
    .then(() => console.log('inserted project into database'))
    .catch(error => console.log('DID NOT ADD PROJECT: ', error));
};

const feedback = (data) => {
  const { title } = data;
  const { name } = data;
  const { upvotes } = data;
  const { downvotes } = data;
  const { text } = data;
  const userid = knex('users').where({ name }).select('id');
  const projectid = knex('projects').where({ title }).select('id');
  knex('feedback').insert({
    up_votes: upvotes,
    down_votes: downvotes,
    text,
    userid,
    projectid
  })
    .then(() => console.log('inserted feedback into database'))
    .catch(error => console.log('DID NOT ADD FEEDBACK: ', error));
};


module.exports = {
  user,
  project,
  feedback
};


/*
          table.integer('up_votes');
          table.integer('down_votes');
          table.text('text');
          table.integer('userid').references('users.id');
          table.integer('projectid').references('project.id');
*/