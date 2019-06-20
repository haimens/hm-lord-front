import React from "react";

export default function DriverMapitem(props) {
  const { driverName, driverPhone, driverImage } = props;
  return (
    <div className="col-lg-1 col-md-2 col-3 ">
      <div className="text-center">
        <img
          className="rounded-circle"
          src={`${process.env.PUBLIC_URL}${driverImage}`}
          style={{ height: "48px", width: "48px" }}
          alt="face"
        />
        <h5 className="font-size-12">{driverName}</h5>
        <h5 className="text-muted font-size-12">{driverPhone}</h5>
      </div>
    </div>
  );
}
