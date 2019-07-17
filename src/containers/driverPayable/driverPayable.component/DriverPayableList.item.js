import React, { Component } from "react";
import { parseAmount } from "../../../actions/utilities.action";
export default class WageList extends Component {
  render() {
    const { handlePayableItemClicked, parentProps } = this.props;
    const { payable, img_path, name, driver_token } = parentProps;
    return (
      <tr className="border-bottom">
        <td data-label="Driver Img" className="items-height align-middle">
          <img className="rounded-circle" style={{ height: "36px", width: "36px" }} src={img_path} alt="avatar" />
        </td>
        <td data-label="Driver Name" className="items-height align-middle">
          <section className="text-center align-middle  hm-text-14 text-main-color font-weight-bold">{name}</section>
        </td>

        <td data-label="Amount" className="items-height align-middle text-center">
          <section className="text-center align-middle hm-text-14 text-main-color">{parseAmount(payable, 2)}</section>
        </td>
        <td data-label="Driver Detail" className="items-height align-middle ">
          <img
            className="rounded-circle hm-pointer-cursor"
            style={{ height: "25px", width: "25px" }}
            src={`${process.env.PUBLIC_URL}/img/icon_detail.svg`}
            alt="avatar"
            onClick={() => handlePayableItemClicked(driver_token)}
          />
        </td>
      </tr>
    );
  }
}
