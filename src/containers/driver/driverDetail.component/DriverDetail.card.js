import React, { Component } from "react";
import { GMapFlag } from "../../../components/shared";
import { convertUTCtoLocal, parseAmount } from "../../../actions/utilities.action";
class DriverDetailCard extends Component {
  handleDetailButtonClicked = type => {
    this.props.handleDetailButtonClicked(type);
  };
  handleRequestDriverShareLocation = () => {
    this.props.requestDriverShareLocation(this.props.driver_token);
  };
  handleSendEmailToDriver = () => {
    const { sendEmailToDriver, driver_token, driver_detail_in_lord } = this.props;
    sendEmailToDriver(driver_token, driver_detail_in_lord.basic_info.name, driver_detail_in_lord.basic_info.username);
  };
  render() {
    const { sum, driver_detail_in_lord } = this.props;
    const { basic_info, location_info } = driver_detail_in_lord;
    const { name, cell, email, username, img_path, status } = basic_info;
    return (
      <div className="bg-white rounded-custom shadow-sm">
        <div className="row" style={{ padding: "40px" }}>
          <div className="col-lg-2 col-12 mb-4 d-flex justify-content-center">
            <img className="rounded-circle" style={{ height: "90px", width: "90px" }} src={img_path} alt="avatar" />
          </div>
          <div className="col-lg-10 col-12">
            <div className="row text-modal-color">
              <div className="col-lg-6 col-12 mb-4">
                <div className="purple-border p-3">
                  <div className="d-flex justify-content-between align-items-center  ">
                    <div className="hm-text-16 font-weight-bold">Basic Information</div>

                    <img
                      src={`${process.env.PUBLIC_URL}/img/icon_edit.svg`}
                      className="hm-pointer-cursor"
                      alt="delete"
                      style={{ height: "25px", width: "25px" }}
                      onClick={() => this.handleDetailButtonClicked("basic")}
                    />
                  </div>
                </div>
                <div className="mb-4 px-3">
                  <div className="text-secondary-color font-weight-500 hm-text-14">Name</div>
                  <div className="hm-text-14 font-weight-bold">{name}</div>
                </div>
                <div className="mb-4 px-3">
                  <div className="text-secondary-color font-weight-500 hm-text-14">Cell</div>
                  <div className="hm-text-14 font-weight-bold">{cell}</div>
                </div>
                <div className="mb-4 px-3">
                  <div className="text-secondary-color font-weight-500 hm-text-14">Email</div>
                  <div className="hm-text-14 font-weight-bold">{email}</div>
                </div>
                <div className="mb-4 px-3">
                  <div className="text-secondary-color font-weight-500 hm-text-14">Username</div>
                  <div className="hm-text-14 font-weight-bold">{username}</div>
                </div>
                <div className="mb-4 px-3">
                  <div className="text-secondary-color font-weight-500 hm-text-14">Available Balance</div>
                  <div className="hm-text-14 font-weight-bold">{parseAmount(sum)}</div>
                </div>
                <div className="mb-4 px-3">
                  <div className="text-secondary-color font-weight-500 hm-text-14">Status</div>
                  <div className="hm-text-14 font-weight-bold">
                    {status === 2 ? (
                      <div className="d-flex align-items-center ">
                        <i className="fas fa-circle success-text-color mr-3 pl-0" style={{ fontSize: "6px" }} />
                        <div>Active</div>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center">
                        <i className="fas fa-circle text-danger mr-3" style={{ fontSize: "6px" }} />
                        <div>Inactive</div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-4 px-3">
                  <div
                    className="text-white btn btn-md text-white mt-3 hm-pointer-cursor"
                    style={{ backgroundColor: "#5e72e4" }}
                    onClick={this.handleSendEmailToDriver}
                  >
                    <i className="fas fa-envelope mr-3" />
                    Send Email Confirmation
                  </div>
                </div>

                <div className="mb-4 px-3">
                  <div
                    className="text-white btn btn-md text-white mt-3 hm-pointer-cursor"
                    style={{ backgroundColor: "#5e72e4" }}
                    onClick={this.handleRequestDriverShareLocation}
                  >
                    <i className="fas fa-location-arrow mr-3" />
                    Send Location Sharing Request
                  </div>
                </div>
              </div>

              {location_info && (
                <div className="col-lg-6 col-12">
                  <div className="purple-border p-3">
                    <div>
                      <div className="hm-text-16 font-weight-bold">Last Location Map</div>
                    </div>
                    <div className="mt-3 ">
                      <div className="text-secondary-color font-weight-500 hm-text-14">Last Updated Time</div>
                      <div className="hm-text-14 font-weight-bold">
                        {convertUTCtoLocal(location_info.udate, "YYYY-MM-DD HH:mm")}
                      </div>
                    </div>
                  </div>
                  <div className="p-3" style={{ height: "307px" }}>
                    {this.props.showMap && <GMapFlag location_info={location_info} />}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DriverDetailCard;
