import React, { Component } from "react";
import Modal from "./Modal";
import { parseRate, parseAmount } from "../../actions/utilities.action";
import alertify from "alertifyjs";

export default class CouponModal extends Component {
  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleClose = () => {
    this.props.onClose();
  };
  async componentDidMount() {}

  render() {
    return (
      <div>
        <Modal title="Add Coupon" onClose={this.handleClose} position="center" getWidth={"467px"} getHeight={"500px"}>
          <div className="p-2 py-4">
            {this.props.coupon_list_in_lord.record_list.map(
              (coupon, index) =>
                coupon.min_price < this.props.amount && (
                  <div className={"col-12 mb-4"} key={index}>
                    <div className="px-4 py-3 shadow-sm rounded-custom text-white coupon-card">
                      <div className="d-flex justify-content-between">
                        <div className="hm-text-16">{coupon.code}</div>
                        <div className="hm-text-16 text-danger">
                          <button
                            className="btn btn-sm bg-white"
                            onClick={() => this.props.handleAddingCoupon(coupon.code)}
                          >
                            Select
                          </button>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between">
                        {coupon.type === 1 ? (
                          <div className="hm-text-14 mt-1">{parseAmount(coupon.amount, 2)} OFF</div>
                        ) : (
                          <div className="hm-text-14 mt-1">{parseRate(coupon.rate)} OFF</div>
                        )}
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </Modal>
      </div>
    );
  }
}
