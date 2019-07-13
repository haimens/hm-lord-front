import React, { Component } from "react";
import { parseAmount } from "../../../../actions/utilities.action";
export default class CouponList extends Component {
  render() {
    const { onClick, parentProps } = this.props;
    const { img_path, max_capacity, price_prefix, car_type_token, name } = parentProps;
    return (
      <tr className="border-bottom">
        <td data-label="Image" className="align-middle items-height">
          <section className="text-lg-center text-right text-main-color hm-text-14">
            <img src={img_path} alt="Company Logo" className="rounded-circle" height={"32px"} width={"32px"} />
          </section>
        </td>
        <td data-label="Last Updated" className="align-middle items-height">
          <section className="text-lg-center text-right text-main-color font-weight-bold hm-text-14">{name}</section>
        </td>
        <td data-label="Last Updated" className="align-middle items-height">
          <section className="text-lg-center text-right text-main-color font-weight-bold hm-text-14">
            {parseAmount(price_prefix, 2)}
          </section>
        </td>
        <td data-label="Company Name" className="align-middle items-height">
          <section className="text-lg-center text-right text-main-color font-weight-bold hm-text-14">
            {max_capacity}
          </section>
        </td>

        <td data-label="Detail" className="align-middle items-height">
          <section className="text-lg-center text-right text-main-color hm-text-14">
            <button
              className="btn btn-md font-weight-500 hm-text-14 text-primary"
              onClick={() => onClick(car_type_token)}
            >
              <img src={`${process.env.PUBLIC_URL}/img/icon_delete.svg`} alt="delete" />
            </button>
          </section>
        </td>
      </tr>
    );
  }
}
