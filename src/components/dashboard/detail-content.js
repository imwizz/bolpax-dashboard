/**
 * Created by glenn on 13/02/16.
 */

import React from 'react';
import { TABLE_TYPE } from '../../constants';
import { Table as DetailTable } from './table';

const DetailContent = ({ dataType, selectedObject }) => {
  const detailVisible = !_.isEmpty(selectedObject);

  return (
    <div
      className="m-t-3 detail"
      style={{ display: detailVisible ? 'block' : 'none' }}
    >
      <h5 className="detail-header">
        {`${_.startCase(dataType)} ID #${selectedObject.id}`}
      </h5>
      <DetailTable
        dataType={dataType}
        tableType={TABLE_TYPE.DETAIL}
        selectedObject={selectedObject}
      />
    </div>
  );
};

export { DetailContent as default, DetailContent };
