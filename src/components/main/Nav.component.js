import React, { Component } from "react";
import alertify from "alertifyjs";
import "./Nav.component.css";
class Nav extends Component {
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

  render() {
    return (
      <nav
        className="navbar navbar-expand-lg border-bottom  background-linear navbar-light d-flex 
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
          <div className="btn-group mr-2">
            <img
              src={`${process.env.PUBLIC_URL}/img/haimenslogo.svg`}
              style={{ height: "36px", width: "36px" }}
              alt="error404"
            />
            <button
              type="button"
              className="btn dropdown-toggle text-white"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {localStorage.getItem("username").toUpperCase()}
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
    );
  }
}

export default Nav;
