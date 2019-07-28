import React, { Component } from "react";
import { Modal, ImageLoaderModal, PreviewImageModal, AddingImage } from "../../../../components/shared";
import alertify from "alertifyjs";

export default class VehicleAdding extends Component {
  state = {
    showImage: false,
    showPreview: false,
    name: "",
    price_prefix: "",
    max_capacity: ""
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
    const { name, price_prefix, img_path, max_capacity } = this.state;
    if (name !== "" && price_prefix !== "" && max_capacity !== "" && img_path !== "") {
      this.props.createACarTypeInLord({
        name,
        img_path,
        price_prefix: price_prefix * 100,
        max_capacity
      });
      this.handleClose();
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
  };

  saveToAddress = address => {
    this.setState({ company_address: address });
  };

  render() {
    const { img_path, showImage, showPreview, name, price_prefix, max_capacity } = this.state;
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

        <Modal
          title="Add Vehicle Type"
          onClose={this.handleClose}
          position="center"
          getWidth={"467px"}
          getHeight={"510px"}
        >
          <div className="container">
            <div className="p-3">
              <div className="form-group mb-4">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="Name">
                  Name
                </label>
                <input
                  className="form-control hm-input-height mt-3"
                  name="name"
                  id="name"
                  placeholder={"Name"}
                  value={name}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group mb-4">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="Price Prefix">
                  Price Prefix
                </label>
                <input
                  type="text"
                  className="form-control hm-input-height "
                  name="price_prefix"
                  id="price_prefix"
                  placeholder={"Price Prefix"}
                  value={price_prefix}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group mb-4">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="Max Capacity">
                  Max Capacity
                </label>
                <input
                  type="text"
                  className="form-control hm-input-height "
                  name="max_capacity"
                  id="max_capacity"
                  placeholder={"Max Capacity"}
                  value={max_capacity}
                  onChange={this.handleInputChange}
                />
              </div>

              <div>
                <AddingImage
                  title={"Image:"}
                  parentProps={{ img_url: img_path, handleShowPreview: this.handleShowPreview }}
                  handleShowImage={this.handleShowImage}
                />
              </div>

              <div className="form-group text-right pt-3">
                <button
                  className="button-main-background btn button-main-size px-4 text-white mr-3"
                  onClick={this.handleCreateADriverInLord}
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
