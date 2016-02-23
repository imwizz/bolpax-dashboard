/**
 * Created by glenn on 23/02/16.
 */

import Spinner from 'spin';
import $ from 'jquery';

const spinner = new Spinner();

function logError(customErrorMessage, e = new Error()) {
  $.notify(customErrorMessage, 'error');
  console.error(`${customErrorMessage} > ${e.stack}`);
}

export { spinner, logError };
