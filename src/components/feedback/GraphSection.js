import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => (
  {
  	//probably wont need this project key/value pair
    project: state.feedback.project,
    feedbackItems: state.feedback.list
  }
);

class GraphSection extends React.Component {
  constructor() {
    super();
  }

  amountOfFeedbackByType() {
    const feedbackCopy = this.props.feedbackItems.slice();
    // feedbackCopy = feedbackCopy.reduce((acc, item) => {
    //   if (acc[item]) {
    //     acc[item] = acc[item] + 1;
    //   } else {
    //     acc[item] = 1;
    //   }
    //   return acc;
    // }, {});
  }

  render() {
  	console.log('feedbackItems: ', this.props.feedbackItems)
    return (
      <div>
        <div>Graph Section</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(GraphSection);
