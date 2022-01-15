import {
  schedulesSetLoading,
  schedulesFetchItem,
  schedulesAddItem,
  schedulesDeleteItem,
  schedulesAsyncFailure,
} from "./actions";
import { get, post, deleteRequest } from "../../services/api";
import { formatSchedule } from "../../services/schedule";

export const asyncSchedulesFetchItem = ({ month, year }) => async (
  dispatch
) => {
  // isLoadingをtrueにする関数
  dispatch(schedulesSetLoading());

  try {
    const result = await get(`schedules?month=${month}&year=${year}`);
    const formatedSchedule = result.map((r) => formatSchedule(r));

    // scheduleFetchItemの引数にformatedScheduleを入ることで
    // SCHEDULES_FETCH_ITEMの中身が書き換わる
    dispatch(schedulesFetchItem(formatedSchedule));
  } catch (err) {
    console.error(err)
    dispatch(schedulesAsyncFailure(err.message));
  }
};

export const asyncSchedulesAddItem = (schedule) => async (dispatch) => {
  //　isLoadiingをtrueにする
  dispatch(schedulesSetLoading());
  try {
    //   scheduleを展開し、toISOString型（時間を文字列にしたもの）に変換している
    const body = { ...schedule, date: schedule.date.toISOString() };
    const result = await post("schedules", body);

    const newSchedule = formatSchedule(result);
    dispatch(schedulesAddItem(newSchedule));
  } catch (err) {
    console.error(err);
    dispatch(schedulesAsyncFailure(err.message));
  }
};

export const asyncSchedulesDeleteItem = (id) => async (dispatch, getState) => {
  dispatch(schedulesSetLoading());
  try {
    //   getState() => thunkの関数の第２引数で、storeのデータを取得することができる
    // 今回はschedules.itemsを取得している
    const currentSchedules = getState().schedules.items;

    await deleteRequest(`schedules/${id}`);

    //   成功したらstateを削除
    // filterメゾット => 与えられた関数によって実装されたテストに合格したすべての配列からなる新しい配列を生成する
    const newSchedules = currentSchedules.filter((s) => s.id !== id);
    dispatch(schedulesDeleteItem(newSchedules));
  } catch (err) {
    console.error(err);
    dispatch(schedulesAsyncFailure(err.message));
  }
};
