/**
 * Created by glenn on 18/02/16.
 */

import React from 'react';
import $ from 'jquery';
import { apiUrls } from '../../../config';
import { ISSUE_STATUS_IDS } from '../../../constants';
import { spinner, logError } from '../../../util';
import { Modal } from '../../common/modal';

const Toolbar = React.createClass({
  handleRefundAuthorize() {
    const { props, refundModal_ } = this;
    const { selectedObject, onForceUpdateRequested } = props;
    const message = refundModal_.getMessage();

    refundModal_.hide();

    $.ajax({
      url        : apiUrls.refundPayments.update,
      type       : 'POST',
      beforeSend : () => spinner.spin(document.querySelector('.main')),
      contentType: 'text/plain',
      dataType   : 'text',
      data       : JSON.stringify({
        fromAdmin    : 'Y', // hardcode
        message      : message,
        issueId      : selectedObject.issueId,
        issueStatusId: 4, // hardcode

        //issueId: this.props.selectedObject.issueId,
      }),
      success    : (data) => {

        //console.log(data);
        onForceUpdateRequested();
        $.notify('Refund authorized', 'success');
      },

      error   : (jqXHR, textStatus, errorThrown) =>
        logError('Refund authorization failed', new Error(errorThrown)),
      complete: () => spinner.stop(),
    });

    //$.notify('Refund authorized', 'success');
    //$.notify('Refund authorization failed', 'error');
  },

  handleReplyIssue() {
    const { props, replyModal_ } = this;
    const { selectedObject, onForceUpdateRequested } = props;
    const message = replyModal_.getMessage();

    replyModal_.hide();

    $.ajax({
      url        : apiUrls.replyIssues.update,
      type       : 'POST',
      beforeSend : () => spinner.spin(document.querySelector('.main')),
      contentType: 'text/plain',
      dataType   : 'text',
      data       : JSON.stringify({
        fromAdmin    : 'Y', // hardcode
        message      : message,
        issueId      : selectedObject.issueId,
        issueStatusId: 2, // hardcode

        //issueStatusId: ISSUE_STATUS_IDS[selectedObject.lastStatus],
      }),
      success    : (data) => {

        //console.log(data);
        onForceUpdateRequested();
        $.notify('Message successfully sent', 'success');
      },

      error   : (jqXHR, textStatus, errorThrown) =>
        logError('Sending message failed', new Error(errorThrown)),
      complete: () => spinner.stop(),
    });

    //$.notify('Message successfully sent', 'success');
    //$.notify('Sending failed', 'error');
  },

  render() {
    const { selectedObject } = this.props;
    const rowSelected = !_.isEmpty(selectedObject);

    return (
      <div className="navbar table-toolbar">
        <div className="pull-right">
          <button
            className={`btn btn-primary ${rowSelected ? '' : 'disabled'}`}
            type="button"
            data-toggle="modal"
            data-target={rowSelected ? '#refund-modal' : ''}
          >
            Refund authorization
          </button>
          <Modal
            id="refund-modal"
            title={`Refund authorization issue #${selectedObject.issueId}`}
            commandName="Refund"
            onCommandOk={this.handleRefundAuthorize}
            ref={c => this.refundModal_ = c}
          >
            {/* `Are you sure you want to refund transaction #${selectedObject.trxId}?` */}
          </Modal>

          <button
            className={`btn btn-primary m-l-1 ${rowSelected ? '' : 'disabled'}`}
            type="button"
            data-toggle="modal"
            data-target={rowSelected ? '#reply-modal' : ''}
          >
            Reply issue
          </button>
          <Modal
            id="reply-modal"
            title={`Reply issue #${selectedObject.issueId}`}
            commandName="Send message"
            onCommandOk={this.handleReplyIssue}
            ref={c => this.replyModal_ = c}
          >
          </Modal>
        </div>
      </div>
    );
  },
});

export { Toolbar as default, Toolbar };
