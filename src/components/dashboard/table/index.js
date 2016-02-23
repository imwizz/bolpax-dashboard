/**
 * Created by glenn on 13/02/16.
 */

import React from 'react';
import $ from 'jquery';
import { DATA_TYPE, TABLE_TYPE } from '../../../constants';
import { apiUrls, tableDescriptors } from '../../../config';
import { spinner, logError } from '../../../util';
import { Toolbar } from './toolbar';

const { TRANSACTION } = DATA_TYPE;
const { MAIN, DETAIL } = TABLE_TYPE;

const Table = React.createClass({
  createResourceName() {
    const { dataType, tableType } = this.props;
    let resourceName = `${dataType}S`;

    if (tableType === DETAIL) {
      resourceName = `${dataType}_${DETAIL}S`;
    }

    return _.camelCase(resourceName);
  },

  loadDataFromServer() {
    const resourceName = this.createResourceName();

    //console.log(apiUrls[resourceName].read);
    $.ajax({
      url       : apiUrls[resourceName].read,
      beforeSend: () => spinner.spin(document.querySelector('.main')),
      success   : (data) => {
        const normalizedData = _.map(data, (o) => {
          o.id = (this.props.dataType === TRANSACTION) ? o.trxId : o.issueId;

          return o;
        });

        this.setState({
          data: normalizedData,
        });
      },

      error   : (jqXHR, textStatus, errorThrown) =>
        logError('Error loading table data', new Error(errorThrown)),
      complete: () => spinner.stop(),
    });

    /*
     * Mock data. To be removed for production.
     */

    //const data           = require(`test-data/${_.kebabCase(resourceName)}`);
    //const normalizedData = _.map(data, (o) => {
    //  o.id = (this.props.dataType === TRANSACTION) ? o.trxId : o.issueId;
    //
    //  return o;
    //});

    //this.setState({
    //  data: normalizedData,
    //});
  },

  handleClick(object) {
    this.props.onSelectedObjectChanged(object);
  },

  getInitialState() {
    return {
      data: [],
    };
  },

  componentDidMount() {

    if (this.props.tableType === MAIN) {
      this.loadDataFromServer();
    }
  },

  componentWillReceiveProps({ selectedObject }) {
    const { dataType, tableType } = this.props;

    if (tableType === DETAIL) {
      const resourceName = this.createResourceName();
      const paramKey     = (dataType === TRANSACTION) ? 'trxId' : 'issueId';

      //console.log(apiUrls[resourceName].read);
      //console.log(paramKey);
      $.ajax({
        url       : apiUrls[resourceName].read,
        beforeSend: () => spinner.spin(document.querySelector('.main')),
        data      : {
          [paramKey]: selectedObject.id,
        },
        success   : (data) => {
          console.log(data);

          //this.setState({
          //  data,
          //});
        },

        error   : (jqXHR, textStatus, errorThrown) =>
          logError('Error loading detail table data', new Error(errorThrown)),
        complete: () => spinner.stop(),
      });

      /*
       * Mock data. To be removed for production.
       */

      //const data = require(`test-data/${_.kebabCase(resourceName)}`);
      //
      //this.setState({
      //  data,
      //});
    }
  },

  componentDidUpdate() {
    $(this.table_).bootstrapTable({
      height: 400,
      search: true,
    });
  },

  render() {
    const { props, state } = this;
    const { dataType, tableType, selectedObject } = props;

    const path = `${dataType}.${tableType}`.toLowerCase();
    const { headerTexts, orderedColKeys } = _.get(tableDescriptors, path);

    return (
      <table className="table table-striped" ref={n => this.table_ = n}>
        <thead>
        <tr>
          {_.map(headerTexts, (headerText, i) =>
            <Table.Header key={i} text={headerText} />)}
        </tr>
        </thead>
        <tbody>
        {_.map(state.data, (o, i) => {
          const isClickable = (tableType === MAIN);
          const isSelected  = isClickable && (o.id === selectedObject.id);
          const onClick     = isClickable ? this.handleClick : _.noop;

          return (
            <Table.Row
              key={i}
              colKeys={orderedColKeys}
              object={o}
              isClickable={isClickable}
              isSelected={isSelected}
              onClick={onClick.bind(this, o)}
            />
          );
        })}
        </tbody>
      </table>
    );
  },
});

Table.Header = ({ text }) => (
  <th>{text}</th>
);

Table.Row = ({ colKeys, object, isClickable, isSelected, onClick }) => {
  const className = [];

  if (isClickable) {
    className.push('clickable');
  }

  if (isSelected) {
    className.push('table-info');
  }

  return (
    <tr className={className.join(' ')} onClick={onClick}>
      {_.map(colKeys, (colKey) => {
        let val = object[colKey];

        if (_.isNull(val)) {
          val = '-';
        }

        return <td key={colKey}>{val}</td>;
      })}
    </tr>
  );
};

Table.Toolbar = Toolbar;

export { Table as default, Table };
