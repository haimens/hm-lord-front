import React, { Component } from "react";
import { Modal, ImageLoaderModal, PreviewImageModal, AddingImage } from "../../../components/shared";
import alertify from "alertifyjs";

export default class UpdatingDriverInfo extends Component {
  state = {
    showImage: false,
    showPreview: false,
    name: "",
    cell: "",
    email: "",
    img_path: "",
    license_num: "",
    identifier: "",
    area: "+1",
    status: ""
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

  handleStatusChange = () => {
    const { status } = this.state;
    if (status === 2) {
      this.setState({ status: 3 });
    } else if (status === 3) {
      this.setState({ status: 2 });
    }
  };

  handleUpdateADriverInLord = () => {
    const { name, cell, email, img_path, area, license_num, identifier, status } = this.state;
    if (name !== "" && cell !== "" && email !== "" && area !== "" && license_num !== "" && identifier !== "") {
      this.props.updateADriverInLord(this.props.driver_token, {
        name,
        img_path,
        cell: `${area} ${cell}`,
        email,
        license_num,
        identifier,
        status
      });
      this.handleClose();
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
  };

  saveToAddress = address => {
    this.setState({ company_address: address });
  };

  async componentDidMount() {
    const { name, cell, email, identifier, license_num, img_path, status } = this.props.driver_detail;
    this.setState({
      name,
      cell: cell.split(" ")[1],
      area: cell.split(" ")[0],
      email,
      identifier,
      license_num,
      img_path,
      status
    });
  }

  render() {
    const { img_path, showImage, showPreview, name, cell, email, area, license_num, identifier, status } = this.state;
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
          title="Update Driver"
          onClose={this.handleClose}
          position="center"
          getWidth={"467px"}
          getHeight={"500px"}
        >
          <div className="container">
            <div className="p-3">
              <div className="form-group mb-2">
                <label className="text-main-color font-weight-bold hm-text-14" htmlFor="Name">
                  Name
                </label>
                <input
                  className="form-control hm-input-height"
                  name="name"
                  id="name"
                  placeholder={"Name"}
                  value={name}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group input-group mb-2">
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
                <label className="text-main-color font-weight-bold hm-text-14" htmlFor="Name">
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
                <label className="text-main-color font-weight-bold hm-text-14" htmlFor="Name">
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
                <label className="text-main-color font-weight-bold hm-text-14" htmlFor="Name">
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

              <AddingImage
                title={"Logo:"}
                parentProps={{ img_url: img_path, handleShowPreview: this.handleShowPreview }}
                handleShowImage={this.handleShowImage}
              />

              <div className="bg-white align-items-center pt-3" style={{ height: "48px" }}>
                <div className="row">
                  <div className="col-2">
                    <label htmlFor="logo">Status</label>
                  </div>

                  <div className="col-2">
                    <button
                      type="button"
                      className={`btn btn-sm p-0 d-flex align-items-center align-middle ${
                        status === 2 ? "hm-bg-green-border" : "btn-outline-secondary "
                      }`}
                      onClick={this.handleStatusChange}
                      style={{ borderRadius: "12px", width: "88px", height: "24px" }}
                    >
                      <i className={`fas ${status === 2 && "hm-text-green"} fa-circle ml-1 pl-0`} />

                      {status === 2 ? (
                        <div className="d-flex ml-2 align-items-center hm-text-14 align-middle h-100 hm-text-green ">
                          Active
                        </div>
                      ) : (
                        <div className="d-flex ml-2 align-items-center hm-text-14 align-middle h-100">Inactive</div>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group text-right pt-3">
                <button
                  className="button-main-background btn button-main-size px-4 text-white mr-3"
                  onClick={this.handleUpdateADriverInLord}
                >
                  Update
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
