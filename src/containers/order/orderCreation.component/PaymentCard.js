import React, { Component } from "react";
import alertify from "alertifyjs";

export default class PaymentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nonce: undefined
    };
    this.requestCardNonce = this.requestCardNonce.bind(this);
  }

  requestCardNonce() {
    this.paymentForm.requestCardNonce();
  }

  handleNoneReceived = (nonce, data) => {
    console.log(nonce);
  };
  componentDidMount() {
    const config = {
      applicationId: "sq0idp-3ASxoXTMofredU3wDxTCrg",
      locationId: "EAAAECB5ainjUZT0Bln5XMBwxmjOlOm7B0oAUmTg1cAIUyewbaoHfgCjfor9FO5M",
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
          this.handleNoneReceived(nonce, cardData);
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
              document.getElementById("error").innerHTML = "Please fix card information errors before continuing.";
              break;
            case "errorClassRemoved":
              document.getElementById("error").style.display = "none";
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
        },
        paymentFormLoaded: function() {
          if (document.getElementById("name").style.display) {
            document.getElementById("name").style.display = "inline-flex";
          }
        }
      }
    };
    this.paymentForm = new this.props.paymentForm(config);
    this.paymentForm.build();
  }

  render() {
    return (
      <div className="row pt-2 mb-4" id="sq-ccbox">
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
                <button className="btn bg-white shadow-sm text-purple" onClick={this.requestCardNonce}>
                  Select
                </button>
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
    );
  }
}
