import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./components/main/Main.component";
import alertify from "alertifyjs";
//import ProtectedRoute from "./components/shared/ProtectedRouter";
import { LoaderAlt } from "./components/shared";

import dashboard from "./containers/dashboard/dashboard.container";

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
      import("./alertify.css")
    ]);
  }

  render() {
    alertify.defaults.transition = "zoom";
    alertify.defaults.theme.ok = "btn mr-bg-green text-white";
    alertify.defaults.theme.cancel = "btn btn-danger";
    alertify.defaults.theme.input = "form-control";
    const NoMatch = () => <Redirect to="/nomatch" />;
    return (
      <React.Suspense fallback={<LoaderAlt />}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/reset" component={ResetPassword} />
          <Route exact path="/nomatch" component={Page404} />
        </Switch>
      </React.Suspense>
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
      <a className="btn mr-bg-darkblue text-white mt-4" href="/dashboard">
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
