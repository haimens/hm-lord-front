import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { TripCard, Header } from "../../../components/shared";
import BasicInfo from "./TripDetail.component/BasicInfo.container";
import CustomerInfo from "./TripDetail.component/CustomerInfo.container";
import DriverInfo from "./TripDetail.component/DriverInfo.container";
import VehicleInfo from "./TripDetail.component/VehicleInfo.container";
import AlertInfo from "./TripDetail.component/AlertInfo.container";
import TimeStaps from "./TripDetail.component/TimeStaps.contianer";

class TripDetailContainer extends Component {
  state = {
    basic_info: false,
    customer_info: false,
    driver_info: false,
    vehicle_info: false,
    alert_info: false,
    time_stamps: false,
    currentPosition: "",
    title: ""
  };

  async componentDidMount() {
    const { match } = this.props;
    const currentPosition = match.path.split("/")[2];
    if (currentPosition === "ongoing") {
      this.setState({ currentPosition, title: "Ongoing", customer_info: true });
    }
    if (currentPosition === "upcoming") {
      this.setState({
        currentPosition,
        title: "Upcoming",
        basic_info: true,
        customer_info: true,
        driver_info: true,
        vehicle_info: true,
        alert_info: true
      });
    }
    if (currentPosition === "finished") {
      this.setState({ currentPosition, title: "Recent Finished", customer_info: true });
    }
  }
  render() {
    const { history } = this.props;
    const {
      currentPosition,
      title,
      basic_info,
      customer_info,
      driver_info,
      vehicle_info,
      alert_info,
      time_stamps
    } = this.state;
    return (
      <main>
        <section className="mb-4">
          <div>
            <Header
              title="Trip"
              subTitle={title}
              thirdTitle={"Trip Detail"}
              toLocation={`/trip/${currentPosition}`}
              toSubLocation={`/trip/${currentPosition}`}
              tabicon={"tabicon_dashboard.svg"}
              history={history}
              buttonWidth={"88px"}
            />
          </div>
        </section>
        <section className="container-fluid mb-4">
          <div className="bg-white rounded-custom shadow-sm">
            <div className="row" style={{ padding: "40px" }}>
              <div className="col-lg-6 col-12 mb-4">
                <BasicInfo showButton={basic_info} />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <CustomerInfo showButton={customer_info} />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <DriverInfo showButton={driver_info} />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <VehicleInfo showButton={vehicle_info} />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <AlertInfo showButton={alert_info} />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <TimeStaps showButton={time_stamps} />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TripDetailContainer));
