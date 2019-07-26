import React, { Component } from "react";
import { parseAmount, convertUTCtoLocal } from "../../../actions/utilities.action";
export default class WageList extends Component {
  render() {
    const { cdate, company_name, receipt, amount, status_str } = this.props.parentProps;
    return (
      <tr className="border-bottom">
        <td data-label="Created Date" className="items-height align-middle text-center">
          {convertUTCtoLocal(cdate)}
        </td>
        <td data-label="Company Name" className="items-height align-middle">
          <section className="text-center align-middle  hm-text-14 text-main-color font-weight-bold">
            {company_name}
          </section>
        </td>
        <td data-label="Invoice Number" className="items-height align-middle">
          <section className="text-center align-middle  hm-text-14 text-main-color font-weight-bold">
            {receipt ? receipt : "N/A"}
          </section>
        </td>
        <td data-label="Amount" className="items-height align-middle text-center">
          <section className="text-center align-middle hm-text-14 text-main-color">{parseAmount(amount, 2)}</section>
        </td>
        <td data-label="Status" className="items-height align-middle text-center">
          <section className="text-center align-middle hm-text-14 text-main-color d-flex justify-content-center">
            {status_str === "DISPATCHED" ? (
              <div className="d-flex align-items-center ">
                <i className="fas fa-circle success-text-color mr-3 pl-0" style={{ fontSize: "6px" }} />
                <div className="text-modal-color hm-text-14  font-weight-500">DISPATCHED</div>
              </div>
            ) : false === "ON-THE-WAY" ? (
              <div className="d-flex align-items-center ">
                <i className="fas fa-circle pending-text-color mr-3 pl-0" style={{ fontSize: "6px" }} />
                <div className="text-modal-color hm-text-14  font-weight-500">ON-THE-WAY</div>
              </div>
            ) : (
              <div className="d-flex align-items-center ">
                <i className="fas fa-circle text-purple mr-3 pl-0" style={{ fontSize: "6px" }} />
                <div className="text-modal-color hm-text-14  font-weight-500">{status_str}</div>
              </div>
            )}
          </section>
        </td>
      </tr>
    );
  }
}
