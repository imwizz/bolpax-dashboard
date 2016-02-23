/**
 * Created by glenn on 17/02/16.
 */

const baseApiUrl = 'http://bolpax.mybluemix.net';

//const baseApiUrl = '..';
let apiUrls = {
  login             : {
    read: '/profile/dologin',
  },
  transactions      : {
    read: '/trx/list',
  },
  transactionDetails: {
    read: '/trx/detailcomplete',
  },
  issues            : {
    read: '/issue/list',
  },
  issueDetails      : {
    read: '/issue/detailcomplete',
  },
  refundPayments    : {
    update: '/trx/refund',
  },
  replyIssues       : {
    update: '/issue/insertTrail',
  },
};

//const baseApiUrl = './test-data';
//let apiUrls      = {
//  login             : {
//    read: '/profile/dologin',
//  },
//  transactions      : {
//    read: '/transactions.json',
//  },
//  transactionDetails: {
//    read: '/transaction-details.json',
//  },
//  issues            : {
//    read: '/issues.json',
//  },
//  issueDetails      : {
//    read: '/issue-details.json',
//  },
//  refundPayments    : {
//    update: '/trx/transfer',
//  },
//  replyIssues       : {
//    update: '/issue/insertTrail',
//  },
//};

apiUrls = _.mapValues(apiUrls, resource =>
  _.mapValues(resource, apiUrl => baseApiUrl + apiUrl)
);

const tableDescriptors = {
  transaction: {
    main  : {
      headerTexts   : [
        'Transaction Audit Trail',
        'Transaction ID',
        'Buyer Name',
        'Merchant Name',
        'Product',
        'Total Amount',
        'Buyer Transaction Status',
        'Merchant Transaction Status',
        'Refund Status',
      ],
      orderedColKeys: [
        'lastTrxDate',
        'trxId',
        'buyer',
        'merchant',
        'product',
        'amount',
        'buyerTrxStatus',
        'merchantTrxStatus',
        'refund',
      ],
    },
    detail: {
      headerTexts   : [
        'Transaction Date',
        'Buyer Transaction History',
        'Buyer Transaction Status',
        'Merchant Transaction History',
        'Merchant Transaction Status',
      ],
      orderedColKeys: [
        'trxDate',
        'buyerTrxHistory',
        'buyerTrxStatus',
        'merchantTrxHistory',
        'merchantTrxStatus',
      ],
    },
  },
  issue      : {
    main  : {
      headerTexts   : [
        'Issue Audit Trail',
        'Transaction ID',
        'Issue ID',
        'Buyer Name',
        'Merchant Name',
        'Reporter Role',
        'User Issue Status',
        'User Issue Title',
        'User Issue History',
      ],
      orderedColKeys: [
        'lastIssueDate',
        'trxId',
        'issueId',
        'buyer',
        'merchant',
        'reporterRole',
        'lastStatus',
        'issueTitle',
        'lastIssueHistory',
      ],
    },
    detail: {
      headerTexts   : [
        'Issue Date',
        'User Issue Status',
        'User Issue History',
      ],
      orderedColKeys: [
        'date',
        'status',
        'history',
      ],
    },
  },
};

const pollInterval = 20000;

export { apiUrls, tableDescriptors, pollInterval };
