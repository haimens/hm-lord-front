import React, { Component } from "react";
import { Modal } from "../../../../components/shared";
import alertify from "alertifyjs";
export default class CompanyAdmin extends Component {
  state = {
    square_application_id: "",
    square_location_id: "",
    square_access_token: ""
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
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
  handleCreatePaymentResource = () => {
    const { square_application_id, square_location_id, square_access_token } = this.state;
    const { createAPaymentMethod } = this.props;
    if (square_application_id !== "" && square_location_id !== "" && square_access_token !== "") {
      createAPaymentMethod({
        square_application_id,
        square_location_id,
        square_access_token
      });
      this.handleClose();
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
  };

  render() {
    const { square_application_id, square_location_id, square_access_token } = this.state;
    return (
      <div>
        <Modal
          title="Add Payment Resource"
          onClose={this.handleClose}
          position="center"
          getWidth={"467px"}
          getHeight={"430px"}
          zIndex="3"
        >
          <div className="container">
            <div className="p-3">
              <div className="form-group pt-3">
                <input
                  type="text"
                  className="form-control hm-input-height"
                  placeholder="Square Application Id"
                  id="square_application_id"
                  value={square_application_id}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group pt-3">
                <input
                  type="email"
                  className="form-control hm-input-height"
                  id="square_location_id"
                  placeholder="Square Location Id"
                  value={square_location_id}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group pt-3">
                <input
                  type="text"
                  className="form-control hm-input-height"
                  id="square_access_token"
                  placeholder="Square Access Token"
                  value={square_access_token}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group text-right pt-3">
                <button
                  className="button-main-background btn button-main-size px-4 text-white mr-3"
                  onClick={this.handleCreatePaymentResource}
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
