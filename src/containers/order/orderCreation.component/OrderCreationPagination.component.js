import React from "react";

export default function OrderCreationPagination(props) {
  const { position } = props;
  return (
    <div className="row">
      <div className="col-10 d-flex">
        <h3 className={`font-weight-bold ${position === 0 && "hm-text-green"}`}>Customer Information</h3>
        <h3 className="px-1">></h3>
        <h3 className={`font-weight-bold ${position === 1 && "hm-text-green"}`}>Trip Detail</h3>
        <h3 className="px-1">></h3>
        <h3 className={`font-weight-bold ${position === 2 && "hm-text-green"}`}>Review Trip</h3>
        <h3 className="px-1">></h3>
        <h3 className={`font-weight-bold ${position === 3 && "hm-text-green"}`}>Payment Information</h3>
      </div>
    </div>
  );
}
