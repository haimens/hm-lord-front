import React, { Component } from "react";
import { Modal } from "../../../../components/shared";
import alertify from "alertifyjs";
export default class MessageModal extends Component {
  state = {
    twilio_account_id: "",
    twilio_auth_token: "",
    twilio_from_num: ""
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
  handleCreateMessageResource = () => {
    const { twilio_account_id, twilio_auth_token, twilio_from_num } = this.state;
    const { createAMessageMethod } = this.props;
    if (twilio_account_id !== "" && twilio_auth_token !== "" && twilio_from_num !== "") {
      createAMessageMethod({
        twilio_account_id,
        twilio_auth_token,
        twilio_from_num
      });
      this.handleClose();
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
  };

  render() {
    const { twilio_account_id, twilio_auth_token, twilio_from_num } = this.state;
    return (
      <div>
        <Modal
          title="Add Message Resource"
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
                  placeholder="Twilio Account Id"
                  id="twilio_account_id"
                  value={twilio_account_id}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group pt-3">
                <input
                  type="email"
                  className="form-control hm-input-height"
                  id="twilio_auth_token"
                  placeholder="Twilio Auth Token"
                  value={twilio_auth_token}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group pt-3">
                <input
                  type="text"
                  className="form-control hm-input-height"
                  id="twilio_from_num"
                  placeholder="Twilio From Num"
                  value={twilio_from_num}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group text-right pt-3">
                <button
                  className="button-main-background btn button-main-size px-4 text-white mr-3"
                  onClick={this.handleCreateMessageResource}
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
