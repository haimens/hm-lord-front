import React, { Component } from "react";
import { ImageLoaderModal, PreviewImageModal, ImageInModal, Modal } from "../../../components/shared";
export default class DrvierCreation extends Component {
  state = {
    showImage: false,
    showPreview: false,
    img_url: "",
    driver_name: "",
    driver_cell: "",
    driver_email: "",
    driver_username: "",
    status: ""
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleShowImage = () => {
    this.setState(states => ({ showImage: !states.showImage }));
  };

  handleClose = () => {
    this.props.onClose();
  };
  handleImageUpload = img_path => {
    this.setState({ img_url: img_path });
  };
  render() {
    const {
      showImage,
      showPreview,
      img_url,
      driver_name,
      driver_cell,
      driver_email,
      driver_username,
      status
    } = this.state;
    return (
      <Modal
        title="Add Company Admin"
        onClose={this.handleClose}
        position="center"
        getWidth={"519px"}
        getHeight={"482px"}
        zIndex="1080"
      >
        {showImage && (
          <ImageLoaderModal
            onClose={() => this.setState({ showImage: false })}
            onImageUpload={this.handleImageUpload}
            title="上传照片"
          />
        )}
        {showPreview && <PreviewImageModal image={img_url} onClose={() => this.setState({ showPreview: false })} />}
        <div className="container my-3">
          <div className="form-group">
            <label htmlFor="driver_name">Name</label>
            <input
              className="form-control"
              name="driver_name"
              id="driver_name"
              value={driver_name}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="driver_cell">Cell</label>
            <input
              type="email"
              className="form-control"
              name="driver_cell"
              id="driver_cell"
              value={driver_cell}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="driver_email">Email</label>
            <input
              type="cell"
              className="form-control"
              name="driver_email"
              id="driver_email"
              value={driver_email}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="driver_username">Username</label>
            <input
              type="cell"
              className="form-control"
              name="driver_username"
              id="driver_username"
              value={driver_username}
              onChange={this.handleInputChange}
            />
          </div>
          <ImageInModal
            parentProps={{ img_url, showPreview }}
            title={"Profile"}
            handleShowImage={this.handleShowImage}
          />
          <div className="row my-2">
            <div className="col-2">Status:</div>
            <div className="col-9">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="option1"
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Active
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="option2"
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Inactive
                </label>
              </div>
            </div>
          </div>
          <div className="form-group text-center mt-3">
            <button className="hm-bg-green btn btn-sm px-4 text-white mr-3" onClick={this.handleSubmit}>
              Add
            </button>
            <button onClick={this.handleClose} className="btn btn-sm btn-outline-secondary px-4">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
