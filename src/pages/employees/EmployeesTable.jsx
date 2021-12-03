import React, { useState } from "react";
import { Table, TableHead, TableCell, TablePagination } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableBody from "@material-ui/core/TableBody";
import { useEmployeesStyles } from "./EmployeesStyles";
import Typography from "@material-ui/core/Typography";
import * as sorting from "../../utils/sorting";

function createRoleString(user) {
  let result = "";
  for (let i = 0; i < user.roles.length; i++) {
    result += user.roles[i].name.replace("ROLE_", "") + " ";
  }
  return result;
}

const headerNames = {
  employee: "Сотрудник",
  role: "Роль",
};

const EmployeesTable = (props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentOrderBy, setCurrentOrderBy] = useState("created");
  const [currentOrder, setCurrentOrder] = useState("desc");
  const { employees } = props;
  const classes = useEmployeesStyles();

  return (
    <div>
      <Table className={classes.table}>
        <TableHead id="headerTable">
          <TableRow>
            {Object.keys(headerNames).map(key => (
              <TableCell
                key={key}
                className={classes.tableHeadCell}
                sortDirection={currentOrderBy === key ? currentOrder : false}
              >
                <TableSortLabel
                  active={currentOrderBy === key}
                  direction={currentOrder}
                  onClick={sorting.createSortHandler(key, currentOrder, currentOrderBy, setCurrentOrder, setCurrentOrderBy)}
                >
                  {headerNames[key]}
                </TableSortLabel>
              </TableCell>))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sorting.stableSort(employees, sorting.getSorting(currentOrder, currentOrderBy))
            .slice(currentPage * rowsPerPage, (currentPage * rowsPerPage) + rowsPerPage)
            .map(row => (
              <TableRow className={classes.tableRow}>
                <TableCell component="th" scope="row" className={classes.tableCell}>
                  <Typography variant="body2">{row.login}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" className={classes.tableCell}>
                  <Typography variant="body2">{createRoleString(row)}</Typography>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={employees.length}
        page={currentPage}
        rowsPerPage={rowsPerPage}
        backIconButtonProps={{ "aria-label": "Назад" }}
        nextIconButtonProps={{ "aria-label": "Вперед" }}
        labelRowsPerPage="Строк на страницу"
        onChangePage={sorting.createChangePageHandler(setCurrentPage)}
        onChangeRowsPerPage={sorting.createChangeRowsPerPageHandler(setRowsPerPage)}
        className={classes.tablePagination}
      />
    </div>
  );
}

export default EmployeesTable;