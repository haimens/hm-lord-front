import React, { Component } from "react";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import ImageButton from "../../components/shared/ImageButton";
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

class Modal extends Component {
  state = {
    chat: ""
  };
  targetElement = null;

  componentDidMount() {
    // 2. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav).
    this.targetElement = document.querySelector("#onlyScroll");
    disableBodyScroll(this.targetElement);
  }
  componentWillUnmount() {
    // 5. Useful if we have called disableBodyScroll for multiple target elements,
    // and we just want a kill-switch to undo all that.
    // OR useful for if the `hideTargetElement()` function got circumvented eg. visitor
    // clicks a link which takes him/her to a different page within the app.
    clearAllBodyScrollLocks();
  }

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
  };
  clearSearch = () => {
    this.props.onClear();
  };
  handleScroll = e => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    const { findMoreList, token, list } = this.props;
    if (bottom) {
      if (list.end < list.count) {
        findMoreList(token, { start: list.end });
      }
    }
  };
  render() {
    let curr = "center";
    if (this.props.position == "right") {
      curr = "modal-right-chat";
    } else if (this.props.position == "left") {
      curr = "modal-left";
    }
    const widthHeight = {
      width: this.props.getWidth,
      height: this.props.getHeight
    };
    let closeIcon = "bg-dark";
    const { chat } = this.state;
    return (
      <main>
        <div
          className="modal-over-lay-chat"
          onClick={this.handleClose}
          style={{ zIndex: `${this.props.zIndex || 9}` }}
        />
        <section className={`${curr} rounded d-flex flex-column`} id="onlyScroll" style={widthHeight}>
          <header
            className={`sticky-top d-flex justify-content-center align-items-center`}
            style={{ backgroundColor: "#f7f9fc", height: "53px" }}
          >
            <h5 className="hm-text-14 text-modal-color font-weight-bold">{this.props.name}</h5>
          </header>
          <div style={{ height: "409px", overflow: "auto" }} onScroll={this.handleScroll}>
            {this.props.children}
          </div>
          <div className="mt-auto">
            <div className="d-flex justify-content-center align-items-center bg-white chat-modal-input">
              <form className="col" onSubmit={this.handleSubmit}>
                <input
                  className="chat-input p-3 hm-text-16 font-weight-500"
                  type="text"
                  id="chat"
                  value={chat}
                  onChange={this.handleInputChange}
                  placeholder="Type a message here..."
                />
              </form>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default Modal;
