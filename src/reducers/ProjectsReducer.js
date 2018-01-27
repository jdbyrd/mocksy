const sample = [
  {
    id: 0,
    title: 'Hue',
    url: 'https://jegishue.herokuapp.com/',
    github: 'https://github.com/jegis/hue',
    text: 'A reddit clone for weird people.',
    user: 'James Byrd',
    userid: 1,
    image: 'https://color-wheel-artist.com/thrive/wp-content/uploads/2017/02/hue-color-wheel-featured.jpg',
    tags: ['JavaScript', 'React', 'Filestack API', 'NodeJS', 'MongoDB'],
  },
  {
    id: 1,
    title: 'DM-Scribe',
    url: 'https://dmscribe.herokuapp.com/',
    github: 'https://github.com/jegis/dmscribe',
    text: 'A thing for people who are nerds.',
    user: 'Spencer Vaterlaus',
    userid: 2,
    image: 'https://nerdist.com/wp-content/uploads/2015/08/Dungeons-and-Dragons-movie.jpg',
    tags: ['JavaScript', 'React', 'NodeJS', 'MongoDB'],
  }
];

const ProjectsReducer = (state = sample, action) => {
  if (action.type === 'POPULATE_FEED') {
    return action.payload;
  }
  return state;
};

export default ProjectsReducer;
