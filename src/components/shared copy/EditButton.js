import React from "react";

export default function EditButton(props) {
  return (
    <button className="rounded-circle bg-white company-detail-button p-0 " onClick={() => props.clickFunction()}>
      <i className="fas fa-pencil-alt" style={{ color: "#fb6240" }} />
    </button>
  );
}
