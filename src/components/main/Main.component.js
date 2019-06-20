import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleSideBar } from "../../actions/nav.action";
import "./Main.component.css";
import { resetPassword } from "../../actions/auth.action";
import SideBar from "./Sidebar.component";
import Nav from "./Nav.component";
import { push as Menu } from "react-burger-menu";
export class Main extends Component {
  state = {
    opened: false
  };
  handleSideBarBeenOpened = async () => {
    await this.setState(states => ({ opened: !states.opened }));
  };
  isMenuOpen = state => {
    console.log(state);
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
    return (
      <main>
        <Menu
          pageWrapId={"page-wrap"}
          isOpen={this.state.opened}
          onStateChange={this.isMenuOpen}
          customBurgerIcon={false}
        >
          <SideBar parentProps={parentProps} handleSideBarBeenOpened={this.handleSideBarBeenOpened} />
        </Menu>
        <section id="page-wrap">
          <div>
            <Nav handleSideBarBeenOpened={this.handleSideBarBeenOpened} parentProps={parentProps} />
          </div>
          <div>
            <div className={`container-fluid py-4 `}>{this.props.children}</div>
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
