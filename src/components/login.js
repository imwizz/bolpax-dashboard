/**
 * Created by glenn on 17/02/16.
 */

import React from 'react';

const Login = React.createClass({

  // ask for `router` from context
  contextTypes: {
    router: React.PropTypes.object,
  },

  handleSubmit(e) {
    e.preventDefault();

    // Do dummy login.
    this.context.router.push('/');
  },

  render() {
    return (
      <div className="pull-left m-t-2 container">
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h2 className="form-signin-heading">Please sign in</h2>
          <label htmlFor="inputPhone" className="sr-only">Phone number</label>
          <input type="tel" id="inputPhone" className="form-control"
                 placeholder="Phone number" required autoFocus />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control"
                 placeholder="Password" required />
          <button className="btn btn-lg btn-primary btn-block m-t-1" type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
  },
});

export { Login as default, Login };
