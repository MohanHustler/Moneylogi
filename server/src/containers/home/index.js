import React, { Component } from 'react';
import { arrayOf, bool, node } from 'prop-types';
// import LeftNav from '../../components/left-nav';
// import TopNav from '../../components/top-nav';
// import Workspace from '../../components/workspace';

class Home extends Component {
  static propTypes = {
    children: arrayOf(node).isRequired,
    isAuthenticated: bool.isRequired,
  };

  state = {
    currentPageTitle: 'Dashboard',
    toggleLeftNav: false,
  };

  updateTitle = (title) => {
    this.setState({ currentPageTitle: title });
  };

  toggleLeftNav = () => {
    this.setState({ toggleLeftNav: !this.state.toggleLeftNav });
  };

  render() {
    const { currentPageTitle, toggleLeftNav } = this.state;
    const {
      children,
      // isAuthenticated, // used to auth token
      location: { pathname },
    } = this.props;
    const currentPathName = pathname.substr(1);

    return (
      <div className="container">
        <LeftNav
          currentPath={currentPathName}
          isCollapsed={toggleLeftNav}
          updateTitle={this.updateTitle}
        />
        <section className="rightsection">
          <TopNav pageTitle={currentPageTitle} toggle={this.toggleLeftNav} />
          <Workspace>{children}</Workspace>
        </section>
      </div>
    );

    // return (
    //   <div className="loading">
    //     <strong>You will be re-directed to login page soon</strong>
    //     <div className="lds-ellipsis">
    //       <div className="lds-ellipsis__child" />
    //       <div className="lds-ellipsis__child" />
    //       <div className="lds-ellipsis__child" />
    //       <div className="lds-ellipsis__child" />
    //     </div>
    //   </div>
    // );
  }
}

export default Home;
