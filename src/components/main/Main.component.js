import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleSideBar } from "../../actions/nav.action";
import Nav from "./Nav.component";
import Sidebar from "./Sidebar.component";
import { push as Menu } from "react-burger-menu";

import "./Main.component.css";

import { resetPassword } from "../../actions/auth.action";

export class Main extends Component {
  state = {
    opened: false
  };
  handleSideBarBeenOpened = async () => {
    await this.setState(states => ({ opened: !states.opened }));
  };
  isMenuOpen = state => {
    if (this.state.opened !== state.isOpen) {
      this.setState({ opened: state.isOpen });
    }
    return;
  };

  render() {
    const parentProps = {
      toggleSideBar: this.props.toggleSideBar,
      history: this.props.history,
      resetPassword: this.props.resetPassword,
      location: this.props.location
    };
    const { opened } = this.state;
    return (
      <main>
        <Menu isOpen={opened} onStateChange={this.isMenuOpen} customBurgerIcon={false} customCrossIcon={false}>
          <Sidebar parentProps={parentProps} handleSideBarBeenOpened={this.handleSideBarBeenOpened} />
        </Menu>
        <section>
          <div className="background-linear" style={{ height: "230px" }}>
            <Nav handleSideBarBeenOpened={this.handleSideBarBeenOpened} parentProps={parentProps} />
          </div>
          <div style={{ marginTop: "-145px" }}>
            <div className={`container-fluid py-4`}>{this.props.children}</div>
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    is_open: state.navReducer.is_open
  };
};

export default connect(
  mapStateToProps,
  { toggleSideBar, resetPassword }
)(withRouter(Main));
