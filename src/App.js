import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./components/main/Main.component";
import alertify from "alertifyjs";
//import ProtectedRoute from "./components/shared/ProtectedRouter";
import { LoaderAlt, ProtectedRoute } from "./components/shared";

import Dashboard from "./containers/dashboard/dashboard.container";
import Driver from "./containers/driver/Driver.container";
import DriverDetail from "./containers/driver/DriverDetail.container";

import Vehicle from "./containers/vehicle/Vehicle.container";
import VehicleDetail from "./containers/vehicle/VehicleDetail.container";

import Customer from "./containers/customer/Customer.container";
import CustomerDetail from "./containers/customer/CustomerDetail.container";

import OrderList from "./containers/order/OrderList.container";
import OrderDetail from "./containers/order/OrderDetail.container";
import OrderCreation from "./containers/order/OrderCreation.container";

import TripContainer from "./containers/trip/trip.share/Trip.conatiner";
import TripDetailContainer from "./containers/trip/trip.share/TripDetail.container";

import DriverPayable from "./containers/driverPayable/DriverPayable.container";

import NotificationAlert from "./containers/notification/NotificationAlert.container";
import NotificationMessage from "./containers/notification/NotificationMessage.container";

import PaymentResource from "./containers/settings/Payment.container/Payment.container";
import MessageResource from "./containers/settings/Message.container/Message.container";
import EmailResource from "./containers/settings/Email.container/Email.container";
import CouponResource from "./containers/settings/Coupon.container/Coupon.container";
import VehicleResource from "./containers/settings/Vehicle.container/Vehicle.container";
import GeneralSetting from "./containers/settings/General.container/General.container";

import InvoiceContainer from "./containers/invoice/Invoice.container";
import FeeContainer from "./containers/tribute/tribute.container";

const Login = React.lazy(() => import("./containers/login/Login.container"));
const ResetPassword = React.lazy(() => import("./containers/resetPassword/ResetPassword.container"));

class App extends Component {
  componentDidMount() {
    Promise.all([
      import("bootstrap/dist/css/bootstrap.min.css"),
      import("jquery/dist/jquery.min"),
      import("bootstrap/dist/js/bootstrap.min"),
      import("date-input-polyfill"),
      import("@fortawesome/fontawesome-free/css/all.css"),
      import("./alertify.css"),
      import("react-big-calendar/lib/css/react-big-calendar.css"),
      import("antd/dist/antd.css")
    ]);
  }

  render() {
    alertify.defaults.transition = "zoom";
    alertify.defaults.theme.ok = "btn btn-danger";
    alertify.defaults.theme.cancel = "btn btn-outline-secondary";
    alertify.defaults.theme.input = "form-control";
    const NoMatch = () => <Redirect to="/nomatch" />;
    return (
      <Suspense fallback={<LoaderAlt />}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/reset" component={ResetPassword} />
          <Route exact path="/nomatch" component={Page404} />
          <Main>
            <Switch>
              <ProtectedRoute exact path="/dashboard" component={Dashboard} />
              <ProtectedRoute exact path="/driver" component={Driver} />
              <ProtectedRoute exact path="/driver/detail/:driver_token" component={DriverDetail} />

              <ProtectedRoute exact path="/vehicle" component={Vehicle} />
              <ProtectedRoute exact path="/vehicle/detail/:car_token" component={VehicleDetail} />

              <ProtectedRoute exact path="/customer" component={Customer} />
              <ProtectedRoute exact path="/customer/detail/:customer_token" component={CustomerDetail} />

              <ProtectedRoute exact path="/order/list" component={OrderList} />
              <ProtectedRoute exact path="/order/detail/:order_token" component={OrderDetail} />
              <ProtectedRoute exact path="/order/creation" component={OrderCreation} />
              <ProtectedRoute exact path="/order/creation/:order_token" component={OrderCreation} />
              <ProtectedRoute exact path="/order/withCustomer" component={OrderCreation} />

              <ProtectedRoute exact path="/trip/ongoing" component={TripContainer} />
              <ProtectedRoute exact path="/trip/ongoing/detail/:trip_token" component={TripDetailContainer} />
              <ProtectedRoute exact path="/trip/upcoming" component={TripContainer} />
              <ProtectedRoute exact path="/trip/upcoming/detail/:trip_token" component={TripDetailContainer} />
              <ProtectedRoute exact path="/trip/finished" component={TripContainer} />
              <ProtectedRoute exact path="/trip/finished/detail/:trip_token" component={TripDetailContainer} />
              <ProtectedRoute exact path="/trip/abnormal" component={TripContainer} />

              <ProtectedRoute exact path="/invoice" component={InvoiceContainer} />
              <ProtectedRoute exact path="/invoice/fee" component={FeeContainer} />

              <ProtectedRoute exact path="/payable" component={DriverPayable} />

              <ProtectedRoute exact path="/notification/alert" component={NotificationAlert} />
              <ProtectedRoute exact path="/notification/message" component={NotificationMessage} />

              <ProtectedRoute exact path="/settings/payment" component={PaymentResource} />
              <ProtectedRoute exact path="/settings/message" component={MessageResource} />
              <ProtectedRoute exact path="/settings/email" component={EmailResource} />
              <ProtectedRoute exact path="/settings/coupon" component={CouponResource} />
              <ProtectedRoute exact path="/settings/vehicle" component={VehicleResource} />
              <ProtectedRoute exact path="/settings/general" component={GeneralSetting} />
              <Route component={NoMatch} />
            </Switch>
          </Main>
        </Switch>
      </Suspense>
    );
  }
}

function Page404(props) {
  return (
    <main style={styles.container} className="text-center">
      <img style={styles.imageContainer} src={`${process.env.PUBLIC_URL}/img/404/error404-head.png`} alt="error404" />
      <div className="d-flex mt-3">
        <img style={styles.imageContainerSub} src={`${process.env.PUBLIC_URL}/img/404/4.png`} alt="error404" />
        <img style={styles.imageContainerSub} src={`${process.env.PUBLIC_URL}/img/404/0.png`} alt="error404" />
        <img style={styles.imageContainerSub} src={`${process.env.PUBLIC_URL}/img/404/4.png`} alt="error404" />
      </div>
      <img
        style={styles.imageContainerText}
        src={`${process.env.PUBLIC_URL}/img/404/sorry.png`}
        alt="error404"
        className="mt-4"
      />
      <a className="btn hm-bg-darkblue text-white mt-4" href="/dashboard">
        返回
      </a>
    </main>
  );
}

const styles = {
  container: {
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    margin: "5vh auto",
    width: "300px",
    // height: '300px',
    overflowY: "auto"
  },
  imageContainer: {
    width: "300px",
    margin: "0 auto"
  },
  imageContainerSub: {
    width: "100px",
    margin: "0 auto",
    height: "10vh"
  },
  imageContainerText: {
    width: "300px",
    margin: "0 auto",
    height: "5vh"
  }
};

export default App;
