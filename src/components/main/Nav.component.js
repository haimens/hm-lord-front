import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import alertify from "alertifyjs";
import "./Nav.component.css";
import AlertNotificationModal from "../shared/AlertNotification.modal";
import { findAlertListInLord } from "../../actions/alert.action";
import { findMessageListInLord } from "../../actions/message.action";

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
    alertify.notify("已发送修改密码连接至Email", "已发送修改密码连接至Email", 5);
  };

  handleSideBarBeenOpened = () => {
    this.props.handleSideBarBeenOpened();
  };

  handleShowAlert = () => {
    this.setState(state => ({ showAlertNotification: !state.showAlertNotification }));
  };

  render() {
    const { showAlertNotification } = this.state;
    const {
      history,
      message_list_in_lord,
      alert_list_in_lord,
      findAlertListInLord,
      findMessageListInLord
    } = this.props;
    return (
      <div>
        {showAlertNotification && (
          <AlertNotificationModal
            history={history}
            onClose={this.handleShowAlert}
            findAlertListInLord={findAlertListInLord}
            findMessageListInLord={findMessageListInLord}
            message_list_in_lord={message_list_in_lord}
            alert_list_in_lord={alert_list_in_lord}
          />
        )}

        <nav
          className="navbar fixed-top navbar-expand-lg border-bottom  background-linear navbar-light d-flex 
    justify-content-between align-items-center"
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
              className="fas fa-bell text-white hm-pointer-cursor mr-4"
              style={{ fontSize: "18px" }}
              onClick={this.handleShowAlert}
            />
            <div className="btn-group mr-2">
              <img
                src={`${process.env.PUBLIC_URL}/img/haimenslogo.svg`}
                style={{ height: "36px", width: "36px" }}
                alt="error404"
              />
              <button
                type="button"
                className="btn dropdown-toggle text-white ml-2 d-flex align-items-center"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {localStorage.getItem("username").toUpperCase()}
                <i className="fas fa-sort-down ml-1" />
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
                      <i className="fas fa-cog mr-3" />
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
  findMessageListInLord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Nav));
