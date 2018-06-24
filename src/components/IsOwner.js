import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createReactClass({
  displayName: 'IsOwner',

  propTypes: {
    tweet: PropTypes.object.isRequired
  },

  contextTypes: {
    user: PropTypes.object.isRequired
  },

  render() {
    const { tweet, children } = this.props;
    const { user } = this.context;

    if (tweet.data.user === user.id) {
      return children;
    }

    return null;
  }

});
