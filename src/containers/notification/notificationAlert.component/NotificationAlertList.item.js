import React, { Component } from "react";
import { convertUTCtoLocal } from "../../../actions/utilities.action";

export default class WageList extends Component {
  render() {
    const { driver_img_path, record_time, driver_name, status_str, trip_token } = this.props.parentProps;

    return (
      <tr className="border-bottom">
        <td data-label="Created On" className="items-height align-middle">
          <img
            src={driver_img_path}
            alt="Customer"
            className="rounded-circle my-3"
            style={{ height: "36px", width: "36px" }}
          />
        </td>
        <td data-label="Log Note" className="items-height align-middle test-center">
          <section className="test-center align-middle hm-text-14 text-main-color font-weight-bold">
            {convertUTCtoLocal(record_time)}
          </section>
        </td>
        <td data-label="Log Note" className="items-height align-middle test-center">
          <section className="test-center align-middle hm-text-14 text-main-color font-weight-bold">
            {driver_name}
          </section>
        </td>
        <td data-label="Log Note" className="items-height align-middle test-center">
          <section className="test-center align-middle hm-text-14 text-main-color font-weight-bold">
            {status_str}
          </section>
        </td>
        <td data-label="Log Note" className="items-height align-middle test-center">
          <img
            src={`${process.env.PUBLIC_URL}/img/icon_chat.svg`}
            alt="Customer"
            className="rounded-circle my-3 hm-pointer-cursor"
            style={{ height: "25px", width: "25px" }}
            onClick={() => this.handleChatWithCustomer(trip_token)}
          />
        </td>
      </tr>
    );
  }
}
