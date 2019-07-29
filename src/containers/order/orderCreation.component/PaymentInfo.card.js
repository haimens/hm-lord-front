import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PaymentCard from "./PaymentInfo.component/PaymentCard";
import { findRealmDetailInLord } from "../../../actions/settings.action";
import { handleSubmitAPaymentInLord } from "../../../actions/payment.action";
import { findOrderDetailInLord } from "../../../actions/order.action";
import "./PaymentInfo.card.css";
class PaymentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round_trip: false,
      loaded: false,
      nonce: "",
      type: ""
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

  handleFinishOrder = type => {
    const { current_order, handleSubmitAPaymentInLord, history } = this.props;
    if (type === "card") {
      handleSubmitAPaymentInLord(current_order.order_token, { card_nonce: this.state.nonce, type: 1 }, history);
    } else {
      handleSubmitAPaymentInLord(current_order.order_token, { type: 3 }, history);
    }
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

  componentDidMount() {
    const { findOrderDetailInLord, current_order } = this.props;
    if (current_order && current_order.order_token) {
      findOrderDetailInLord(current_order.order_token);
    } else if (this.props.match && this.props.match.params && this.props.match.params.order_token) {
      findOrderDetailInLord(this.props.match.params.order_token);
    } else {
      this.props.history.push("/order/list");
    }
  }

  render() {
    const { realm_list_in_lord, order_detail } = this.props;
    const { loaded } = this.state;
    return (
      <div>
        {loaded && (
          <PaymentCard
            order_detail={order_detail}
            handleFinishOrder={this.handleFinishOrder}
            handleNoneReceived={this.handleNoneReceived}
            realm_list_in_lord={realm_list_in_lord}
            paymentForm={window.SqPaymentForm}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    realm_list_in_lord: state.settingsReducer.realm_list_in_lord,
    order_detail: state.orderReducer.order_detail,
    current_order: state.orderReducer.current_order
  };
};
const mapDispatchToProps = { findRealmDetailInLord, findOrderDetailInLord, handleSubmitAPaymentInLord };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PaymentInfo));
