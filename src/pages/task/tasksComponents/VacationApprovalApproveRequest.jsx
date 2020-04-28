import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useTaskStyles} from "../taskStyles";
import dateFnsFormat from "date-fns/format";
import TaskHarness from "../taskHarness/TaskHarness";

const ActionApprove = props => {
  const {values, handleSubmit, isSubmitting} = props;
  const classes = useTaskStyles();
  return (
    <>
      <div className={classes.actionContent}>
        <Typography paragraph>
          Ознакомьтесь с заявкой на отпуск и примите решение по её согласованию.
        </Typography>
        <Typography>
          Начало отпуска: <strong>{dateFnsFormat(new Date(values.taskVariables.vacation.start), "dd.MM.yyyy")}</strong>
        </Typography>
        <Typography>
          Конец отпуска: <strong>{dateFnsFormat(new Date(values.taskVariables.vacation.end), "dd.MM.yyyy")}</strong>
        </Typography>

      </div>
      <div className={classes.actionButtons}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >Согласовать
        </Button>
      </div>
    </>
  );
};

const ActionReject = props => {
  const {handleSubmit, isSubmitting} = props;
  const classes = useTaskStyles();
  return (
    <>
      <div className={classes.actionContent}>
        <Typography>
          Отклоните заявку, если она не соответствует требованиям к оформлению отпусков.
        </Typography>
      </div>
      <div className={classes.actionButtons}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >Отклонить
        </Button>
      </div>
    </>
  );
};

const vacationApprovalApproveRequestUiDescription = {
  actions: [
    {
      id: "approve",
      name: "Согласовать заявку",
      ComponentAction: ActionApprove,
    },
    {
      id: "reject",
      name: "Отклонить заявку",
      ComponentAction: ActionReject,
    },
  ],
  defaultActionId: "submit",
};

const VacationApprovalApproveRequest = props => <TaskHarness uiDescription={vacationApprovalApproveRequestUiDescription} {...props}/>

export default VacationApprovalApproveRequest;
