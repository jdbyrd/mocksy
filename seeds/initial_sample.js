exports.seed = async (knex) => {
  await knex('project_tags').del();
  await knex('tags').del();
  await knex('review_type').del();
  await knex('votes').del();
  await knex('feedback').del();
  await knex('projects').del();
  await knex('users').del();

  await knex('users').insert([
    { id: 1, name: 'Spencer', },
    { id: 2, name: 'James', },
    { id: 3, name: 'Edward', },
    { id: 4, name: 'Jackie', },
  ]);
  await knex('projects').insert([
    {
      id: 1,
      title: 'DM Scribe',
      url: 'http://dmscribe.herokuapp.com/',
      github: 'https://github.com/JEGIS/DMScribe',
      text: 'This is nerdvana.',
      contributor: 'James',
      user_id: 1
    },
    {
      id: 2,
      title: 'Hue',
      url: 'http://true-hue.herokuapp.com/',
      github: 'https://github.com/legacy-hue/hue',
      text: 'Your source for quality shit-posts.',
      contributor: 'Spencer',
      user_id: 2
    },
  ]);
  await knex('feedback').insert([
    {
      id: 1,
      text: 'Innumerable bugs. I don\'t even know where to begin...',
      user_id: 3,
      project_id: 2
    },
    {
      id: 2,
      text: 'This styling is literally from the 90\'s.',
      user_id: 4,
      project_id: 1
    }
  ]);
  await knex('votes').insert([
    {
      id: 1,
      user_id: 1,
      feedback_id: 1,
      vote: true
    },
    {
      id: 2,
      user_id: 1,
      feedback_id: 2,
      vote: false
    },
    {
      id: 3,
      user_id: 2,
      feedback_id: 2,
      vote: false
    },
    {
      id: 4,
      user_id: 2,
      feedback_id: 1,
      vote: false
    },
    {
      id: 5,
      user_id: 3,
      feedback_id: 1,
      vote: true
    },
    {
      id: 6,
      user_id: 4,
      feedback_id: 1,
      vote: true
    },
    {
      id: 7,
      user_id: 4,
      feedback_id: 2,
      vote: true
    }
  ]);
  await knex('review_type').insert([
    { id: 1, options: 'Feature' },
    { id: 2, options: 'Design' },
    { id: 3, options: 'Bug' },
    { id: 4, options: 'Other' }
  ]);
  await knex('tags').insert([
    { id: 1, tag: 'React' },
    { id: 2, tag: 'Redux' },
    { id: 3, tag: 'React Router' }
  ]);
  await knex('project_tags').insert([
    { id: 1, tag_id: 1, project_id: 1 },
    { id: 2, tag_id: 2, project_id: 1 },
    { id: 3, tag_id: 1, project_id: 2 },
    { id: 4, tag_id: 3, project_id: 2 }
  ]);
};
