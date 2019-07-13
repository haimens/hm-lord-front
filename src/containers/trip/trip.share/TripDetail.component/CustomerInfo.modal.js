import React, { Component } from "react";
import { Modal, ImageLoaderModal, PreviewImageModal, AddingImage, GAutoComplete } from "../../../../components/shared";
import { parseRate } from "../../../../actions/utilities.action";
import alertify from "alertifyjs";

export default class BasicInfo extends Component {
  state = {
    showImage: false,
    showPreview: false,
    name: "",
    area: "+1",
    email: "",
    cell: "",
    img_path: "",
    address_str: ""
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
    this.setState({ address_str: address[0].formatted_address });
  };

  handleCreatingCompany = async () => {
    const { name, cell, area, email, img_path, address_str } = this.state;
    const { createACustomerInLord, createNewAddressInstance } = this.props;
    if (name !== "" && cell !== "" && area !== "" && email !== "") {
      const payload = await createNewAddressInstance({ address_str });
      createACustomerInLord({
        customer_info: {
          name,
          img_path,
          cell: `${area} ${cell}`,
          email
        },
        address_info: {
          address_token: payload.address_token
        }
      });
      this.handleClose();
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
  };

  render() {
    const { img_path, showImage, showPreview, name, cell, area, email } = this.state;
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
                  name="name"
                  id="name"
                  placeholder={"Name"}
                  value={name}
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
                  className="form-control hm-input-height mt-3"
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
