import React, { Component } from "react";
import { convertLocalToUTC } from "../../../actions/utilities.action";
export default class WageList extends Component {
  handleChatWithCustomer = customer_token => {
    this.props.handleChatWithCustomer(customer_token);
  };
  render() {
    const { message, img_path, cdate, username, customer_token } = this.props.parentProps;
    return (
      <tr className="border-bottom">
        <td data-label="Created On" className="items-height align-middle">
          <img
            src={img_path}
            alt="Customer"
            className="rounded-circle my-3"
            style={{ height: "36px", width: "36px" }}
          />
        </td>
        <td data-label="Log Note" className="items-height align-middle test-center">
          <section className="test-center align-middle hm-text-14 text-main-color font-weight-bold">
            {convertLocalToUTC(cdate)}
          </section>
        </td>
        <td data-label="Log Note" className="items-height align-middle test-center">
          <section className="test-center align-middle hm-text-14 text-main-color font-weight-bold">{username}</section>
        </td>
        <td data-label="Log Note" className="items-height align-middle test-center">
          <section className="test-center align-middle hm-text-14 text-main-color font-weight-bold">{message}</section>
        </td>
        <td data-label="Log Note" className="items-height align-middle test-center">
          <img
            src={`${process.env.PUBLIC_URL}/img/icon_chat.svg`}
            alt="Customer"
            className="rounded-circle my-3 hm-pointer-cursor"
            style={{ height: "25px", width: "25px" }}
            onClick={() => this.handleChatWithCustomer(customer_token)}
          />
        </td>
      </tr>
    );
  }
}
