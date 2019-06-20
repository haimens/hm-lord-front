import React, { Component } from "react";
import Card from "../../components/shared/Card";

class Driver extends Component {
  render() {
    return (
      <main>
        <section>
          <div className="mb-4">
            <h3>Driver</h3>
          </div>
          <div className="row">
            <Card />
          </div>
        </section>
      </main>
    );
  }
}
export default Driver;
