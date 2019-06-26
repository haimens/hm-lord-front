import React, { Component } from "react";
import { Modal, ImageInModal, ImageLoaderModal, PreviewImageModal } from "../../../components/shared";

export default class AddingOrderModal extends Component {
  state = {
    img_url: "",
    showPreview: "",
    showImage: ""
  };
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { img_url, showPreview, showImage } = this.state;
    return (
      <Modal
        title="Add Customer"
        onClose={this.handleClose}
        position="center"
        getWidth={"580px"}
        getHeight={"464px"}
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
            <input className="form-control" name="driver_name" id="driver_name" onChange={this.handleInputChange} />
          </div>

          <div className="form-group">
            <label htmlFor="driver_cell">Cell</label>
            <input
              type="email"
              className="form-control"
              name="driver_cell"
              id="driver_cell"
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
              onChange={this.handleInputChange}
            />
          </div>
          <ImageInModal
            parentProps={{ img_url, showPreview }}
            title={"Profile"}
            handleShowImage={this.handleShowImage}
          />
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
