/**
 * This component is intended to reflect the high level structure of your application,
 * and render any components that are common across all views, such as the header or
 * top-level navigation. All other components should be rendered by route handlers.
 **/

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import Header from './Header';
import Profile from './Profile';

export default createReactClass({
  displayName: 'Layout',

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Profile />
            </div>
            <div className="col-md-offset-1 col-md-6">
              {React.cloneElement(this.props.children)}
            </div>
          </div>
        </div>
      </div>
    );
  }

});
