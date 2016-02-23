/**
 * Created by glenn on 17/02/16.
 */

import React from 'react';
import { Sidebar } from '../sidebar';

const Dashboard = (props) => (
  <div className="container-fluid">
    <div className="row">
      <Sidebar />
      {props.children}
    </div>
  </div>
);

export { Dashboard as default, Dashboard };
