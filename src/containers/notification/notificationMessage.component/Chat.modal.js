import React, { Component } from "react";
import { convertUTCtoLocal } from "../../../actions/utilities.action";
import { ChatModal } from "../../../components/shared";
class ChatModalContainer extends Component {
  handleClose = () => {
    this.props.handleClose();
  };

  handleOnSubmit = keywords => {
    const { token, createAMessageWithCustomer } = this.props;
    createAMessageWithCustomer(token, keywords);
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
        {list.record_list.map((message, index) => {
          if (message.type === 1) {
            console.log("hi");
          }
          return (
            <div className="mb-4" key={index}>
              <div className="text-center my-2 hm-text-10 font-weight-bold" style={{ color: "#8785ab" }}>
                {convertUTCtoLocal(message.cdate)}
              </div>
              <div className={`d-flex ${message.type === 1 ? "flex-row-reverse col-12" : "ml-4"}`}>
                <img
                  style={{ height: "48px", width: "48px" }}
                  src={message.img_path}
                  alt={"customer_img"}
                  className={`rounded-circle ${message.type === 1 ? "ml-4" : "mr-4"} `}
                />
                <div
                  className={`chat-modal-box hm-text-16 d-flex justify-content-center align-items-center font-weight-500 p-3  ${message.type ===
                    1 && "messenger-green text-white"} ${message.type === 2 && "messenger-purple text-white"}`}
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
