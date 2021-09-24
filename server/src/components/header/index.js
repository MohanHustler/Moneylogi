import React, { useState } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

import signout from '../../actions/signout-action';

import ProfileImage from '../../../images/icons/default-user-profile.svg';
import HeaderLogo from '../../../images/header-logo.svg';
import ArrowIconDownGray from '../../../images/icons/arrowIcondownGray.png';

const Header = () => {
  const [activePage, setActivePage] = useState('');
  const [innerActivePage, setInnerActivePage] = useState('');

  React.useEffect(() => {
    const path = window.location.pathname;

    if (path === '/dashboard') {
      setActivePage('dashboard');
    } else if (path === '/users') {
      setActivePage('users');
    } else if (path === '/loan') {
      setActivePage('loan');
      setInnerActivePage('loan');
    } else if (path === '/disbursment') {
      setActivePage('report');
      setInnerActivePage('disbursment');
    } else if (path === '/collections') {
      setActivePage('report');
      setInnerActivePage('collections');
    } else if (path === '/defaults') {
      setActivePage('report');
      setInnerActivePage('defaults');
    } else if (path === '/emi') {
      setActivePage('report');
      setInnerActivePage('emi');
    } else if (path === '/payments') {
      setActivePage('report');
      setInnerActivePage('payments');
    } else if (path === '/manageusers') {
      setActivePage('settings');
      setInnerActivePage('manageusers');
    } else if (path === '/managepincode') {
      setActivePage('settings');
      setInnerActivePage('managepincode');
    } else if (path === '/manageprofession') {
      setActivePage('settings');
      setInnerActivePage('manageprofession');
    } else if (path === '/managebanks') {
      setActivePage('settings');
      setInnerActivePage('managebanks');
    }
  });

  return (
    <div>
      <div className="header-section">
        <Navbar bg="light" expand="lg">
          <div className="header-logo">
            <Navbar.Brand href="/dashboard">
              <img alt="app-logo" src={HeaderLogo} alt="HeaderLogo" />
            </Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="header-menu">
              <Nav.Link
                href="/dashboard"
                className={`${activePage === 'dashboard' && 'active'}`}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link
                href="/users"
                className={`${activePage === 'users' && 'active'}`}
              >
                User
              </Nav.Link>
              <Nav.Link
                href="/loan"
                className={`${activePage === 'loan' && 'active'}`}
              >
                Loans
              </Nav.Link>
              <div className="web-header-nav-drop-down">
                <div className="web-header-nav-drop-down-img">
                  <img src={ArrowIconDownGray} />
                </div>
                <NavDropdown
                  title="Reports"
                  id="basic-nav-dropdown"
                  className={`${activePage === 'report' && 'active'}`}
                >
                  <NavDropdown.Item
                    href="/disbursment"
                    className={`${
                      innerActivePage === 'disbursment' && 'active'
                    }`}
                  >
                    Disbursements
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="/collections"
                    className={`${
                      innerActivePage === 'collections' && 'active'
                    }`}
                  >
                    Collections
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="/defaults"
                    className={`${innerActivePage === 'defaults' && 'active'}`}
                  >
                    Defaults
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="/loan"
                    className={`${innerActivePage === 'loan' && 'active'}`}
                  >
                    Loans
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="/emi"
                    className={`${innerActivePage === 'emi' && 'active'}`}
                  >
                    EMIs
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="/payments"
                    className={`${innerActivePage === 'payments' && 'active'}`}
                  >
                    Payments
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
              <div className="web-header-nav-drop-down">
                <div className="web-header-nav-drop-down-img">
                  <img src={ArrowIconDownGray} />
                </div>
                <NavDropdown
                  title="Settings"
                  id="basic-nav-dropdown"
                  className={`${activePage === 'settings' && 'active'}`}
                >
                  <NavDropdown.Item
                    href="/manageusers"
                    className={`${
                      innerActivePage === 'manageusers' && 'active'
                    }`}
                  >
                    Manage Users
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="/managepincode"
                    className={`${
                      innerActivePage === 'managepincode' && 'active'
                    }`}
                  >
                    Manage Pincode
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="/managebanks"
                    className={`${
                      innerActivePage === 'managebanks' && 'active'
                    }`}
                  >
                    Manage Banks
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="/manageprofession"
                    className={`${
                      innerActivePage === 'manageprofession' && 'active'
                    }`}
                  >
                    Manage Profession
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
              <Nav.Link className="mobile-nav" href="/changepassword">
                Change Password
              </Nav.Link>
              <Nav.Link className="mobile-nav" href="/signin" onClick={signout}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="header-user" id="basic-nav-dropdown">
            <div>
              <div className="profile-img">
                <img
                  alt="default-profile"
                  src={ProfileImage}
                  alt="ProfileImage"
                />
              </div>
              <NavDropdown title="profile">
                <NavDropdown.Item
                  href="/changepassword"
                  className="header-item"
                >
                  Change Password
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item
                  href="/signin"
                  onClick={signout}
                  className="header-item"
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </div>
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
