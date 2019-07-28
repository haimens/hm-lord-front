import React, { Component } from "react";
import { convertUTCtoLocal } from "../../actions/utilities.action";
export default class OrderCard extends Component {
  handleButtonClick = order_token => {
    this.props.history.push(`/order/detail/${order_token}`);
  };
  render() {
    const {
      order_token,
      order_img,
      contact_name,
      order_type,
      contact_cell,
      cdate,
      status_str
    } = this.props.parentProps;
    return (
      <div className={this.props.fullWidth ? "col-6" : "col-12 col-md-6 col-lg-4 mb-4 hm-pointer-cursor"}>
        <div
          className="col-12 rounded-custom shadow-sm bg-white "
          style={{ height: "140px" }}
          onClick={() => this.handleButtonClick(order_token)}
        >
          <div className="row h-100 align-items-center">
            {order_img && (
              <div className="col-5 d-flex justify-content-center">
                <img
                  src={order_img}
                  className="rounded-circle"
                  style={{ height: "74px", width: "74px" }}
                  alt="Driver"
                />
              </div>
            )}
            <div className="col-7">
              <div className="font-weight-bold text-modal-color hm-text-15 my-2">{contact_name}</div>
              <div className="text-secondary-color hm-text-12">{contact_cell}</div>
              <div className="text-secondary-color hm-text-12">{convertUTCtoLocal(cdate)}</div>
              <div className="text-secondary-color hm-text-12">{order_type}</div>

              {status_str === "DISPATCHED" ? (
                <div className="d-flex align-items-center ">
                  <i className="fas fa-circle success-text-color mr-3 pl-0" style={{ fontSize: "6px" }} />
                  <div className="text-modal-color hm-text-14  font-weight-500">DISPATCHED</div>
                </div>
              ) : status_str === "ON-THE-WAY" || status_str === "PENDING" ? (
                <div className="d-flex align-items-center ">
                  <i className="fas fa-circle pending-text-color mr-3 pl-0" style={{ fontSize: "6px" }} />
                  <div className="text-modal-color hm-text-14  font-weight-500">{status_str}</div>
                </div>
              ) : (
                <div className="d-flex align-items-center ">
                  <i className="fas fa-circle text-purple mr-3 pl-0" style={{ fontSize: "6px" }} />
                  <div className="text-modal-color hm-text-14  font-weight-500">{status_str}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
