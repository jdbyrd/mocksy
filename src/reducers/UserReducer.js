const sample = {
  user: {name: 'james'},
  projects: [
    {
      id: 0,
      title: 'Hue',
      url: 'https://jegishue.herokuapp.com/',
      github: 'https://github.com/jegis/hue',
      text: 'A reddit clone',
      user: 'James',
      userid: 1,
      image: 'https://color-wheel-artist.com/thrive/wp-content/uploads/2017/02/hue-color-wheel-featured.jpg',
      tags: ['JavaScript', 'React', 'Filestack API', 'NodeJS', 'MongoDb'],
    },
    {
      id: 1,
      title: 'DM-Scribe',
      url: 'https://dmscribe.herokuapp.com/',
      github: 'https://github.com/jegis/dmscribe',
      text: 'A thing for people who are nerds',
      user: 'Spencer',
      userid: 2,
      image: 'https://nerdist.com/wp-content/uploads/2015/08/Dungeons-and-Dragons-movie.jpg',
      tags: ['JavaScript', 'React', 'NodeJS', 'MongoDb'],
    },
    {
    id: 2,
    title: 'Google',
    url: 'http://www.google.com',
    github: 'http://github.com/maybeted/',
    text: 'Search for anything and everything',
    user: 'Edward White',
    userid: 3,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png',
    tags: ['Awesome', 'Cool', 'Better than Hue']
  },
  {
    id: 2,
    title: 'Google',
    url: 'http://www.google.com',
    github: 'http://github.com/maybeted/',
    text: 'Search for anything and everything',
    user: 'Edward White',
    userid: 3,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png',
    tags: ['Awesome', 'Cool', 'Better than Hue']
  },
  {
    id: 2,
    title: 'Google',
    url: 'http://www.google.com',
    github: 'http://github.com/maybeted/',
    text: 'Search for anything and everything',
    user: 'Edward White',
    userid: 3,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png',
    tags: ['Awesome', 'Cool', 'Better than Hue']
  },
  {
    id: 2,
    title: 'Google',
    url: 'http://www.google.com',
    github: 'http://github.com/maybeted/',
    text: 'Search for anything and everything',
    user: 'Edward White',
    userid: 3,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png',
    tags: ['Awesome', 'Cool', 'Better than Hue']
  }
  ],
  feedback: [
    { text: 'THIS IS NOT HOW  THIS IS GOING TO BE SETUP I DUNNO HOW THIS WILL BE SENT FROM SERVER' }
  ]

};

const UserReducer = (state = sample, action) => {
  if (action.type === 'POPULATE_USER') {
    return action.payload;
  }
  return state;
};
export default UserReducer;
