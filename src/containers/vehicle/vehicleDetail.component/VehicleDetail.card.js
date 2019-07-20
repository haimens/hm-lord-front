import React, { Component } from "react";
import { GMapFlag } from "../../../components/shared";
import { parseRate, parseAmount } from "../../../actions/utilities.action";
class VehicleDetailCard extends Component {
  handleDetailButtonClicked = () => {
    this.props.handleDetailButtonClicked();
  };
  handleDeleteButtonClicked = () => {
    this.props.handleDeleteButtonClicked();
  };
  render() {
    const { basic_info } = this.props.vehicle_detail_in_lord;
    const { identifier, img_path, plate_num, description, status } = basic_info;
    return (
      <div className="bg-white rounded-custom shadow-sm">
        <div className="row" style={{ padding: "40px" }}>
          <div className="col-lg-2 col-12 mb-4 d-flex justify-content-center">
            <img className="rounded-circle" style={{ height: "90px", width: "90px" }} src={img_path} alt="avatar" />
          </div>
          <div className="col-lg-8 col-12">
            <div className="row text-modal-color">
              <div className="col-lg-8 col-12 mb-4">
                <div className="d-flex justify-content-between align-items-center px-3 pb-3">
                  <div className="hm-text-16 font-weight-bold">Basic Information</div>
                  <div>
                    <img
                      src={`${process.env.PUBLIC_URL}/img/icon_edit.svg`}
                      alt="editutton"
                      className="hm-pointer-cursor"
                      onClick={() => this.handleDetailButtonClicked()}
                    />
                    <img
                      className="ml-2 hm-pointer-cursor"
                      src={`${process.env.PUBLIC_URL}/img/icon_delete.svg`}
                      alt="deleteButton"
                      onClick={() => this.handleDeleteButtonClicked()}
                    />
                  </div>
                </div>
                <div className="mb-4 px-3">
                  <div className="text-secondary-color font-weight-500 hm-text-14">Identifier</div>
                  <div className="hm-text-14 font-weight-bold">{identifier}</div>
                </div>
                <div className="mb-4 px-3">
                  <div className="text-secondary-color font-weight-500 hm-text-14">Plate Number</div>
                  <div className="hm-text-14 font-weight-bold">{plate_num}</div>
                </div>
                <div className="mb-4 px-3">
                  <div className="text-secondary-color font-weight-500 hm-text-14">Description</div>
                  <div className="hm-text-14 font-weight-bold">{description}</div>
                </div>
                <div className="mb-4 px-3">
                  <div className="text-secondary-color font-weight-500 hm-text-14">Status</div>
                  <div className="hm-text-14 font-weight-bold">
                    {status === 1 ? (
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VehicleDetailCard;
