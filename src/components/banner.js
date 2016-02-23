/**
 * Created by glenn on 13/02/16.
 */

import React from 'react';

const Banner = React.createClass({

  // ask for `router` from context
  contextTypes: {
    router: React.PropTypes.object,
  },

  handleClick() {

    // Back to Home.
    this.context.router.push('/');
  },

  render() {

    return (
      <header className="navbar navbar-fixed-top bg-primary banner">
        <h1 className="display-4 audiowide banner-title" onClick={this.handleClick}>Bolpax</h1>
        <p className="lead">Transaction monitoring module solution for everyone.</p>
      </header>
    );
  },
});

export { Banner as default, Banner };
