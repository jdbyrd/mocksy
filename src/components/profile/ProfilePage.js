/* User page with header, apps tab, and feedback given tab. */
import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { Tabs, Button } from 'antd';
import UserHeader from './UserHeader';
import AppsTab from './AppsTab';
import FeedbackGivenTab from './FeedbackGivenTab';
import { populateUser } from '../../actions/index';

const { TabPane } = Tabs;
const operations = <Button>Extra Action</Button>;


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: true,
    };
  }

  componentDidMount() {
    populateUser(this.props.match.params.name);
    this.props.isHomepage(false);
  }

  componentWillReceiveProps(nextprops) {
    populateUser(nextprops.match.params.name);
  }

  render() {
    return (
      <div>
        <UserHeader />
        <TabsContainer className="tabs-container">
          <Tabs>
            <TabPane tab="Apps" key="1"><AppsTab name={this.props.match.params.name} /></TabPane>
            <TabPane tab="Feedback given" key="2"><FeedbackGivenTab name={this.props.match.params.name} /></TabPane>
          </Tabs>
        </TabsContainer>
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