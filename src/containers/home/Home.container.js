import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DisplayCard from "./home.components/Display.card";
import GMapWithMarker from "../../components/shared/GMapWithMarker";
import DriversMap from "./home.components/DriversMap.component";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <main>
        <section className="mb-4">
          <h3>Home</h3>
        </section>
        <section className="mb-4">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-3">
              <DisplayCard
                data={{
                  amount: 20,
                  title: "历史总收款",
                  icon: `${process.env.PUBLIC_URL}/img/invoice_color.svg`
                }}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3 mt-4 mt-md-0">
              <DisplayCard
                data={{
                  amount: 20,
                  title: "24小时收款",
                  icon: `${process.env.PUBLIC_URL}/img/24hr.svg`
                }}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3 mt-4 mt-lg-0">
              <DisplayCard
                data={{
                  amount: 20,
                  title: "历史总收款",
                  icon: `${process.env.PUBLIC_URL}/img/invoice_color.svg`
                }}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3 mt-4 mt-lg-0">
              <DisplayCard
                data={{
                  amount: 20,
                  title: "24小时收款",
                  icon: `${process.env.PUBLIC_URL}/img/24hr.svg`
                }}
              />
            </div>
          </div>
        </section>
        <section className="mb-4">
          <h3>Drivers</h3>
        </section>
        <section className="mb-4">
          <div className="shadow-sm mb-3" style={{ height: "300px" }}>
            <GMapWithMarker />
          </div>
          <div className="shadow-sm bg-white" style={{  minHeight: "300px" }}>
            <DriversMap />
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  null
)(withRouter(Home));
