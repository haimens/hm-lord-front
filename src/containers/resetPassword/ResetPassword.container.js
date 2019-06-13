import React from "react";
import alertify from "alertifyjs";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { processLogin } from "../../actions/auth.action";
import "./ResetPassword.container.css";

export class Login extends React.Component {
  state = {
    username: ""
  };

  handleClick = () => {
    // TODO: connect api to reset password
    alertify.alert("Alert", "reset password");
  };

  render() {
    return (
      <main style={styles.main} className="resetpassword-container">
        {/* TODO: connect redux api */}
        {/* {this.props.isLoading && <Loader />} */}
        {/* {<SuccessModal />} */}
        <section style={styles.resetpassContainer}>
          <h3 className="mb-3 text-center">重置密码</h3>
          <div className="rounded bg-white p-5">
            <form onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <label className="d-block">登录用户名</label>
                <input
                  required
                  type="text"
                  className="bg-light border-0 rounded p-2 w-100"
                  placeholder="输入用户名"
                  name="login"
                  id="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="text-center">
                <button
                  onClick={() => this.handleClick()}
                  className="btn mr-bg-green text-white  pl-4 pr-4"
                >
                  重置密码
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.loadReducer.loading,
    isSuccess: state.loadReducer.is_success
  };
};

export default connect(
  mapStateToProps,
  {
    processLogin
  }
)(withRouter(Login));

const styles = {
  main: {
    width: "100%",
    height: "100%",
    position: "relative"
  },
  resetpassContainer: {
    minWidth: "320px",
    maxWidth: "540px",
    height: "400px",
    position: "absolute",
    margin: "auto",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0"
  }
};
