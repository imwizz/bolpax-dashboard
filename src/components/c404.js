/**
 * Created by glenn on 18/02/16.
 */

import React from 'react';
import { Link } from 'react-router';

const C404 = () => (
  <Link to="/dashboard" title="Back to Dashboard">
    <img src={require('../img/ninja.png')} className="center-block" alt="Ninja 404" />
  </Link>
);

export { C404 as default, C404 };
