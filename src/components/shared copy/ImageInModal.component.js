import React, { Component } from "react";
import { ImageButton, ImageLoaderModal, PreviewImageModal } from "../shared";
import alertify from "alertifyjs";
export default class ImageInModal extends Component {
  handleClose = e => {
    if (e) e.preventDefault();
    if (this.props.onClose) this.props.onClose();
  };

  handleSubmit = e => {
    e.preventDefault();
    alertify
      .confirm(
        "确定信息",
        `确认上传二维码?`,
        async () => {
          await this.props.parentProps.registerHandPriceInHand(this.props.parentProps.match.params.city_token, {
            price_token: this.props.parentProps.price_token,
            hand_token: this.props.parentProps.handResourceDetail.hand_token,
            payment_method: this.props.parentProps.handResourceDetail.payment_method,
            img_url: this.state.img_url
          });
          this.handleClose();
        },
        () => {
          alertify.error("取消");
        }
      )
      .set("labels", { ok: "确定", cancel: "取消" });
  };

  handleModal = e => {
    if (e) e.preventDefault();
    this.props.handleShowImage();
  };

  handleImageUpload = img_path => {
    this.setState({ img_url: img_path });
  };
  render() {
    return (
      <div className="mt-2">
        <form className="bg-white" onSubmit={this.handleSubmit}>
          <div className="d-flex align-items-center row">
            <div className="mb-2 mr-4 col-2">
              {this.props.parentProps.img_url ? (
                <img
                  className="st-pointer-cursor"
                  onClick={() => this.setState({ showPreview: true })}
                  src={this.props.parentProps.img_url}
                  alt="二维码"
                  width={"20px"}
                  height={"20px"}
                />
              ) : (
                <div>{`${this.props.title}:`}</div>
              )}
            </div>
            <div className="col-9">
              <ImageButton icon={<i className="fas fa-upload fa-lg" />} onClick={e => this.handleModal(e)} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
