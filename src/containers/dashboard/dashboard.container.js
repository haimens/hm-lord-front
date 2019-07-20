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
import CalendarModal from "./dashboard.components/Calendar.modal";
import {
  findDriverListInLord,
  findDriverLocationListInLord,
  setDriverLocationMapToFalse
} from "../../actions/driver.action";
import { findCustomerListInLord } from "../../actions/customer.action";
import { findOrderListInLord, findOrderListInLordWithDate } from "../../actions/order.action";
import { convertLocalToUTC } from "../../actions/utilities.action";
import { findTripCountInLord } from "../../actions/trip.action";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr_select: "",
      showCalendarInfo: false,
      curr_date: "",
      keywords: ""
    };
  }
  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleCalendarBeenClicked = date => {
    this.setState({ showCalendarInfo: true, curr_date: date });
  };

  handleCalendarClose = () => {
    this.setState({ showCalendarInfo: false, curr_date: "" });
  };

  handleOnDrillDown = date => {};

  handleEventPropGetter = (event, start, end, isSelected) => {
    if (event.title.includes("Abnormal")) {
      return { style: { backgroundColor: "#f5365c", fontColor: "12px" } };
    }
    if (event.title.includes("Finished")) {
      return { style: { backgroundColor: "#ffd600", fontColor: "12px" } };
    }
    if (event.title.includes("Ongoing")) {
      return { style: { backgroundColor: "#2ece89", fontColor: "12px" } };
    }
  };

  handleSubmit = e => {
    if (e) e.preventDefault();
    const { keywords } = this.state;
    this.props.setDriverLocationMapToFalse();
    this.props.findDriverLocationListInLord({ keywords });
  };

  handleOnRangeChange = date => {
    this.props.findTripCountInLord({
      date_from: convertLocalToUTC(date.start),
      date_to: convertLocalToUTC(date.end),
      from_key: "pickup_time",
      to_key: "pickup_time"
    });
  };

  handleRefreshDriverLocation = () => {
    this.setState({ curr_select: "" });
    this.props.setDriverLocationMapToFalse();
    this.props.findDriverLocationListInLord();
  };

  handleDriverBeenClicked = curr_select => {
    this.setState({ curr_select });
  };

  handleGenerateDateItems = () => {
    const { trip_count_in_lord_active, trip_count_in_lord_finished, trip_count_in_lord_failed } = this.props;
    let tripArray = [];
    trip_count_in_lord_active.map((active, index) =>
      tripArray.push({
        id: active.date,
        title: `${active.count} Ongoing Trip`,
        allDay: true,
        start: active.date,
        end: active.date
      })
    );
    trip_count_in_lord_finished.map((finished, index) =>
      tripArray.push({
        id: finished.date,
        title: `${finished.count} Finished Trip`,
        allDay: true,
        start: finished.date,
        end: finished.date
      })
    );
    trip_count_in_lord_failed.map((failed, index) =>
      tripArray.push({
        id: failed.date,
        title: `${failed.count} Abnormal Trip`,
        allDay: true,
        start: failed.date,
        end: failed.date
      })
    );
    return tripArray;
  };

  componentDidMount() {
    const {
      findDriverListInLord,
      findCustomerListInLord,
      findOrderListInLord,
      findOrderListInLordWithDate,
      findDriverLocationListInLord,
      findTripCountInLord,
      setDriverLocationMapToFalse
    } = this.props;
    Promise.all([
      findDriverListInLord(),
      setDriverLocationMapToFalse(),
      findCustomerListInLord(),
      findOrderListInLord(),
      findDriverLocationListInLord(),
      findOrderListInLordWithDate({
        date_from: convertLocalToUTC(moment().startOf("day")),
        date_to: convertLocalToUTC(moment().endOf("day"))
      }),
      findTripCountInLord({
        date_from: convertLocalToUTC(moment().startOf("month")),
        date_to: convertLocalToUTC(moment().endOf("month")),
        from_key: "pickup_time",
        to_key: "pickup_time"
      })
    ]);
  }
  render() {
    const localizer = momentLocalizer(moment);
    const {
      customer_list_in_lord,
      order_list_in_lord,
      driver_list_in_lord,
      order_list_in_lord_with_date,
      driver_location_list_in_lord,
      showMap,
      history
    } = this.props;
    const { curr_select, showCalendarInfo, curr_date, keywords } = this.state;
    let tripArray = this.handleGenerateDateItems();
    return (
      <main>
        {showCalendarInfo && <CalendarModal onClose={this.handleCalendarClose} curr_date={curr_date} />}
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
              parentProps={{
                title: "Driver Map",
                clickFunction: this.handleRefreshDriverLocation,
                clickTitle: "Refresh",
                icon: "icon_refresh.svg"
              }}
              hideShadow={false}
              buttonWidth={"88px"}
            />
            <div className="bg-white rounded-custom-bottom shadow-sm">
              <div className="container-fluid">
                <div className="row p-1">
                  <div className="col-7 py-3" style={{ height: "512px" }}>
                    {showMap && driver_location_list_in_lord.record_list.length > 0 && (
                      <GMapWithMarker
                        selected={curr_select}
                        driver_location_list_in_lord={driver_location_list_in_lord}
                      />
                    )}
                  </div>
                  <div className="col-5 py-3">
                    <div className="shadow-sm rounded-custom">
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
                          <form className="col" onSubmit={this.handleSubmit}>
                            <input
                              className="form-control border-0 hm-text-14"
                              style={{ height: "58px" }}
                              name="keywords"
                              id="keywords"
                              value={keywords}
                              placeholder={"Search"}
                              onChange={this.handleInputChange}
                            />
                          </form>
                        </div>
                      </div>
                      <div style={{ overflow: "auto", height: "367px" }}>
                        {driver_location_list_in_lord.record_list.map((driver, index) => (
                          <div
                            className="border-bottom-custom d-flex align-items-center hm-pointer-cursor"
                            style={{ height: "94px" }}
                            onClick={() => this.handleDriverBeenClicked(driver)}
                            key={index}
                          >
                            <div className="container-fluid">
                              <div className="row">
                                <div className="col-3 d-flex justify-content-end">
                                  <img
                                    src={driver.img_path}
                                    alt="driver-avatar"
                                    className="avatar-md rounded-circle "
                                  />
                                </div>
                                <div className="col-7">
                                  <div className="text-modal-color font-weight-bold hm-text-15">{driver.name}</div>
                                  <div className="text-modal-color hm-text-13">{driver.cell}</div>
                                </div>
                                <div className="col-2 d-flex justify-content-end align-items-center">
                                  <img
                                    src={`${process.env.PUBLIC_URL}/img/icon_detail.svg`}
                                    alt="error404"
                                    onClick={() => history.push(`/driver/detail/${driver.driver_token}`)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
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
            <div className="bg-white p-3 border-top shadow-sm" style={{ height: "900px" }}>
              <Calendar
                localizer={localizer}
                events={tripArray}
                onRangeChange={this.handleOnRangeChange}
                style={{ height: "800px" }}
                popup={true}
                onDrillDown={this.handleOnDrillDown}
                views={["month"]}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={this.handleCalendarBeenClicked}
                showMultiDayTimes={true}
                eventPropGetter={this.handleEventPropGetter}
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
    customer_list_in_lord: state.customerReducer.customer_list_in_lord,
    trip_count_in_lord_active: state.tripReducer.trip_count_in_lord_active,
    trip_count_in_lord_finished: state.tripReducer.trip_count_in_lord_finished,
    trip_count_in_lord_failed: state.tripReducer.trip_count_in_lord_failed,
    trip_list_in_driver: state.tripReducer.trip_list_in_driver,
    trip_active_list_in_driver: state.tripReducer.trip_active_list_in_driver,
    showMap: state.driverReducer.showMap
  };
};
const mapDispatchToProps = {
  findDriverListInLord,
  findCustomerListInLord,
  findOrderListInLord,
  findOrderListInLordWithDate,
  findDriverLocationListInLord,
  findTripCountInLord,
  setDriverLocationMapToFalse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
