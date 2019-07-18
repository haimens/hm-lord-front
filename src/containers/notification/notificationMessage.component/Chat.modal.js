import React, { Component } from "react";
import { convertUTCtoLocal } from "../../../actions/utilities.action";
import { ChatModal } from "../../../components/shared";
class ChatModalContainer extends Component {
  handleClose = () => {
    this.props.handleClose();
  };

  handleOnSubmit = keywords => {
    const { token, createAMessageWithCustomer } = this.props;
    createAMessageWithCustomer(token, { keywords });
  };
  findMoreList = (token, start) => {
    this.props.findMoreList(token, start);
  };
  render() {
    const { token, list } = this.props;
    return (
      <ChatModal
        findMoreList={this.findMoreList}
        token={token}
        list={list}
        name={list.record_list[0].name}
        title="Add Driver"
        onClose={this.handleClose}
        position="right"
        getWidth={"500px"}
        getHeight={"534px"}
        onSubmit={this.handleOnSubmit}
      >
        {list.record_list.map((message, index) => (
          <div className="mb-4" key={index}>
            <div className="text-center my-2 hm-text-10 font-weight-bold" style={{ color: "#8785ab" }}>
              {convertUTCtoLocal(message.cdate)}
            </div>
            <div className="col-10 ml-2 d-flex">
              <img
                style={{ height: "48px", width: "48px" }}
                src={message.img_path}
                alt={"customer_img"}
                className="rounded-circle"
              />
              <div
                className="chat-modal-box hm-text-16 d-flex justify-content-center align-items-center font-weight-500 p-3 ml-4"
                style={{ letterSpacing: 0, color: "#8e8e92", lineHeight: "20px" }}
              >
                {message.message}
              </div>
            </div>
          </div>
        ))}
      </ChatModal>
    );
  }
}

export default ChatModalContainer;
