import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./components/main/Main.component";
import alertify from "alertifyjs";
//import ProtectedRoute from "./components/shared/ProtectedRouter";
import { LoaderAlt } from "./components/shared";

import Home from "./containers/home/Home.container";
import Driver from "./containers/driver/Driver.container";
import DriverDetail from "./containers/driver/DriverDetail.container";

import Vehicle from "./containers/vehicle/Vehicle.container";
import Customer from "./containers/customer/Customer.container";

import OrderList from "./containers/order/OrderList.container";
import OrderDetail from "./containers/order/OrderDetail.container";
import OrderCreation from "./containers/order/OrderCreation.container";

import TripOngoing from "./containers/trip/TripOngoing.container";
import TripUpcoming from "./containers/trip/TripUpcoming.container";
import TripFinished from "./containers/trip/TripFinished.container";
import TripFailed from "./containers/trip/TripFailed.container";

import Wage from "./containers/earning/Wage.container";
import Salary from "./containers/earning/Salary.container";

import Notification from "./containers/notification/Notification.container";
import Settings from "./containers/settings/Settings.container";

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
    alertify.defaults.theme.ok = "btn hm-bg-green text-white";
    alertify.defaults.theme.cancel = "btn btn-danger";
    alertify.defaults.theme.input = "form-control";
    const NoMatch = () => <Redirect to="/nomatch" />;
    return (
      <Suspense fallback={<LoaderAlt />}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Main>
            <Route exact path="/home" component={Home} />
            <Route exact path="/driver" component={Driver} />
            <Route exact path="/driver/detail/:driver_token" component={DriverDetail} />

            <Route exact path="/vehicle" component={Vehicle} />
            <Route exact path="/customer" component={Customer} />

            <Route exact path="/order/list" component={OrderList} />
            <Route exact path="/order/detail/:order_token" component={OrderDetail} />
            <Route exact path="/order/creation" component={OrderCreation} />

            <Route exact path="/trip/ongoing" component={TripOngoing} />
            <Route exact path="/trip/upcoming" component={TripUpcoming} />
            <Route exact path="/trip/finished" component={TripFinished} />
            <Route exact path="/trip/failed" component={TripFailed} />

            <Route exact path="/earning/wage" component={Wage} />
            <Route exact path="/earning/salary" component={Salary} />

            <Route exact path="/notification" component={Notification} />
            <Route exact path="/settings" component={Settings} />
          </Main>
          <Route exact path="/reset" component={ResetPassword} />
          <Route exact path="/nomatch" component={Page404} />
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
