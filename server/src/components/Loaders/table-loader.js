import React from 'react';

import LoaderIconInner from '../../../images/icons/loaderIconInner.svg';

const TableLoader = () => {
  return (
    <div className="table-loader">
      <div className="table-loader-img">
        <img alt="loader" src={LoaderIconInner} />
      </div>
      <div className="table-loader-text">
        <h1>Loading...</h1>
      </div>
    </div>
  );
};

export default TableLoader;
