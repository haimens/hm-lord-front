import React, { Component } from "react";
import { Modal } from "../../../../components/shared";
import alertify from "alertifyjs";
import { DatePicker } from "antd";
import { convertLocalToUTC } from "../../../../actions/utilities.action";
export default class CouponAdding extends Component {
  state = {
    showImage: false,
    showPreview: false,
    vdate: "",
    amount: "",
    type: 1,
    min_price: "",
    available_usage: "",
    code: ""
  };

  handleSetType = type => {
    this.setState({ type });
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleCreateACouponInLord = () => {
    const { vdate, amount, type, min_price, available_usage, code } = this.state;
    if ((vdate !== "", amount !== "", type !== "", min_price !== "", available_usage !== "", code !== "")) {
      if (type === 1) {
        this.props.createACouponInLord({
          vdate: convertLocalToUTC(vdate),
          amount: amount * 100,
          type,
          min_price: min_price * 100,
          available_usage,
          code
        });
      }
      if (type === 2) {
        this.props.createACouponInLord({
          vdate: convertLocalToUTC(vdate),
          rate: amount * 10,
          type,
          min_price: min_price * 100,
          available_usage,
          code
        });
      }
      this.handleClose();
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
  };

  saveToAddress = address => {
    this.setState({ company_address: address });
  };

  handleDatePicker = vdate => {
    this.setState({ vdate });
  };

  async componentDidMount() {}

  render() {
    const { code, amount, min_price, available_usage, type } = this.state;
    return (
      <div>
        <Modal title="Add Coupon" onClose={this.handleClose} position="center" getWidth={"467px"} getHeight={"500px"}>
          <div className="container">
            <div className="p-3">
              <div className="form-group mb-4">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="Coupon Code">
                  Coupon Code
                </label>
                <input
                  className="form-control hm-input-height mt-3"
                  id="code"
                  placeholder={"Coupon Code"}
                  value={code}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group mb-4">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="Expiration Date">
                  Expiration Date
                </label>
                <DatePicker placeholder={"Expiration Date"} onChange={this.handleDatePicker} />
              </div>
              <div className="form-group input-group mb-4 d-flex">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="Coupon Amount">
                  Coupon Amount
                </label>
                <input
                  type="number"
                  className="form-control hm-input-height "
                  id="amount"
                  placeholder="Coupon Amount"
                  value={amount}
                  onChange={this.handleInputChange}
                />
                <div className="input-group-append">
                  <button
                    className={`btn text-purple input-addon-width ${
                      type === 1 ? "button-main-background text-white" : "primary-set-button "
                    }`}
                    type="button"
                    onClick={() => this.handleSetType(1)}
                  >
                    $
                  </button>
                  <button
                    className={`btn text-purple input-addon-width ${
                      type === 2 ? "button-main-background text-white" : "primary-set-button "
                    }`}
                    type="button"
                    onClick={() => this.handleSetType(2)}
                  >
                    %
                  </button>
                </div>
              </div>

              <div className="form-group mb-4">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="Minimal Amount">
                  Minimal Amount
                </label>
                <input
                  type="number"
                  className="form-control hm-input-height "
                  name="min_price"
                  id="min_price"
                  placeholder={"Minimal Amount"}
                  value={min_price}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group mb-4">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="Available Usage">
                  Available Usage
                </label>
                <input
                  type="number"
                  className="form-control hm-input-height "
                  name="available_usage"
                  id="available_usage"
                  placeholder={"Available Usage"}
                  value={available_usage}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group text-right pt-3">
                <button
                  className="button-main-background btn button-main-size px-4 text-white mr-3"
                  onClick={this.handleCreateACouponInLord}
                >
                  Add
                </button>
                <button onClick={this.handleClose} className="btn button-main-size btn-outline-secondary px-4">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
