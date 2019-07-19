import React, { Component } from "react";
import { Modal } from "../../../../components/shared";
import alertify from "alertifyjs";

export default class VehicleAdding extends Component {
  state = {
    key: "",
    value: ""
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleCreateADriverInLord = () => {
    const { key, value } = this.state;
    if (value !== "") {
      this.props.updateGeneralSettingListInLord(this.props.currSetting.setting_token, {
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

  async componentDidMount() {
    console.log(this.props);
    this.setState({ value: this.props.currSetting.value });
  }

  render() {
    const { value } = this.state;
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
                <label htmlFor="Driver" className="font-weight-500 hm-text-14 text-secondary-color">
                  Key
                </label>
                <div className="text-modal-color font-weight-bold hm-text-14">{this.props.currSetting.key}</div>
              </div>
              <div className="form-group mb-4">
                <label htmlFor="Driver" className="font-weight-500 hm-text-14 text-secondary-color">
                  Value
                </label>
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
