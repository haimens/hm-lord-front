import React, { Component } from "react";
import { parseAmount, convertUTCtoLocal, parseRate } from "../../../../actions/utilities.action";
export default class CouponList extends Component {
  render() {
    const { onClick, parentProps } = this.props;
    const { cdate, amount, min_price, rate, type, discount_token, available_usage, code } = parentProps;
    return (
      <tr className="border-bottom">
        <td data-label="Last Updated" className="align-middle items-height">
          <section className="text-lg-center text-right text-main-color font-weight-bold hm-text-14">
            {convertUTCtoLocal(cdate)}
          </section>
        </td>
        <td data-label="Code" className="align-middle items-height">
          <section className="text-lg-center text-right text-main-color font-weight-bold hm-text-14">{code}</section>
        </td>

        {type === 1 ? (
          <td data-label="Last Updated" className="align-middle items-height">
            <section className="text-lg-center text-right text-main-color font-weight-bold hm-text-14">
              {`${parseAmount(amount, 2)} OFF`}
            </section>
          </td>
        ) : (
          <td data-label="Last Updated" className="align-middle items-height">
            <section className="text-lg-center text-right text-main-color font-weight-bold hm-text-14">
              {`${parseRate(rate)} OFF`}
            </section>
          </td>
        )}

        <td data-label="Company Name" className="align-middle items-height">
          <section className="text-lg-center text-right text-main-color font-weight-bold hm-text-14">
            {parseAmount(min_price, 2)}
          </section>
        </td>
        <td data-label="Company Name" className="align-middle items-height">
          <section className="text-lg-center text-right text-main-color font-weight-bold hm-text-14">
            {available_usage}
          </section>
        </td>

        <td data-label="Detail" className="align-middle items-height">
          <section className="text-lg-center text-right text-main-color hm-text-14">
            <button
              className="btn btn-md font-weight-500 hm-text-14 text-primary"
              onClick={() => onClick(discount_token)}
            >
              <img src={`${process.env.PUBLIC_URL}/img/icon_delete.svg`} alt="delete" />
            </button>
          </section>
        </td>
      </tr>
    );
  }
}
