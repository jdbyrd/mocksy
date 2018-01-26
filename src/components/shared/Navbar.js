import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
  	super(props)
  }

  handleClick() {
    console.log('handleClick running');
  }

  render = () => (
    <div className="navbar">
      <ul>
        <li onClick={this.handleClick}>Feed</li>
        <li>Popular</li>
              </ul>
      <div className="navbar-right-container">
        <input type="text" />
        <span className="helper"></span>
        <img className="bell-icon" src="https://www.materialui.co/materialIcons/social/notifications_grey_192x192.png" />
        <div className="user-img-container"></div>
      </div>
    </div>
  );

}

export default Navbar;
