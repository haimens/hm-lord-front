import React, { Component } from "react";
import { GMapFlag } from "../../../components/shared";
import { parseRate, parseAmount } from "../../../actions/utilities.action";

class CustomerDetailCard extends Component {
  handleDetailButtonClicked = type => {
    this.props.handleDetailButtonClicked();
  };
  render() {
    const { name, cell, email, username, img_path, addr_str } = this.props.customer_detail_in_lord;
    return (
      <div className="bg-white rounded-custom shadow-sm">
        <div className="row" style={{ padding: "40px" }}>
          <div className="col-lg-2 col-12 mb-4 d-flex justify-content-center">
            <img className="rounded-circle" style={{ height: "90px", width: "90px" }} src={img_path} alt="avatar" />
          </div>
          <div className="col-lg-8 col-12">
            <div className="row text-modal-color">
              <div className="col-lg-8 col-12 mb-4">
                <div className="d-flex justify-content-between align-items-center px-3 pb-3">
                  <div className="hm-text-16 font-weight-bold">Basic Information</div>
                  <button
                    className="rounded-circle bg-white company-detail-button d-flex justify-content-center align-items-center"
                    onClick={() => this.handleDetailButtonClicked()}
                  >
                    <i className="fas fa-pencil-alt" style={{ color: "#fb6240" }} />
                  </button>
                </div>
                <div className="mb-4 px-3">
                  <div className="text-secondary-color font-weight-500 hm-text-14">Name</div>
                  <div className="hm-text-14 font-weight-bold">{name}</div>
                </div>
                <div className="mb-4 px-3">
                  <div className="text-secondary-color font-weight-500 hm-text-14">Cell</div>
                  <div className="hm-text-14 font-weight-bold">{cell}</div>
                </div>
                <div className="mb-4 px-3">
                  <div className="text-secondary-color font-weight-500 hm-text-14">Email</div>
                  <div className="hm-text-14 font-weight-bold">{email}</div>
                </div>
                <div className="mb-4 px-3">
                  <div className="text-secondary-color font-weight-500 hm-text-14">Username</div>
                  <div className="hm-text-14 font-weight-bold">{username}</div>
                </div>
                <div className="mb-4 px-3">
                  <div className="text-secondary-color font-weight-500 hm-text-14">Address</div>
                  <div className="hm-text-14 font-weight-bold">{addr_str || "N/A"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerDetailCard;
