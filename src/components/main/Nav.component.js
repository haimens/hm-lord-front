import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import alertify from "alertifyjs";
import "./Nav.component.css";
import AlertNotificationModal from "../shared/AlertNotification.modal";
import { findAlertListInLord } from "../../actions/alert.action";
import { findMessageListInLord, setCustomerChat } from "../../actions/message.action";

class Nav extends Component {
  state = {
    showAlertNotification: false
  };
  handleClick = type => {
    if (type === "notification") alertify.alert("Bell", "click");
    if (type === "sidebar") {
      this.props.parentProps.toggleSideBar();
    }
  };

  handleLogOut = () => {
    this.props.parentProps.history.push("/");
  };

  handleChangePassword = () => {
    this.props.parentProps.resetPassword(localStorage.getItem("username"));
    alertify.notify(
      "The password reset email has been sent to your on-file email address.",
      "The password reset email has been sent to your on-file email address.",
      5
    );
  };

  handleSideBarBeenOpened = () => {
    this.props.handleSideBarBeenOpened();
  };

  handleShowAlert = () => {
    this.setState(state => ({ showAlertNotification: !state.showAlertNotification }));
  };
  componentDidMount() {
    const { findAlertListInLord, findMessageListInLord } = this.props;
    Promise.all([findAlertListInLord({ status: 3 }), findMessageListInLord()]);
  }
  render() {
    const { showAlertNotification } = this.state;
    const {
      history,
      message_list_in_lord,
      alert_list_in_lord,
      findAlertListInLord,
      findMessageListInLord,
      setCustomerChat
    } = this.props;
    let unRead = 0;
    message_list_in_lord.record_list.map(message => {
      if (message.is_read === 0) {
        unRead++;
      }
      return null;
    });
    return (
      <div>
        {showAlertNotification && (
          <AlertNotificationModal
            history={history}
            setCustomerChat={setCustomerChat}
            onClose={this.handleShowAlert}
            findAlertListInLord={findAlertListInLord}
            findMessageListInLord={findMessageListInLord}
            message_list_in_lord={message_list_in_lord}
            alert_list_in_lord={alert_list_in_lord}
          />
        )}

        <nav
          className={`navbar  navbar-expand-lg border-bottom  background-linear navbar-light d-flex 
    justify-content-between align-items-center ${showAlertNotification && "fixed-top"}`}
          style={{ height: "77px" }}
        >
          <div className="d-flex align-items-center">
            <i
              className="fas fa-bars p-3 hm-pointer-cursor text-white"
              style={{ fontSize: "18px" }}
              onClick={this.handleSideBarBeenOpened}
            />
          </div>
          <div className="d-flex flex-row align-items-center">
            <i
              className="fas fa-bell text-white hm-pointer-cursor mr-4 d-flex"
              style={{ fontSize: "18px" }}
              onClick={this.handleShowAlert}
            >
              {unRead > 0 && (
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center p-2"
                  style={{
                    backgroundColor: "#12ccef",
                    height: "16px",
                    width: "16px",
                    marginLeft: "-10px",
                    marginTop: "-5px"
                  }}
                >
                  {unRead}
                </div>
              )}
            </i>
            <div className="btn-group mr-2">
              <img
                src={`${process.env.PUBLIC_URL}/img/haimenslogo.svg`}
                style={{ height: "36px", width: "36px" }}
                alt="logo"
              />
              <button
                type="button"
                className="btn dropdown-toggle text-white ml-2 d-flex align-items-center"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div>{localStorage.getItem("username") && localStorage.getItem("username").toUpperCase()}</div>
                <i className="fas fa-sort-down ml-1 mb-1" />
              </button>

              <div className="dropdown-menu shadow-sm p-3">
                <div className="pb-2">Welcome!</div>
                <div>
                  <button
                    className="dropdown-item px-0"
                    type="button"
                    onClick={() => {
                      this.handleChangePassword();
                    }}
                  >
                    <small>
                      <i className="fas fa-unlock-alt mr-3" />
                    </small>
                    Change Password
                  </button>
                </div>
                <div>
                  <hr />
                  <button
                    className="dropdown-item p-0"
                    type="button"
                    onClick={() => {
                      this.handleLogOut();
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <small>
                        <img
                          src={`${process.env.PUBLIC_URL}/img/icon_logout.svg`}
                          alt={`${process.env.PUBLIC_URL}/img/icon_logout.svg`}
                          className="mr-3"
                        />
                      </small>
                      Log Out
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    alert_list_in_lord: state.alertReducer.alert_list_in_lord,
    message_list_in_lord: state.smsReducer.message_list_in_lord
  };
};
const mapDispatchToProps = {
  findAlertListInLord,
  findMessageListInLord,
  setCustomerChat
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Nav));
