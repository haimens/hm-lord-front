import React, { Component } from "react";
import NavItem from "./nav.component/NavItem.item";
import SubNavItem from "./nav.component/SubNavItem.item";

export default class Sidebar extends Component {
  handleClick = new_path => {
    const { history } = this.props.parentProps;
    // this.props.handleSideBarBeenOpened();
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
            style={{ marginTop: "21px", marginBottom: "21px" }}
            onClick={e => this.handleClickLogo(e)}
          >
            <img src={localStorage.getItem("logo_path")} alt="logo" width={"100px"} height={"100px"} />
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
            image={`${process.env.PUBLIC_URL}/img/tabicon_dashboard.svg`}
            name="Dashboard"
            path="dashboard"
            history={this.props.parentProps.history}
            showArrow={false}
          />
        </section>
        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/driver")}
            image={`${process.env.PUBLIC_URL}/img/tabicon_driver.svg`}
            name="Driver"
            path="driver"
            history={this.props.parentProps.history}
            showArrow={false}
          />
        </section>
        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/vehicle")}
            image={`${process.env.PUBLIC_URL}/img/tabicon_vehicle.svg`}
            name="Vehicle"
            path="vehicle"
            history={this.props.parentProps.history}
            showArrow={false}
          />
        </section>
        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/customer")}
            image={`${process.env.PUBLIC_URL}/img/tabicon_customer.svg`}
            name="Customer"
            path="customer"
            history={this.props.parentProps.history}
            showArrow={false}
          />
        </section>

        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/order/list")}
            image={`${process.env.PUBLIC_URL}/img/tabicon_order.svg`}
            name="Order"
            path="order"
            history={this.props.parentProps.history}
            showArrow={true}
          >
            <SubNavItem
              onClick={() => this.handleClick("/order/list")}
              name="Order List"
              history={this.props.parentProps.history}
              path="z"
              is_target={parsedLocation[3] === "list"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/order/creation")}
              name="Add Order"
              history={this.props.parentProps.history}
              path="creation"
              is_target={parsedLocation[3] === "creation"}
              className="mt-2"
            />
          </NavItem>
        </section>

        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/trip/ongoing")}
            image={`${process.env.PUBLIC_URL}/img/tabicon_trip.svg`}
            name="Trip"
            path="trip"
            history={this.props.parentProps.history}
            showArrow={true}
          >
            <SubNavItem
              onClick={() => this.handleClick("/trip/upcoming")}
              name="Upcoming"
              history={this.props.parentProps.history}
              path="upcoming"
              is_target={parsedLocation[3] === "upcoming"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/trip/ongoing")}
              name="Ongoing"
              history={this.props.parentProps.history}
              path="ongoing"
              is_target={parsedLocation[3] === "ongoing"}
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
            image={`${process.env.PUBLIC_URL}/img/tabicon_payable.svg`}
            name="Driver Payable"
            path="payable"
            history={this.props.parentProps.history}
            showArrow={false}
          />
        </section>

        <section className="accordion">
          <NavItem
            onToggle={() => this.handleClick("/notification/alert")}
            image={`${process.env.PUBLIC_URL}/img/tabicon_notification.svg`}
            name="Notification"
            path="notification"
            history={this.props.parentProps.history}
            showArrow={true}
          >
            <SubNavItem
              onClick={() => this.handleClick("/notification/alert")}
              name="Trip Alert"
              history={this.props.parentProps.history}
              path="alert"
              is_target={parsedLocation[3] === "alert"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/notification/message")}
              name="Message Center"
              history={this.props.parentProps.history}
              path="message"
              is_target={parsedLocation[3] === "message"}
            />
          </NavItem>
        </section>

        <section className="accordion  pb-4">
          <NavItem
            onToggle={() => this.handleClick("/settings/payment")}
            image={`${process.env.PUBLIC_URL}/img/tabicon_settings.svg`}
            name="Settings"
            path="settings"
            history={this.props.parentProps.history}
            showArrow={true}
          >
            <SubNavItem
              onClick={() => this.handleClick("/settings/payment")}
              name="Payment Resource"
              history={this.props.parentProps.history}
              path="payment"
              is_target={parsedLocation[3] === "payment"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/settings/message")}
              name="Message Resource"
              history={this.props.parentProps.history}
              path="message"
              is_target={parsedLocation[3] === "message"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/settings/email")}
              name="Email Resource"
              history={this.props.parentProps.history}
              path="email"
              is_target={parsedLocation[3] === "email"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/settings/coupon")}
              name="Coupon"
              history={this.props.parentProps.history}
              path="coupon"
              is_target={parsedLocation[3] === "coupon"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/settings/vehicle")}
              name="Vehicle Type"
              history={this.props.parentProps.history}
              path="vehicle"
              is_target={parsedLocation[3] === "vehicle"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/settings/general")}
              name="General Setting"
              history={this.props.parentProps.history}
              path="general"
              is_target={parsedLocation[3] === "general"}
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
