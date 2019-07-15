import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DisplayCard from "./dashboard.components/display.card";
import { GMapWithMarker, Header, ListHeader } from "../../components/shared";
import DriversMap from "./dashboard.components/DriversMap.component";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./dashboard.container.css";
import CalendarDailyList from "./dashboard.components/CalendarDailyList.component";

import { findDriverListInLord, findDriverLocationListInLord } from "../../actions/driver.action";
import { findCustomerListInLord } from "../../actions/customer.action";
import { findOrderListInLord, findOrderListInLordWithDate } from "../../actions/order.action";
import { convertLocalToUTC } from "../../actions/utilities.action";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCalendarBeenClicked = date => {};

  componentDidMount() {
    const {
      findDriverListInLord,
      findCustomerListInLord,
      findOrderListInLord,
      findOrderListInLordWithDate
    } = this.props;
    console.log(new Date());
    Promise.all([
      findDriverListInLord(),
      findCustomerListInLord(),
      findOrderListInLord(),
      findDriverLocationListInLord(),
      findOrderListInLordWithDate({
        date_from: convertLocalToUTC(moment().startOf("day")),
        date_to: convertLocalToUTC(moment().endOf("day"))
      })
    ]);
  }

  render() {
    const localizer = momentLocalizer(moment);
    const { customer_list_in_lord, order_list_in_lord, driver_list_in_lord, order_list_in_lord_with_date } = this.props;
    return (
      <main>
        <section className="container-fluid">
          <div className="mb-4">
            <Header title="Dashboard" tabicon={"icon_dashboard_white.svg"} />
          </div>
          <div className="row">
            <div className="col-12 col-md-6 h-100 mb-4">
              <DisplayCard
                data={{
                  amount: customer_list_in_lord.count,
                  title: "TOTAL CUSTOMER",
                  icon: `${process.env.PUBLIC_URL}/img/homeicon_customer.svg`
                }}
                red={true}
              />
            </div>
            <div className="col-12 col-md-6 h-100 mb-4">
              <DisplayCard
                data={{
                  amount: order_list_in_lord.count,
                  title: "TOTAL ORDER",
                  icon: `${process.env.PUBLIC_URL}/img/homeicon_order.svg`
                }}
              />
            </div>
            <div className="col-12 col-md-6 h-100 mb-4">
              <DisplayCard
                data={{
                  amount: driver_list_in_lord.count,
                  title: "TOTAL DRIVER",
                  icon: `${process.env.PUBLIC_URL}/img/homeicon_driver.svg`
                }}
                red={true}
              />
            </div>
            <div className="col-12 col-md-6 h-100 mb-4">
              <DisplayCard
                data={{
                  amount: order_list_in_lord_with_date.count,
                  title: "ORDER TODAY",
                  icon: `${process.env.PUBLIC_URL}/img/homeicon_24hr.svg`
                }}
              />
            </div>
          </div>
        </section>

        <section className="container-fluid">
          <div className="mb-4">
            <ListHeader
              parentProps={{ title: "Driver Map", clickFunction: this.handleAddCompanyModal, clickTitle: "Refresh" }}
              buttonWidth={"88px"}
            />
            <div className="bg-white rounded-custom-bottom shadow-sm">
              <div className="container-fluid">
                <div className="row p-1">
                  <div className="col-7 " style={{ height: "512px" }}>
                    <GMapWithMarker />
                  </div>
                  <div className="col-5">
                    <div className="shadow-sm rounded-custom" style={{ height: "512px" }}>
                      <div className="border-bottom-custom px-3 d-flex align-items-center" style={{ height: "59px" }}>
                        <div className="hm-title-sub-size text-main-color font-weight-bold">Drivers</div>
                      </div>

                      <div className="border-bottom-custom " style={{ height: "60px" }}>
                        <div className="input-group px-1">
                          <div className="input-group-prepend col-1 p-0 d-flex justify-content-center">
                            <span className="input-group-text border-0 bg-white">
                              <i className="fas fa-search" />
                            </span>
                          </div>
                          <input
                            className="form-control border-0 hm-text-14"
                            style={{ height: "58px" }}
                            name="company_name"
                            id="company_name"
                            placeholder={"Search"}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="border-bottom-custom d-flex align-items-center" style={{ height: "94px" }}>
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-3 d-flex justify-content-end">
                              <img
                                src={`${process.env.PUBLIC_URL}/img/hd.png`}
                                alt="driver-avatar"
                                className="avatar-md rounded-circle "
                              />
                            </div>
                            <div className="col-9">
                              <div>Chris Yao</div>
                              <div>12431241414</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container-fluid">
          <div className="mb-4">
            <ListHeader parentProps={{ title: "Trips" }} hideButton={true} />
            <div className="bg-white p-3 border-top shadow-sm mb-3">
              <Calendar
                localizer={localizer}
                events={myEventsList}
                style={{ minHeight: "804px" }}
                views={["month"]}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={this.handleCalendarBeenClicked}
                showMultiDayTimes={true}
              />
            </div>
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    driver_list_in_lord: state.driverReducer.driver_list_in_lord,
    driver_location_list_in_lord: state.driverReducer.driver_location_list_in_lord,
    order_list_in_lord: state.orderReducer.order_list_in_lord,
    order_list_in_lord_with_date: state.orderReducer.order_list_in_lord_with_date,
    customer_list_in_lord: state.customerReducer.customer_list_in_lord
  };
};
const mapDispatchToProps = {
  findDriverListInLord,
  findCustomerListInLord,
  findOrderListInLord,
  findOrderListInLordWithDate,
  findDriverLocationListInLord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home));

let myEventsList = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(),
    end: new Date()
  }
];
