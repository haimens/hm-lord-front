import React, { Component } from "react";
import { convertUTCtoLocal } from "../../../actions/utilities.action";

export default class NotifficationAlertItem extends Component {
  handleTripAlert = trip_token => {
    this.props.history.push(`/trip/ongoing/detail/${trip_token}`);
  };
  muteAlertInfoInTrip = alert_token => {
    this.props.muteAlertInfoInTrip(alert_token, { status: 4 });
  };
  render() {
    const { driver_img_path, record_time, driver_name, type_str, trip_token, alert_token } = this.props.parentProps;

    return (
      <tr className="border-bottom">
        <td data-label="Driver Image" className="items-height align-middle">
          <img
            src={driver_img_path}
            alt="Customer"
            className="rounded-circle my-3"
            style={{ height: "36px", width: "36px" }}
          />
        </td>
        <td data-label="Alert Time" className="items-height align-middle test-center">
          <section className="test-center align-middle hm-text-14 text-main-color font-weight-bold">
            {convertUTCtoLocal(record_time)}
          </section>
        </td>
        <td data-label="Driver Name" className="items-height align-middle test-center">
          <section className="test-center align-middle hm-text-14 text-main-color font-weight-bold">
            {driver_name}
          </section>
        </td>
        <td data-label="Type" className="items-height align-middle test-center">
          <section className="test-center align-middle hm-text-14 text-main-color font-weight-bold">{type_str}</section>
        </td>
        <td data-label="Trip Detail" className="items-height align-middle test-center">
          <img
            src={`${process.env.PUBLIC_URL}/img/icon_detail.svg`}
            alt="Customer"
            className="rounded-circle my-3 hm-pointer-cursor"
            style={{ height: "25px", width: "25px" }}
            onClick={() => this.handleTripAlert(trip_token)}
          />
        </td>
        <td data-label="Trip Detail" className="items-height align-middle test-center">
          <i
            className="far fa-bell-slash purple-text hm-pointer-cursor"
            style={{ height: "25px", width: "25px" }}
            onClick={() => this.muteAlertInfoInTrip(alert_token)}
          />
        </td>
      </tr>
    );
  }
}
