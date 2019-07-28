import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListView, Header, ListHeader } from "../../components/shared";
import NotificationMessageListItem from "./notificationMessage.component/NotificationMessageList.item";
import { findMessageListInLord, setCustomerChat } from "../../actions/message.action";
class NotificationMessage extends Component {
  handleChatWithCustomer = async (customer_token, current_name) => {
    this.props.setCustomerChat({ customer_name: current_name, customer_token });
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
    const { message_list_in_lord } = this.props;
    return (
      <main className="container-fluid">
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
    message_list_in_lord: state.smsReducer.message_list_in_lord
  };
};
const mapDispatchToProps = {
  findMessageListInLord,
  setCustomerChat
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NotificationMessage));
