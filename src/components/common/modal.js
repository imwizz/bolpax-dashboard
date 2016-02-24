/**
 * Created by glenn on 18/02/16.
 */

import React from 'react';
import $ from 'jquery';

const Modal = React.createClass({
  hide() {
    $(this.modal_).modal('hide');
  },

  getMessage() {
    return this.textArea_.value;
  },

  render() {
    const { id, title, commandName, onCommandOk } = this.props;

    return (
      <div className="modal fade" id={id} tabIndex="-1" role="dialog" ref={el => this.modal_ = el}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
              <h4 className="modal-title" id={`${id}Label`}>{title}</h4>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="message-text" className="form-control-label">
                    Message:
                  </label>
                <textarea
                  className="form-control"
                  id="message-text"
                  rows="3"
                  ref={el => this.textArea_ = el}
                />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary"
                      data-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary"
                      data-dismiss="" onClick={onCommandOk}>
                {commandName}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export { Modal as default, Modal };
