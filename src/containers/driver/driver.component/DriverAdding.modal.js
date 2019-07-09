import React, { Component } from "react";
import { Modal, ImageLoaderModal, PreviewImageModal, AddingImage } from "../../../components/shared";
import { parseRate } from "../../../actions/utilities.action";
import alertify from "alertifyjs";

export default class DriverAdding extends Component {
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
    const { name, cell, email, username, img_path, area, license_num, identifier } = this.state;
    if (
      name !== "" &&
      cell !== "" &&
      email !== "" &&
      username !== "" &&
      area !== "" &&
      license_num !== "" &&
      identifier !== ""
    ) {
      this.props.createADriverInLord({
        name,
        img_path,
        cell: `${area} ${cell}`,
        email,
        username,
        license_num,
        identifier
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
    const { img_path, showImage, showPreview, name, cell, email, username, area, license_num, identifier } = this.state;
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

        <Modal title="Add Driver" onClose={this.handleClose} position="center" getWidth={"467px"} getHeight={"660px"}>
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
                  type="email"
                  className="form-control hm-input-height "
                  name="email"
                  id="email"
                  placeholder={"Email"}
                  value={email}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group mb-4">
                <input
                  type="text"
                  className="form-control hm-input-height "
                  name="license_num"
                  id="license_num"
                  placeholder={"License Number"}
                  value={license_num}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group mb-4">
                <input
                  type="cell"
                  className="form-control hm-input-height "
                  name="identifier"
                  id="identifier"
                  placeholder={"Identifier"}
                  value={identifier}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group mb-4">
                <input
                  type="cell"
                  className="form-control hm-input-height "
                  name="username"
                  id="username"
                  placeholder={"Username"}
                  value={username}
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
