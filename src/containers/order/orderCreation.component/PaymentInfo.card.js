import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PaymentCard from "./PaymentCard";
import "./PaymentInfo.card.css";
class PaymentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round_trip: false,
      loaded: false
    };
  }
  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleRoundTripButton = () => {
    this.setState(state => ({ round_trip: !state.round_trip }));
  };

  async componentWillMount() {
    const that = this;
    let sqPaymentScript = document.createElement("script");
    sqPaymentScript.src = "https://js.squareup.com/v2/paymentform";
    sqPaymentScript.type = "text/javascript";
    sqPaymentScript.async = false;
    sqPaymentScript.onload = () => {
      that.setState({
        loaded: true
      });
    };
    document.getElementsByTagName("head")[0].appendChild(sqPaymentScript);
  }

  render() {
    const { customer_list_in_lord } = this.props;
    const { round_trip, loaded } = this.state;
    return (
      <div>
        {loaded && <PaymentCard paymentForm={window.SqPaymentForm} />}
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
