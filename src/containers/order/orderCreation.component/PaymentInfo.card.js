import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PaymentCard from "./PaymentInfo.component/PaymentCard";
import { findRealmDetailInLord } from "../../../actions/settings.action";
import { handleSubmitAPaymentInLord } from "../../../actions/payment.action";
import "./PaymentInfo.card.css";
class PaymentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round_trip: false,
      loaded: false,
      nonce: "",
      isCreditCard: true
    };
  }
  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleRoundTripButton = () => {
    this.setState(state => ({ round_trip: !state.round_trip }));
  };

  handleNoneReceived = nonce => {
    this.setState({ nonce });
  };

  handleFinishOrder = () => {
    const { current_order, handleSubmitAPaymentInLord } = this.props;
    const { isCreditCard } = this.state;
    if (isCreditCard) {
      handleSubmitAPaymentInLord(current_order.order_token, { card_nonce: this.state.nonce });
    }
    this.props.history.push("/order/list");
  };
  isCreditCard = bool => {
    this.setState({ isCreditCard: bool });
  };

  async componentWillMount() {
    const that = this;
    await this.props.findRealmDetailInLord();
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
    const { realm_list_in_lord } = this.props;
    const { round_trip, loaded } = this.state;
    return (
      <div>
        {loaded && (
          <PaymentCard
            isCreditCard={this.isCreditCard}
            handleNoneReceived={this.handleNoneReceived}
            realm_list_in_lord={realm_list_in_lord}
            paymentForm={window.SqPaymentForm}
          />
        )}
        <div className="d-flex justify-content-end mt-5">
          <button
            className="btn trip-button-width rounded-custom text-white button-main-background shadow-sm hm-text-12"
            onClick={this.handleFinishOrder}
          >
            Finished
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    realm_list_in_lord: state.settingsReducer.realm_list_in_lord,
    current_order: state.orderReducer.current_order
  };
};
const mapDispatchToProps = { findRealmDetailInLord, handleSubmitAPaymentInLord };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PaymentInfo));
