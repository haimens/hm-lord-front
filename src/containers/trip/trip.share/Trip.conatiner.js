import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { TripCard, ListHeader, Header } from "../../../components/shared";
import { findTripListInLord, findTripActiveListInLord } from "../../../actions/trip.action";
class TripContainer extends Component {
  state = {
    currentPosition: ""
  };

  static getDerivedStateFromProps(props, state) {
    const { match, findTripListInLord, findTripActiveListInLord } = props;
    const currentPositionNow = match.path.split("/")[2];
    if (state.currentPosition !== currentPositionNow) {
      if (currentPositionNow === "ongoing") {
        findTripActiveListInLord();
      }
      if (currentPositionNow === "upcoming") {
        findTripListInLord({ status: 2 });
      }
      if (currentPositionNow === "finished") {
        findTripListInLord({ status: 7 });
      }
      if (currentPositionNow === "abnormal") {
        findTripListInLord({ status: 8 });
      }
      return {
        currentPosition: currentPositionNow
      };
    }
    return null;
  }

  render() {
    const { history, match, trip_list_in_lord } = this.props;
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
    console.log(currentPosition);
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
          {trip_list_in_lord.record_list.map((trip, index) => (
            <TripCard
              parentProps={{
                tripDriver: "Kobe",
                tripCustomer: trip.customer_name,
                tripPickUp: trip.pickup_time,
                tripFrom: trip.from_addr_str,
                tripTo: trip.to_addr_str,
                trip_token: trip.trip_token,
                tripStatus: trip.status_str
              }}
              key={index}
              currentPosition={currentPosition}
              hideDriver={true}
              history={history}
            />
          ))}
        </section>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    trip_list_in_lord: state.tripReducer.trip_list_in_lord
  };
};
const mapDispatchToProps = {
  findTripListInLord,
  findTripActiveListInLord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TripContainer));