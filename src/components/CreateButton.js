import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default createReactClass({
  displayName: 'CreateButton',

  contextTypes: {
    user: PropTypes.object.isRequired
  },

  onClick() {
    const { user } = this.context;

    lore.dialog.show(function() {
      return lore.dialogs.tweet.create({
        blueprint: 'optimistic',
        request: function(data) {
          return lore.actions.tweet.create(_.defaults({
            user: user.id,
            createdAt: new Date().toISOString()
          }, data)).payload;
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
