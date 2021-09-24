import React from 'react';

import LoaderIconInner from '../../../images/icons/loaderIconInner.svg';

const IconLoader = () => {
  return (
    <div className="loader-content">
      <div className="loader-img">
        <img alt="loader" src={LoaderIconInner} />
      </div>
      <div className="page-loader">
        <div className="loader"></div>
      </div>
      <div className="loader-text">
        <h1>Loading.....</h1>
      </div>
    </div>
  );
};

export default IconLoader;
