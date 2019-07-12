import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, ListHeader, ListView, CouponCard } from "../../../components/shared";

import BasicInfo from "./BasicInfo.card";
import "./TripDetail.card.css";
import TripSubtotal from "./TripSubtotal.card";
import TipCard from "./Tip.card";
import AddonCard from "./Addon.card";
class TripDetail extends Component {
  state = {
    round_trip: false
  };
  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleRoundTripButton = () => {
    this.setState(state => ({ round_trip: !state.round_trip }));
  };
  componentDidMount() {}
  render() {
    const { customer_list_in_lord } = this.props;
    const { round_trip } = this.state;
    return (
      <section>
        <div className="mb-4">
          <div className="bg-white rounded-custom shadow-sm">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6 col-12 mb-4">
                  <div className="hm-title-sub-size font-weight-bold text-modal-color p-4">Trip 1</div>
                  <BasicInfo showEditButton={true} />
                </div>
                <div className="col-lg-6 col-12 mb-4">
                  <div className="text-right hm-title-sub-size font-weight-bold text-modal-color p-4">
                    <span className="hm-title-sub-size font-weight-bold text-secondary-color text-modal-color mr-3">
                      Trip 1 Subtotal:
                    </span>
                    ${100}
                  </div>
                  <TripSubtotal />
                </div>
                <div className="col-lg-6 col-12 mb-4">
                  <TipCard showEditButton={true} />
                </div>
                <div className="col-lg-6 col-12 mb-4">
                  <AddonCard showEditButton={true} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="bg-white rounded-custom shadow-sm">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6 col-12 mb-4">
                  <div className="hm-title-sub-size font-weight-bold text-modal-color p-4">Trip 2</div>
                  <BasicInfo showEditButton={true} />
                </div>
                <div className="col-lg-6 col-12 mb-4">
                  <div className="text-right hm-title-sub-size font-weight-bold text-modal-color p-4">
                    <span className="hm-title-sub-size font-weight-bold text-secondary-color text-modal-color mr-3">
                      Trip 2 Subtotal:
                    </span>
                    ${100}
                  </div>
                  <TripSubtotal />
                </div>
                <div className="col-lg-6 col-12 mb-4">
                  <TipCard showEditButton={true} />
                </div>
                <div className="col-lg-6 col-12 mb-4">
                  <AddonCard showEditButton={true} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 bg-white rounded-custom shadow-sm">
          <ListHeader
            parentProps={{
              title: "Coupon List",
              clickFunction: this.handleShowCouponModal,
              clickTitle: "Coupon"
            }}
            hideShadow={true}
            buttonWidth={"88px"}
          />
          <div className="container-fluid">
            <div className="row ">
              <div className="col-4">
                <div className="form-group mb-4">
                  <label htmlFor="Name">Name</label>
                  <input
                    className="form-control hm-input-height"
                    name="name"
                    id="name"
                    placeholder={"Name"}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group mb-4">
                  <label htmlFor="Name">Name</label>
                  <input
                    className="form-control hm-input-height"
                    name="name"
                    id="name"
                    placeholder={"Name"}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group mb-4">
                  <label htmlFor="Name">Name</label>
                  <input
                    className="form-control hm-input-height"
                    name="name"
                    id="name"
                    placeholder={"Name"}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group mb-4">
                  <label htmlFor="Name">Name</label>
                  <input
                    className="form-control hm-input-height"
                    name="name"
                    id="name"
                    placeholder={"Name"}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 bg-white rounded-custom shadow-sm">
          <ListHeader
            parentProps={{
              title: "Coupon List",
              clickFunction: this.handleShowCouponModal,
              clickTitle: "Coupon"
            }}
            hideShadow={true}
            buttonWidth={"88px"}
          />
          <div className="row p-3 triplist-scroll">
            <CouponCard />
          </div>
        </div>
        <div className="mb-4 bg-white rounded-custom shadow-sm">
          <ListHeader
            parentProps={{
              title: "Price Breakdown",
              clickFunction: this.handleShowCouponModal,
              clickTitle: "Coupon"
            }}
            hideShadow={true}
            hideButton={true}
          />
          <div className="container">
            <div className="d-flex justify-content-between border-bottom-custom">
              <div className="">Trip Subtotal:</div>
              <div className="">Trip Subtotal:</div>
            </div>
            <div className="d-flex justify-content-between border-bottom-custom">
              <div className="">Trip Subtotal:</div>
              <div className="">Trip Subtotal:</div>
            </div>
            <div className="d-flex justify-content-between border-bottom-custom">
              <div className="">Trip Subtotal:</div>
              <div className="">Trip Subtotal:</div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="">Trip Subtotal:</div>
              <div className="">Trip Subtotal:</div>
            </div>
          </div>
          <div className="p-4 border-top">
            <div className="d-flex justify-content-between">
              <button>123</button>
              <button>123</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TripDetail));
