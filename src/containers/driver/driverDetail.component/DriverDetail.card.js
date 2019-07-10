import React, { Component } from "react";
import { GMapFlag } from "../../../components/shared";
import { convertUTCtoLocal } from "../../../actions/utilities.action";
class DriverDetailCard extends Component {
  handleDetailButtonClicked = type => {
    this.props.handleDetailButtonClicked(type);
  };

  render() {
    const { basic_info, location_info } = this.props.driver_detail_in_lord;
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
                    <button
                      className="rounded-circle bg-white company-detail-button d-flex justify-content-center align-items-center"
                      onClick={() => this.handleDetailButtonClicked("basic")}
                    >
                      <i className="fas fa-pencil-alt" style={{ color: "#fb6240" }} />
                    </button>
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
                  <div className="hm-text-14 font-weight-bold">{123}</div>
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
              </div>

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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DriverDetailCard;
