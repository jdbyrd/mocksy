/* User page with header, apps tab, and feedback given tab. */
import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import UserHeader from './UserHeader';
import AppsTab from './AppsTab';
import FeedbackGivenTab from './FeedbackGivenTab';
import { populateUser } from '../../actions/index';


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: true,
    };
    this.showApps = this.showApps.bind(this);
    this.showFeedback = this.showFeedback.bind(this);
  }

  componentDidMount() {
    populateUser(this.props.match.params.name);
  }

  componentWillReceiveProps(nextprops){
    populateUser(nextprops.match.params.name);
  }

  showApps() {
    this.setState({
      apps: true,
    });
  }

  showFeedback() {
    this.setState({
      apps: false
    });
  }

  render() {
    return (
      <div>
        <UserHeader />
        <TabsContainer>
          <AppsButton onClick={this.showApps} className={this.state.apps ? 'current-tab' : null}>Apps</AppsButton>
          <FeedBackGivenButton onClick={this.showFeedback} className={this.state.apps ? null : 'current-tab'}>Feedback given</FeedBackGivenButton>
        </TabsContainer>
        {this.state.apps ?
          <AppsTab />
        :
          <FeedbackGivenTab />
        }
      </div>
    );
  }
}

export default ProfilePage;

const TabsContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
`;

const AppsButton = styled.div`
  margin-left: 30px;
  margin-bottom: -1px;
  border: 1px solid black;
  border-radius: 5px 5px 0 0;
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
`;

const FeedBackGivenButton = styled.div`
  margin-left: 5px;
  margin-bottom: -1px;
  border: 1px solid black;
  border-radius: 5px 5px 0 0;
  display: inline-block;
  padding: 0 25px;
  cursor: pointer;
`;