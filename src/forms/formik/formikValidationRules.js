
export const required = (message = 'Обязательное поле') => {
  return (value) => value ? null : message;
};
