import React, { useState } from 'react';

import MoreIcon from '../../../../images/icons/moreIcon.svg';

const Action = ({
  handleEditShowPopup,
  handleDeleteShowPopup,
  handleGenerateResetShowPopup,
}) => {
  const [showMore, setShowMore] = useState(false);

  const handleOpenMenu = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="action-sec">
      {showMore && (
        <div className="common-overlay" onClick={handleOpenMenu}></div>
      )}
      <div className="action-sec-img action-sec-edit" onClick={handleOpenMenu}>
        <img alt="action-more-icon" src={MoreIcon} onClick={handleOpenMenu} />
        {showMore && (
          <div className="action-more-icon-menu">
            <p>
              <label
                onClick={() => {
                  setShowMore(!showMore);
                  handleEditShowPopup();
                }}
              >
                Edit
              </label>
              <label
                onClick={() => {
                  setShowMore(!showMore);
                  handleDeleteShowPopup();
                }}
              >
                Delete
              </label>
              <label
                onClick={() => {
                  setShowMore(!showMore);
                  handleGenerateResetShowPopup();
                }}
              >
                Reset password
              </label>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Action;
