import React, { Component } from "react";
import Modal from "./Modal";
import { parseRate, parseAmount } from "../../actions/utilities.action";

export default class CouponModal extends Component {
  state = {
    keywords: ""
  };
  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleClose = () => {
    this.props.onClose();
  };
  handleSubmit = e => {
    if (e) e.preventDefault();
    const { keywords } = this.state;
    this.props.findCouponListInLord({ keywords });
  };
  async componentDidMount() {}

  render() {
    return (
      <div>
        <Modal title="Add Coupon" onClose={this.handleClose} position="center" getWidth={"467px"} getHeight={"500px"}>
          <div className="border-bottom-custom " style={{ height: "60px" }}>
            <div className="input-group px-1">
              <div className="input-group-prepend col-1 p-0 d-flex justify-content-center">
                <span className="input-group-text border-0 bg-white">
                  <i className="fas fa-search" />
                </span>
              </div>
              <form className="col" onSubmit={this.handleSubmit}>
                <input
                  className="form-control border-0 hm-text-14"
                  style={{ height: "58px" }}
                  name="keywords"
                  id="keywords"
                  value={this.state.keywords}
                  placeholder={"Search"}
                  onChange={this.handleInputChange}
                />
              </form>
            </div>
          </div>
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
