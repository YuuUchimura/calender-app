import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import DayjsUtils from "@date-io/dayjs";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import CalendarBoard from "./components/CalendarBoard/container";
import rootReducer from "./redux/rootReducer";
import Navigation from "./components/Navigation/container";
import AddScheduleDialog from "./components/AddScheduleDialog/container";

import CurrentScheduleDialog from "./components/CurrentScheduleDialog/container";

dayjs.locale("ja");

// createStoreにrootReducerを渡すことでstoreを作成することができる
const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => (
  // Providerコンポーネントを使ってstore情報を全部のコンポーネントから参照できるようにする
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <Navigation />
      <CalendarBoard />
      <AddScheduleDialog />
      <CurrentScheduleDialog />
    </MuiPickersUtilsProvider>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
