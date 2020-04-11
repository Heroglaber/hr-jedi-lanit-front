import {getCommonJsonRequestProps, throwHttpErrors} from "../common";
import axios from "axios";

export const getMonthsWithoutAttendanceInfo = (year, history) =>
  axios.get(`/hr-rest/attendances/monthsWithoutInfo/${year}`, {
    ...getCommonJsonRequestProps(),
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.data)
    .then(months => months || []);
