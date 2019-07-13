import constant from "../constants/constant";

const initialState = {
  vehicle_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  },
  driver_list_for_a_car: {
    record_list: [],
    count: 0,
    end: 0
  },
  vehicle_detail_in_lord: {
    basic_info: {
      identifier: "",
      img_path: "",
      plate_num: "",
      description: "",
      status: ""
    }
  },
  vehicle_type_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.VEHICLE_LIST_IN_LORD:
      return { ...state, vehicle_list_in_lord: action.payload };
    case constant.DRIVER_LIST_FOR_A_CAR:
      return { ...state, driver_list_for_a_car: action.payload };
    case constant.VEHICLE_DETAIL_IN_LORD:
      return { ...state, vehicle_detail_in_lord: action.payload };
    case constant.VEHICLE_TYPE_LIST_IN_LORD:
      return { ...state, vehicle_type_list_in_lord: action.payload };
    default:
      return state;
  }
};
