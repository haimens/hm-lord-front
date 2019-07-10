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
  state = {};

  async componentDidMount() {}
  render() {
    const { history, match } = this.props;
    const currentPosition = match.path.split("/")[2];
    let title = "";
    if (currentPosition === "ongoing") {
      title = "Ongoing";
    }
    if (currentPosition === "upcoming") {
      title = "Upcoming";
    }
    if (currentPosition === "finished") {
      title = "Recent Finished";
    }
    if (currentPosition === "abnormal") {
      title = "Abnormal";
    }
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
        <section className="container-fluid">
          <div className="bg-white rounded-custom shadow-sm">
            <div className="row" style={{ padding: "40px" }}>
              <div className="col-lg-6 col-12 mb-4">
                <BasicInfo />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <CustomerInfo />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <DriverInfo />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <VehicleInfo />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <AlertInfo />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <TimeStaps />
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
