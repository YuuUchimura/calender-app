import dayjs from "dayjs";

export const createCalendar = (month) => {
  // 現在の月取得
  const firstDay = getMonth(month);
  // 現在の月の初日を入れている
  const firstDayIndex = firstDay.day();
  
  return Array(35)
    .fill(0)
    .map((_, i) => {
      // firstDayIndexはその月の最終日になると１から繰り返されるため35回まわしてもいい感じになる。
      const diffFromFirstDay = i - firstDayIndex;
      // 日にdiffFormFirstDayの数字分加算
      const day = firstDay.add(diffFromFirstDay, "day");
      
      return day;
    });
};
// 年または月の取得（実行した際の引数による）
export const getMonth = ({ year, month }) => {
  return dayjs(`${year}-${month}`);
};

export const isSameDay = (d1, d2) => {
  const format = "YYYYMMDD";
  // format("YYYYMMDD")となっている
  return d1.format(format) === d2.format(format);
};

export const isSameMonth = (m1, m2) => {
  const format = "YYYYMMDD";
  return m1.format(format) === m2.format(format);
};

export const isFirstDay = (day) => day.date() === 1;

export const getNextMonth = (month) => {
  const day = getMonth(month).add(1, "month");
  return formatMonth(day);
};

export const getPreviousMonth = (month) => {
  const day = getMonth(month).add(-1, "month");
  return formatMonth(day);
};

export const formatMonth = (day) => ({
  month: day.month() + 1,
  year: day.year(),
});
