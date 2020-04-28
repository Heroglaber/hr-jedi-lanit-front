import {getCommonJsonRequestProps, throwHttpErrors} from "../common";
import axios from "axios";
import download from "js-file-download";

const getFileName = (response) => {
  const contentDispositionHeader = response.headers.get("Content-Disposition").toString();
  const fileNameStartIndex = contentDispositionHeader.indexOf("''") + 2;
  return decodeURI(contentDispositionHeader.slice(fileNameStartIndex));
};

export const getMonthsWithoutAttendanceInfo = (year, history) =>
  axios.get(`/hr-rest/attendances/monthsWithoutInfo/${year}`, {
      ...getCommonJsonRequestProps(),
    })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.data)
    .then(months => months || []);

export const getAttendanceReport = (month, year) =>
  fetch(`/hr-rest/attendances/month-report/download?month=${month}&year=${year}`, {
    ...getCommonJsonRequestProps(),
  })
    .then(throwHttpErrors)
    .then((response) => {
      response.blob().then(blob => download(blob, getFileName(response)));
    });
