import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import CreateTweetDialog from './CreateTweetDialog';

export default createReactClass({
  displayName: 'CreateButton',

  onClick() {
    lore.dialog.show(function() {
      return lore.dialogs.tweet.create({
        blueprint: 'optimistic',
        request: function(data) {
          return lore.actions.tweet.create(data).payload;
        }
      });
    });
  },

  render() {
    return (
      <button
        type="button"
        className="btn btn-primary btn-lg create-button"
        onClick={this.onClick}>
        +
      </button>
    );
  }

});
