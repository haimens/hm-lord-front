import React from "react";

export default function OrderHeader(props) {
  console.log(props);
  const { titles, position } = props;
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
          <h4 className="hm-header-size text-white mr-3 hm-pointer-cursor">Order</h4>
          <div className=" d-flex align-items-center ">
            {titles.slice(0, position).map((title, index) => (
              <>
                <i className="fas fa-circle text-light-grey text-right mr-3" style={{ fontSize: "6px" }} key={index}/>
                <h4 className="hm-header-size text-light-grey hm-pointer-cursor mr-3">{title}</h4>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
