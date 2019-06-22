import React, { Component } from "react";

export default class OrderDetail extends Component {
  render() {
    return (
      <main>
        <section>
          <div className="mb-4">
            <h3 className="font-weight-bold">Order</h3>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="p-3 bg-white">
                <div className="font-weight-bold">
                  Basic Information <i className="fas fa-pen ml-3" />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="col-4">asdf</div>
              <div className="col-8">asdf</div>
            </div>
            <div className="col-6">asdf</div>
          </div>
        </section>
      </main>
    );
  }
}
