// Commented sample test case to resolve lint error.

// import React from 'react';
// import { expect } from 'chai';
// import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import sinon from 'sinon';
// import SideNav from '../../../src/components/side-nav';

// Enzyme.configure({ adapter: new Adapter() });

// describe('SideNav component with toggle function', () => {
//   it('should be called on click close button', () => {
//     const noopFn = () => {};
//     const spyToggle = sinon.spy(noopFn);
//     const sideNav = shallow(<SideNav close={ spyToggle } />);

//     spyToggle.return = true;
//     sideNav.find('.sidenav-top__btn').simulate('click');

//     expect(spyToggle.calledOnce).to.equal(true);
//   });
// });
