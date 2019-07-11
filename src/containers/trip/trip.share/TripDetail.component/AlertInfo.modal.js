import React, { Component } from "react";
import { Modal } from "../../../../components/shared";
import { convertLocalToUTC } from "../../../../actions/utilities.action";
import alertify from "alertifyjs";
import { TimePicker } from "antd";
import "./AlertInfoModal.css";
import moment from "moment";
export default class AlertInfo extends Component {
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
    const { createAnAlertForATrip, trip_token, pickup_time } = this.props;

    if (eta !== "" && arrival !== "" && cob !== "") {
      createAnAlertForATrip(trip_token, {
        alert_list: [
          {
            type: 1,
            record_time: convertLocalToUTC(
              moment(pickup_time)
                .subtract(1, "hour")
                .format("YYYY-MM-DD HH:mm")
            )
          },
          {
            type: 2,
            record_time: convertLocalToUTC(
              moment(pickup_time)
                .subtract(5, "minute")
                .format("YYYY-MM-DD HH:mm")
            )
          },
          {
            type: 3,
            record_time: convertLocalToUTC(
              moment(pickup_time)
                .add(5, "minute")
                .format("YYYY-MM-DD HH:mm")
            )
          }
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
    const { pickup_time } = this.props;

    return (
      <div>
        <Modal
          title="Create Alert Information"
          onClose={this.handleClose}
          position="center"
          getWidth={"467px"}
          getHeight={"420px"}
        >
          <div className="container">
            <div className="p-3">
              <div className="form-group my-4">
                <label htmlFor="eta">ETA Alert Setting</label>
                <div>
                  {convertLocalToUTC(
                    moment(pickup_time)
                      .subtract(1, "hour")
                      .format("YYYY-MM-DD HH:mm")
                  )}
                </div>
              </div>

              <div className="form-group mb-4">
                <label htmlFor="eta">Arrival Alert Setting</label>
                <div>
                  {convertLocalToUTC(
                    moment(pickup_time)
                      .subtract(5, "minute")
                      .format("YYYY-MM-DD HH:mm")
                  )}
                </div>
              </div>

              <div className="form-group mb-4">
                <label htmlFor="eta">COB Alert Setting</label>
                <div>
                  {convertLocalToUTC(
                    moment(pickup_time)
                      .add(5, "minute")
                      .format("YYYY-MM-DD HH:mm")
                  )}
                </div>
              </div>

              <div className="form-group text-right pt-3">
                <button
                  className="button-main-background btn button-main-size px-4 text-white mr-3"
                  onClick={this.handleCreateAlerts}
                >
                  Create
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
