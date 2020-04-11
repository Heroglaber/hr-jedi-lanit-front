
export const createChangePageHandler = (currentPageStateSetter) => (event, page) => {
  currentPageStateSetter(page);
};

export const createChangeRowsPerPageHandler = (rowsPerPageSetter) => (event) => {
  rowsPerPageSetter(event.target.value);
};

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getSorting = (order, orderBy) => (order === "desc" ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy));

export const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

const handleRequestSort = (event, property, currentOrder, currentOrderBy, currentOrderSetter, currentOrderBySetter) => {
  const orderBy = property;
  let order = "desc";

  if (currentOrderBy === property && currentOrder === "desc") {
    order = "asc";
  }

  currentOrderSetter(order);
  currentOrderBySetter(orderBy);
};

export const createSortHandler = (property, currentOrder, currentOrderBy, currentOrderSetter, currentOrderBySetter) => (event) => {
  handleRequestSort(event, property, currentOrder, currentOrderBy, currentOrderSetter, currentOrderBySetter);
};
