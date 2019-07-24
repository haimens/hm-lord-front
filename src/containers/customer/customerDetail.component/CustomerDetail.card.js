import React, { Component } from "react";

class CustomerDetailCard extends Component {
  setCustomerChat = () => {
    const { name, customer_token } = this.props.customer_detail_in_lord;
    this.props.setCustomerChat({ customer_name: name, customer_token });
  };
  handleDetailButtonClicked = type => {
    this.props.handleDetailButtonClicked();
  };
  render() {
    const { name, cell, email, username, img_path, addr_str, note } = this.props.customer_detail_in_lord;
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
                  <div>
                    <img
                      src={`${process.env.PUBLIC_URL}/img/icon_chat.svg`}
                      alt="Customer"
                      className="rounded-circle hm-pointer-cursor mr-3"
                      style={{ height: "25px", width: "25px" }}
                      onClick={() => this.setCustomerChat()}
                    />
                    <img
                      src={`${process.env.PUBLIC_URL}/img/icon_edit.svg`}
                      alt="Customer"
                      className="rounded-circle hm-pointer-cursor"
                      style={{ height: "25px", width: "25px" }}
                      onClick={() => this.handleDetailButtonClicked()}
                    />
                  </div>
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
                  <div className="text-secondary-color font-weight-500 hm-text-14">Note</div>
                  <div className="hm-text-14 font-weight-bold">{note ? note : "N/A"}</div>
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
