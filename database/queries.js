const knex = require('knex');

const projects = () => {
  knex('projects').select()
    .then(res => console.log('res:', res));
};

export default projects;
