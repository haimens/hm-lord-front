import React, { Component } from "react";
import { Modal } from "../../../../components/shared";
import { convertLocalToUTC, convertUTCtoLocal } from "../../../../actions/utilities.action";
import { DatePicker } from "antd";
import "./AlertInfoModal.css";
import moment from "moment";
export default class AlertInfo extends Component {
  state = {
    eta: "",
    arrival: "",
    cob: ""
  };
  handleETAAlert = time => {
    this.setState({ eta: time._d });
  };
  handleArrivalAlert = time => {
    this.setState({ arrival: time._d });
  };
  handleCOBAlert = time => {
    this.setState({ cob: time._d });
  };

  handleCreateAlerts = async () => {
    const { createAnAlertForATrip, trip_token } = this.props;
    const { eta, arrival, cob } = this.state;

    createAnAlertForATrip(trip_token, {
      alert_list: [
        {
          type: 1,
          record_time: convertLocalToUTC(eta)
        },
        {
          type: 2,
          record_time: convertLocalToUTC(arrival)
        },
        {
          type: 3,
          record_time: convertLocalToUTC(cob)
        }
      ]
    });
    this.handleClose();
  };

  handleClose = () => {
    this.props.onClose();
  };

  componentDidMount() {
    const { pickup_time } = this.props;
    this.setState({
      eta: moment(
        convertUTCtoLocal(
          moment(pickup_time)
            .subtract(1, "hour")
            .format("YYYY-MM-DD HH:mm")
        )
      ),
      arrival: moment(
        convertUTCtoLocal(
          moment(pickup_time)
            .subtract(5, "minute")
            .format("YYYY-MM-DD HH:mm")
        )
      ),
      cob: moment(
        convertUTCtoLocal(
          moment(pickup_time)
            .add(5, "minute")
            .format("YYYY-MM-DD HH:mm")
        )
      )
    });
  }

  render() {
    const { pickup_time } = this.props;

    return (
      <div>
        <Modal
          title="Create Alert Information"
          onClose={this.handleClose}
          position="center"
          getWidth={"467px"}
          getHeight={"460px"}
        >
          <div className="container">
            <div className="p-3">
              <div className="form-group mt-2">
                <label className="font-weight-500 hm-text-14 text-secondary-color" htmlFor="eta">
                  ETA Alert Setting
                </label>
                <DatePicker
                  showTime
                  defaultValue={moment(
                    convertUTCtoLocal(
                      moment(pickup_time)
                        .subtract(1, "hour")
                        .format("YYYY-MM-DD HH:mm")
                    )
                  )}
                  onChange={this.handleETAAlert}
                />
              </div>

              <div className="form-group mb-4">
                <label className="font-weight-500 hm-text-14 text-secondary-color" htmlFor="eta">
                  Arrival Alert Setting
                </label>
                <DatePicker
                  showTime
                  defaultValue={moment(
                    convertUTCtoLocal(
                      moment(pickup_time)
                        .subtract(5, "minute")
                        .format("YYYY-MM-DD HH:mm")
                    )
                  )}
                  onChange={this.handleArrivalAlert}
                />
              </div>

              <div className="form-group mb-4">
                <label className="font-weight-500 hm-text-14 text-secondary-color" htmlFor="eta">
                  COB Alert Setting
                </label>
                <DatePicker
                  showTime
                  defaultValue={moment(
                    convertUTCtoLocal(
                      moment(pickup_time)
                        .add(5, "minute")
                        .format("YYYY-MM-DD HH:mm")
                    )
                  )}
                  onChange={this.handleCOBAlert}
                />
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
