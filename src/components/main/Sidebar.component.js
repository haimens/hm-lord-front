import React, { Component } from "react";
import NavItem from "./nav.component/NavItem.item";
import SubNavItem from "./nav.component/SubNavItem.item";

export default class Sidebar extends Component {
  handleClick = new_path => {
    const { history } = this.props.parentProps;
    this.props.handleSideBarBeenOpened();
    history.push(new_path);
  };
  handleClickLogo = e => {
    e.preventDefault();
    const { history } = this.props.parentProps;
    this.props.handleSideBarBeenOpened();
    history.push("/dashboard");
  };
  handleClose = type => {
    if (type === "sidebar") {
      this.props.parentProps.toggleSideBar();
    }
  };

  render() {
    const { pathname } = this.props.parentProps.history.location;
    const parsedLocation = pathname.split("/");

    return (
      <main className="bg-white" style={styles.container} id="navbarSupportedContent">
        {/* LOGO Section */}
        <section className="d-flex flex-row justify-content-center">
          <a
            href="/dashboard"
            style={{ marginTop: "21px", marginBottom: "61px" }}
            onClick={e => this.handleClickLogo(e)}
          >
            <img src={`${process.env.PUBLIC_URL}/img/logo.svg`} alt="logo" width={"142px"} height={"40px"} />
          </a>
          {/* Handle Close */}
          {/* <ImageButton
            icon={<i className="fas fa-times text-white" />}
            type="submit"
            size={24}
            outerClassName={"d-flex-block d-sm-flex-block d-md-flex-block d-lg-none d-flex align-items-center"}
            onClick={() => this.handleClose("sidebar")}
          /> */}
        </section>
        {/* NAV ITEMS */}
        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/dashboard")}
            image={`${process.env.PUBLIC_URL}/img/navicon_dashboard.svg`}
            name="Dashboard"
            path="dashboard"
            history={this.props.parentProps.history}
            showArrow={false}
          />
        </section>
        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/company")}
            image={`${process.env.PUBLIC_URL}/img/navicon_company.svg`}
            name="Company"
            path="company"
            history={this.props.parentProps.history}
            showArrow={false}
          />
        </section>
        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/invoice")}
            image={`${process.env.PUBLIC_URL}/img/navicon_invoice.svg`}
            name="Invoice"
            path="invoice"
            history={this.props.parentProps.history}
            showArrow={false}
          />
        </section>

        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/settings/fee")}
            image={`${process.env.PUBLIC_URL}/img/navicon_settings.svg`}
            name="Settings"
            path="settings"
            history={this.props.parentProps.history}
            showArrow={true}
          >
            <SubNavItem
              onClick={() => this.handleClick("/settings/fee")}
              name="Fee Rate"
              history={this.props.parentProps.history}
              path="fee"
              is_target={parsedLocation[3] === "fee"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/settings/general")}
              name="General Setting"
              history={this.props.parentProps.history}
              path="general"
              is_target={parsedLocation[3] === "general"}
              className="mt-2"
            />
          </NavItem>
        </section>
      </main>
    );
  }
}

const styles = {
  container: {
    height: "100%",
    width: "100%",
    zIndex: "1031"
  }
};
