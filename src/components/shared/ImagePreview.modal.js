import React, { Component } from "react";
import Modal from "./Modal";

/**
 * @image
 */
export default class ImagePreview extends Component {
  handleClose = () => {
    if (this.props.onClose) this.props.onClose();
  };
  render() {
    return (
      <Modal title="图片预览" zIndex="1080" position={"center"} getWidth={"480px"} onClose={this.handleClose}>
        <section>
          <img src={this.props.image} alt="alt" width="100%" />
        </section>
      </Modal>
    );
  }
}
