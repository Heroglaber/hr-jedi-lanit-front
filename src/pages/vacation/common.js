export const firstListItem = (list) => {
  return list && list.length > 0 ? list[0] : null;
};

export const handleError = (notifier, message) => (error) => notifier(message + ": " + error);