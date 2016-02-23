/**
 * Created by glenn on 13/02/16.
 */

import React from 'react';
import { Banner } from './banner';

const BolpaxAdministrator = (props) => (
  <div>
    <Banner />
    {props.children}
  </div>
);

export { BolpaxAdministrator as default, BolpaxAdministrator };
