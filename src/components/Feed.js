import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { connect } from 'lore-hook-connect';
import PayloadStates from '../constants/PayloadStates';
import Tweet from './Tweet';

export default connect(function(getState, props) {
  return {
    tweets: getState('tweet.find')
  };
})(
createReactClass({
  displayName: 'Feed',

  propTypes: {
    tweets: PropTypes.object.isRequired
  },

  renderTweet(tweet) {
    return (
      <Tweet key={tweet.id} tweet={tweet} />
    );
  },

  render() {
    const { tweets } = this.props;

    if (tweets.state === PayloadStates.FETCHING) {
      return (
        <div className="feed">
          <h2 className="title">
            Feed
          </h2>
          <div className="loader"/>
        </div>
      );
    }

    return (
      <div className="feed">
        <h2 className="title">
          Feed
        </h2>
        <ul className="media-list tweets">
          {tweets.data.map(this.renderTweet)}
        </ul>
      </div>
    );
  }

})
);
