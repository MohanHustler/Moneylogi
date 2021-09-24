import React from 'react';

import LoaderIconInner from '../../../images/icons/loaderIconInner.svg';

const PageLoader = () => {
  return (
    <div className="page-loader-sec">
      <div className="loader-sec">
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
      </div>
    </div>
  );
};

export default PageLoader;
