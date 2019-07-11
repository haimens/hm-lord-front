import React, { Component } from "react";
import { parseAmount } from "../../../actions/utilities.action";

export default class TripCar extends Component {
  handleShowPriceDetail = () => {
    this.props.handleShowPriceDetail();
  };
  render() {
    const { showPriceDetail } = this.props;
    return (
      <div
        className={`hm-pointer-cursor shadow-sm rounded-custom text-white ${this.props.backgroundColor}`}
        onClick={this.handleShowPriceDetail}
      >
        <div className="d-flex flex-column">
          <div className="px-4 py-3 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img
                src={`${process.env.PUBLIC_URL}/img/hd.png`}
                style={{ width: "48px", height: "48px" }}
                alt="company"
                className="rounded-circle shadow-sm"
              />
              <div>
                <div className="ml-3 hm-text-15 font-weight-bold">Sedan</div>
                <div className="ml-3 hm-text-13">{`Max ${4} passengers`}</div>
              </div>
            </div>
            <div className="ml-3 hm-text-15 font-weight-bold">0.00</div>
          </div>
          {showPriceDetail && (
            <div>
              <div className="px-4">
                <div className=" border-bottom">
                  <div className="d-flex justify-content-between mb-2">
                    <div className="hm-text-12">Prefix</div>
                    <div className="hm-text-12 font-weight-bold">{parseAmount(0.0)}</div>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <div className="hm-text-12">Base</div>
                    <div className="hm-text-12 font-weight-bold">{parseAmount(0.0)}</div>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <div className="hm-text-12">Distance</div>
                    <div className="hm-text-12 font-weight-bold">{parseAmount(0.0)}</div>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div className="hm-text-12">Duration</div>
                    <div className="hm-text-12 font-weight-bold">{parseAmount(0.0)}</div>
                  </div>
                </div>
              </div>
              <div className="px-4">
                <div className="d-flex justify-content-between mt-3">
                  <div className="hm-text-12">Total</div>
                  <div className="hm-text-12 font-weight-bold">{parseAmount(0.0)}</div>
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
