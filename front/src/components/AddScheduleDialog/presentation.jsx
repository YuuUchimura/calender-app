import React from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Input,
  Grid,
  IconButton,
} from "@material-ui/core";

import {
  LocationOnOutlined,
  NotesOutlined,
  AccessTime,
  Close,
} from "@material-ui/icons";
import * as styles from "./style.css";
import { DatePicker } from "@material-ui/pickers";

import { withStyles } from "@material-ui/styles";

const spacer = { margin: "4px 0" };

const Title = withStyles({
  root: { marginButtom: 32, fontSize: 22 },
})(Input);

const AddScheduleDialog = ({
  // ここから引数
  schedule: {
    //   stateの初期値
    form: { title, location, description, date },
    isDialogOpen,
  },
  closeDialog,
  setSchedule,
  saveSchedule,
  // 　ここまで引数
}) => {
  return (
    <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="xs" fullWidth>
      <DialogActions>
        <div className={styles.closeButton}>
          <IconButton onClick={closeDialog} size="small">
            <Close />
          </IconButton>
        </div>
      </DialogActions>
      <DialogContent>
        <Title
          autoFocus
          fullWidth
          placeholder="タイトルと日時を追加"
          value={title}
          //   stateの更新後の値↑。valueの中に入る
          onChange={(e) => setSchedule({ title: e.target.value })}
        />
        <Grid
          container
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <AccessTime />
          </Grid>
          <Grid item xs={10}>
            <DatePicker
              value={date}
              onChange={(d) => setSchedule({ date: d })}
              variant="inline"
              format="YYYY年M月D日"
              animateYearScrolling
              disableToolbar
              fullWidth
              style={spacer}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <LocationOnOutlined />
          </Grid>
          <Grid item xs={10}>
            <TextField
              style={spacer}
              fullWidth
              placeholder="場所を追加"
              value={location}
              //   stateの更新後の値↑。valueの中に入る
              onChange={(e) => setSchedule({ location: e.target.value })}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <NotesOutlined />
          </Grid>
          <Grid item xs={10}>
            <TextField
              style={spacer}
              fullWidth
              placeholder="説明を追加"
              value={description}
              //   stateの更新後の値。↑valueの中に入る
              onChange={(e) => setSchedule({ description: e.target.value })}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="outlined" onClick={saveSchedule}>
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddScheduleDialog;