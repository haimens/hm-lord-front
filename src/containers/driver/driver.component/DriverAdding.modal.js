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
    const {
      img_path,
      showImage,
      showPreview,
      name,
      cell,
      email,
      username,
      area,
      license_num,
      identifier,
      rate
    } = this.state;
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

        <Modal title="Add Driver" onClose={this.handleClose} position="center" getWidth={"467px"} getHeight={"785px"}>
          <div className="container">
            <div className="p-3">
              <div className="form-group mb-2 mt-1">
                <label className="text-main-color font-weight-bold hm-text-14" htmlFor="Name">
                  Name
                </label>
                <input
                  className="form-control hm-input-height "
                  name="name"
                  id="name"
                  placeholder={"Name"}
                  value={name}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group input-group mb-2 mt-1">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="Cell">
                  Cell
                </label>
                <div className="container-fluid">
                  <div className="row">
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
                      className="form-control hm-input-height col-10"
                      id="cell"
                      placeholder="Cell"
                      value={cell}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group mb-2">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="Email">
                  Email
                </label>
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

              <div className="form-group mb-2">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="license_num">
                  License Number
                </label>
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

              <div className="form-group mb-2">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="identifier">
                  Identifier
                </label>
                <input
                  type="text"
                  className="form-control hm-input-height "
                  name="identifier"
                  id="identifier"
                  placeholder={"Identifier"}
                  value={identifier}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group mb-2">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control hm-input-height "
                  name="username"
                  id="username"
                  placeholder={"Username"}
                  value={username}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group input-group mb-2">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="Payable Ratio">
                  Payable Ratio
                </label>
                <input
                  type="text"
                  className="form-control hm-input-height border-right-0"
                  name="rate"
                  id="rate"
                  placeholder={"Payable Ratio"}
                  value={rate}
                  onChange={this.handleInputChange}
                />
                <div className="input-group-append bg-white border-left-0">
                  <span className="input-group-text bg-white border-left-0 ">%</span>
                </div>
              </div>

              <AddingImage
                title={"Logo:"}
                parentProps={{ img_url: img_path, handleShowPreview: this.handleShowPreview }}
                handleShowImage={this.handleShowImage}
              />

              <div className="form-group text-right pt-2">
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
