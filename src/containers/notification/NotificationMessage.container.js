import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListView, Header, ListHeader, ChatModalContainer } from "../../components/shared";
import NotificationMessageListItem from "./notificationMessage.component/NotificationMessageList.item";
import {
  findMessageListInLord,
  findMessageDetailWithCustomer,
  setChatToFalse,
  createAMessageWithCustomer,
  updateSmsStatus,
  findMessageAndResetData
} from "../../actions/message.action";
class NotificationMessage extends Component {
  state = {
    customer_token: "",
    showChatWithCustomer: false,
    current_name: ""
  };
  handleChatWithCustomer = async (customer_token, current_name) => {
    this.setState({ customer_token, current_name });
    await this.props.findMessageAndResetData(customer_token);
  };
  handlePageChange = start => {
    this.props.findMessageListInLord({ start });
  };
  handleShowChatWithCustomer = async () => {
    this.props.setChatToFalse();
  };
  findMoreList = async (customer_token, start) => {
    await this.props.findMessageDetailWithCustomer(customer_token, start);
  };

  componentDidMount() {
    this.props.findMessageListInLord();
  }
  render() {
    const {
      message_list_in_lord,
      message_detail_with_customer,
      createAMessageWithCustomer,
      showChat,
      updateSmsStatus
    } = this.props;
    const { customer_token, current_name } = this.state;
    return (
      <main className="container-fluid">
        {showChat && (
          <ChatModalContainer
            name={current_name}
            updateSmsStatus={updateSmsStatus}
            findMoreList={this.findMoreList}
            token={customer_token}
            list={message_detail_with_customer}
            createAMessageWithCustomer={createAMessageWithCustomer}
            handleClose={this.handleShowChatWithCustomer}
          />
        )}
        <section className="mb-4">
          <Header title="Notification" subTitle="Message Center" tabicon={"icon_notification_white.svg"} />
        </section>
        <section className="mb-4">
          <ListHeader
            parentProps={{
              title: "Message Center",
              clickFunction: this.handleShowAddingWageModal,
              clickTitle: "Wage"
            }}
            hideButton={true}
          />
          <ListView
            totalCount={message_list_in_lord.count}
            title="Message Center"
            fieldNames={["Customer Img", "Message Time", "Customer Name", "Message Detail", "Chat"]}
            hideHeader={true}
            onPageChange={this.handlePageChange}
          >
            {message_list_in_lord.record_list.map((message, index) => (
              <NotificationMessageListItem
                handleChatWithCustomer={this.handleChatWithCustomer}
                parentProps={message}
                key={index}
              />
            ))}
          </ListView>
        </section>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    message_list_in_lord: state.smsReducer.message_list_in_lord,
    message_detail_with_customer: state.smsReducer.message_detail_with_customer,
    showChat: state.smsReducer.showChat
  };
};
const mapDispatchToProps = {
  findMessageListInLord,
  findMessageDetailWithCustomer,
  setChatToFalse,
  createAMessageWithCustomer,
  updateSmsStatus,
  findMessageAndResetData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NotificationMessage));
