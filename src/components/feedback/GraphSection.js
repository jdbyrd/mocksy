import React from 'react';
import { connect } from 'react-redux';
import Chart from './Chart';

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
    this.state = {
      amountFeedback: []
    };
  }

  componentWillReceiveProps(nextProps) {
    let feedbackCopy = nextProps.feedbackItems.slice();
    feedbackCopy = feedbackCopy.reduce((acc, item) => {
      if (acc[item.options]) {
        acc[item.options] = acc[item.options] + 1;
      } else {
        acc[item.options] = 1;
      }
      return acc;
    }, {});
    console.log('feedbackCopy: ', feedbackCopy)
    this.setState({
      amountFeedback: feedbackCopy
    });
  }

  componentWillUpdate() {
  	console.log('will update: ', this.state.amountFeedback)
  }

  mapOverObject() {
    for (var key in this.state.amountFeedback) {
      return (<div>key: {key}, val: {this.state.amountFeedback[key]}</div>);
    }
  }

  render() {
  	console.log('feedbackItems: ', this.props.feedbackItems);
  	console.log('amountFeedback: ', this.state.amountFeedback);
    return (
      <div>
        {/*Object.keys(this.state.amountFeedback).map((key, index) => {
          return (
            <div key={key}>
              {this.state.amountFeedback[key]}
              <svg width="300" height="300" className="svg">
                <Chart width={300} height={300} />
              </svg>
            </div>
          );
        })*/}
        <svg width="300" height="300" className="svg">
          <Chart width={300} height={300} />
        </svg>
      </div>
    );
  }
}

export default connect(mapStateToProps)(GraphSection);
