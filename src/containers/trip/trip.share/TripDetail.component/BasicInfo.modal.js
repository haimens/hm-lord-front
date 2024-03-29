import React, { Component } from "react";
import { Modal } from "../../../../components/shared";

export default class BasicInfo extends Component {
  state = {
    airlineCodeID: "",
    flightNumber: "",
    note: ""
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleClose = () => {
    this.props.onClose();
  };

  handleAddingAddon = async () => {
    const { airlineCodeID, flightNumber, note } = this.state;
    const { updateTripBasicInfo, trip_token } = this.props;
    if (airlineCodeID !== "" && flightNumber !== "") {
      updateTripBasicInfo(trip_token, {
        flight_str: `${airlineCodeID} ${flightNumber}`,
        note
      });
    }
    if (note !== "") {
      updateTripBasicInfo(trip_token, {
        note
      });
    }
    this.handleClose();
  };

  componentDidMount() {
    const { currFlightStr, note } = this.props;
    if (currFlightStr !== "" && currFlightStr !== " " && currFlightStr) {
      this.setState({
        airlineCodeID: currFlightStr.split(" ")[0],
        flightNumber: currFlightStr.split(" ")[1]
      });
    }
    if (note) {
      this.setState({ note });
    }
  }

  render() {
    const { airlineCodeID, flightNumber, note } = this.state;
    return (
      <Modal
        title={`Update Flight Info`}
        onClose={this.handleClose}
        position="center"
        getWidth={"467px"}
        getHeight={"400px"}
      >
        <div className="container">
          <div className="p-3">
            <div className="form-group my-4 ">
              <label className="text-main-color hm-text-14 font-weight-bold">Flight Number</label>
              <div className="input-group mt-2">
                <input
                  type="text"
                  className="form-control hm-input-height col-6 mr-3"
                  id="airlineCodeID"
                  placeholder="Airline Code"
                  value={airlineCodeID}
                  onChange={this.handleInputChange}
                />

                <input
                  type="text"
                  className="form-control hm-input-height ml-3 "
                  id="flightNumber"
                  placeholder="Flight Number"
                  value={flightNumber}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="form-group my-4 ">
              <label className="text-main-color hm-text-14 font-weight-bold">Note</label>
              <div className="input-group mt-2">
                <input
                  type="text"
                  className="form-control hm-input-height"
                  id="note"
                  placeholder="Note"
                  value={note}
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
