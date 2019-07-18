import React, { Component } from "react";
import Overlay from "./Overlay";

class SucceedModal extends Component {
  render() {
    return (
      <Overlay style={{ width: "200px", height: "200px" }} className="rounded">
        <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
          <img
            className="mb-3"
            src={`${process.env.PUBLIC_URL}/img/succeed.png`}
            style={{ height: "80px", width: "80px" }}
            alt="icon"
          />
          <h5 className="succeed-modal-message">Success!</h5>
        </div>
      </Overlay>
    );
  }
}

export default SucceedModal;
