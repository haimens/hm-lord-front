import React, { Component } from "react";
import { Modal, ImageLoaderModal, PreviewImageModal, AddingImage } from "../../../components/shared";
import { parseRate, parseAmount } from "../../../actions/utilities.action";
import alertify from "alertifyjs";

export default class CouponModal extends Component {
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

  handleShowImage = () => {
    this.setState(states => ({ showImage: !states.showImage }));
  };
  handleShowPreview = () => {
    this.setState(states => ({ showPreview: !states.showPreview }));
  };

  handleImageUpload = img_path => {
    this.setState({ img_path: img_path });
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleCreateADriverInLord = () => {
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
    return (
      <div>
        <Modal title="Add Coupon" onClose={this.handleClose} position="center" getWidth={"467px"} getHeight={"500px"}>
          <div className="p-2 py-4">
            {this.props.coupon_list_in_lord.record_list.map((coupon, index) => (
              <div className={"col-12 mb-4"} key={index}>
                <div className="px-4 py-3 shadow-sm rounded-custom text-white coupon-card">
                  <div className="d-flex justify-content-between">
                    <div className="hm-text-16">New Member Discount</div>
                    <div className="hm-text-16 text-danger">
                      <button
                        className="btn btn-sm bg-white"
                        onClick={() => this.props.handleAddingCoupon(coupon.discount_token)}
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
            ))}
          </div>
        </Modal>
      </div>
    );
  }
}
