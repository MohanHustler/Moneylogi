import React, { Fragment } from 'react';
import ArrowLeftRoundIcon from '../../images/icons/arrowLeftRoundIcon.svg';
import ArrowRightRoundIcon from '../../images/icons/arrowRightRoundIcon.svg';

const SidebarIcon = ({ show, addClassCallBack }) => {
  return (
    <Fragment>
      {show ? (
        <img
          onClick={addClassCallBack}
          className={`sidebar-expand-collapse-icon ${
            show ? 'sidebar-expand-collapse-active' : ''
          } `}
          src={ArrowRightRoundIcon}
        />
      ) : (
        <img
          onClick={addClassCallBack}
          className={`sidebar-expand-collapse-icon ${
            show ? 'sidebar-expand-collapse-active' : ''
          } `}
          src={ArrowLeftRoundIcon}
        />
      )}
    </Fragment>
  );
};

export default SidebarIcon;
