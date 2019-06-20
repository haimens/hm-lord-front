import React, { Component } from "react";

export default class CalendarDailyList extends Component {
  render() {
    return (
      <div className="d-flex p-3 bg-white">
        <div>1.</div>
        <div className="ml-3">
          <p>
            <span className="font-weight-bold">Time:</span>
            <span className="font-weight-bold ml-2">Status:</span>
          </p>
          <p>
            <span className="font-weight-bold">Driver:</span> 08:30 AM
            <span className="font-weight-bold ml-2">Customer:</span> Customer On Board
          </p>
          <p>
            <span className="font-weight-bold">From:</span> 08:30 AM
            <span className="font-weight-bold ml-2">To:</span> Customer On Board
          </p>
        </div>
      </div>
    );
  }
}
