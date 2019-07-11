import React, { Component } from "react";
import { Modal } from "../../../../components/shared";
import alertify from "alertifyjs";

export default class CouponAdding extends Component {
  state = {
    showImage: false,
    showPreview: false,
    name: "",
    cell: "",
    email: "",
    username: "",
    img_path: "",
    license_num: "",
    identifier: "",
    rate: 70,
    area: "+1"
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleCreateACouponInLord = () => {
    const { name, cell, email, username, img_path, area, license_num, identifier, rate } = this.state;
    if (
      name !== "" &&
      cell !== "" &&
      email !== "" &&
      username !== "" &&
      area !== "" &&
      license_num !== "" &&
      identifier !== "" &&
      rate !== ""
    ) {
      this.props.createADriverInLord({
        name,
        img_path,
        cell: `${area} ${cell}`,
        email,
        username,
        license_num,
        identifier,
        rate: rate * 10
      });
      this.handleClose();
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
  };

  saveToAddress = address => {
    this.setState({ company_address: address });
  };

  async componentDidMount() {}

  render() {
    const { name, amount, minimal_amount } = this.state;
    return (
      <div>
        <Modal title="Add Coupon" onClose={this.handleClose} position="center" getWidth={"467px"} getHeight={"400px"}>
          <div className="container">
            <div className="p-3">
              <div className="form-group mb-4">
                <input
                  className="form-control hm-input-height mt-3"
                  name="name"
                  id="name"
                  placeholder={"Coupon Name"}
                  value={name}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group input-group mb-4 d-flex">
                <input
                  type="text"
                  className="form-control hm-input-height "
                  id="amount"
                  placeholder="Coupon Amount"
                  value={amount}
                  onChange={this.handleInputChange}
                />
                <div class="input-group-append">
                  <button class="btn primary-set-button text-purple input-addon-width" type="button">
                    $
                  </button>
                  <button class="btn button-main-background text-white input-addon-width" type="button">
                    %
                  </button>
                </div>
              </div>

              <div className="form-group mb-4">
                <input
                  type="text"
                  className="form-control hm-input-height "
                  name="minimal_amount"
                  id="minimal_amount"
                  placeholder={"Minimal Amount"}
                  value={minimal_amount}
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
