/* Popup modal that contains input fields for URL, Github repo, title, contributors, description, and photo upload section. */
import React from 'react';
import { connect } from 'react-redux';

class AppsTab extends React.Component {
  constructor(props) {
    super(props);
    this.projectFormSubmit = this.projectFormSubmit.bind(this);
  }

  projectFormSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    let form = {};
    for (var pair of data.entries()) {
      form[pair[0]] = pair[1];
    }
    console.log(form);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.projectFormSubmit}>
          <div className="field">
            <label>Title:</label>
            <input type="text" name="name" />
          </div>
          <div className="field">
            <label>Contributors:</label>
            <input type="text" name="contributor" />
          </div>
          <div className="field">
            <label>Description:</label>
            <input type="text" name="description" />
          </div>
          <div className="field">
            <label>Project Url:</label>
            <input type="text" name="url" />
          </div>
          <div className="field">
            <label>Github Url:</label>
            <input type="text" name="github_url" />
          </div>
          <div className="field">
            <label>Tech Stack:</label>
            <input type="text" name="tag" />
          </div>
          <span><button type="submit">Submit</button></span>
        </form>
      </div>
    );
  }
}

export default (AppsTab);
