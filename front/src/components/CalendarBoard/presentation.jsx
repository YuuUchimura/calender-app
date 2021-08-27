import React, { useEffect } from "react";

import * as styles from "./style.css";

import { ImageList, Typography } from "@material-ui/core";

import CalendarElement from "../CalendarElement";
// import { DateRangeSharp } from "@material-ui/icons";

const days = ["日", "月", "火", "水", "木", "金", "土"];

const CalendarBoard = ({
  calendar,
  month,
  openAddScheduleDialog,
  openCurrentScheduleDialog,
  fetchSchedule,
}) => {
  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <div className={styles.container}>
      <ImageList className={styles.grid} cols={7} gap={0} rowHeight="auto">
        {days.map((d) => (
          <li key={d}>
            <Typography
              className={styles.days}
              color="textSecondary"
              align="center"
              variant="caption"
              component="div"
            >
              {d}
            </Typography>
          </li>
        ))}
        {calendar.map(({ date, schedules }) => (
          <li
            key={date.toISOString()}
            onClick={() => openAddScheduleDialog(date)}
          >
            <CalendarElement
              day={date}
              month={month}
              schedules={schedules}
              onClickSchedule={openCurrentScheduleDialog}
            />
          </li>
        ))}
      </ImageList>
    </div>
  );
};

export default CalendarBoard;
