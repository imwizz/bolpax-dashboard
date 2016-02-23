/**
 * Created by glenn on 13/02/16.
 */

import React from 'react';
import { NavLink } from './common/nav-link';

const Sidebar = (props) => (
  <div className="col-sm-2 sidebar">
    <ul className="nav nav-pills nav-stacked">
      <li className="nav-item m-y-1 dashboard">
        <NavLink to="/dashboard">
          <i className="fa fa-home fa-lg fa-fw"></i> Dashboard
        </NavLink>
      </li>
      <div className="nav-item m-y-1 issue">
        <NavLink to="/dashboard/issues">
          <i className="fa fa-exclamation-circle fa-lg fa-fw"></i> Issue
        </NavLink>
      </div>
    </ul>
  </div>
);

export { Sidebar as default, Sidebar };
