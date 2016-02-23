/**
 * Created by glenn on 15/02/16.
 */

const DATA_TYPE = {
  TRANSACTION: 'TRANSACTION',
  ISSUE      : 'ISSUE',
};

const TABLE_TYPE = {
  MAIN  : 'MAIN',
  DETAIL: 'DETAIL',
};

const ISSUE_STATUS_IDS = {
  Open                  : 1,
  'Waiting On User'     : 2,
  'Waiting For Feedback': 3,
  Refund                : 4,
  Resolved              : 5,
  Close                 : 6,
};

export { DATA_TYPE, TABLE_TYPE, ISSUE_STATUS_IDS };
