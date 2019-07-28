import React, { Component } from "react";
import { convertUTCtoLocal, parseAmount } from "../../actions/utilities.action";
import Modal from "./Modal";
import "./EmailPreviewModa.modal.css";
/**
 * InvoicePreviewModal
 */
export default class EmailPreviewModal extends Component {
  state = {
    address: ""
  };
  handleClose = () => {
    if (this.props.onClose) this.props.onClose();
  };

  handleEmailSend = async () => {
    const { customer_info } = this.props.order_detail;

    await this.props.sendEmailToConfirm(customer_info.customer_token, {
      title: "Order Confirmation",
      msg: this.html
    });
    this.handleClose();
  };

  componentDidMount() {
    if (this.props.general_setting_list_in_lord) {
      this.props.general_setting_list_in_lord.record_list.map(setting => {
        if (setting.key === "company_address") {
          this.setState({ address: setting.value });
        }
        return null;
      });
    }
  }

  renderHTML = () => {
    const { customer_info, order_info, addon_list, trip_list } = this.props.order_detail;

    const renderAddressInfo = () => {
      if (trip_list.length > 0) {
        let string = "";
        trip_list.map((trip, idx) => {
          string += `             <tr>
          <th class="purchase_heading align-left">
            <p>Trip #${idx + 1}</p>
          </th>
          <th class="purchase_heading">
            <p class="align-right">Detail</p>
          </th>
        </tr><tr><td width="20%" class="purchase_item align-left" >From Address</td><td class="align-right" width="80%" class="purchase_item" align="middle">${
          trip.from_addr_str
        }</td></tr>
        `;
          string += `<tr><td width="20%" class="purchase_item align-left" >To Address</td><td class="align-right" width="80%" class="purchase_item" align="middle">${
            trip.to_addr_str
          }</td></tr>
      `;
          string += `<tr><td width="20%" class="purchase_item align-left" >Pickup Time</td><td class="align-right" width="80%" class="purchase_item" align="middle">${convertUTCtoLocal(
            trip.pickup_time
          )}</td></tr>
  `;
          return null;
        });
        return string;
      } else {
        return `<div></div>`;
      }
    };

    const renderAddonInfo = () => {
      if (addon_list.length > 0) {
        let string = "";
        trip_list.map(order => {
          string += `<tr><td width="80%" class="purchase_item align-left" >Trip #${
            order.note
          }</td><td class="align-right" width="20%" class="purchase_item" align="middle">${parseAmount(
            order.amount,
            2
          )}</td></tr>
      `;
          return null;
        });
        return string;
      } else {
        return `<div></div>`;
      }
    };

    const renderTripInfo = () => {
      if (trip_list.length > 0) {
        let string = "";
        trip_list.map((trip, idx) => {
          string += `<tr><td width="80%" class="purchase_item align-left" >Trip #${idx +
            1}</td><td class="align-right" width="20%" class="purchase_item" align="middle">${parseAmount(
            trip.amount,
            2
          )}</td></tr>
        `;
          return null;
        });
        return string;
      } else {
        return `<div></div>`;
      }
    };

    const header = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Please pay {{ total }} due by {{ due_date }}</title>

    <style type="text/css" rel="stylesheet" media="all">
    
    *:not(br):not(tr):not(html) {
      font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
      box-sizing: border-box;
    }
    
    body {
      width: 100% !important;
      height: 100%;
      margin: 0;
      line-height: 1.4;
      background-color: #F2F4F6;
      color: #74787E;
      -webkit-text-size-adjust: none;
    }
    
    p,
    ul,
    ol,
    blockquote {
      line-height: 1.4;
      text-align: left;
    }
    
    a {
      color: #3869D4;
    }
    
    a img {
      border: none;
    }
    
    td {
      word-break: break-word;
    }
    /* Layout ------------------------------ */
    
    .email-wrapper {
      width: 100%;
      margin: 0;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      background-color: #F2F4F6;
    }
    
    .email-content {
      width: 100%;
      margin: 0;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    /* Masthead ----------------------- */
    
    .email-masthead {
      padding: 25px 0;
      text-align: center;
    }
    
    .email-masthead_logo {
      width: 94px;
    }
    
    .email-masthead_name {
      font-size: 16px;
      font-weight: bold;
      color: #bbbfc3;
      text-decoration: none;
      text-shadow: 0 1px 0 white;
    }
    /* Body ------------------------------ */
    
    .email-body {
      width: 100%;
      margin: 0;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      border-top: 1px solid #EDEFF2;
      border-bottom: 1px solid #EDEFF2;
      background-color: #FFFFFF;
    }
    
    .email-body_inner {
      width: 570px;
      margin: 0 auto;
      padding: 0;
      -premailer-width: 570px;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      background-color: #FFFFFF;
    }
    
    .email-footer {
      width: 570px;
      margin: 0 auto;
      padding: 0;
      -premailer-width: 570px;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      text-align: center;
    }
    
    .email-footer p {
      color: #AEAEAE;
    }
    
    .body-action {
      width: 100%;
      margin: 30px auto;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      text-align: center;
    }
    
    .body-sub {
      margin-top: 25px;
      padding-top: 25px;
      border-top: 1px solid #EDEFF2;
    }
    
    .content-cell {
      padding: 35px;
    }
    
    .preheader {
      display: none !important;
      visibility: hidden;
      mso-hide: all;
      font-size: 1px;
      line-height: 1px;
      max-height: 0;
      max-width: 0;
      opacity: 0;
      overflow: hidden;
    }
    /* Attribute list ------------------------------ */
    
    .attributes {
      margin: 0 0 21px;
    }
    
    .attributes_content {
      background-color: #EDEFF2;
      padding: 16px;
    }
    
    .attributes_item {
      padding: 0;
    }
    /* Related Items ------------------------------ */
    
    .related {
      width: 100%;
      margin: 0;
      padding: 25px 0 0 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    
    .related_item {
      padding: 10px 0;
      color: #74787E;
      font-size: 15px;
      line-height: 18px;
    }
    
    .related_item-title {
      display: block;
      margin: .5em 0 0;
    }
    
    .related_item-thumb {
      display: block;
      padding-bottom: 10px;
    }
    
    .related_heading {
      border-top: 1px solid #EDEFF2;
      text-align: center;
      padding: 25px 0 10px;
    }
    /* Discount Code ------------------------------ */
    
    .discount {
      width: 100%;
      margin: 0;
      padding: 24px;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      background-color: #EDEFF2;
      border: 2px dashed #9BA2AB;
    }
    
    .discount_heading {
      text-align: center;
    }
    
    .discount_body {
      text-align: center;
      font-size: 15px;
    }
    /* Social Icons ------------------------------ */
    
    .social {
      width: auto;
    }
    
    .social td {
      padding: 0;
      width: auto;
    }
    
    .social_icon {
      height: 20px;
      margin: 0 8px 10px 8px;
      padding: 0;
    }
    /* Data table ------------------------------ */
    
    .purchase {
      width: 100%;
      margin: 0;
      padding: 35px 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    
    .purchase_content {
      width: 100%;
      margin: 0;
      padding: 25px 0 0 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    
    .purchase_item {
      padding: 10px 0;
      color: #74787E;
      font-size: 12px;
      line-height: 18px;
    }
    
    .purchase_heading {
      padding-bottom: 8px;
      padding-left: 0px;
      border-bottom: 1px solid #EDEFF2;
    }
    
    .purchase_heading p {
      margin: 0;
      color: #9BA2AB;
      font-size: 12px;
    }
    
    .purchase_footer {
      padding-top: 15px;
      border-top: 1px solid #EDEFF2;
    }
    
    .purchase_total {
      margin: 0;
      text-align: right;
      font-weight: bold;
      color: #2F3133;
    }
    
    .purchase_total--label {
      padding: 0 15px 0 0;
    }
    /* Utilities ------------------------------ */
    
    .align-right {
      text-align: right;
    }
    
    .align-left {
      text-align: left;
    }
    
    .align-center {
      text-align: center;
    }
    /*Media Queries ------------------------------ */
    
    @media only screen and (max-width: 600px) {
      .email-body_inner,
      .email-footer {
        width: 100% !important;
      }
    }
    
    @media only screen and (max-width: 500px) {
      .button {
        width: 100% !important;
      }
    }
    /* Buttons ------------------------------ */
    
    .button {
      background-color: #3869D4;
      border-top: 10px solid #3869D4;
      border-right: 18px solid #3869D4;
      border-bottom: 10px solid #3869D4;
      border-left: 18px solid #3869D4;
      display: inline-block;
      color: #FFF;
      text-decoration: none;
      border-radius: 3px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
      -webkit-text-size-adjust: none;
    }
    
    .button--green {
      background-color: #22BC66;
      border-top: 10px solid #22BC66;
      border-right: 18px solid #22BC66;
      border-bottom: 10px solid #22BC66;
      border-left: 18px solid #22BC66;
    }
    
    .button--red {
      background-color: #FF6136;
      border-top: 10px solid #FF6136;
      border-right: 18px solid #FF6136;
      border-bottom: 10px solid #FF6136;
      border-left: 18px solid #FF6136;
    }
    /* Type ------------------------------ */
    
    h1 {
      margin-top: 0;
      color: #2F3133;
      font-size: 19px;
      font-weight: bold;
      text-align: left;
    }
    
    h2 {
      margin-top: 0;
      color: #2F3133;
      font-size: 16px;
      font-weight: bold;
      text-align: left;
    }
    
    h3 {
      margin-top: 0;
      color: #2F3133;
      font-size: 14px;
      font-weight: bold;
      text-align: left;
    }
    
    p {
      margin-top: 0;
      color: #74787E;
      font-size: 16px;
      line-height: 1.5em;
      text-align: left;
    }
    
    p.sub {
      font-size: 12px;
    }
    
    p.center {
      text-align: center;
    }
    </style>
  </head>
  <body>
                  `;
    const footer = `
      </body>
    </html>
              `;
    const html = `
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td class="email-masthead">
                ${localStorage.getItem("company_name")}
            </td>
          </tr>
          <tr>
            <td class="email-body" width="100%" cellpadding="0" cellspacing="0">
              <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="content-cell">
                    <h1>Hi ${customer_info.name},</h1>
                    <p>Thanks for using ${localStorage.getItem(
                      "company_name"
                    )}. This is an receipt for your recent purchase.</p>
                    <table class="attributes" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td class="attributes_content">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td class="attributes_item"><strong>Amount Due:</strong>${parseAmount(
                                order_info.amount,
                                2
                              )}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <table class="purchase" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <h3>Created Date</h3></td>
                        <td>
                          <h3 class="align-right">${convertUTCtoLocal(order_info.cdate)}</h3></td>
                      </tr>
                      <tr>
                      <td colspan="2">
                        <table class="purchase_content" width="100%" cellpadding="0" cellspacing="0">
                            ${renderAddressInfo()}
                      </table>
                    </td>
                  </tr>
                      <tr>
                        <td colspan="2">
                          <table class="purchase_content" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <th class="purchase_heading align-left">
                                <p>Description</p>
                              </th>
                              <th class="purchase_heading">
                                <p class="align-right">Amount</p>
                              </th>
                            </tr>
                              ${renderAddonInfo()}
                              ${renderTripInfo()}
                            <tr>
                              <td width="80%" class="purchase_footer" valign="middle">
                                <p class="purchase_total purchase_total--label">Total</p>
                              </td>
                              <td width="20%" class="purchase_footer" valign="middle">
                                <p class="purchase_total">${parseAmount(order_info.amount, 2)}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="content-cell" align="center">
                    <p class="sub align-center">&copy; 2019 ${localStorage.getItem(
                      "company_name"
                    )}. All rights reserved.</p>
                    <p class="sub align-center">
                      ${this.state.address}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
            `;
    this.html = header + html + footer;
    return this.html;
  };

  render() {
    return (
      <Modal
        hideHeader={true}
        position="center"
        getWidth="700px"
        onClose={this.handleClose}
        headerContainerClassName={"athena-modal-title-dark"}
      >
        <section
          style={{
            padding: "30px",
            width: "600px",
            minHeight: "200mm",
            marginLeft: "auto",
            marginRight: "auto",
            margin: "auto"
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: this.renderHTML() }} id="capture_it" className="rounded" />
          <div className="d-flex text-right justify-content-end">
            <div
              className="text-white btn btn-md text-white mt-3 hm-pointer-cursor"
              style={{ backgroundColor: "#5e72e4" }}
              onClick={this.handleEmailSend}
            >
              Send Email
            </div>
          </div>
        </section>
      </Modal>
    );
  }
}
