import React, { Component } from "react";
import Modal from "./Modal";

export default class AddingDriverModal extends Component {
  state = {
    keywords: ""
  };
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDriverBeenClicked = driver_token => {
    this.props.handleDriverBeenClicked(driver_token);
    this.handleClose();
  };
  handleSubmit = async e => {
    if (e) e.preventDefault();
    const { keywords } = this.state;
    this.props.onSubmit(keywords);
  };

  handleClose = () => {
    this.props.onClose();
  };
  render() {
    const { driver_list_in_lord } = this.props;
    return (
      <Modal title="Add A Driver" onClose={this.handleClose} position="center" getWidth={"400px"} getHeight={"550px"}>
        <div className="rounded-custom">
          <div className="border-bottom-custom  d-flex align-items-center" style={{ height: "60px" }}>
            <div className="input-group pl-4 pr-1">
              <div className="input-group-prepend col-1 p-0 d-flex justify-content-center align-items-center">
                <span className="input-group-text border-0 bg-white">
                  <i className="fas fa-search" />
                </span>
              </div>
              <form className="col" onSubmit={this.handleSubmit}>
                <input
                  className="form-control border-0 ml-2 hm-text-14"
                  style={{ height: "56px" }}
                  name="keywords"
                  id="keywords"
                  value={this.state.keywords}
                  placeholder={"Search"}
                  onChange={this.handleInputChange}
                />
              </form>
            </div>
          </div>
          <div className="container">
            {driver_list_in_lord.record_list.map((driver, index) => (
              <div className="col-12 border-bottom d-flex align-items-center" key={index} style={{ height: "92px" }}>
                <div className="col-3">
                  <img src={driver.img_path} alt="driver-avatar" className="avatar-md rounded-circle " />
                </div>
                <div className="col-9">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="font-weight-bold hm-text-16 text-modal-color">{driver.name}</div>
                      <div className=" hm-text-14 text-modal-color">{driver.plate_num}</div>
                    </div>
                    <div>
                      <button
                        className="btn button-main-background text-white shadow-sm"
                        onClick={() => this.handleDriverBeenClicked(driver.driver_token)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    );
  }
}
