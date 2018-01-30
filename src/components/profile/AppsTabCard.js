import React from 'react';

class AppsTabCard extends React.Component {

  render() {
    const project = this.props.project;
    return (
      <div>
        <h3>{project.title}</h3>
        <h4>{project.text}</h4>
      </div>
    );
  }
}

export default AppsTabCard;
