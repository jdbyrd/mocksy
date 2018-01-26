/* Contains screenshot of deployed app, title, author, description, tech stack, buttons to provide feedback or view feedback. */
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../shared/button';

class AppCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Link to={`/project/${this.props.project.id}`}>{this.props.project.title}</Link>
      </div>
    );
  }
}

export default AppCard;
