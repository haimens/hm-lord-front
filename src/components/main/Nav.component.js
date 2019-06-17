import React, { Component } from "react";
import { ImageButton } from "../shared";
import alertify from "alertifyjs";

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

  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white d-flex 
      justify-content-end shadow-sm  align-items-center"
        style={{ height: "50px" }}
      >
        <div className="d-flex flex-row align-items-center">
          <div className="btn-group mr-2">
            <button
              type="button"
              className="btn  dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              欢迎, {localStorage.getItem("username")}
            </button>
            <div className="dropdown-menu dropdown-menu">
              <div className="d-flex justify-content-between align-items-center">
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {
                    this.handleChangePassword();
                  }}
                >
                  <small>
                    <i className="fas fa-key font-size-10 mr-3" />
                  </small>
                  修改密码
                </button>
              </div>
            </div>
          </div>

          <ImageButton
            image={`${process.env.PUBLIC_URL}/img/navicon_logout.svg`}
            type="submit"
            size={24}
            onClick={() => {
              this.handleLogOut();
            }}
          />
        </div>
      </nav>
    );
  }
}

export default Nav;
