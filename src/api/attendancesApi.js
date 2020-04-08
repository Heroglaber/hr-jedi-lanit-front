import {getCommonJsonRequestProps, throwHttpErrors} from "../common";

export const getMonthsWithoutAttendanceInfo = (year, history) =>
  fetch(`hr-rest/attendances/monthsWithoutInfo/${year}`, {
    method: "GET",
    ...getCommonJsonRequestProps(),
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json())
    .then(months => months || []);
