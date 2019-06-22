import React, { Component } from "react";
import TripDetailForm from "./tripDetail.component/TripDetailForm.component";
import moment from "moment";
export default class TripDetail extends Component {
  state = {
    roundTrip: false,
    firstTrip: {
      pickup_date: "",
      pickup_time: "",
      passenger_amount: "",
      flight: ""
    },
    secondTrip: {
      pickup_date: "",
      pickup_time: "",
      passenger_amount: "",
      flight: ""
    }
  };

  handleAddingRoundTrip = () => {
    this.setState(state => ({ roundTrip: !state.roundTrip }));
  };

  onDateChange = date => {
    this.setState(states => ({ ...states, firstTrip: { ...states.firstTrip, pickup_date: moment(date) } }));
  };

  onTimeChange = time => {
    this.setState(states => ({ ...states, firstTrip: { ...states.firstTrip, pickup_time: moment(time) } }));
  };

  updatePassenger = passenger_amount => {
    this.setState(states => ({ ...states, firstTrip: { ...states.firstTrip, passenger_amount } }));
  };

  updateFlight = flight => {
    this.setState(states => ({ ...states, firstTrip: { ...states.firstTrip, flight } }));
  };

  onDateChangeAgain = date => {
    this.setState(states => ({ ...states, secondTrip: { ...states.secondTrip, pickup_date: moment(date) } }));
  };

  onTimeChangeAgain = async time => {
    this.setState(states => ({ ...states, secondTrip: { ...states.secondTrip, pickup_time: moment(time) } }));
  };

  updatePassengerAgain = passenger_amount => {
    this.setState(states => ({ ...states, secondTrip: { ...states.secondTrip, passenger_amount } }));
  };

  updateFlightAgain = flight => {
    this.setState(states => ({ ...states, secondTrip: { ...states.secondTrip, flight } }));
  };
  render() {
    const { firstTrip, secondTrip, roundTrip } = this.state;
    const { handleChangePosition } = this.props;
    return (
      <div
        className="mb-4 bg-white shadow-sm p-3 d-flex flex-column justify-content-between"
        style={{ minHeight: "542px" }}
      >
        <div className="row">
          <div className="col-12 d-flex justify-content-between ">
            <h5 className="mb-4 font-weight-bold">Trip Detail</h5>
          </div>

          <div className="mb-4 col-12">
            <TripDetailForm
              pickup={"PICKUP"}
              dropoff={"DROPOFF"}
              trip={firstTrip}
              onDateChange={this.onDateChange}
              onTimeChange={this.onTimeChange}
              updatePassenger={this.updatePassenger}
              updateFlight={this.updateFlight}
            />
            {roundTrip && (
              <div>
                <hr className="mt-4" />
                <TripDetailForm
                  pickup={"PICKUPAGAIN"}
                  dropoff={"DROPOFFAGAIN"}
                  trip={{ ...secondTrip, roundTrip }}
                  onDateChange={this.onDateChangeAgain}
                  onTimeChange={this.onTimeChangeAgain}
                  updatePassenger={this.updatePassengerAgain}
                  updateFlight={this.updateFlightAgain}
                />
              </div>
            )}
          </div>
          <div className="col-12">
            <button className="btn hm-border-green hm-text-green btn-md px-5" onClick={this.handleAddingRoundTrip}>
              <i className="fas fa-plus mr-2" />
              {roundTrip ? "Single Trip" : "Round Trip"}
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button className="btn btn-outline-secondary px-4 mr-3" onClick={() => handleChangePosition(-1)}>
            Back
          </button>
          <button className="btn hm-bg-green text-white px-4" onClick={() => handleChangePosition(1)}>
            Next
          </button>
        </div>
      </div>
    );
  }
}
