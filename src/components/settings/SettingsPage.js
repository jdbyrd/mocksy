import React from 'react';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.props.isHomepage(false);
  }

  render() {
	  return (
      <div className="settings-container">
        <h1>This will be the settings page</h1>
      </div>
	  )
  }
}

export default Settings;
