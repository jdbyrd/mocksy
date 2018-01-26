const sample = [
  {
    id: 0,
    title: 'Hue',
    url: 'https://jegishue.herokuapp.com/',
    github: 'https://github.com/jegis/hue',
    text: 'A reddit clone',
    contributor: 'James',
    userid: 1
  },
  {
    id: 1,
    title: 'DM-Scribe',
    url: 'https://dmscribe.herokuapp.com/',
    github: 'https://github.com/jegis/dm-scribe',
    text: 'A thing for people who are nerds',
    contributor: 'Spencer',
    userid: 2
  }
];

const ProjectsReducer = (state = sample, action) => {
  if (action.type === 'POPULATE_FEED') {
    return action.payload;
  }
  return state;
};

export default ProjectsReducer;
