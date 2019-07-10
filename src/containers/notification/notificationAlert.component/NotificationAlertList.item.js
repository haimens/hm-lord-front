import React, { Component } from "react";

export default class WageList extends Component {
  render() {
    return (
      <tr>
        <td data-label="Created On" className="st-text-ellipsis">
          <section className="text-position align-middle text-muted text-sm">
            <small>{21}</small>
          </section>
        </td>
        <td data-label="Admin Name" className="st-text-ellipsis">
          <section className="text-position align-middle text-muted text-sm">
            <small>{13}</small>
          </section>
        </td>
        <td data-label="Call" className="st-text-ellipsis">
          <section className="text-position align-middle text-muted text-sm">
            <small>{"N/A"}</small>
          </section>
        </td>
        <td data-label="Email" className="st-text-ellipsis text-position">
          <section className="text-position align-middle text-muted text-sm">
            <small>{"N/A"}</small>
          </section>
        </td>
        <td data-label="Username" className="st-text-ellipsis">
          <section className="text-position align-middle text-muted text-sm">
            <small>{"N/A"}</small>
          </section>
        </td>
      </tr>
    );
  }
}
