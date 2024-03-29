import React, { Component } from "react";
import { Modal } from "../../../../components/shared";
import alertify from "alertifyjs";
export default class EmailModal extends Component {
  state = {
    sendgrid_api_key: "",
    sendgrid_from_email: ""
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
  handleCreateEmailResource = () => {
    const { sendgrid_api_key, sendgrid_from_email } = this.state;
    const { createAEmailMethod } = this.props;
    if (sendgrid_api_key !== "" && sendgrid_from_email !== "") {
      createAEmailMethod({
        sendgrid_api_key,
        sendgrid_from_email
      });
      this.handleClose();
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
  };

  render() {
    const { sendgrid_api_key, sendgrid_from_email } = this.state;
    return (
      <div>
        <Modal
          title="Add Email Resource"
          onClose={this.handleClose}
          position="center"
          getWidth={"467px"}
          getHeight={"380px"}
          zIndex="3"
        >
          <div className="container">
            <div className="p-3">
              <div className="form-group pt-3">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="SendGrid Api Key">
                  SendGrid Api Key
                </label>
                <input
                  type="text"
                  className="form-control hm-input-height"
                  placeholder="SendGrid Api Key"
                  id="sendgrid_api_key"
                  value={sendgrid_api_key}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group pt-3">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="SendGrid From Email">
                  SendGrid From Email
                </label>
                <input
                  type="email"
                  className="form-control hm-input-height"
                  id="sendgrid_from_email"
                  placeholder="SendGrid From Email"
                  value={sendgrid_from_email}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group text-right pt-3">
                <button
                  className="button-main-background btn button-main-size px-4 text-white mr-3"
                  onClick={this.handleCreateEmailResource}
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
