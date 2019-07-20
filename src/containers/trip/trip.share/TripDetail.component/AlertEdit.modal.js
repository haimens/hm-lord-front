import React, { Component } from "react";
import { Modal } from "../../../../components/shared";
import { convertLocalToUTC, convertUTCtoLocal } from "../../../../actions/utilities.action";
import alertify from "alertifyjs";
import { TimePicker } from "antd";
import "./AlertInfoModal.css";
import moment from "moment";
export default class AlertInfo extends Component {
  state = {
    currentTime: "",
    type: 2
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleCreateAlerts = async () => {
    const { editAlertInfoInTrip, alert_token, trip_token } = this.props;
    const { currentTime, type } = this.state;
    if (currentTime !== "" && type !== "") {
      editAlertInfoInTrip(trip_token, alert_token, { record_time: convertLocalToUTC(currentTime), status: type });
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
    this.handleClose();
  };

  handleWhenTimeChanged = time => {
    this.setState({ currentTime: time._d });
  };

  handleClose = () => {
    this.props.onClose();
  };

  async componentDidMount() {
    const { alert_type, alert_list } = this.props;
    await alert_list.map(alert => {
      if (alert_type.includes(alert.type_str)) {
        this.setState({ currentTime: alert.record_time });
      }
      return null;
    });
  }
  render() {
    const { alert_type } = this.props;
    const { type, currentTime } = this.state;

    return (
      <div>
        <Modal
          title={`Edit ${alert_type}`}
          onClose={this.handleClose}
          position="center"
          getWidth={"467px"}
          getHeight={"420px"}
        >
          <div className="container">
            <div className="p-3">
              <div className="form-group my-4">
                <label className="font-weight-500 hm-text-14 text-secondary-color" htmlFor="eta">
                  {alert_type}
                </label>
                {currentTime !== "" && (
                  <TimePicker
                    defaultValue={moment(convertUTCtoLocal(currentTime))}
                    onChange={this.handleWhenTimeChanged}
                  />
                )}
              </div>

              <div className="form-group  my-4">
                <label className="font-weight-500 hm-text-14 text-secondary-color" htmlFor="eta">
                  Type
                </label>
                <select
                  value={type}
                  id="type"
                  className="custom-select hm-input-height"
                  onChange={this.handleInputChange}
                >
                  <option value="2">Active</option>
                  <option value="3">Triggered</option>
                  <option value="4">Muted</option>
                </select>
              </div>

              <div className="form-group text-right pt-3">
                <button
                  className="button-main-background btn button-main-size px-4 text-white mr-3"
                  onClick={this.handleCreateAlerts}
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
