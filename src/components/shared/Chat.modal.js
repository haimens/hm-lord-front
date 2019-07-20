import React, { Component } from "react";
import { convertUTCtoLocal } from "../../actions/utilities.action";
import { ChatModal } from "./index";
class ChatModalContainer extends Component {
  handleClose = () => {
    this.props.handleClose();
  };

  handleOnSubmit = keywords => {
    const { token, createAMessageWithCustomer } = this.props;
    createAMessageWithCustomer(token, {
      message: keywords,
      title: `From Admin-${localStorage.getItem("name")}`
    });
  };
  findMoreList = (token, start) => {
    this.props.findMoreList(token, start);
  };
  updateSmsStatus = (sms, data) => {
    this.props.updateSmsStatus(sms, data, this.props.token);
  };
  render() {
    const { token, list, name } = this.props;
    return (
      <ChatModal
        findMoreList={this.findMoreList}
        token={token}
        list={list}
        name={name}
        title="Add Driver"
        onClose={this.handleClose}
        position="right"
        getWidth={"500px"}
        getHeight={"534px"}
        onSubmit={this.handleOnSubmit}
      >
        {list.record_list.map((message, index) => {
          let img = "";
          if (message.type === 1) {
            img = message.lord_img_path;
          } else if (message.type === 2) {
            img = message.driver_img_path;
          } else if (message.type === 4) {
            img = message.img_path;
          } else {
            img = localStorage.getItem("icon_path");
          }
          if (message.is_read === 0) {
            this.updateSmsStatus(message.sms_token, { is_read: 1 });
          }
          return (
            <div className="mb-4" key={index}>
              <div className="text-center my-2 hm-text-10 font-weight-bold" style={{ color: "#8785ab" }}>
                {convertUTCtoLocal(message.cdate)}
              </div>
              <div className={`d-flex ${message.type === 1 ? "flex-row-reverse col" : "ml-4"}`}>
                <img
                  style={{ height: "48px", width: "48px" }}
                  src={img}
                  alt={"img"}
                  className={`rounded-circle ${message.type === 1 ? "ml-4" : "mr-4"} `}
                />
                <div
                  className={` hm-text-16 d-flex justify-content-center align-items-center font-weight-500 p-3  ${message.type ===
                    1 && "messenger-green text-white"} ${
                    message.type === 2 ? "messenger-purple text-white chat-modal-box" : "chat-modal-box-reverse"
                  }`}
                  style={{ letterSpacing: 0, color: "#8e8e92", lineHeight: "20px" }}
                >
                  {message.message}
                </div>
              </div>
            </div>
          );
        })}
      </ChatModal>
    );
  }
}

export default ChatModalContainer;
