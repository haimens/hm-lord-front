import React from "react";
import { parseAmount } from "../../../actions/utilities.action";
import "./Display.card.css";

/**
 * DisplayCardItem
 * @data (amount, title, icon)
 */
export function DisplayCardItem(props) {
  const { amount, title, icon } = props.data;
  return (
    <main className="d-flex p-4 justify-content-between align-items-center bg-white border display-card-container">
      {/* show amount */}
      <section className="d-flex flex-column justify-content-center h-100">
        <div className="h6 mb-3">
          <div className="display-card">{amount}</div>
        </div>
        <div className="text-muted display-card">{title || "账号总余额"}</div>
      </section>
      {/* show icon */}
      <section>
        <img
          src={icon || `${process.env.PUBLIC_URL}/img/icon_24hr.svg`}
          alt={icon || `${process.env.PUBLIC_URL}/img/available.svg`}
        />
      </section>
    </main>
  );
}

export default DisplayCardItem;
