import React, { Component } from "react";
import { Modal, ImageLoaderModal, PreviewImageModal, AddingImage, GAutoComplete } from "../../../components/shared";
import { parseRate } from "../../../actions/utilities.action";
import alertify from "alertifyjs";

export default class VehicleAdding extends Component {
  state = {
    showImage: false,
    showPreview: false,
    customer_name: "",
    area: "+1",
    cell: "",
    img_path: ""
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

  saveToAddress = address => {
    this.setState({ company_address: address });
  };

  handleCreatingCompany = () => {
    const { img_path, icon_path, company_name, company_address, company_title, fee_rate } = this.state;
    if (
      img_path !== "" &&
      icon_path !== "" &&
      company_name !== "" &&
      company_address !== "" &&
      company_title !== "" &&
      fee_rate !== ""
    ) {
      this.props.parentProps.createACompany({
        realm_info: {
          company_name,
          img_path,
          icon_path,
          company_title
        },
        address_str: company_address[0].formatted_address,
        tribute_rate_token: fee_rate
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
    const { img_path, showImage, showPreview, customer_name, area, cell, email, address } = this.state;
    return (
      <div>
        {showImage && (
          <ImageLoaderModal
            onClose={() => this.setState({ showImage: false })}
            onImageUpload={this.handleImageUpload}
            title="Upload Image"
          />
        )}
        {showPreview && <PreviewImageModal image={img_path} onClose={() => this.setState({ showPreview: false })} />}

        <Modal title="Add Customer" onClose={this.handleClose} position="center" getWidth={"467px"} getHeight={"525px"}>
          <div className="container">
            <div className="p-3">
              <div className="form-group mb-4">
                <input
                  className="form-control hm-input-height mt-3"
                  name="customer_name"
                  id="customer_name"
                  placeholder={"Name"}
                  value={customer_name}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group input-group mb-4 d-flex">
                <input
                  type="text"
                  className="form-control hm-input-height col-2"
                  id="area"
                  placeholder="Area"
                  value={area}
                  onChange={this.handleInputChange}
                />

                <input
                  type="text"
                  className="form-control hm-input-height "
                  id="cell"
                  placeholder="Cell"
                  value={cell}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group mb-4">
                <input
                  type="email"
                  className="form-control hm-input-height "
                  name="email"
                  id="email"
                  placeholder={"Email"}
                  value={email}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group">
                <GAutoComplete getGoogleAddress={this.saveToAddress} />
              </div>

              <AddingImage
                title={"Logo:"}
                parentProps={{ img_url: img_path, handleShowPreview: this.handleShowPreview }}
                handleShowImage={this.handleShowImage}
              />

              <div className="form-group text-right pt-3">
                <button
                  className="button-main-background btn button-main-size px-4 text-white mr-3"
                  onClick={this.handleCreatingCompany}
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