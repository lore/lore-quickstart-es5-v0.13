import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createReactClass({
  displayName: 'CreateButton',

  onClick() {
    lore.dialog.show(function() {
      return (
        <h1>Dialog Placeholder</h1>
      );
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
