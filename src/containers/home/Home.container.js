import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DisplayCard from "./home.components/Display.card";
import GMapWithMarker from "../../components/shared/GMapWithMarker";
import DriversMap from "./home.components/DriversMap.component";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./Home.container.css";
import CalendarDailyList from "./home.components/CalendarDailyList.component";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCalendarBeenClicked = date => {
    console.log(date);
  };

  render() {
    const localizer = momentLocalizer(moment);
    return (
      <main>
        <section>
          <div className="mb-4">
            <h3 className="font-weight-bold">Home</h3>
          </div>
          <div className="mb-4">
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
          </div>
        </section>

        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold">Drivers</h3>
          </div>
          <div>
            <div className="shadow-sm mb-3" style={{ height: "300px" }}>
              <GMapWithMarker />
            </div>
            <div className="shadow-sm bg-white" style={{ minHeight: "300px" }}>
              <DriversMap />
            </div>
          </div>
        </section>

        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold">Trips</h3>
          </div>
          <div className="bg-white p-3 shadow-sm mb-3">
            <Calendar
              localizer={localizer}
              events={myEventsList}
              style={{ minHeight: "397px" }}
              views={["month"]}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={this.handleCalendarBeenClicked}
              showMultiDayTimes={true}
            />
          </div>
          <div className="bg-white shadow-sm">
            <CalendarDailyList
              parentProps={{
                time: "08:30 AM",
                status: "customer on board",
                driver: "Chris Yao",
                customer: "Michael Dai",
                from: "psadena",
                to: "arcadia"
              }}
            />
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

let myEventsList = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(),
    end: new Date()
  }
];
