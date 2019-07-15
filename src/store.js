import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./reducers/auth.reducer";
import loadReducer from "./reducers/load.reducer";
import navReducer from "./reducers/nav.reducer";
import locationReducer from "./reducers/location.container";
import contactReducer from "./reducers/contact.container";
import driverReducer from "./reducers/driver.reducer";
import customerReducer from "./reducers/customer.reducer";
import orderReducer from "./reducers/order.reducer";
import settingsReducer from "./reducers/settings.reducer";
import vehicleReducer from "./reducers/vehicle.reducer";
import tripReducer from "./reducers/trip.reducer";
import wageReducer from "./reducers/wage.reducer";
import salaryReducer from "./reducers/salary.reducer";
import flightReducer from "./reducers/flight.reducer";
import quoteReducer from "./reducers/quote.reducer";
import couponReducer from "./reducers/coupon.reducer";
const store = createStore(
  combineReducers({
    authReducer,
    loadReducer,
    navReducer,
    locationReducer,
    contactReducer,
    driverReducer,
    customerReducer,
    orderReducer,
    settingsReducer,
    vehicleReducer,
    tripReducer,
    wageReducer,
    salaryReducer,
    flightReducer,
    quoteReducer,
    couponReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
