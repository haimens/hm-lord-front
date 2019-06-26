import React, { Component } from "react";
import { ImageLoaderModal, PreviewImageModal, ImageInModal, Modal } from "../../../components/shared";
export default class VehcileCreation extends Component {
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
        title="Add Vehicle"
        onClose={this.handleClose}
        position="center"
        getWidth={"519px"}
        getHeight={"390px"}
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
            <label htmlFor="driver_name">Identifier</label>
            <input
              className="form-control"
              name="driver_name"
              id="driver_name"
              value={driver_name}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="driver_cell">Plate Number</label>
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
            <label htmlFor="driver_email">Description</label>
            <input
              type="cell"
              className="form-control"
              name="driver_email"
              id="driver_email"
              value={driver_email}
              onChange={this.handleInputChange}
            />
          </div>

          <ImageInModal parentProps={{ img_url, showPreview }} title={"Img"} handleShowImage={this.handleShowImage} />

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
