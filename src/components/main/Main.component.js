import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleSideBar } from "../../actions/nav.action";
import Nav from "./Nav.component";
import Sidebar from "./Sidebar.component";
import { push as Menu } from "react-burger-menu";

import "./Main.component.css";
import { ChatModalContainer } from "../shared";
import { resetPassword } from "../../actions/auth.action";
import {
  updateSmsStatus,
  createAMessageWithCustomer,
  setChatToFalse,
  findMessageDetailWithCustomer
} from "../../actions/message.action";
export class Main extends Component {
  state = {
    opened: false
  };
  handleSideBarBeenOpened = async () => {
    await this.setState(states => ({ opened: !states.opened }));
  };
  findMoreList = async (customer_token, start) => {
    await this.props.findMessageDetailWithCustomer(customer_token, start);
  };
  isMenuOpen = state => {
    if (this.state.opened !== state.isOpen) {
      this.setState({ opened: state.isOpen });
    }
    return;
  };

  handleShowChatWithCustomer = () => {
    this.props.setChatToFalse();
  };

  render() {
    const parentProps = {
      toggleSideBar: this.props.toggleSideBar,
      history: this.props.history,
      resetPassword: this.props.resetPassword,
      location: this.props.location
    };
    const { opened } = this.state;
    const { showChat, updateSmsStatus, message_detail_with_customer, createAMessageWithCustomer } = this.props;
    return (
      <main>
        {showChat && (
          <ChatModalContainer
            updateSmsStatus={updateSmsStatus}
            name={this.props.current_customer.customer_name}
            findMoreList={this.findMoreList}
            token={this.props.current_customer.customer_token}
            list={message_detail_with_customer}
            createAMessageWithCustomer={createAMessageWithCustomer}
            handleClose={this.handleShowChatWithCustomer}
          />
        )}
        <Menu isOpen={opened} onStateChange={this.isMenuOpen} customBurgerIcon={false} customCrossIcon={false}>
          <Sidebar parentProps={parentProps} handleSideBarBeenOpened={this.handleSideBarBeenOpened} />
        </Menu>
        <section>
          <div className="background-linear" style={{ height: "230px" }}>
            <Nav handleSideBarBeenOpened={this.handleSideBarBeenOpened} parentProps={parentProps} />
          </div>
          <div style={{ marginTop: "-145px" }}>
            <div className={`container-fluid py-4`}>{this.props.children}</div>
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    is_open: state.navReducer.is_open,
    showChat: state.smsReducer.showChat,
    message_detail_with_customer: state.smsReducer.message_detail_with_customer,
    current_customer: state.smsReducer.current_customer
  };
};

export default connect(
  mapStateToProps,
  {
    toggleSideBar,
    resetPassword,
    updateSmsStatus,
    createAMessageWithCustomer,
    setChatToFalse,
    findMessageDetailWithCustomer
  }
)(withRouter(Main));
