import React, { Component } from "react";
import { parseAmount, convertUTCtoLocal } from "../../../actions/utilities.action";
export default class WageList extends Component {
  render() {
    const { cdate, amount, note } = this.props.parentProps;
    return (
      <tr className="border-bottom">
        <td data-label="Created Date" className="items-height align-middle text-center">
          {convertUTCtoLocal(cdate)}
        </td>

        <td data-label="Amount" className="items-height align-middle text-center">
          <section className="text-center align-middle hm-text-14 text-main-color">{parseAmount(amount, 2)}</section>
        </td>
        <td data-label="Company Name" className="items-height align-middle">
          <section className="text-center align-middle  hm-text-14 text-main-color font-weight-bold">{note}</section>
        </td>
      </tr>
    );
  }
}
