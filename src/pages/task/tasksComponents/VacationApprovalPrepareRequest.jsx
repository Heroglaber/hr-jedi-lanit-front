import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useTaskStyles} from "../taskStyles";
import {DatePicker} from "../../../forms/inputs/datePicker/DatePicker";
import {formikValidate} from "../../../forms";
import {notPrecededBy, required} from "../../../forms/formik/formikValidationRules";
import TaskHarness from "../taskHarness/TaskHarness";

const ActionSubmit = props => {
  const {values, setFieldValue, handleSubmit, isSubmitting, errors, setErrors} = props;
  const classes = useTaskStyles();
  return (
    <>
      <div className={classes.actionContent}>
        <Typography>
          Введите даты отпуска и отправьте заявку на согласование.
        </Typography>
        <DatePicker
          name="taskVariables.vacation.start"
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

const validateSubmit = formikValidate({
  taskVariables: {
    vacation: {
      start: [required()],
      end: [required(), notPrecededBy("start")],
    },
  },
});

const updateVariables = (variables, action) => ({
  vacation: variables.vacation,
  action: action.id,
});

const vacationApprovalPrepareRequestUiDescription = {
  actions: [
    {
      id: "submit",
      name: "Отправить запрос",
      ComponentAction: ActionSubmit,
      validate: validateSubmit,
      updateVariables: updateVariables,
    },
    {
      id: "cancel",
      name: "Отозвать запрос",
      ComponentAction: ActionCancel,
    },
  ],
  defaultActionId: "submit",
};

const VacationApprovalPrepareRequest = props => <TaskHarness uiDescription={vacationApprovalPrepareRequestUiDescription} {...props}/>

export default VacationApprovalPrepareRequest;
