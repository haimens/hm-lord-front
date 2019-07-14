import React, { Component } from "react";
import { parseAmount } from "../../../../actions/utilities.action";

export default class TripCar extends Component {
  render() {
    const { basic_info, quote_list } = this.props;
    const { amount, car_type_name, img_path, max_capacity } = quote_list;
    return (
      <div
        className={`hm-pointer-cursor shadow-sm rounded-custom text-white mb-4 ${this.props.backgroundColor}`}
        onClick={() => this.props.handleCardBeenClicked()}
      >
        <div className="d-flex flex-column">
          <div className="px-4 py-3 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img
                src={img_path}
                style={{ width: "48px", height: "48px" }}
                alt="company"
                className="rounded-circle shadow-sm"
              />
              <div>
                <div className="ml-3 hm-text-15 font-weight-bold">{car_type_name}</div>
                <div className="ml-3 hm-text-13">{`Max ${max_capacity} passengers`}</div>
              </div>
            </div>
            <div className="ml-3 hm-text-15 font-weight-bold">{parseAmount(amount, 2)}</div>
          </div>
          {this.props.showPriceDetail && (
            <div>
              <div className="px-4">
                <div className=" border-bottom">
                  <div className="d-flex justify-content-between mb-2">
                    <div className="hm-text-12">Prefix</div>
                    <div className="hm-text-12 font-weight-bold">{parseAmount(quote_list.price_prefix, 2)}</div>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <div className="hm-text-12">Base</div>
                    <div className="hm-text-12 font-weight-bold">{parseAmount(basic_info.price_base, 2)}</div>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <div className="hm-text-12">Distance</div>
                    <div className="hm-text-12 font-weight-bold">{`${(basic_info.distance_value / 1000).toFixed(
                      2
                    )}  mi x ${parseAmount(basic_info.price_mile, 2)}`}</div>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div className="hm-text-12">Duration</div>
                    <div className="hm-text-12 font-weight-bold">{`${(basic_info.duration_value / 60).toFixed(
                      2
                    )} min x ${parseAmount(basic_info.price_minute, 2)}`}</div>
                  </div>
                </div>
              </div>
              <div className="px-4">
                <div className="d-flex justify-content-between mt-3">
                  <div className="hm-text-12">Total</div>
                  <div className="hm-text-12 font-weight-bold">{parseAmount(amount, 2)}</div>
                </div>
              </div>

              <div className="form-group text-right px-3 mt-3">
                <button className="border-white btn button-main-size text-white">Selected</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
