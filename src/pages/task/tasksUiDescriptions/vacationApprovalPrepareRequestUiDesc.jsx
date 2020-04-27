import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useTaskStyles} from "../taskStyles";
import {DatePicker} from "../../../forms/inputs/datePicker/DatePicker";
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";

const ActionSubmit = props => {
  const {values, setFieldValue, handleSubmit, isSubmitting, errors, setErrors} = props;
  const classes = useTaskStyles();
  return (
    <>
      <div className={classes.actionContent}>
        <Typography>
          Введите даты отпуска и отправьте заявку на согласование.
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          name="taskVariables.vacation.startPeriod"
          label="Начало отпуска"
          disabled={isSubmitting}
          isKeyboard
          value={values.taskVariables.vacation.start}
          setFieldValue={setFieldValue}
          errors={errors}
          setErrors={setErrors}
          className={classes.formInputDate}
        />
        <DatePicker
          name="taskVariables.vacation.end"
          label="Конец отпуска"
          disabled={isSubmitting}
          isKeyboard
          value={values.taskVariables.vacation.end}
          setFieldValue={setFieldValue}
          errors={errors}
          setErrors={setErrors}
          className={classes.formInputDate}
        />
        </MuiPickersUtilsProvider>

      </div>
      <div className={classes.actionButtons}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >Отправить
        </Button>
      </div>
    </>
  );
};

const ActionCancel = props => {
  const {handleSubmit, isSubmitting} = props;
  const classes = useTaskStyles();
  return (
    <>
      <div className={classes.actionContent}>
        <Typography>
          Отзовите заявку, если она потреяла актуальность.
        </Typography>
      </div>
      <div className={classes.actionButtons}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >Отозвать
        </Button>
      </div>
    </>
  );
};

const vacationApprovalPrepareRequestUiDesc = {
  actions: [
    {
      id: "submit",
      name: "Отправить запрос",
      ComponentAction: ActionSubmit,
      /*ComponentAction: ActionSubmit,
      validate: validateSubmit,
      updateVariables: updateTaskVariables,*/
    },
    {
      id: "cancel",
      name: "Отозвать запрос",
      ComponentAction: ActionCancel,
    },
  ],
  defaultActionId: "submit",
};

export default vacationApprovalPrepareRequestUiDesc;
