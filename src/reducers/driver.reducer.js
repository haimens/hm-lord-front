import constant from "../constants/constant";

const initialState = {
  driver_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  },
  driver_location_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  },
  car_list_for_a_driver: {
    record_list: [],
    count: 0,
    end: 0
  },
  driver_detail_in_lord: {
    basic_info: {
      name: "",
      cell: "",
      email: "",
      username: "",
      img_path: "",
      status: ""
    },
    location_info: {
      lat: 0,
      lng: 0,
      cdate: 0,
      udate: 0
    }
  },
  driver_payable_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  },
  showMap: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.DRIVER_LIST_IN_LORD:
      return { ...state, driver_list_in_lord: action.payload };
    case constant.DRIVER_LOCATION_LIST_IN_LORD:
      return { ...state, driver_location_list_in_lord: action.payload, showMap: action.showMap };
    case constant.DRIVER_LOCATION_LIST_IN_LORD_MAP_FALSE:
      return { ...state, showMap: false };
    case constant.CAR_LIST_FOR_A_DRIVER:
      return { ...state, car_list_for_a_driver: action.payload };
    case constant.DRIVER_DETAIL_IN_LORD:
      return { ...state, driver_detail_in_lord: action.payload };
    case constant.DRIVER_PAYABLE_LIST_IN_LORD:
      return { ...state, driver_payable_list_in_lord: action.payload };
    default:
      return state;
  }
};
