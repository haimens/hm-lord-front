import React, { Component } from "react";
import { Modal, ImageLoaderModal, PreviewImageModal, AddingImage } from "../../../../components/shared";
import alertify from "alertifyjs";

export default class VehicleAdding extends Component {
  state = {
    showImage: false,
    showPreview: false,
    name: "",
    prefix: "",
    capacity: ""
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
    const { name, cell, email, username, img_path, capacity, identifier, rate } = this.state;
    if (name !== "" && cell !== "" && email !== "" && username !== "" && identifier !== "" && rate !== "") {
      this.props.createADriverInLord({
        name,
        img_path,
        email,
        username,
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
    const { img_path, showImage, showPreview, name, prefix, capacity } = this.state;
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

        <Modal title="Add Driver" onClose={this.handleClose} position="center" getWidth={"467px"} getHeight={"449px"}>
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

              <div className="form-group mb-4">
                <input
                  type="text"
                  className="form-control hm-input-height "
                  name="prefix"
                  id="prefix"
                  placeholder={"Price Prefix"}
                  value={prefix}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group mb-4">
                <input
                  type="text"
                  className="form-control hm-input-height "
                  name="capacity"
                  id="capacity"
                  placeholder={"Max Capacity"}
                  value={capacity}
                  onChange={this.handleInputChange}
                />
              </div>

              <AddingImage
                title={"Logo:"}
                parentProps={{ img_url: img_path, handleShowPreview: this.handleShowPreview }}
                handleShowImage={this.handleShowImage}
              />

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
