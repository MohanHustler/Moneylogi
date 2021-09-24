import React from 'react';
import { Link } from 'react-router-dom';

import './not-found-404.css';

import NotFoundImage from '../../images/404.svg';

const NotFound404 = () => {
  return (
    <div className="error-page-img">
      <div>
        <img alt="Not Found" src={NotFoundImage} />
      </div>
      <div className="error-page-text">
        <h1> ERROR 404</h1>
        <p>PAGE NOT FOUND</p>
      </div>
      <div className="home-btn">
        <Link to="/" className="black-border-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound404;
