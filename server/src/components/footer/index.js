import React from 'react';

const Footer = ({ show }) => {
  return (
    <div className={`footer-sec ${show ? 'active' : ''} `}>
      <label>© 2020 Ganesh Leasfin Pvt Ltd</label>
    </div>
  );
};

export default Footer;
