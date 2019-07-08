import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DisplayCard from "./dashboard.components/display.card";
import { GMapWithMarker, Header, ListHeader } from "../../components/shared";
import DriversMap from "./dashboard.components/DriversMap.component";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./dashboard.container.css";
import CalendarDailyList from "./dashboard.components/CalendarDailyList.component";
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
        <section className="container-fluid">
          <div className="mb-4">
            <Header title="Dashboard" tabicon={"tabicon_dashboard.svg"} />
          </div>
          <div className="row">
            <div className="col-12 col-md-6 h-100 mb-4">
              <DisplayCard
                data={{
                  amount: 30,
                  title: "Total Company",
                  icon: `${process.env.PUBLIC_URL}/img/icon_company.svg`
                }}
                red={true}
              />
            </div>
            <div className="col-12 col-md-6 h-100">
              <DisplayCard
                data={{
                  amount: 20,
                  title: "Total Invoice",
                  icon: `${process.env.PUBLIC_URL}/img/icon_invoice.svg`
                }}
              />
            </div>
            <div className="col-12 col-md-6 h-100 mb-4">
              <DisplayCard
                data={{
                  amount: 30,
                  title: "Total Company",
                  icon: `${process.env.PUBLIC_URL}/img/icon_company.svg`
                }}
                red={true}
              />
            </div>
            <div className="col-12 col-md-6 h-100">
              <DisplayCard
                data={{
                  amount: 20,
                  title: "Total Invoice",
                  icon: `${process.env.PUBLIC_URL}/img/icon_invoice.svg`
                }}
              />
            </div>
          </div>
        </section>

        <section className="container-fluid">
          <div className="mb-4">
            <ListHeader
              parentProps={{ title: "Invoice List", clickFunction: this.handleAddCompanyModal, clickTitle: "Refresh" }}
              buttonWidth={"88px"}
            />
            <div>
              <div className="shadow-sm mb-3" style={{ height: "300px" }}>
                <GMapWithMarker />
              </div>
              <div className="shadow-sm bg-white" style={{ minHeight: "300px" }}>
                <DriversMap />
              </div>
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
