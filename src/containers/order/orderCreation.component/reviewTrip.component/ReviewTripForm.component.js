import React, { Component } from "react";
import moment from "moment";
import { DatePicker, TimePicker } from "antd";
import GAutoComplete from "../../../../components/shared/GAutoComplete";
import "./ReviewTripForm.component.css";
export default class ReviewTripForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roundTrip: false,
      passenger_amount: "",
      flight: ""
    };
  }

  disabledDate(current) {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return current && current.valueOf() < date;
  }

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
    if (id === "passenger_amount") {
      this.props.updatePassenger(value);
    }
    if (id === "flight") {
      this.props.updateFlight(value);
    }
  };

  componentDidMount() {
    this.setState({ passenger_amount: this.props.trip.passenger_amount, flight: this.props.trip.flight });
  }

  render() {
    const { onDateChange, onTimeChange, pickup, dropoff, trip } = this.props;
    const { pickup_location, dropoff_location, pickup_date, pickup_time, roundTrip } = trip;
    const { flight, passenger_amount } = this.state;
    return (
      <div>
        <div className="row mb-4">
          <div className="col-lg-6 col-12">
            <label className="font-weight-bold" htmlFor="pickup_location">
              Pickup Location
            </label>
            <GAutoComplete
              placeholder={pickup}
              disablePlaceHolder={true}
              defaultValue={pickup_location && pickup_location[0].formatted_address}
            />
          </div>
          <div className="col-lg-6 col-12">
            <label className="font-weight-bold" htmlFor="dropoff_location">
              Dropoff Location
            </label>
            <GAutoComplete
              placeholder={dropoff}
              disablePlaceHolder={true}
              defaultValue={dropoff_location && dropoff_location[0].formatted_address}
            />
          </div>
          <div className="col-lg-3 col-12">
            <label className="font-weight-bold" htmlFor="pickup_date">
              Date
            </label>

            {roundTrip ? (
              pickup_date !== "" ? (
                <DatePicker
                  onChange={onDateChange}
                  disabledDate={this.disabledDate}
                  id="date"
                  size="large"
                  placeholder={""}
                />
              ) : (
                <DatePicker
                  onChange={onDateChange}
                  disabledDate={this.disabledDate}
                  id="date"
                  size="large"
                  placeholder={""}
                />
              )
            ) : (
              <DatePicker
                onChange={onDateChange}
                disabledDate={this.disabledDate}
                id="date"
                size="large"
                placeholder={""}
                style={{ height: "calc(1.5em + .75rem + 2px)" }}
              />
            )}
          </div>
          <div className="col-lg-3 col-12">
            <label className="font-weight-bold" htmlFor="pickup_time">
              Time
            </label>

            {roundTrip ? (
              pickup_time !== "" ? (
                <TimePicker
                  onChange={onTimeChange}
                  defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                  placeholder={""}
                  size="large"
                  format="HH:mm"
                  id="time"
                />
              ) : (
                <TimePicker
                  onChange={onTimeChange}
                  defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                  placeholder={""}
                  size="large"
                  format="HH:mm"
                  id="time"
                />
              )
            ) : (
              <TimePicker
                onChange={onTimeChange}
                defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                placeholder={""}
                size="large"
                format="HH:mm"
                id="time"
              />
            )}
          </div>
          <div className="col-lg-3 col-12">
            <label className="font-weight-bold" htmlFor="passenger_amount">
              Passenger
            </label>

            <select
              className="form-control"
              id="passenger_amount"
              value={passenger_amount}
              onChange={this.handleInputChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="col-lg-3 col-12">
            <label className="font-weight-bold" htmlFor="flight">
              Flight Number
            </label>
            <div>
              <input
                type="text"
                id="flight"
                className="form-control"
                onChange={this.handleInputChange}
                value={flight}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn hm-bg-green text-white px-5">Get Price</button>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <label className="font-weight-bold" htmlFor="flight">
              Add-on Service
            </label>
          </div>
          <div className="col-8">
            <div>
              <input
                type="text"
                id="flight"
                className="form-control"
                onChange={this.handleInputChange}
                value={flight}
              />
            </div>
          </div>

          <div className="col-3">
            <div>
              <input
                type="text"
                id="flight"
                className="form-control"
                onChange={this.handleInputChange}
                value={flight}
              />
            </div>
          </div>

          <div className="col-1">
            <button className="btn hm-bg-green text-white w-100">Add</button>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <label className="font-weight-bold" htmlFor="flight">
              Add Tip
            </label>
          </div>
          <div className="col-3">
            <div className="row">
              <div className="col-2">
                <div>
                  <input
                    type="text"
                    id="flight"
                    className="form-control"
                    onChange={this.handleInputChange}
                    value={flight}
                  />
                </div>
              </div>

              <div className="col-2">
                <div>
                  <input
                    type="text"
                    id="flight"
                    className="form-control"
                    onChange={this.handleInputChange}
                    value={flight}
                  />
                </div>
              </div>

              <div className="col-2">
                <div>
                  <input
                    type="text"
                    id="flight"
                    className="form-control"
                    onChange={this.handleInputChange}
                    value={flight}
                  />
                </div>
              </div>

              <div className="col-3">
                <div>
                  <input
                    type="text"
                    id="flight"
                    className="form-control"
                    onChange={this.handleInputChange}
                    value={flight}
                  />
                </div>
              </div>

              <div className="col-3">
                <button className="btn hm-bg-green text-white w-100">Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
