import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Helmet from "react-helmet";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Typography from "@material-ui/core/Typography";
import dateFnsFormat from "date-fns/format";
import {useTaskListStyles} from "./taskListStyles";
import {previewfy} from "../../common";
import * as sorting from "../../utils/sorting";

const TaskListView = (props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentOrder, setCurrentOrder] = useState("desc");
  const [currentOrderBy, setCurrentOrderBy] = useState("created");
  const {tasks, onTaskClick} = props;
  const classes = useTaskListStyles();

  const headerNames = {
    processBusinessKey: "ID",
    processName: "Процесс",
    name: "Задача",
    created: "Дата поступления",
  };

  return (
    <div>
      <Helmet title="Задачи"/>
      <Card>
        <CardContent className={classes.taskListCard}>
          <Typography variant="h3" className={classes.pageTitle}>Задачи</Typography>
          {tasks ?
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
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sorting.stableSort(tasks, sorting.getSorting(currentOrder, currentOrderBy))
                    .slice(currentPage * rowsPerPage, (currentPage * rowsPerPage) + rowsPerPage)
                    .map(row => (
                      <TableRow className={classes.tableRow} key={row.id} onClick={onTaskClick(row.id)}>
                        <TableCell component="th" scope="row" className={classes.tableIShortCell}>
                          <Typography variant="body2">{row.processBusinessKey}</Typography>
                        </TableCell>
                        <TableCell component="th" scope="row" className={classes.tableCell}>
                          <Typography variant="body2">{row.processName}</Typography>
                        </TableCell>
                        <TableCell component="th" scope="row" className={classes.tableCell}>
                          <Typography variant="body2">{row.name}</Typography>
                        </TableCell>
                        <TableCell align="right" className={classes.tableIShortCell}>
                          <Typography variant="body2">{dateFnsFormat(new Date(row.created), "HH:mm dd.MM.yyyy")}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[10, 25]}
                component="div"
                count={tasks.length}
                page={currentPage}
                rowsPerPage={rowsPerPage}
                backIconButtonProps={{"aria-label": "Назад"}}
                nextIconButtonProps={{"aria-label": "Вперед"}}
                labelRowsPerPage="Строк на страницу"
                onChangePage={sorting.createChangePageHandler(setCurrentPage)}
                onChangeRowsPerPage={sorting.createChangeRowsPerPageHandler(setRowsPerPage)}
                className={classes.tablePagination}
              />
            </div>
            :
            <div className={previewfy(classes, classes.table, true)}/>
          }
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskListView;
