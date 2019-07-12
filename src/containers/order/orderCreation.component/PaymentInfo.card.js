import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class PaymentInfo extends Component {
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
      <div>
        <div className="row pt-2 mb-4">
          <div className="col-8">
            <div className="rounded-custom bg-white shadow-sm">
              <div className="d-flex justify-content-between align-items-center px-3 border-bottom-custom h-100">
                <h6
                  className="d-block d-flex align-items-center hm-title-sub-size text-main-color font-weight-bold"
                  style={{ height: "65px" }}
                >
                  Pay Now
                </h6>
              </div>
              <div className="p-3">
                <div className="form-group my-4 ">
                  <label className="text-main-color hm-text-14 font-weight-bold">Card Number</label>
                  <input
                    className="form-control hm-input-height mt-2"
                    name="name"
                    id="name"
                    placeholder={"Card Number"}
                    onChange={this.handleInputChange}
                  />
                </div>

                <div className="form-group my-4 ">
                  <label className="text-main-color hm-text-14 font-weight-bold">Expiration Date (MM/YY)</label>
                  <input
                    className="form-control hm-input-height mt-2"
                    name="name"
                    id="name"
                    placeholder={"MM/YY"}
                    onChange={this.handleInputChange}
                  />
                </div>

                <div className="form-group my-4 ">
                  <label className="text-main-color hm-text-14 font-weight-bold">CVV (3 digits)</label>
                  <input
                    className="form-control hm-input-height mt-2"
                    name="name"
                    id="name"
                    placeholder={"CVV"}
                    onChange={this.handleInputChange}
                  />
                </div>

                <div className="form-group my-4 ">
                  <label className="text-main-color hm-text-14 font-weight-bold">Zip Code</label>
                  <input
                    className="form-control hm-input-height mt-2"
                    name="name"
                    id="name"
                    placeholder={"Zip Code"}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="rounded-custom bg-white shadow-sm h-100">
              <div
                className="d-flex justify-content-between align-items-center p-3 border-bottom-custom"
                style={{ height: "65px" }}
              >
                <h6 className="d-block d-flex align-items-center hm-title-sub-size text-main-color font-weight-bold">
                  Pay Upon Arrival
                </h6>
              </div>
              <div className="px-3 py-4">
                <div
                  className="px-4 py-3 d-flex justify-content-between align-items-center rounded-custom shadow-sm text-white"
                  style={{ backgroundColor: "#12ccef" }}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={`${process.env.PUBLIC_URL}/img/hd.png`}
                      style={{ width: "48px", height: "48px" }}
                      alt="company"
                      className="rounded-circle shadow-sm"
                    />
                    <div className="ml-5 hm-text-15 font-weight-bold">Sedan</div>
                  </div>
                  <button className="btn bg-white shadow-sm text-purple">Select</button>
                </div>
              </div>
              <div className="px-3 pb-4">
                <div
                  className="px-4 py-3 d-flex justify-content-between align-items-center rounded-custom shadow-sm text-white"
                  style={{ backgroundColor: "#2ece89" }}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={`${process.env.PUBLIC_URL}/img/hd.png`}
                      style={{ width: "48px", height: "48px" }}
                      alt="company"
                      className="rounded-circle shadow-sm"
                    />
                    <div className="ml-5 hm-text-15 font-weight-bold">Sedan</div>
                  </div>
                  <button className="btn bg-white shadow-sm text-purple">Select</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-5">
          <button
            className="btn trip-button-width rounded-custom bg-white text-purple shadow-sm hm-text-12"
            onClick={this.handleRoundTripButton}
          >
            Back
          </button>
          <button className="btn trip-button-width rounded-custom text-white button-main-background shadow-sm hm-text-12">
            Finished
          </button>
        </div>
      </div>
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
)(withRouter(PaymentInfo));
