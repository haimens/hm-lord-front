import React, { Component } from "react";
import { Modal } from "../../../../components/shared";
import alertify from "alertifyjs";
import { parseAmount } from "../../../../actions/utilities.action";

export default class EditAmountModal extends Component {
  state = {
    amount: "",
    trip_token: "",
    airlineCodeID: "",
    flightNumber: ""
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleClose = () => {
    this.props.onClose();
  };

  handleAddingAddon = async () => {
    const { amount, trip_token, airlineCodeID, flightNumber } = this.state;
    const { updateTripBasicInfo, position } = this.props;
    if (amount !== "") {
      updateTripBasicInfo(
        trip_token,
        {
          amount: amount * 100,
          flight_str: `${airlineCodeID} ${flightNumber}`
        },
        position
      );
      this.handleClose();
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
  };

  componentDidMount() {
    const { currAmount, trip_token, currFlightStr } = this.props;
    if (currFlightStr !== " ") {
      this.setState({
        amount: (currAmount / 100).toFixed(2),
        trip_token,
        airlineCodeID: currFlightStr.split(" ")[0],
        flightNumber: currFlightStr.split(" ")[1]
      });
    } else {
      this.setState({
        amount: (currAmount / 100).toFixed(2),
        trip_token
      });
    }
  }

  render() {
    const { amount, airlineCodeID, flightNumber } = this.state;
    return (
      <Modal
        title={`Update Amount`}
        onClose={this.handleClose}
        position="center"
        getWidth={"467px"}
        getHeight={"400px"}
      >
        <div className="container">
          <div className="p-3">
            <div className="form-group input-group my-4">
              <label className="text-main-color hm-text-14 font-weight-bold">Amount</label>
              <div className="input-group mt-2">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-white border-right-0">$</span>
                </div>
                <input
                  type="text"
                  className="form-control hm-input-height  border-left-0"
                  id="amount"
                  placeholder="Amount"
                  value={amount}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="form-group my-4 ">
              <label className="text-main-color hm-text-14 font-weight-bold">Flight Number</label>
              <div className="input-group mt-2">
                <input
                  type="text"
                  className="form-control hm-input-height col-2"
                  id="airlineCodeID"
                  placeholder="Airline Code"
                  value={airlineCodeID}
                  onChange={this.handleInputChange}
                />

                <input
                  type="text"
                  className="form-control hm-input-height "
                  id="flightNumber"
                  placeholder="Flight Number"
                  value={flightNumber}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="form-group text-right pt-3">
              <button
                className="button-main-background btn button-main-size px-4 text-white mr-3"
                onClick={this.handleAddingAddon}
              >
                Update
              </button>
              <button onClick={this.handleClose} className="btn button-main-size btn-outline-secondary px-4">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
