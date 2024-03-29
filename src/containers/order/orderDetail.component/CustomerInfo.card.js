import React from "react";
import { convertUTCtoLocal } from "../../../actions/utilities.action";

export default function BasicInfo(props) {
  const handleSentConfirmButton = () => {
    let message = `There are total of ${props.order_detail.trip_list.length} trip. `;
    props.order_detail.trip_list.map(
      (trip, index) =>
        (message += ` Trip #${index + 1},  From ${trip.from_addr_str}, To: ${
          trip.to_addr_str
        }, and Pickup Time is ${convertUTCtoLocal(trip.pickup_time)}`)
    );

    props.createAMessageWithCustomer(
      customer_token,
      {
        message: `Your Trip has been confirmed. ${message}`,
        title: `From Admin-${localStorage.getItem("name")}`
      },
      true
    );
  };
  const { order_detail, history, setCustomerChat } = props;
  const { name, cell, email, img_path, addr_str, note, customer_token } = order_detail.customer_info;
  return (
    <>
      <div>
        <div className="purple-border">
          <div className="d-flex justify-content-between align-items-center  ">
            <div className="hm-text-16 font-weight-bold text-modal-color">Customer Information</div>
            <div className="d-flex">
              <img
                src={`${process.env.PUBLIC_URL}/img/icon_chat.svg`}
                alt="Customer"
                className="rounded-circle my-3 hm-pointer-cursor"
                style={{ height: "25px", width: "25px" }}
                onClick={() => setCustomerChat({ customer_name: name, customer_token })}
              />
              <img
                src={`${process.env.PUBLIC_URL}/img/icon_detail.svg`}
                alt="Customer"
                className="rounded-circle my-3 hm-pointer-cursor ml-2"
                style={{ height: "25px", width: "25px" }}
                onClick={() => history.push(`/customer/detail/${customer_token}`)}
              />
            </div>
          </div>
          <img
            src={img_path}
            alt="Customer"
            className="rounded-circle my-3"
            style={{ height: "74px", width: "74px" }}
          />
        </div>
        <div className="mb-4">
          <div className="text-secondary-color font-weight-500 hm-text-14">Customer Name</div>
          <div className="hm-text-14 font-weight-bold text-modal-color">{name}</div>
        </div>
        <div className="mb-4">
          <div className="text-secondary-color font-weight-500 hm-text-14">Cell</div>
          <div className="hm-text-14 font-weight-bold text-modal-color">{cell}</div>
        </div>
        <div className="mb-4">
          <div className="text-secondary-color font-weight-500 hm-text-14">Email</div>
          <div className="hm-text-14 font-weight-bold text-modal-color">{email}</div>
        </div>
        <div className="mb-4">
          <div className="text-secondary-color font-weight-500 hm-text-14">Address</div>
          <div className="hm-text-14 font-weight-bold text-modal-color">{addr_str}</div>
        </div>
        <div className="mb-4">
          <div className="text-secondary-color font-weight-500 hm-text-14">Special Note</div>
          <div className="hm-text-14 font-weight-bold text-modal-color">{note ? note : "N/A"}</div>
        </div>
        <div className="mb-4">
          <button
            className="btn shadow-sm rounded-custom button-main-background text-white"
            style={{ height: "43px", width: "168px" }}
            onClick={() => props.handleShowEmailModal(order_detail.order_info.status_str)}
          >
            <i className="fas fa-envelope mr-2" />
            Email confirmation
          </button>
          <button
            className="btn shadow-sm rounded-custom button-main-background text-white ml-4"
            style={{ height: "43px", width: "168px" }}
            onClick={handleSentConfirmButton}
          >
            <i className="fas fa-sms mr-2" />
            Send confirmation
          </button>
        </div>
      </div>
    </>
  );
}
