import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TripInfo from "./TripInfo.card";
import "./TripDetail.card.css";
class TripDetail extends Component {
  state = {
    round_trip: false
  };
  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleRoundTripButton = () => {
    this.setState(state => ({ round_trip: !state.round_trip }));
  };
  componentDidMount() {}
  render() {
    const { customer_list_in_lord } = this.props;
    const { round_trip } = this.state;
    return (
      <div>
        <TripInfo />
        {round_trip && <TripInfo />}
        <div className="d-flex justify-content-between mt-5">
          <button
            className="btn trip-button-width rounded-custom bg-white text-purple shadow-sm hm-text-12"
            onClick={this.handleRoundTripButton}
          >
            {round_trip ? "Single Trip" : "Rounded Trip"}
          </button>
          <button className="btn trip-button-width rounded-custom text-white button-main-background shadow-sm hm-text-12">
            Next to review trip
          </button>
        </div>
      </div>
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
)(withRouter(TripDetail));
