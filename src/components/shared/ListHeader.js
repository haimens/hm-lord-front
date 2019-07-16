import React from "react";

export default function ListHeader(props) {
  let { buttonWidth } = props;
  if (!buttonWidth) {
    buttonWidth = "30px";
  }
  return (
    <div
      className={`rounded-custom-top bg-white ${
        !props.hideShadow ? "shadow-sm border-bottom-custom" : "border-bottom-custom mb-3"
      }`}
    >
      <section className="d-flex justify-content-between align-items-center py-3 px-4" style={{ height: "65px" }}>
        <h6 className="d-block d-flex align-items-center hm-title-sub-size text-main-color font-weight-bold ">
          {props.parentProps.title}
        </h6>
        {!props.hideButton && (
          <button
            className="text-white button-main-background border-0 rounded shadow px-1 py-0 d-flex align-items-center justify-content-center"
            onClick={props.parentProps.clickFunction}
            style={{
              height: "28px",
              width: buttonWidth
            }}
          >
            <i className="fas fa-plus mr-2" />
            <div className="font-weight-bold hm-text-12 "> {props.parentProps.clickTitle}</div>
          </button>
        )}
      </section>
    </div>
  );
}
