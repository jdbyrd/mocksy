/* List of all feedback the app has received. Contains <FeedbackItem>s. */
/* Button for 'Post feedback' and dropdown menu for sorting criteria at top of list. */
import React from 'react';
import { connect } from 'react-redux';
import FeedbackItem from './FeedbackItem';
import axios from 'axios';

const mapStateToProps = state => (
  {
    feedbackItems: state.feedback.list
  }
);

class FeedbackList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstLoad: true,
      imageFilesById: {}
    };
    this.filterByFeedbackType = this.filterByFeedbackType.bind(this);
  }

  async componentDidUpdate() {
    if (this.state.firstLoad) {
      this.setState({ firstLoad: false });
      const list = this.props.feedbackItems;
      const feedbackImageIds = list
        .filter(item => item.has_images)
        .map(item => item.id);
      if (feedbackImageIds.length) {
        const res = await axios.get('/api/feedback/images', { params: { imageIds: feedbackImageIds } });
        const imageFilesById = res.data;
        this.setState({ imageFilesById });
      }
    }
  }

  filterByFeedbackType(item) {
    if (this.props.type.type === item.options || this.props.type === 'all') {
      const { imageFilesById } = this.state;
      const images = imageFilesById[item.id];
      return <FeedbackItem key={item.id} item={item} images={images} voteHandler={this.props.voteHandler} />;
    }
    return null;
  }

  render() {
    const { feedbackItems } = this.props;
    return (
      <div className="feedback-list">
        {feedbackItems.map(item => this.filterByFeedbackType(item))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(FeedbackList);
