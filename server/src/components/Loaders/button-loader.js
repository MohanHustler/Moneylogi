import React from 'react';

const ButtonLoader = () => {
  return (
    <button className="loading-button black-bg-loader">
      <div className="loader-button-gif-sec black-bg-loader-gif ">
        <div className="loader-button-gif"></div>
      </div>
      Loading…
    </button>
  );
};

export default ButtonLoader;
