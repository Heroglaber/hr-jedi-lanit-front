import React, {useState} from "react";
import AttendancesReportView from "./AttendancesReportView.jsx";
import {getAttendanceReport} from "../../../api/attendancesApi";
import {useSnackbar} from "../../../utils/snackbar";
import {format} from 'date-fns'

const AttendancesReport = ({history}) => {
  const [date, setDate] = useState(new Date());
  const {showError} = useSnackbar();
  const onDownloadReport = () => {
    getAttendanceReport(format(date, 'MMMM'), date.getFullYear())
      .catch((error) => showError("Произошла ошибка при скачивании отчета о посещаемости" + error));
  };
  return (
    <AttendancesReportView
      date={date}
      history={history}
      setDate={setDate}
      onDownloadReport={onDownloadReport}
    />
  );
};

export default AttendancesReport;
