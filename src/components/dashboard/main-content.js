/**
 * Created by glenn on 13/02/16.
 */

import React from 'react';
import { TABLE_TYPE, DATA_TYPE } from '../../constants';
import { pollInterval } from '../../config';
import { Table as MainTable } from './table';
import { DetailContent } from './detail-content';

const MainContent = React.createClass({
  handleSelectedObjectChanged(selectedObject) {
    this.setState({
      selectedObject,
    });
  },

  // HACK: It's hackathon :X
  handleForceUpdateRequested() {
    this.forceUpdate();
    this.mainTable_.loadDataFromServer();
  },

  handleRepaintMainTableRequested() {
    this.mainTable_.repaintBootstrapTable();
  },

  getInitialState() {
    return {
      selectedObject: {},
    };
  },

  render() {
    const { props, state } = this;
    const { dataType } = props;
    const { selectedObject } = state;

    return (
      <div className="col-sm-10 col-sm-offset-2 main">
        {(dataType === DATA_TYPE.ISSUE) ?
         <MainTable.Toolbar
           selectedObject={selectedObject}
           onForceUpdateRequested={this.handleForceUpdateRequested}
         /> : false}
        <MainTable
          dataType={dataType}
          tableType={TABLE_TYPE.MAIN}
          selectedObject={selectedObject}
          onSelectedObjectChanged={this.handleSelectedObjectChanged}
          pollInterval={pollInterval}
          ref={c => this.mainTable_ = c}
        />
        <DetailContent
          dataType={dataType}
          selectedObject={selectedObject}
          onRepaintMainTableRequested={this.handleRepaintMainTableRequested}
        />
      </div>
    );
  },
});

export { MainContent as default, MainContent };
