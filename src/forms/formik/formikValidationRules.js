
export const required = (message = 'Обязательное поле') => {
  return (value) => value ? null : message;
};

export const notPrecededBy = (startPeriodValueName, message = 'Конец периода не может предшествовать началу периода') =>
  (endPeriod, allValues) => (new Date(allValues[startPeriodValueName]) > new Date(endPeriod)) && message;
