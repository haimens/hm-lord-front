import React, { Component } from "react";
import NavItem from "./nav.component/NavItem.item";
import SubNavItem from "./nav.component/SubNavItem.item";
import { ImageButton } from "../shared";

export default class Sidebar extends Component {
  handleClick = new_path => {
    const { history } = this.props.parentProps;
    history.push(new_path);
    this.props.handleSideBarBeenOpened();
  };
  handleClickLogo = e => {
    e.preventDefault();
    const { history } = this.props.parentProps;
    history.push("/home");
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
      <main className="hm-bg-darkblue" style={styles.container} id="navbarSupportedContent">
        {/* LOGO Section */}
        <section className="mb-3 p-4 d-flex flex-row justify-content-between">
          <a href="/home" onClick={e => this.handleClickLogo(e)}>
            <img src={`${process.env.PUBLIC_URL}/img/op_logo.svg`} alt="logo" width={"100px"} />
          </a>
          {/* Handle Close */}
        </section>
        {/* NAV ITEMS */}
        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/home")}
            image={`${process.env.PUBLIC_URL}/img/home.svg`}
            name="Home"
            path="home"
            history={this.props.parentProps.history}
            showArrow={false}
          />
        </section>
        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/driver")}
            image={`${process.env.PUBLIC_URL}/img/home.svg`}
            name="Driver"
            path="driver"
            history={this.props.parentProps.history}
            showArrow={false}
          />
        </section>
        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/vehicle")}
            image={`${process.env.PUBLIC_URL}/img/home.svg`}
            name="Vehicle"
            path="vehicle"
            history={this.props.parentProps.history}
            showArrow={false}
          />
        </section>
        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/customer")}
            image={`${process.env.PUBLIC_URL}/img/home.svg`}
            name="Customer"
            path="customer"
            history={this.props.parentProps.history}
            showArrow={false}
          />
        </section>
        <section className="accordion">
          <NavItem
            onToggle={() => this.props.parentProps.history.push("/order/list")}
            image={`${process.env.PUBLIC_URL}/img/home.svg`}
            name="Order"
            path="order"
            history={this.props.parentProps.history}
            showArrow={false}
          >
            <SubNavItem
              onClick={() => this.handleClick("/order/list")}
              name="Order List"
              is_target={parsedLocation[2] === "list"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/order/creation")}
              name="Add Order"
              is_target={parsedLocation[2] === "creation"}
            />
          </NavItem>
        </section>
        <section className="accordion">
          <NavItem
            onToggle={() => this.props.parentProps.history.push("/trip/ongoing")}
            image={`${process.env.PUBLIC_URL}/img/home.svg`}
            name="Trip"
            path="trip"
            history={this.props.parentProps.history}
            showArrow={false}
          >
            <SubNavItem
              onClick={() => this.handleClick("/trip/ongoing")}
              name="Ongoing"
              is_target={parsedLocation[2] === "ongoing"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/trip/upcoming")}
              name="Upcoming"
              is_target={parsedLocation[2] === "upcoming"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/trip/finished")}
              name="Recent Finished"
              is_target={parsedLocation[2] === "finished"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/trip/failed")}
              name="Failed"
              is_target={parsedLocation[2] === "failed"}
            />
          </NavItem>
        </section>
        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/payable")}
            image={`${process.env.PUBLIC_URL}/img/home.svg`}
            name="Driver Payable"
            path="/payable"
            history={this.props.parentProps.history}
            showArrow={false}
          />
        </section>
        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/notification")}
            image={`${process.env.PUBLIC_URL}/img/home.svg`}
            name="Notification"
            path="notification"
            history={this.props.parentProps.history}
            showArrow={false}
          />
        </section>

        <section className="accordion">
          <NavItem
            onToggle={() => this.props.parentProps.history.push("/settings/paymentResource")}
            image={`${process.env.PUBLIC_URL}/img/home.svg`}
            name="Settings"
            path="settings"
            history={this.props.parentProps.history}
            showArrow={false}
          >
            <SubNavItem
              onClick={() => this.handleClick("/settings/paymentResource")}
              name="Payment Resource"
              is_target={parsedLocation[2] === "paymentResource"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/settings/messageResource")}
              name="Message Resource"
              is_target={parsedLocation[2] === "messageResource"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/settings/emailResource")}
              name="Email Resource"
              is_target={parsedLocation[2] === "emailResource"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/settings/coupon")}
              name="Coupon"
              is_target={parsedLocation[2] === "coupon"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/settings/vehicleType")}
              name="Vehicle Type"
              is_target={parsedLocation[2] === "vehicleType"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/settings/keyAndValue")}
              name="Key/Value"
              is_target={parsedLocation[2] === "keyAndValue"}
            />
          </NavItem>
        </section>
      </main>
    );
  }
}

const styles = {
  container: {
    height: "100% !important",
    width: "230px",
    zIndex: "1031"
  }
};
