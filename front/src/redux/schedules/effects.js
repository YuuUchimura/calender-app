import { schedulesSetLoading, schedulesFetchItem } from "./actions";
import { get } from "../../services/api";
import { formatSchedule } from "../../services/schedule";

export const asyncSchedulesFetchItem = ({ month, year }) => async (
  dispatch
) => {
    // isLoadingをtrueにする関数
  dispatch(schedulesSetLoading());

    // 指定された月の予定を取得するAPIを叩いている（get関数はapi.jsで定義している）
    // awaitで非同期処理が終わるまで処理を止めている
  const result = await get(`schedules?month=${month}&year=${year}`);

    // resultの中身をmapで回し、formatedScheduleに入れている
  const formatedSchedule = result.map((r) => formatSchedule(r));

    // scheduleFetchItemの引数にformatedScheduleを入ることで
    // SCHEDULES_FETCH_ITEMの中身が書き換わる
  dispatch(schedulesFetchItem(formatedSchedule));
};
