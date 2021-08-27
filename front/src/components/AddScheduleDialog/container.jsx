import { connect } from "react-redux";
import AddScheduleDialog from "./presentation";
import {
  addScheduleCloseDialog,
  addScheduleSetValue,
} from "../../redux/addSchedule/actions";
import { schedulesAddItem } from "../../redux/schedules/actions";

const mapStateToProps = (state) => ({ schedule: state.addSchedule });

const mapDispatchToProps = (dispatch) => ({
  setSchedule: (value) => {
    // dispatchで運んでいるaddScheduleSetValueだけ定義しても良いのでは？
    dispatch(addScheduleSetValue(value));
  },
  closeDialog: () => {
    dispatch(addScheduleCloseDialog());
  },
  saveSchedule: (schedule) => {
    dispatch(schedulesAddItem(schedule));
    dispatch(addScheduleCloseDialog());
  },
});

// 第１引数には（mapStateToProps）が、第２引数には（mapDispatchToProps）が入っている
const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  // ここで展開しているので他の場所でmapDispatchToPropsの中身のみを使うことができる
  ...dispatchProps,
  saveSchedule: () => {
    const {
      schedule: { form: schedule },
    } = stateProps;
    dispatchProps.saveSchedule(schedule);
  },
});

// connectのおかげでmaegePropsの第１引数に(mapStateToProps)第２引数に(mapDispatchToProps)が入ってくる
export default connect(
  //stateをうけとる
  mapStateToProps,
  //値を変更するための関数をわたす
  mapDispatchToProps,
  mergeProps
)(AddScheduleDialog);
