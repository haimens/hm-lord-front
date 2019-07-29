import React, { Component } from "react";
import alertify from "alertifyjs";
import { parseAmount } from "../../../../actions/utilities.action";

export default class PaymentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nonce: undefined,
      creditCardButton: false,
      cashButton: false
    };
    this.requestCardNonce = this.requestCardNonce.bind(this);
  }

  requestCardNonce() {
    this.paymentForm.requestCardNonce();
  }
  handleFinishOrder = () => {
    if (this.state.cashButton) {
      this.props.handleFinishOrder("cash");
    } else {
      this.requestCardNonce();
    }
  };
  submitCash = () => {
    this.setState(state => ({ cashButton: !state.cashButton, nonce: undefined }));
  };

  handleNoneReceived = (nonce, data) => {
    this.props.handleNoneReceived(nonce);
  };
  componentDidMount() {
    const { square_application_id, square_access_token } = this.props.realm_list_in_lord.payment_resource_info;
    const config = {
      applicationId: square_application_id,
      locationId: square_access_token,
      inputClass: "sq-input",
      autoBuild: false,
      inputStyles: [
        {
          fontSize: "16px",
          fontFamily: "Helvetica Neue",
          padding: "16px",
          color: "#373F4A",
          backgroundColor: "transparent",
          lineHeight: "1.15em",
          placeholderColor: "#000",
          _webkitFontSmoothing: "antialiased",
          _mozOsxFontSmoothing: "grayscale"
        }
      ],
      cardNumber: {
        elementId: "sq-card-number",
        placeholder: "• • • •  • • • •  • • • •  • • • •"
      },
      cvv: {
        elementId: "sq-cvv",
        placeholder: "CVV"
      },
      expirationDate: {
        elementId: "sq-expiration-date",
        placeholder: "MM/YY"
      },
      postalCode: {
        elementId: "sq-postal-code",
        placeholder: "Zip"
      },
      callbacks: {
        // createPaymentRequest: () => {
        //   return {
        //     requestShippingAddress: false,
        //     requestBillingInfo: true,
        //     currencyCode: "USD",
        //     countryCode: "US",
        //     total: {
        //       label: "MERCHANT NAME",
        //       amount: "1",
        //       pending: false
        //     },
        //     lineItems: [
        //       {
        //         label: "Subtotal",
        //         amount: "1",
        //         pending: false
        //       }
        //     ]
        //   };
        // },

        cardNonceResponseReceived: (errors, nonce, cardData) => {
          if (errors) {
            // Log errors from nonce generation to the Javascript console
            errors.forEach(function(error) {
              alertify.alert("  " + error.message);
            });

            return;
          }
          this.setState({ creditCardButton: true, cashButton: false });

          this.handleNoneReceived(nonce, cardData);
          this.props.handleFinishOrder("card");

          // TODO: Connect to pay back end
        },
        unsupportedBrowserDetected: () => {},
        inputEventReceived: inputEvent => {
          switch (inputEvent.eventType) {
            case "focusClassAdded":
              break;
            case "focusClassRemoved":
              break;
            case "errorClassAdded":
              alertify.alert("Error", "Please fix card information errors before continuing.");
              break;
            case "cardBrandChanged":
              if (inputEvent.cardBrand !== "unknown") {
                this.setState({
                  cardBrand: inputEvent.cardBrand
                });
              } else {
                this.setState({
                  cardBrand: ""
                });
              }
              break;
            case "postalCodeChanged":
              break;
            default:
              break;
          }
        }
      }
    };
    this.paymentForm = new this.props.paymentForm(config);
    this.paymentForm.build();
  }

  render() {
    const { cashButton } = this.state;
    const { order_detail } = this.props;
    return (
      <div className="row pt-2 mb-4 pb-5" id="sq-ccbox">
        <div className="col-8">
          <div className="rounded-custom bg-white shadow-sm">
            <div className="d-flex justify-content-between align-items-center px-3 border-bottom-custom h-100">
              <h6
                className="d-block d-flex align-items-center hm-title-sub-size text-main-color font-weight-bold"
                style={{ height: "65px" }}
              >
                Pay Now
              </h6>
              {/* <div>
                <img className="ml-2" src={`${process.env.PUBLIC_URL}/img/logo_visa.png`} alt="visa" />
                <img className="ml-2" src={`${process.env.PUBLIC_URL}/img/logo_master.png`} alt="master" />
                <img className="ml-2" src={`${process.env.PUBLIC_URL}/img/logo_ae.png`} alt="ae" />
                <img className="ml-2" src={`${process.env.PUBLIC_URL}/img/logo_discover.png`} alt="discover" />
              </div> */}
              <div>
                <div className="hm-title-sub-size text-main-color font-weight-bold">
                  Total:{" "}
                  <span className="hm-title-sub-size text-main-color font-weight-bold">
                    {order_detail && parseAmount(order_detail.order_info.amount, 2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3">
              <div id="sq-ccbox">
                <div id="cc-field-wrapper">
                  <label htmlFor="card" className="hm-text-14 text-main-color font-weight-bold">
                    Card Number
                  </label>
                  <div id="sq-card-number" />

                  <input type="hidden" id="card-nonce" name="nonce" />
                  <label htmlFor="card" className="hm-text-14 text-main-color font-weight-bold">
                    Expiration Date (MM/YY)
                  </label>

                  <div id="sq-expiration-date" />
                  <label htmlFor="card" className="hm-text-14 text-main-color font-weight-bold mt-3">
                    CVV (3 digits)
                  </label>

                  <div id="sq-cvv" />
                </div>
                <label htmlFor="card" className="hm-text-14 text-main-color font-weight-bold mt-3">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control hm-input-height"
                  placeholder="Name"
                  id="name"
                  onChange={this.handleInputChange}
                />
                <label htmlFor="card" className="hm-text-14 text-main-color font-weight-bold mt-3">
                  Zip Code
                </label>
                <div id="sq-postal-code" />
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
            {/* <div className="px-3 py-4">
              <div
                className="px-4 py-3 d-flex justify-content-between align-items-center rounded-custom shadow-sm text-white"
                style={{ backgroundColor: "#12ccef", height: "78px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={`${process.env.PUBLIC_URL}/img/icon_creditcard.svg`}
                    style={{ width: "30px", height: "20px" }}
                    alt="company"
                  />
                  <div className="ml-lg-5 ml-0  hm-text-15 font-weight-bold">Credit Card</div>
                </div>
                {!creditCardButton ? (
                  <button
                    className="btn bg-white shadow-sm text-purple hm-text-12"
                    onClick={this.requestCardNonce}
                    style={{ width: "56px", height: "28px" }}
                  >
                    Select
                  </button>
                ) : (
                  <button className="btn border-white text-white hm-text-12" disabled>
                    <i className="fas fa-check mr-3 hm-text-12" />
                    Selected
                  </button>
                )}
              </div>
            </div> */}
            <div className="px-3 mt-4 pb-4">
              <div
                className="px-4 py-3 d-flex justify-content-between align-items-center rounded-custom shadow-sm text-white"
                style={{ backgroundColor: "#2ece89", height: "78px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={`${process.env.PUBLIC_URL}/img/icon_cash.svg`}
                    style={{ width: "30px", height: "20px" }}
                    alt="company"
                  />
                  <div className="ml-lg-5 ml-0 hm-text-15 font-weight-bold">Cash</div>
                </div>
                {!cashButton ? (
                  <button
                    className="btn bg-white shadow-sm text-purple hm-text-12"
                    onClick={this.submitCash}
                    style={{ width: "56px", height: "28px" }}
                  >
                    Select
                  </button>
                ) : (
                  <button className="btn border-white text-white hm-text-12" onClick={this.submitCash}>
                    <i className="fas fa-check mr-3 hm-text-12" />
                    Selected
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-5 pb-5">
            <button
              className="btn trip-button-width rounded-custom text-white button-main-background shadow-sm hm-text-12"
              onClick={this.handleFinishOrder}
            >
              Finished
            </button>
          </div>
        </div>
      </div>
    );
  }
}
