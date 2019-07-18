import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListView, Header, ListHeader } from "../../components/shared";
import NotificationMessageListItem from "./notificationMessage.component/NotificationMessageList.item";
import ChatModal from "./notificationMessage.component/Chat.modal";
import {
  findMessageListInLord,
  findMessageDetailWithCustomer,
  setChatToFalse,
  createAMessageWithCustomer,
  updateSmsStatus
} from "../../actions/message.action";
class NotificationMessage extends Component {
  state = {
    customer_token: "",
    showChatWithCustomer: false
  };
  handleWageSearch = keywords => {};
  handleChatWithCustomer = async customer_token => {
    this.setState({ customer_token });
    await this.props.findMessageDetailWithCustomer(customer_token);
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
      history,
      message_list_in_lord,
      message_detail_with_customer,
      createAMessageWithCustomer,
      showChat,
      updateSmsStatus
    } = this.props;
    const { customer_token } = this.state;
    return (
      <main className="container-fluid">
        {showChat && (
          <ChatModal
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
                onClick={this.handlePunchItemClick}
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
  updateSmsStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NotificationMessage));
