import React, { Component } from "react";
import { Modal } from "../../../../components/shared";
import alertify from "alertifyjs";

export default class VehicleAdding extends Component {
  state = {
    showImage: false,
    showPreview: false,
    key: "",
    value: ""
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
    const { key, value } = this.state;
    if (key !== "" && value !== "") {
      this.props.createGeneralSettingInLord({
        key,
        value
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
    const { key, value } = this.state;
    return (
      <div>
        <Modal
          title="Add Key Value"
          onClose={this.handleClose}
          position="center"
          getWidth={"467px"}
          getHeight={"335px"}
        >
          <div className="container">
            <div className="p-3">
              <div className="form-group mb-4">
                <input
                  className="form-control hm-input-height mt-3"
                  name="key"
                  id="key"
                  placeholder={"Key"}
                  value={key}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group mb-4">
                <input
                  type="text"
                  className="form-control hm-input-height "
                  name="value"
                  id="value"
                  placeholder={"Value"}
                  value={value}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group text-right pt-3">
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
