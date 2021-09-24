import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import Avatar from 'react-avatar';

import { recentActivity } from '../../containers/dashboard/recent-activity-action';
import { paymentDetails } from './payment-details-action';
import { toTimeAgoFormat } from '../../utils/formattor';
import InfoIconBlue from '../../../images/icons/infoIconBlue.svg';
import ArrowIconDownGray from '../../../images/icons/arrowIcondownGray.png';
import ArrowIconRightBlue from '../../../images/icons/arrowIconRightBlue.svg';
import PaymentIconBlue from '../../../images/icons/paymentIconBlue.svg';

const SideBar = ({ show }) => {
  const [showUserActive, setShowUserActive] = useState(false);
  const [paymentActive, setPaymentActive] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const pageNumberWithSortingParams = {
      pageNumber: 1,
      pageSize: 10,
      'sorting[0][direction]': 'DESC',
      'sorting[0][key]': 'updatedAt',
    };

    recentActivity(pageNumberWithSortingParams, dispatch);
    paymentDetails(pageNumberWithSortingParams, dispatch);
  }, []);

  const { recentActivityDetails } = useSelector(
    (state) => state.recentActivity
  );

  const { paymentDetailsList } = useSelector((state) => state.paymentDetails);

  const handleUserActivity = () => {
    setShowUserActive(!showUserActive);
    setPaymentActive(false);
  };

  const paymentUserActivity = () => {
    setPaymentActive(!paymentActive);
    setShowUserActive(false);
  };

  return (
    <div className="sidebar">
      <div
        className={`sidebar-header ${
          showUserActive ? 'sidebar-header-active' : ''
        }`}
      >
        <div className="sidebar-header-desc">
          <label>
            <img src={InfoIconBlue} />
          </label>
          {show ? <p onClick={handleUserActivity}>Users activity</p> : null}
          <span></span>
        </div>
        {show ? (
          <label onClick={handleUserActivity}>
            {showUserActive ? (
              <img src={ArrowIconDownGray} />
            ) : (
              <img src={ArrowIconRightBlue} />
            )}
          </label>
        ) : null}
      </div>
      {showUserActive && show ? (
        <div className="sidebar-menu-sec">
          <ul className="sidebar-menu">
            {recentActivityDetails.map((user, key) => (
              <li key={key}>
                <div className="sidebar-user-icon">
                  <Avatar size="40" round={true} name={user.name} />
                </div>
                <div className="sidebar-user-details">
                  <Link to={`/users/${user.publicId}`}>
                    {user.mobileNumber}
                  </Link>
                  <p>{user.remark}</p>
                  <label>{toTimeAgoFormat(user.createdAt)}</label>
                </div>
              </li>
            ))}
            <li className="viewall">
              <p>View All</p>
            </li>
          </ul>
        </div>
      ) : null}
      <div
        className={`sidebar-header ${
          paymentActive ? 'sidebar-header-active' : ''
        }`}
      >
        <div className="sidebar-header-desc">
          <label>
            <img src={PaymentIconBlue} />
          </label>
          {show ? <p onClick={paymentUserActivity}> Payment details</p> : null}
        </div>
        {show ? (
          <label onClick={paymentUserActivity}>
            {paymentActive ? (
              <img src={ArrowIconDownGray} />
            ) : (
              <img src={ArrowIconRightBlue} />
            )}
          </label>
        ) : null}
      </div>
      {paymentActive && show ? (
        <div className="sidebar-menu-sec">
          <ul className="sidebar-menu">
            {paymentDetailsList &&
              paymentDetailsList.map((user, key) => (
                <li key={key}>
                  <div className="sidebar-user-icon">
                    <Avatar size="40" round={true} name={user.name} />
                  </div>
                  <div className="sidebar-user-details">
                    <Link to={`/users/${user.publicId}`}>
                      {user.mobileNumber}
                    </Link>
                    <p>{`${user.amount} has been ${user.status}`}</p>
                    <label>{toTimeAgoFormat(user.createdAt)}</label>
                  </div>
                </li>
              ))}
            <li className="viewall">
              <p>View All</p>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default SideBar;
