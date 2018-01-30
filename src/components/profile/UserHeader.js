/* Header with Github photo, name, bio, and Github link. */
import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';


const mapStateToProps = state => (
  {
    user: state.user.profile
  }
);

class UserHeader extends React.Component {
  render() {
    return (
      <div>
        <Row gutter={48}>
          <Col span={2} />
          <Col span={2}>PROFILE PHOTO</Col>
          <Col span={16} >USER INFO</Col>
          <Col span={2} >GITHUB ICON W/LINK</Col>
          <Col span={2} />
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserHeader);
