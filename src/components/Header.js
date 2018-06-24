import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createReactClass({
  displayName: 'Header',

  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top header">
        <div className="container">
          <div className="navbar-header">
            <div className="navbar-brand">
              Lore Tutorial
            </div>
          </div>
        </div>
      </nav>
    );
  }

});
