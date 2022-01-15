import { connect } from "react-redux";
import AddScheduleDialog from "./presentation";
import {
  addScheduleCloseDialog,
  addScheduleSetValue,
  addScheduleStartEdit,
} from "../../redux/addSchedule/actions";
import { asyncSchedulesAddItem } from "../../redux/schedules/effects";
import { isCloseDialog } from "../../services/schedule";

const mapStateToProps = (state) => ({ schedule: state.addSchedule });

const mapDispatchToProps = (dispatch) => ({
  setSchedule: (value) => {
    dispatch(addScheduleSetValue(value));
  },

  closeDialog: () => {
    dispatch(addScheduleCloseDialog());
  },

  saveSchedule: (schedule) => {
    dispatch(asyncSchedulesAddItem(schedule));
    dispatch(addScheduleCloseDialog());
  },

  setIsEditStart: () => {
    dispatch(addScheduleStartEdit());
  },
});

// 第１引数には（mapStateToProps）が、第２引数には（mapDispatchToProps）が入っている
const mergeProps = (stateProps, dispatchProps) => {
  // ここで展開しているので他の場所でmapDispatchToPropsの中身のみを使うことができる
  const {
    schedule: { form: schedule },
  } = stateProps;
  const { saveSchedule, closeDialog } = dispatchProps;
  return {
    ...stateProps,
    ...dispatchProps,
    saveSchedule: () => {
      saveSchedule(schedule);
    },
    closeDialog: () => {
      if (isCloseDialog(schedule)) {
        closeDialog();
      }
    },
  };
};

// connectのおかげでmergePropsの第１引数に(mapStateToProps)第２引数に(mapDispatchToProps)が入ってくる?
// 第３引数に入れた関数の第１引数、第２引数に入る？
export default connect(
  //stateをうけとる
  mapStateToProps,
  //値を変更するための関数をわたす
  mapDispatchToProps,
  mergeProps
)(AddScheduleDialog);
