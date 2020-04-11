import React, {useEffect, useState} from "react";
import {useSnackbar} from "../../utils/snackbar";
import AttendancesView from "./AttendancesView";
import * as attendancesApi from "../../api/attendancesApi";
import dateFnsFormat from "date-fns/format";
import {USER_LOCALE} from "../../common";

const Attendances = ({history}) => {
  const [monthsWithoutAttendanceInfo, setMonthsWithoutAttendanceInfo] = useState(null);
  const {showError} = useSnackbar();
  const currentYear = new Date().getFullYear();
  useEffect(() => {
    loadMonthsWithoutAttendanceInfo(currentYear, setMonthsWithoutAttendanceInfo, history, showError);
  }, [setMonthsWithoutAttendanceInfo, currentYear, history, showError]);

  return (
    <AttendancesView
      monthsWithoutAttendanceInfo={monthsWithoutAttendanceInfo}
      currentYear={currentYear}
      preview={!monthsWithoutAttendanceInfo}
      history={history}
    />
  );
};

const loadMonthsWithoutAttendanceInfo = (currentYear, setMonthsWithoutAttendanceInfo, history, showError) => {
  attendancesApi.getMonthsWithoutAttendanceInfo(currentYear, history)
    .then(months => {
      const monthsNames = months.map(month => dateFnsFormat(Date.parse(month), "LLLL", {locale: USER_LOCALE}));
      setMonthsWithoutAttendanceInfo(monthsNames);
    })
    .catch(() => showError("Произошла ошибка при загрузке информации о посещаемости по месяцам"));
};


export default Attendances;
