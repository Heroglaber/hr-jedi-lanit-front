import {getCommonJsonRequestProps, throwHttpErrors} from "../common";
import download from "js-file-download";

const getFileName = (response) => {
  const contentDispositionHeader = response.headers.get("Content-Disposition").toString();
  const fileNameStartIndex = contentDispositionHeader.indexOf("''") + 2;
  return decodeURI(contentDispositionHeader.slice(fileNameStartIndex));
};

export const getMonthsWithoutAttendanceInfo = (year, history) =>
  fetch(`/hr-rest/attendances/monthsWithoutInfo/${year}`, {
      method: "GET",
      ...getCommonJsonRequestProps(),
    })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json())
    .then(months => months || []);

export const getAttendanceReport = (month, year) =>
  fetch(`/hr-rest/attendances/month-report/download?month=${month}&year=${year}`, {
    ...getCommonJsonRequestProps(),
  })
    .then(throwHttpErrors)
    .then((response) => {
      response.blob().then(blob => download(blob, getFileName(response)));
    });
