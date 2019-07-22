import React, { Component } from "react";
import { Modal, ImageLoaderModal, PreviewImageModal, AddingImage, GAutoComplete } from "../../../components/shared";
import alertify from "alertifyjs";

export default class EditCustomer extends Component {
  state = {
    showImage: false,
    showPreview: false,
    name: "",
    area: "+1",
    email: "",
    cell: "",
    img_path: "",
    addr_str: "",
    note: ""
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  doNothing = () => {};

  handleShowImage = () => {
    this.setState(states => ({ showImage: !states.showImage }));
  };
  handleShowPreview = () => {
    this.setState(states => ({ showPreview: !states.showPreview }));
  };

  handleImageUpload = img_path => {
    this.setState({ img_path: img_path });
  };

  handleClose = () => {
    this.props.onClose();
  };

  saveToAddress = address => {
    this.setState({ addr_str: address[0].formatted_address });
  };

  handleCreatingCompany = async () => {
    const { name, cell, area, email, img_path, addr_str, note } = this.state;
    const {
      updateACustomerInLord,
      createNewAddressInstance,
      updateACustomerAddressInLord,
      customer_token
    } = this.props;
    if (name !== "" && cell !== "" && area !== "" && email !== "") {
      if (addr_str) {
        const payload = await createNewAddressInstance({ address_str: addr_str });
        Promise.all([
          updateACustomerInLord(customer_token, {
            name,
            img_path,
            cell: `${area} ${cell}`,
            email,
            note
          }),
          updateACustomerAddressInLord(customer_token, {
            address_token: payload.address_token
          })
        ]);
      } else {
        Promise.all([
          updateACustomerInLord(customer_token, {
            name,
            img_path,
            cell: `${area} ${cell}`,
            email,
            note
          })
        ]);
      }
      this.handleClose();
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
  };

  async componentDidMount() {
    const { customer_detail_in_lord } = this.props;
    const { name, cell, email, addr_str, img_path, note } = customer_detail_in_lord;
    await this.setState({ name, cell: cell.split(" ")[1], area: cell.split(" ")[0], email, addr_str, img_path, note });
  }

  render() {
    const { img_path, showImage, showPreview, name, cell, area, email, addr_str, note } = this.state;
    return (
      <div>
        {showImage && (
          <ImageLoaderModal
            onClose={() => this.setState({ showImage: false })}
            onImageUpload={this.handleImageUpload}
            title="Upload Image"
          />
        )}
        {showPreview && <PreviewImageModal image={img_path} onClose={() => this.setState({ showPreview: false })} />}

        <Modal
          title="Update Customer"
          onClose={this.handleClose}
          position="center"
          getWidth={"467px"}
          getHeight={"680px"}
        >
          <div className="container">
            <div className="p-3">
              <div className="form-group mb-4">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="Cell">
                  Name
                </label>
                <input
                  className="form-control hm-input-height"
                  name="name"
                  id="name"
                  placeholder={"Name"}
                  value={name}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group input-group mb-4">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="Cell">
                  Cell
                </label>
                <div className="container-fluid">
                  <div className="row">
                    <input
                      type="text"
                      className="form-control hm-input-height col-2"
                      id="area"
                      placeholder="Area"
                      value={area}
                      onChange={this.handleInputChange}
                    />

                    <input
                      type="text"
                      className="form-control hm-input-height col-10"
                      id="cell"
                      placeholder="Cell"
                      value={cell}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group mb-4">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="Cell">
                  Email
                </label>
                <input
                  className="form-control hm-input-height"
                  name="email"
                  id="email"
                  placeholder={"Email"}
                  value={email}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group mb-4">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="Cell">
                  Special Instruction
                </label>
                <textarea
                  className="form-control hm-input-height"
                  name="note"
                  id="note"
                  placeholder={"note"}
                  value={note}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="Cell">
                  Address
                </label>
                <GAutoComplete
                  handleInputHasChanged={this.doNothing}
                  getGoogleAddress={this.saveToAddress}
                  defaultValue={addr_str}
                />
              </div>

              <AddingImage
                title={"Logo:"}
                parentProps={{ img_url: img_path, handleShowPreview: this.handleShowPreview }}
                handleShowImage={this.handleShowImage}
              />

              <div className="form-group text-right pt-3">
                <button
                  className="button-main-background btn button-main-size px-4 text-white mr-3"
                  onClick={this.handleCreatingCompany}
                >
                  Update
                </button>
                <button onClick={this.handleClose} className="btn button-main-size btn-outline-secondary px-4">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
