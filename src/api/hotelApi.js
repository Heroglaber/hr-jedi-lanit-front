import {getCommonJsonRequestProps, throwHttpErrors} from "../common";

export const getAllHotels = (history) =>
  fetch(`/hr-rest/hotels`, {
    method: "GET",
    ...getCommonJsonRequestProps(),
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json())
    .then(hotels => hotels || []);