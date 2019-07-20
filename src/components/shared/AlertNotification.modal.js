import React, { Component } from "react";
import { clearAllBodyScrollLocks } from "body-scroll-lock";
import "./ChatModal.css";

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
  state = {
    chat: "",
    count: 0
  };
  targetElement = null;

  handleClose = e => {
    if (e) e.preventDefault();
    if (this.props.onClose) this.props.onClose();
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleSearch = keywords => this.props.onSearch(keywords);

  handleSubmit = async e => {
    if (e) e.preventDefault();
    const { chat } = this.state;
    this.props.onSubmit(chat);
    this.setState({ chat: "" });
  };
  clearSearch = () => {
    this.props.onClear();
  };
  handleScroll = e => {
    const top = e.target.scrollTop === 0;
    const { findMoreList, token, list } = this.props;
    if (top) {
      if (list.end < list.count) {
        findMoreList(token, { start: list.end });
      }
    }
  };
  render() {
    let curr = "center";
    if (this.props.position === "right") {
      curr = "modal-right-alert";
    } else if (this.props.position === "left") {
      curr = "modal-left";
    }
    const widthHeight = {
      width: "420px",
      height: "607px"
    };
    const { chat } = this.state;
    return (
      <main>
        <div
          className="modal-over-lay-alert"
          onClick={this.handleClose}
          style={{ zIndex: `${this.props.zIndex || 9}` }}
        />
        <section className={`modal-right-alert rounded d-flex flex-column`} id="onlyScroll" style={widthHeight}>
          <header
            className={`sticky-top d-flex justify-content-center align-items-center`}
            style={{ backgroundColor: "#f7f9fc", height: "53px" }}
          >
            <h5 className="hm-text-14 text-modal-color font-weight-bold">{this.props.name}</h5>
          </header>
          <div id="scrolldiv" style={{ height: "409px", overflow: "auto" }} onScroll={this.handleScroll}>
            {this.props.children}
          </div>
        </section>
      </main>
    );
  }
}

export default AlertNotificationModal;
