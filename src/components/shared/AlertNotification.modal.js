import React, { Component } from "react";
import moment from "moment";
import "./ChatModal.css";
import { convertUTCtoLocal } from "../../actions/utilities.action";

/**
 * Modal
 * @showSearchBar bool
 * @onSearch (keywords)
 * @position right || left || center
 * @getHeight str
 * @getWidth str
 * @onClose close function
 * @title title
 * @zIndex adjust zIndex
 * @className (headerContainerClassName, headerTitleClassName)
 * @onClear clear search
 */

class AlertNotificationModal extends Component {
  handleClose = e => {
    if (e) e.preventDefault();
    if (this.props.onClose) this.props.onClose();
  };
  handleJumpLocation = type => {
    this.props.history.push(`/notification/${type}`);
    this.handleClose();
  };

  componentDidMount() {
    const { findAlertListInLord, findMessageListInLord } = this.props;
    Promise.all([findAlertListInLord({ status: 3 }), findMessageListInLord()]);
  }
  render() {
    const widthHeight = {
      width: "420px",
      height: "607px"
    };
    const { alert_list_in_lord, message_list_in_lord } = this.props;
    return (
      <main>
        <div
          className="modal-over-lay-chat"
          onClick={this.handleClose}
          style={{ zIndex: `${this.props.zIndex || 9}` }}
        />
        <section className={`modal-right-alert rounded d-flex flex-column`} style={widthHeight}>
          <header
            className={`sticky-top d-flex justify-content-between align-items-center px-4`}
            style={{ backgroundColor: "#f7f9fc", height: "53px" }}
          >
            <div className="text-modal-color hm-text-14 font-weight-bold">Trip Alert</div>
            <div className="text-purple hm-pointer-cursor" onClick={() => this.handleJumpLocation("alert")}>
              View All
            </div>
          </header>
          {alert_list_in_lord.record_list.map((alert, index) => {
            if (index < 3) {
              return (
                <div
                  className="border-bottom-custom d-flex align-items-center px-2"
                  key={index}
                  style={{ height: "83px" }}
                >
                  <div className="col-3">
                    <img
                      className="rounded-circle"
                      src={alert.customer_img_path}
                      alt={"customer"}
                      style={{ height: "48px", width: "48px" }}
                    />
                  </div>
                  <div className="col-9">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="font-weight-bold hm-text-14 text-modal-color">{alert.customer_name}</div>
                        <div className=" hm-text-14 text-modal-color">{alert.status_str}</div>
                      </div>
                      {/* <div className="ext-secondary-color hm-text-13">{`${moment
                        .utc(moment().diff(moment(alert.record_time)))
                        .format("mm")} min ago`}</div>*/}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}

          <header
            className={`sticky-top d-flex justify-content-between align-items-center px-4`}
            style={{ backgroundColor: "#f7f9fc", height: "53px" }}
          >
            <div className="text-modal-color hm-text-14 font-weight-bold">Message</div>
            <div className="text-purple hm-pointer-cursor" onClick={() => this.handleJumpLocation("message")}>
              View All
            </div>
          </header>
          {message_list_in_lord.record_list.map((message, index) => {
            if (index < 3) {
              return (
                <div
                  className="border-bottom-custom d-flex align-items-center px-2"
                  key={index}
                  style={{ height: "83px" }}
                >
                  <div className="col-3">
                    <img
                      className="rounded-circle"
                      src={message.img_path}
                      alt={"message"}
                      style={{ height: "48px", width: "48px" }}
                    />
                  </div>
                  <div className="col-9">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div
                          className={`hm-text-14 font-weight-bold ${
                            message.is_read === 0 ? "text-purple" : "text-modal-color"
                          }`}
                        >
                          {message.name}
                        </div>
                        <div
                          className={`hm-text-14  ${message.is_read === 0 ? "text-purple" : "text-modal-color"}`}
                          style={{ width: "183px", height: "16px", overflow: "hidden" }}
                        >
                          {message.message}
                        </div>
                      </div>
                      {/* <div className="ext-secondary-color hm-text-13">{`${moment.utc(
                        moment(new Date()).diff(moment(message.udate))
                      )} Hours ago`}</div> */}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </section>
      </main>
    );
  }
}

export default AlertNotificationModal;
