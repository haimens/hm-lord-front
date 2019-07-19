import React, { Component } from "react";
import Modal from "./Modal";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import {
  parseAmountNoSymbol,
  convertUTCtoLocal,
  parseRate,
  parseAmount,
  convertLocalToUTC
} from "../../actions/utilities.action";
import alertify from "alertifyjs";
import moment from "moment";
import Paragraph from "antd/lib/skeleton/Paragraph";
import "./EmailPreviewModa.modal.css";
/**
 * InvoicePreviewModal
 */
export default class InvoicePreviewModal extends Component {
  state = {
    address: ""
  };
  handleClose = () => {
    if (this.props.onClose) this.props.onClose();
  };

  handleEmailSend = async () => {
    const { customer_info, order_info } = this.props.order_detail;

    await this.props.sendEmailToConfirm(customer_info.customer_token, {
      title: "order_confirmation",
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
      });
    }
  }

  renderHTML = () => {
    const { customer_info, order_info, addon_list, trip_list } = this.props.order_detail;

    const renderAddressInfo = () => {
      if (trip_list.length > 0) {
        const addon_list_html = trip_list.map((trip, idx) => {
          return `

          <table class="email-footer pb-0" align="center" width="570" cellpadding="0" cellspacing="0">
          <tr>
            <td class="content-cell purchase_heading" align="center">
              <p class="sub align-center font-weight-bold pb-3 border-bottom">Trip #${idx + 1}</p>
            </td>
          </tr>
        </table>
                      <table class="purchase" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td colspan="2">
          <tr>
          <th class="purchase_heading">
            <p>From Address</p>
          </th>
          <th class="purchase_heading">
            <p class="align-right">${trip.from_addr_str}</p>
          </th>
        </tr>
        <tr>
          <th class="purchase_heading">
            <p>To Address</p>
          </th>
          <th class="purchase_heading">
            <p class="align-right">${trip.to_addr_str}</p>
          </th>
        </tr>
        <tr >
        <th class="purchase_heading">
          <p>Pickup Time</p>
        </th>
        <th class="purchase_heading">
          <p class="align-right">${convertUTCtoLocal(trip.pickup_time)}</p>
        </th>
      </tr>
      </td>
      </tr>
    </table>
  `;
        });

        return addon_list_html;
      } else {
        return `<div></div>`;
      }
    };

    const renderAddonInfo = () => {
      if (addon_list.length > 0) {
        const addon_list_html = addon_list.map((order, idx) => {
          return `<tr>
          <th class="purchase_heading">
            <p>${order.note}</p>
          </th>
          <th class="purchase_heading">
            <p class="align-right">${parseAmount(order.amount, 2)}</p>
          </th>
        </tr>`;
        });

        return addon_list_html;
      } else {
        return `<div></div>`;
      }
    };

    const renderTripInfo = () => {
      if (trip_list.length > 0) {
        const addon_list_html = trip_list.map((trip, idx) => {
          return `<tr>
          <th class="purchase_heading">
            <p>Trip #${idx + 1}</p>
          </th>
          <th class="purchase_heading">
            <p class="align-right">${parseAmount(trip.amount, 2)}</p>
          </th>
        </tr>`;
        });

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
                      <p>Thanks for using ${localStorage.getItem(
                        "company_name"
                      )}. This email is to confirm for your purchase.</p>
                            
                            ${renderAddressInfo()}
                   
       
                            <table class="email-footer pb-0" align="center" width="570" cellpadding="0" cellspacing="0">
                            <tr>
                              <td class="content-cell purchase_heading" align="center">
                                <p class="sub align-center font-weight-bold pb-3 border-bottom">Detail</p>
                              </td>
                            </tr>
                          </table>
                      <table class="purchase" width="100%" cellpadding="0" cellspacing="0">
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
                              <th class="purchase_heading">
                                <p>Total</p>
                              </th>
                              <th class="purchase_heading">
                                <p class="align-right">${parseAmount(order_info.amount, 2)}</p>
                              </th>
                            </tr>

                            </table>
                          </td>
                        </tr>
                      </table>
                      <p>If you have any questions about this receipt, simply reply to this email or reach out to our support team for help.</p>
                      <p>Cheers,
                        <br>The ${localStorage.getItem("company_name")} Team</p>
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
                      ${localStorage.getItem("company_name")}, LLC
                        <br>${this.state.address}
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
