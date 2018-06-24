import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { connect } from 'lore-hook-connect';
import { Link } from 'react-router';
import PayloadStates from '../constants/PayloadStates';
import Tweet from './Tweet';

export default connect(function(getState, props) {
  const { location } = props;

  return {
    tweets: getState('tweet.find', {
      pagination: {
        sort: 'createdAt DESC',
        page: location.query.page || '1'
      }
    })
  };
})(
createReactClass({
  displayName: 'Feed',

  propTypes: {
    tweets: PropTypes.object.isRequired
  },

  getInitialState() {
    const { tweets } = this.props;

    return {
      tweets: tweets,
      nextTweets: tweets
    };
  },

  componentWillReceiveProps(nextProps) {
    const nextTweets = nextProps.tweets;

    if (nextTweets.state === PayloadStates.FETCHING) {
      this.setState({
        nextTweets: nextTweets,
        isFetching: true
      });
    } else {
      this.setState({
        tweets: nextTweets,
        nextTweets: nextTweets,
        isFetching: false
      });
    }
  },

  renderTweet(tweet) {
    return (
      <Tweet key={tweet.id} tweet={tweet} />
    );
  },

  renderPaginationLink(page, currentPage) {
    return (
      <li key={page} className={currentPage === String(page) ? 'active' : ''}>
        <Link to={{ pathname: '/', query: { page: page } }}>
          {page}
        </Link>
      </li>
    );
  },

  render() {
    const { tweets, nextTweets } = this.state;
    const currentPage = nextTweets.query.pagination.page;
    const paginationLinks = [];

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

    // check if we're fetching the next page of tweets
    const isFetchingNextTweets = nextTweets.state === PayloadStates.FETCHING;

    // calculate the number of pagination links from our metadata, then
    // generate an array of pagination links
    const numberOfPages = Math.ceil(tweets.meta.totalCount / tweets.meta.perPage);
    for (let pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
      paginationLinks.push(this.renderPaginationLink(pageNumber, currentPage));
    }

    return (
      <div className="feed">
        <h2 className="title">
          Feed
        </h2>
        <ul className={`media-list tweets ${isFetchingNextTweets ? 'transition' : ''}`}>
          {tweets.data.map(this.renderTweet)}
        </ul>
        <nav>
          <ul className="pagination">
            {paginationLinks}
          </ul>
        </nav>
      </div>
    );
  }

})
);
