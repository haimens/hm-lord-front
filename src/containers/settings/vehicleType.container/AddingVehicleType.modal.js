import React, { Component } from "react";
import { Modal, ImageLoaderModal, PreviewImageModal, ImageInModal } from "../../../components/shared";

export default class AddingVehicleModal extends Component {
  state = {
    showImage: "",
    showPreview: "",
    img_url: ""
  };
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleClose = () => {
    this.props.onClose();
  };
  render() {
    const { showImage, showPreview, img_url } = this.state;
    return (
      <div>
        {" "}
        {showImage && (
          <ImageLoaderModal
            onClose={() => this.setState({ showImage: false })}
            onImageUpload={this.handleImageUpload}
            title="上传照片"
          />
        )}
        {showPreview && <PreviewImageModal image={img_url} onClose={() => this.setState({ showPreview: false })} />}
        <Modal
          title="Add Vehicle Type"
          onClose={this.handleClose}
          position="center"
          getWidth={"580px"}
          getHeight={"376px"}
          zIndex="1080"
        >
          <div className="container-fluid">
            <div className="col-12 my-4">
              <div className="form-group">
                <label htmlFor="company_name">Name</label>
                <input
                  className="form-control"
                  name="company_name"
                  id="company_name"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="company_name">Price Prefix</label>
                <input
                  className="form-control"
                  name="company_name"
                  id="company_name"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="col-12">
              <ImageInModal
                parentProps={{ img_url, showPreview }}
                title={"Img"}
                handleShowImage={this.handleShowImage}
              />
            </div>
            <div className="d-flex justify-content-center pt-3">
              <button className="btn hm-bg-green text-white px-4 mr-3">Add</button>
              <button className="btn btn-outline-secondary px-4">Cancel</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
