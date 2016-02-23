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
    this.refundModal_.hide();

    $.ajax({
      url       : apiUrls.refundPayments.update,
      type      : 'POST',
      beforeSend: () => spinner.spin(document.querySelector('.main')),
      data      : {
        issueId: this.props.selectedObject.issueId,
      },
      success   : (data) => {
        console.log(data);
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
    const { props, replyModal_, replyTextArea_ } = this;
    const { selectedObject } = props;
    const message = replyTextArea_.value;

    replyModal_.hide();

    //console.log(message);
    $.ajax({
      url       : apiUrls.replyIssues.update,
      type      : 'POST',
      beforeSend: () => spinner.spin(document.querySelector('.main')),
      data      : {
        fromAdmin    : 'Y',
        message      : message,
        issueId      : selectedObject.issueId,
        issueStatusId: ISSUE_STATUS_IDS[selectedObject.lastStatus],
      },
      success   : (data) => {
        console.log(data);
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
            title="Refund authorization"
            commandName="Refund"
            onCommandOk={this.handleRefundAuthorize}
            ref={c => this.refundModal_ = c}
          >
            {`Are you sure you want to refund transaction #${selectedObject.trxId}?`}
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
            title="Reply issue"
            commandName="Send message"
            onCommandOk={this.handleReplyIssue}
            ref={c => this.replyModal_ = c}
          >
            <form>
              <div className="form-group">
                <label htmlFor="message-text" className="form-control-label">
                  Message:
                </label>
                <textarea
                  className="form-control"
                  id="message-text"
                  rows="3"
                  ref={c => this.replyTextArea_ = c}
                />
              </div>
            </form>
          </Modal>
        </div>
      </div>
    );
  },
});

export { Toolbar as default, Toolbar };
