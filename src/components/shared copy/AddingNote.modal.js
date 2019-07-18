import React, { Component } from "react";
import { Modal, ImageLoaderModal, PreviewImageModal, AddingImage, GAutoComplete } from "./index";
import alertify from "alertifyjs";

export default class CustomerAdding extends Component {
  state = {
    note: ""
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleCreatingNote = async () => {
    const { note } = this.state;
    if (note !== "") {
      this.props.createANote(this.props.token, {
        note
      });
      this.handleClose();
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
  };

  render() {
    const { note } = this.state;
    return (
      <Modal title="Add Note" onClose={this.handleClose} position="center" getWidth={"467px"} getHeight={"280px"}>
        <div className="container">
          <div className="p-3">
            <div className="form-group mb-4">
              <input
                className="form-control hm-input-height mt-3"
                name="note"
                id="note"
                placeholder={"Note"}
                value={note}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group text-right pt-3">
              <button
                className="button-main-background btn button-main-size px-4 text-white mr-3"
                onClick={this.handleCreatingNote}
              >
                Add
              </button>
              <button onClick={this.handleClose} className="btn button-main-size btn-outline-secondary px-4">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
