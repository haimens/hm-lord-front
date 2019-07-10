import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { TripCard, ListHeader, Header } from "../../../components/shared";
import { findTripListInLord } from "../../../actions/trip.action";
class TripContainer extends Component {
  state = {};

  async componentDidMount() {
    const { match, findTripListInLord } = this.props;
    const currentPosition = match.path.split("/")[2];
    if (currentPosition === "ongoing") {
    }
    if (currentPosition === "upcoming") {
      findTripListInLord({ status: 2 });
    }
    if (currentPosition === "finished") {
    }
    if (currentPosition === "abnormal") {
    }
  }
  render() {
    const { history, match, findTripListInLord } = this.props;
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
      <main className="container-fluid">
        <section className="mb-4">
          <div>
            <Header
              title="Trip"
              subTitle={title}
              toLocation={`/trip/${currentPosition}`}
              tabicon={"tabicon_dashboard.svg"}
              history={history}
              buttonWidth={"88px"}
            />
          </div>
        </section>

        <section className="row">
          <TripCard
            parentProps={{
              tripId: 100015,
              tripDriver: "Kobe",
              tripCustomer: "Lebron",
              tripPickUp: "16/26 23",
              tripFrom: "321 s",
              tripTo: "123 s"
            }}
            currentPosition={currentPosition}
            dotColor={"success-text-color"}
            tripStatus={"Active"}
          />
        </section>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = {
  findTripListInLord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TripContainer));
