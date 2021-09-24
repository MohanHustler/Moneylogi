import React, { useState, useEffect } from 'react';

import Storage from '../utils/storage';

const storage = new Storage();
const ImageViewer = ({ imgURL }) => {
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    const headers = { Authorization: `Bearer ${storage.get('token')}` };

    fetch(imgURL, {
      headers,
      method: 'GET',
    }).then((response) => {
      const imageData = `data:${
        response.headers['content-type']
      };base64,${Buffer.form(response.data).toString('base64')}`;

      setImageSource(imageData);
    });
  }, []);

  return <img alt="Profile Image" src={imageSource} />;
};

export default ImageViewer;
