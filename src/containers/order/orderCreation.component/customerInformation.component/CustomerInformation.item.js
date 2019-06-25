import React from "react";

export default function CustomerInformationItem(props) {
  const handleCustomerInformationItemClicked = () => {
    props.handleCustomerInformationItemClicked(123);
  };
  return (
    <ul className="list-group">
      <li
        className="list-group-item list-group-item-action  list-group-item-secondary hm-pointer-cursor"
        onClick={handleCustomerInformationItemClicked}
      >
        <div className="d-flex justify-content-between ">
          <div>asdf</div>
          <div>asdf</div>
        </div>
      </li>
    </ul>
  );
}
