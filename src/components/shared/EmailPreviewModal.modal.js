import React, { Component } from "react";
import Modal from "./Modal";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { parseAmountNoSymbol, convertUTCtoLocal, parseRate, parseAmount } from "../../actions/utilities.action";
import alertify from "alertifyjs";
import moment from "moment";
import Paragraph from "antd/lib/skeleton/Paragraph";
import "./EmailPreviewModa.modal.css";
/**
 * InvoicePreviewModal
 */
export default class InvoicePreviewModal extends Component {
  handleClose = () => {
    if (this.props.onClose) this.props.onClose();
  };

  handleEmailSend = async () => {
    const { customer_info, order_info } = this.props.order_detail;

    await this.props.sendEmailToConfirm(
      customer_info.customer_token,
      {
        msg: this.html
      },
      this.props.history,
      order_info.order_token
    );
  };

  renderHTML = () => {
    const { customer_info, order_info, addon_list, trip_list } = this.props.order_detail;

    const renderAddonInfo = () => {
      if (addon_list.length > 0) {
        const addon_list_html = addon_list
          .map((order, idx) => {
            return `<tr>
          <td align="left">
          ${order.note}
        </td>
        <td align="right">${parseAmount(order.amount, 2)}</td>
        </tr>`;
          })
          .join("");
        return addon_list_html;
      } else {
        return `<tr></tr>`;
      }
    };

    const renderTripInfo = () => {
      if (trip_list.length > 0) {
        const addon_list_html = trip_list
          .map((trip, idx) => {
            return `<tr>
          <td align="left">
          Trip #${idx + 1}
        </td>
        <td align="right">${parseAmount(trip.amount, 2)}</td>
        </tr>`;
          })
          .join("");
        return addon_list_html;
      } else {
        return `<tr></tr>`;
      }
    };

    const header = `
    <!DOCTYPE html
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
              <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <!--<![endif]-->
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>A Simple Responsive HTML Email</title>
                  <style type="text/css">
                    body {
                      margin: 0;
                    padding: 0;
                    min-width: 100% !important;
                  }
        .content {
                      width: 100%;
                    max-width: 600px;
                  }
      </style>
    </head>
                <body yahoo bgcolor="#f6f8f1" style="margin: 0;padding: 0;min-width: 100% !important;">
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
              <td class="email-body" width="100%" cellpadding="0" cellspacing="0">
                <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="content-cell">
                      <h1 class="hm-text-20">Hi ${customer_info.name},</h1>
                      <p>Thanks for using Sunshire. This email is to confirm for your purchase.</p>
                     
                      <table class="purchase" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <h3 class="hm-text-16">Created Date</h3></td>
                          <td>
                            <h3 class="align-right hm-text-16">${convertUTCtoLocal(order_info.cdate)}</h3></td>
                        </tr>
                        <tr>
                          <td colspan="2">
                            <table class="purchase_content" width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <th class="purchase_heading">
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
                      <p>If you have any questions about this receipt, simply reply to this email or reach out to our support team for help.</p>
                      <p>Cheers,
                        <br>The Sunshire Team</p>
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
                      <p class="sub align-center">&copy; 2019 [Product Name]. All rights reserved.</p>
                      <p class="sub align-center">
                        Sunshire, LLC
                        <br>1234 Street Rd.
                        <br>Suite 1234
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
          <div dangerouslySetInnerHTML={{ __html: this.renderHTML() }} id="capture_it" className="border rounded" />
          <div className="d-flex text-right justify-content-end">
            <div
              className="text-white btn btn-lg text-white mt-3"
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
