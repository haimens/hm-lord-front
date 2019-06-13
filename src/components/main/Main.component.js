import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleSideBar } from "../../actions/nav.action";
import Nav from "./Nav.component";
import Sidebar from "./Sidebar.component";
import "./Main.component.css";

import { resetPassword } from "../../actions/auth.action";

export class Main extends Component {
  state = {
    is_open: "d-lg-block d-none"
  };

  handleOpenSideBar = async () => {
    if (this.state.is_open === "d-block") {
      await this.setState({ is_open: "d-none" });
    } else {
      await this.setState({ is_open: "d-block" });
    }
  };

  render() {
    const parentProps = {
      toggleSideBar: this.props.toggleSideBar,
      history: this.props.history,
      resetPassword: this.props.resetPassword
    };

    return (
      <main>
        <section className="sticky-top">
          <Nav parentProps={parentProps} onClick={this.handleOpenSideBar} />
        </section>
        <section className={this.state.is_open}>
          <Sidebar parentProps={parentProps} onClick={this.handleOpenSideBar} />
        </section>
        {/* Render children */}
        <section className={`container-fluid py-5 `}>
          {this.props.children}
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
