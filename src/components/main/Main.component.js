import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleSideBar } from "../../actions/nav.action";
import "./Main.component.css";
import { resetPassword } from "../../actions/auth.action";
import SideBar from "./Sidebar.component";
import Nav from "./Nav.component";
export class Main extends Component {
  state = {
    opened: false
  };
  handleSideBarBeenOpened = boolean => {
    this.setState({ opened: boolean });
  };
  render() {
    const parentProps = {
      toggleSideBar: this.props.toggleSideBar,
      history: this.props.history,
      resetPassword: this.props.resetPassword,
      location: this.props.location
    };
    const hasPaddingLeft = this.state.opened ? "main-container-open" : "main-container-close";
    return (
      <main>
        <section>
          <Nav parentProps={parentProps} />
        </section>
        <section style={{ zIndex: 9 }}>
          <SideBar handleSideBarBeenOpened={this.handleSideBarBeenOpened} parentProps={parentProps} />
          <div className={`container-fluid py-5 ${hasPaddingLeft} `}>{this.props.children}</div>
        </section>
        {/* Render children */}
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
