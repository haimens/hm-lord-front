import React from "react";

export default function OrderHeader(props) {
  const { titles, position } = props;

  const handleSetOrderPosition = () => {
    props.handleSetOrderPosition();
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4 text-white">
        <div className="d-flex align-items-center ">
          <img
            src={`${process.env.PUBLIC_URL}/img/${"icon_order_white.svg"}`}
            style={{ width: "22px", height: "22px" }}
            alt="company"
            className="hm-header-size mr-3"
          />
          <h4 className="hm-header-size text-white mr-3 hm-pointer-cursor" onClick={handleSetOrderPosition}>
            Order
          </h4>
          {titles.slice(0, position).map((title, index) => (
            <div className=" d-flex align-items-center" key={index}>
              <i className="fas fa-circle text-light-grey text-right mr-3" style={{ fontSize: "6px" }} />
              <h4 className="hm-header-size text-light-grey mr-3">{title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
