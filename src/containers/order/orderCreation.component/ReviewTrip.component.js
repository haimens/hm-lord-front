import React, { Component } from "react";
import ReviewTripForm from "./reviewTrip.component/ReviewTripForm.component";
import moment from "moment";
export default class ReviewTrip extends Component {
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
            <ReviewTripForm
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
                <ReviewTripForm
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
        </div>

        <div className="row">
          <div className="col-12 d-flex justify-content-between ">
            <h5 className="mb-4 font-weight-bold">Passenger Information</h5>
          </div>
          <div className="mb-4 col-12">
            <div className="row">
              <div className="col-lg-4 col-12">
                <label className="font-weight-bold" htmlFor="flight">
                  Name
                </label>
                <div>
                  <input type="text" id="flight" className="form-control" onChange={this.handleInputChange} />
                </div>
              </div>

              <div className="col-lg-4 col-12">
                <label className="font-weight-bold" htmlFor="flight">
                  Cell
                </label>
                <div>
                  <input type="text" id="flight" className="form-control" onChange={this.handleInputChange} />
                </div>
              </div>

              <div className="col-lg-4 col-12">
                <label className="font-weight-bold" htmlFor="flight">
                  Email
                </label>
                <div>
                  <input type="text" id="flight" className="form-control" onChange={this.handleInputChange} />
                </div>
              </div>

              <div className="col-12 mt-3">
                <label className="font-weight-bold" htmlFor="flight">
                  Special Instruction
                </label>
                <div>
                  <input type="text" id="flight" className="form-control" onChange={this.handleInputChange} />
                </div>
              </div>
            </div>
            <hr className="mt-4" />
          </div>
        </div>

        <div className="row">
          <div className="col-12 d-flex justify-content-between ">
            <h5 className="mb-4 font-weight-bold">Coupon</h5>
          </div>
          <div className="mb-4 col-12">
            <div className="row">
              <div className="col-lg-4 col-12">
                <label className="font-weight-bold" htmlFor="flight">
                  Coupon
                </label>
                <div>
                  <input type="text" id="flight" className="form-control" onChange={this.handleInputChange} />
                </div>
              </div>
            </div>
            <hr className="mt-4" />
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
