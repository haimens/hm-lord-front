import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DisplayCard from "./home.components/Display.card";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <main>
        <section className="mb-4">
          <div className="row">
            <div className="col-12 col-md-6 mb-4 h-100">
              <DisplayCard
                data={{
                  amount: 20,
                  title: "历史总收款",
                  icon: `${process.env.PUBLIC_URL}/img/invoice_color.svg`
                }}
              />
            </div>
            <div className="col-12 col-md-6 mb-4 h-100">
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
