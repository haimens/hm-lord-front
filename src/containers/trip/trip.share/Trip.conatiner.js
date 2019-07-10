import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { TripCard, ListHeader, Header } from "../../../components/shared";
import { findTripListInLord } from "../../../actions/trip.action";
class TripContainer extends Component {
  state = {
    currentPosition: ""
  };

  async componentDidMount() {
    const { match, findTripListInLord } = this.props;
    const currentPosition = match.path.split("/")[2];
    if (currentPosition === "ongoing") {
      console.log("here");
    }
    if (currentPosition === "upcoming") {
      findTripListInLord({ status: 2 });
    }
    if (currentPosition === "finished") {
    }
    if (currentPosition === "abnormal") {
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { match, findTripListInLord } = props;
    const currentPositionNow = match.path.split("/")[2];
    if (state.currentPosition !== currentPositionNow) {
      if (currentPositionNow === "ongoing") {
        console.log("here");
      }
      if (currentPositionNow === "upcoming") {
        findTripListInLord({ status: 2 });
      }
      if (currentPositionNow === "finished") {
      }
      if (currentPositionNow === "abnormal") {
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
              dotColor={"text-purple"}
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
  findTripListInLord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TripContainer));
