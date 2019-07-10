import React, { Component } from "react";
import { Modal } from "../../../../components/shared";
import { convertLocalToUTC } from "../../../../actions/utilities.action";
import alertify from "alertifyjs";
import { TimePicker } from "antd";
import "./AlertInfoModal.css";
export default class AlertInfo extends Component {
  state = {
    eta: "",
    arrival: "",
    cob: ""
  };

  handleETAAlert = time => {
    console.log(time);
    this.setState({ eta: time._d });
  };
  handleArrivalAlert = time => {
    this.setState({ arrival: time._d });
  };
  handleCOBAlert = time => {
    this.setState({ cob: time._d });
  };

  handleCreateAlerts = async () => {
    const { eta, arrival, cob } = this.state;
    const { createAnAlertForATrip, trip_token } = this.props;
    if (eta !== "" && arrival !== "" && cob !== "") {
      createAnAlertForATrip(trip_token, {
        alert_list: [
          { type: 1, record_time: convertLocalToUTC(eta) },
          { type: 2, record_time: convertLocalToUTC(arrival) },
          { type: 3, record_time: convertLocalToUTC(cob) }
        ]
      });
      this.handleClose();
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
  };

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    return (
      <div>
        <Modal title="Add Customer" onClose={this.handleClose} position="center" getWidth={"467px"} getHeight={"420px"}>
          <div className="container">
            <div className="p-3">
              <div className="form-group my-4">
                <TimePicker onChange={this.handleETAAlert} />
              </div>

              <div className="form-group input-group mb-4">
                <TimePicker onChange={this.handleArrivalAlert} />
              </div>

              <div className="form-group input-group mb-4">
                <TimePicker onChange={this.handleCOBAlert} />
              </div>

              <div className="form-group text-right pt-3">
                <button
                  className="button-main-background btn button-main-size px-4 text-white mr-3"
                  onClick={this.handleCreateAlerts}
                >
                  Add
                </button>
                <button onClick={this.handleClose} className="btn button-main-size btn-outline-secondary px-4">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
