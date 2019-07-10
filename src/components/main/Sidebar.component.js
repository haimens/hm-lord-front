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
            <img src={localStorage.getItem("logo_path")} alt="logo" width={"142px"} height={"142px"} />
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
            onToggle={() => this.handleClick("/driver")}
            image={`${process.env.PUBLIC_URL}/img/navicon_company.svg`}
            name="Driver"
            path="driver"
            history={this.props.parentProps.history}
            showArrow={false}
          />
        </section>
        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/vehicle")}
            image={`${process.env.PUBLIC_URL}/img/navicon_company.svg`}
            name="Vehicle"
            path="vehicle"
            history={this.props.parentProps.history}
            showArrow={false}
          />
        </section>
        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/customer")}
            image={`${process.env.PUBLIC_URL}/img/navicon_company.svg`}
            name="Customer"
            path="customer"
            history={this.props.parentProps.history}
            showArrow={false}
          />
        </section>

        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/order/fee")}
            image={`${process.env.PUBLIC_URL}/img/navicon_settings.svg`}
            name="Order"
            path="order"
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

        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/trip/ongoing")}
            image={`${process.env.PUBLIC_URL}/img/navicon_settings.svg`}
            name="Trip"
            path="trip"
            history={this.props.parentProps.history}
            showArrow={true}
          >
            <SubNavItem
              onClick={() => this.handleClick("/trip/ongoing")}
              name="Ongoing"
              history={this.props.parentProps.history}
              path="ongoing"
              is_target={parsedLocation[3] === "ongoing"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/trip/upcoming")}
              name="Upcoming"
              history={this.props.parentProps.history}
              path="upcoming"
              is_target={parsedLocation[3] === "upcoming"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/trip/finished")}
              name="Recent Finished"
              history={this.props.parentProps.history}
              path="finished"
              is_target={parsedLocation[3] === "finished"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/trip/abnormal")}
              name="Abnormal"
              history={this.props.parentProps.history}
              path="abnormal"
              is_target={parsedLocation[3] === "abnormal"}
            />
          </NavItem>
        </section>

        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/payable")}
            image={`${process.env.PUBLIC_URL}/img/navicon_company.svg`}
            name="Driver Payable"
            path="payable"
            history={this.props.parentProps.history}
            showArrow={false}
          />
        </section>

        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/notification")}
            image={`${process.env.PUBLIC_URL}/img/navicon_company.svg`}
            name="Notification"
            path="notification"
            history={this.props.parentProps.history}
            showArrow={false}
          />
        </section>

        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/settings/fee")}
            image={`${process.env.PUBLIC_URL}/img/navicon_settings.svg`}
            name="Trip"
            path="trip"
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
