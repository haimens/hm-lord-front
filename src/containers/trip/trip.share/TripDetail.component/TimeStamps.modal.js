import React, { Component } from "react";
import { Modal } from "../../../../components/shared";
import { convertLocalToUTC } from "../../../../actions/utilities.action";
import alertify from "alertifyjs";
import { TimePicker } from "antd";
import "./AlertInfoModal.css";
export default class TimeStaps extends Component {
  state = {
    start: "",
    arrival: "",
    cob: "",
    cad: ""
  };

  handleStartTime = time => {
    console.log(time);
    this.setState({ start: time._d });
  };
  handleArriveTime = time => {
    this.setState({ arrival: time._d });
  };
  handleCOBTime = time => {
    this.setState({ cob: time._d });
  };
  handleCADTime = time => {
    this.setState({ cad: time._d });
  };
  handleUpdateTimeStamps = async () => {
    const { start, arrival, cob, cad } = this.state;
    const { updateTripBasicInfo, trip_token } = this.props;
    if (start !== "" && arrival !== "" && cob !== "" && cad !== "") {
      updateTripBasicInfo(trip_token, {
        cob_time: convertLocalToUTC(cob),
        arrive_time: convertLocalToUTC(arrival),
        start_time: convertLocalToUTC(start),
        cad_time: convertLocalToUTC(cad)
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
        <Modal
          title="Edit Time Stamps"
          onClose={this.handleClose}
          position="center"
          getWidth={"467px"}
          getHeight={"480px"}
        >
          <div className="container">
            <div className="p-3">
              <div className="form-group my-4">
                <TimePicker onChange={this.handleStartTime} />
              </div>

              <div className="form-group input-group mb-4">
                <TimePicker onChange={this.handleArriveTime} />
              </div>

              <div className="form-group input-group mb-4">
                <TimePicker onChange={this.handleCOBTime} />
              </div>

              <div className="form-group input-group mb-4">
                <TimePicker onChange={this.handleCADTime} />
              </div>
              <div className="form-group text-right pt-3">
                <button
                  className="button-main-background btn button-main-size px-4 text-white mr-3"
                  onClick={this.handleUpdateTimeStamps}
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
      </div>
    );
  }
}
