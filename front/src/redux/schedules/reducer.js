import dayjs from "dayjs";
import {
  SCHEDULES_ADD_ITEM,
  SCHEDULES_FETCH_ITEM,
  SCHEDULES_SET_LOADING,
} from "./actions";

const init = {
  items: [],
  isLoading: false,
};

// 第２引数のactionには(SCHEDULE_ADD_ITEM)が入っている => なぜ？
const schedulesReducer = (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case SCHEDULES_ADD_ITEM:
      return {
        ...state,
        // ↑
        // items: []
        // isLoading: false
        items: [...state.items, { ...payload, id: state.items.length + 1 }],
      };
    case SCHEDULES_SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SCHEDULES_FETCH_ITEM:
      return {
        ...state,
        isLoading: false,
        items: payload,
      };
    default:
      // ↓初期値
      return state;
  }
};

export default schedulesReducer;
