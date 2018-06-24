import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import moment from 'moment';
import InfiniteScrollingList from './InfiniteScrollingList';
import Tweet from './Tweet';

export default createReactClass({
  displayName: 'Feed',

  getInitialState() {
    return {
      timestamp: new Date().toISOString()
    };
  },

  render() {
    const { timestamp } = this.state;

    return (
      <div className="feed">
        <h2 className="title">
          Feed
        </h2>
        <InfiniteScrollingList
          select={(getState) => {
            return getState('tweet.find', {
              where: {
                where: {
                  createdAt: {
                    '<=': timestamp
                  }
                }
              },
              pagination: {
                sort: 'createdAt DESC',
                page: 1
              }
            });
          }}
          row={(tweet) => {
            return (
              <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
            );
          }}
          refresh={(page, getState) => {
            return getState('tweet.find', page.query);
          }}
          selectNextPage={(lastPage, getState) => {
            const lastPageNumber = lastPage.query.pagination.page;

            return getState('tweet.find', _.defaultsDeep({
              pagination: {
                page: lastPageNumber + 1
              }
            }, lastPage.query));
          }}
          selectOther={(getState) => {
            return getState('tweet.all', {
              where: function(tweet) {
                const isOptimistic = !tweet.id;
                const isNew = moment(tweet.data.createdAt).diff(timestamp) > 0;
                return isOptimistic || isNew;
              },
              sortBy: function(model) {
                return -moment(model.data.createdAt).unix();
              }
            });
          }}
        />
      </div>
    );
  }

});
