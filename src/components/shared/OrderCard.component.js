import React, { Component } from "react";
import { convertUTCtoLocal } from "../../actions/utilities.action";
export default class OrderCard extends Component {
  render() {
    const { order_token, order_img, contact_name, order_type, contact_cell, cdate, isActive } = this.props.parentProps;
    return (
      <div className={this.props.fullWidth ? "col-6" : "col-12 col-md-6 col-lg-4 mb-4 hm-pointer-cursor"}>
        <div
          className="col-12 rounded-custom shadow-sm bg-white "
          style={{ height: "140px" }}
          onClick={() => this.props.history.push(`/driver/detail/${order_token}`)}
        >
          <div className="row h-100 align-items-center">
            <div className="col-5 d-flex justify-content-center">
              <img src={order_img} className="rounded-circle" style={{ height: "74px", width: "74px" }} alt="Driver" />
            </div>
            <div className="col-7">
              <div className="font-weight-bold text-modal-color hm-text-15 my-2">{contact_name}</div>
              <div className="text-secondary-color hm-text-12">{contact_cell}</div>
              <div className="text-secondary-color hm-text-12">{convertUTCtoLocal(cdate)}</div>
              <div className="text-secondary-color hm-text-12">{order_type}</div>

              {isActive === 2 ? (
                <section className="hm-text-14 my-2">
                  <div className=" d-flex align-items-center">
                    <i className="fas fa-circle success-text-color mr-3" style={{ fontSize: "6px" }} />
                    <div className="font-weight-500 text-main-color hm-text-12">Active</div>
                  </div>
                </section>
              ) : (
                <section className="hm-text-14 my-2">
                  <div className=" d-flex align-items-center">
                    <i className="fas fa-circle text-danger mr-3" style={{ fontSize: "6px" }} />
                    <div className="font-weight-500 text-main-color hm-text-12">Inactive</div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
