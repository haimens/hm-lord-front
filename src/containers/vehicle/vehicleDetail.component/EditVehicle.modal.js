import React, { Component } from "react";
import { Modal, ImageLoaderModal, PreviewImageModal, AddingImage } from "../../../components/shared";
import alertify from "alertifyjs";

export default class EditVehicle extends Component {
  state = {
    showImage: false,
    showPreview: false,
    identifier: "",
    plate_num: "",
    description: "",
    img_path: ""
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

  handleCreateAVehicleInLord = () => {
    const { identifier, plate_num, description, img_path } = this.state;
    if (img_path !== "" && identifier !== "" && plate_num !== "" && description !== "") {
      this.props.updateACarInLord(this.props.car_token, { identifier, plate_num, description, img_path });
      this.handleClose();
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
  };

  saveToAddress = address => {
    this.setState({ company_address: address });
  };

  componentDidMount() {
    const { img_path, identifier, plate_num, description } = this.props.vehicle_detail_in_lord.basic_info;
    this.setState({ img_path, identifier, plate_num, description });
  }

  render() {
    const { img_path, showImage, showPreview, identifier, plate_num, description } = this.state;
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

        <Modal title="Edit Vehicle" onClose={this.handleClose} position="center" getWidth={"467px"} getHeight={"449px"}>
          <div className="container">
            <div className="p-3">
              <div className="form-group mb-4">
                <input
                  type="text"
                  className="form-control hm-input-height mt-3"
                  name="identifier"
                  id="identifier"
                  placeholder={"Identifier"}
                  value={identifier}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group input-group mb-4 d-flex">
                <input
                  type="text"
                  className="form-control hm-input-height "
                  id="plate_num"
                  placeholder="Plate Number"
                  value={plate_num}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group mt-4">
                <input
                  type="text"
                  className="form-control hm-input-height "
                  name="description"
                  id="description"
                  placeholder={"Description"}
                  value={description}
                  onChange={this.handleInputChange}
                />
              </div>

              <AddingImage
                title={"Logo:"}
                parentProps={{ img_url: img_path, handleShowPreview: this.handleShowPreview }}
                handleShowImage={this.handleShowImage}
              />

              <div className="form-group text-right pt-4">
                <button
                  className="button-main-background btn button-main-size px-4 text-white mr-3"
                  onClick={this.handleCreateAVehicleInLord}
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
