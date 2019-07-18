import React, { Component } from "react";
import { convertLocalToUTC } from "../../../actions/utilities.action";
export default class WageList extends Component {
  handleChatWithCustomer = (customer_token, name) => {
    this.props.handleChatWithCustomer(customer_token, name);
  };
  render() {
    const { message, img_path, cdate, customer_token, is_read, name } = this.props.parentProps;
    return (
      <tr className="border-bottom">
        <td data-label="Created On" className={`items-height align-middle p-0`}>
          <div className={` pl-0 ${is_read === 0 && "border-left-purple"}`}>
            <img
              src={img_path}
              alt="Customer"
              className="rounded-circle my-3 "
              style={{ height: "36px", width: "36px" }}
            />
          </div>
        </td>
        <td data-label="Log Note" className="items-height align-middle test-center">
          <section
            className={`test-center align-middle hm-text-14 text-main-color font-weight-bold ${
              is_read === 0 ? "text-purple" : "text-main-color"
            }`}
          >
            {convertLocalToUTC(cdate)}
          </section>
        </td>
        <td data-label="Log Note" className="items-height align-middle test-center">
          <section
            className={`test-center align-middle hm-text-14 text-main-color font-weight-bold ${
              is_read === 0 ? "text-purple" : "text-main-color"
            }`}
          >
            {name}
          </section>
        </td>
        <td data-label="Log Note" className="items-height align-middle test-center">
          <section
            className={`test-center align-middle hm-text-14 text-main-color font-weight-bold ${
              is_read === 0 ? "text-purple" : "text-main-color"
            }`}
          >
            {message}
          </section>
        </td>
        <td data-label="Log Note" className="items-height align-middle test-center">
          <img
            src={`${process.env.PUBLIC_URL}/img/icon_chat.svg`}
            alt="Customer"
            className="rounded-circle my-3 hm-pointer-cursor"
            style={{ height: "25px", width: "25px" }}
            onClick={() => this.handleChatWithCustomer(customer_token, name)}
          />
        </td>
      </tr>
    );
  }
}
