import React, { Component } from "react";
import { convertLocalToUTC } from "../../../../actions/utilities.action";

export default class CouponList extends Component {
  render() {
    const { key, value, cdate, setting_token } = this.props.general;
    console.log(this.props);
    return (
      <tr className="border-bottom">
        <td data-label="Created On" className="items-height align-middle">
          <section className="text-center align-middle ">{convertLocalToUTC(cdate)}</section>
        </td>
        <td data-label="Key" className="items-height align-middle text-center">
          <section className="text-center align-middle hm-text-14 text-main-color font-weight-bold">{key}</section>
        </td>
        <td data-label="Value" className="items-height align-middle">
          <section className="text-center align-middle ">{value}</section>
        </td>
        <td data-label="Edit" className="items-height align-middle text-center">
          <section className="text-center align-middle hm-text-14 text-main-color font-weight-bold">{123}</section>
        </td>
        <td data-label="Delete" className="items-height align-middle">
          <section className="text-center align-middle ">{123}</section>
        </td>
      </tr>
    );
  }
}
