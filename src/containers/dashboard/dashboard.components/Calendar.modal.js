import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Modal } from "../../../components/shared";
import { findTripActiveListInLord, findTripListInLord } from "../../../actions/trip.action";
import moment from "moment";
class Calendar extends Component {
  state = {
    currStatus: ""
  };
  handleClose = () => {
    if (this.props.onClose) this.props.onClose();
  };
  componentDidMount() {
    const { curr_date, findTripActiveListInLord, findTripListInLord } = this.props;
    if (curr_date.title.includes("Ongoing")) {
      findTripActiveListInLord({
        date_from: moment(curr_date.start)
          .startOf("day")
          .format("YYYY-MM-DD HH:mm"),
        date_to: moment(curr_date.end)
          .endOf("day")
          .format("YYYY-MM-DD HH:mm"),
        from_key: "pickup_time",
        to_key: "pickup_time"
      });
      this.setState({ currStatus: "ongoing" });
    } else if (curr_date.title.includes("Finished")) {
      findTripListInLord({
        date_from: moment(curr_date.start)
          .startOf("day")
          .format("YYYY-MM-DD HH:mm"),
        date_to: moment(curr_date.end)
          .endOf("day")
          .format("YYYY-MM-DD HH:mm"),
        from_key: "pickup_time",
        to_key: "pickup_time",
        status: 7
      });
      this.setState({ currStatus: "finished" });
    } else if (curr_date.title.includes("Abnormal")) {
      findTripListInLord({
        date_from: moment(curr_date.start)
          .startOf("day")
          .format("YYYY-MM-DD HH:mm"),
        date_to: moment(curr_date.end)
          .endOf("day")
          .format("YYYY-MM-DD HH:mm"),
        from_key: "pickup_time",
        to_key: "pickup_time",
        status: 8
      });
      this.setState({ currStatus: "abnormal" });
    }
  }
  render() {
    const { trip_list_in_lord } = this.props;
    return (
      <Modal
        title="Upcoming trips"
        onClose={this.handleClose}
        position="center"
        getWidth={"467px"}
        getHeight={"494px"}
        zIndex={999}
      >
        <div className="container-fluid">
          {trip_list_in_lord.record_list.map((trip, index) => (
            <div className="py-3 bg-white border-bottom-custom" key={index}>
              <div className="row pb-3">
                <div className="col-2 px-0  d-flex justify-content-center ">
                  <div
                    className="button-main-background rounded-circle justify-content-center d-flex align-items-center text-white"
                    style={{ height: "25px", width: "25px" }}
                  >
                    {index + 1}
                  </div>
                </div>
                <div className="col-8">
                  <div className="row mb-1">
                    <div className="col-4 px-0 text-modal-color font-weight-bold">
                      <div className="hm-text-14 font-weight-bold text-modal-color">Pickup time:</div>
                    </div>
                    <div className="col-8 px-0">
                      <div className="text-modal-color hm-text-14">
                        {moment(trip.pickup_time).format("YYYY-MM-DD HH:mm")}
                      </div>
                    </div>
                  </div>

                  <div className="row mb-1">
                    <div className="col-4 px-0  text-modal-color font-weight-bold">
                      <div className="hm-text-14 font-weight-bold text-modal-color">From:</div>
                    </div>
                    <div className="col-8 px-0 ">
                      <div className="text-modal-color hm-text-14">{trip.from_addr_str}</div>
                    </div>
                  </div>

                  <div className="row mb-1">
                    <div className="col-4 px-0  text-modal-color font-weight-bold">
                      <div className="hm-text-14 font-weight-bold text-modal-color">To:</div>
                    </div>
                    <div className="col-8 px-0 ">
                      <div className="text-modal-color hm-text-14">{trip.to_addr_str}</div>
                    </div>
                  </div>

                  <div className="row mb-1">
                    <div className="col-4 px-0  text-modal-color font-weight-bold">
                      <div className="hm-text-14 font-weight-bold text-modal-color">Driver:</div>
                    </div>
                    <div className="col-8 px-0 ">
                      <div className="text-modal-color hm-text-14">{trip.driver_name}</div>
                    </div>
                  </div>

                  <div className="row mb-1">
                    <div className="col-4 px-0  text-modal-color font-weight-bold">
                      <div className="hm-text-14 font-weight-bold text-modal-color">Customer:</div>
                    </div>
                    <div className="col-8 px-0 ">
                      <div className="text-modal-color hm-text-14">{trip.customer_name}</div>
                    </div>
                  </div>

                  <div className="row mb-1">
                    <div className="col-4 px-0  text-modal-color font-weight-bold">
                      <div className="hm-text-14 font-weight-bold text-modal-color">Status:</div>
                    </div>
                    <div className="col-8 px-0 ">
                      <div className="text-modal-color hm-text-14">{trip.status_str}</div>
                    </div>
                  </div>
                </div>
                <div className="col-2 px-0  d-flex justify-content-center ">
                  {trip.status === 7 && (
                    <img
                      src={`${process.env.PUBLIC_URL}/img/icon_detail.svg`}
                      alt="detail"
                      className="hm-pointer-cursor"
                      style={{ height: "25px", width: "25px" }}
                      onClick={() => this.props.history.push(`/trip/finished/detail/${trip.trip_token}`)}
                    />
                  )}
                  {trip.status !== 8 && trip.status !== 7 && (
                    <img
                      src={`${process.env.PUBLIC_URL}/img/icon_detail.svg`}
                      alt="detail"
                      className="hm-pointer-cursor"
                      style={{ height: "25px", width: "25px" }}
                      onClick={() => this.props.history.push(`/trip/ongoing/detail/${trip.trip_token}`)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    trip_list_in_lord: state.tripReducer.trip_list_in_lord
  };
};
const mapDispatchToProps = {
  findTripActiveListInLord,
  findTripListInLord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Calendar));
