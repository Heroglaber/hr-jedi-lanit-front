import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useTaskStyles} from "../taskStyles";
import {DatePicker} from "../../../forms/inputs/datePicker/DatePicker";
import {formikValidate} from "../../../forms";
import {notPrecededBy, required} from "../../../forms/formik/formikValidationRules";
import TaskHarness from "../taskHarness/TaskHarness";
import {TextInput} from "../../../forms/inputs/textInput/TextInput";

const ActionSubmit = props => {
  const {values, setFieldValue, handleSubmit, isSubmitting, errors, setErrors} = props;
  const classes = useTaskStyles();
  return (
    <>
      <div className={classes.actionContent}>
        <Typography>
          Введите даты командировки, бюджет и отправьте заявку.
        </Typography>
        <DatePicker
          name="taskVariables.businessTrip.start"
          label="Начало командировки"
          disabled={isSubmitting}
          isKeyboard
          value={values.taskVariables.businessTrip.start}
          setFieldValue={setFieldValue}
          errors={errors}
          setErrors={setErrors}
          className={classes.formInputDate}
        />
        <DatePicker
          name="taskVariables.businessTrip.end"
          label="Конец командировки"
          disabled={isSubmitting}
          isKeyboard
          value={values.taskVariables.businessTrip.end}
          setFieldValue={setFieldValue}
          errors={errors}
          setErrors={setErrors}
          className={classes.formInputDate}
        />
        <TextInput
          name="taskVariables.businessTrip.budget"
          label="Бюджет командировки в рублях"
          value={values.taskVariables.businessTrip.budget}
          setFieldValue={setFieldValue}
          errors={errors}
          setErrors={setErrors}
          className={classes.formInputBudget}
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
          Отзовите заявку, если она потеряла актуальность.
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
    businessTrip: {
      budget:  [required()],
      start: [required()],
      end: [required(), notPrecededBy("start")],
    },
  },
});

const updateVariables = (variables, action) => ({
  businessTrip: variables.businessTrip,
  action: action.id,
});

const businessTripApprovalPrepareRequestUiDescription = {
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

const BusinessTripApprovalPrepareRequest = props => <TaskHarness uiDescription={businessTripApprovalPrepareRequestUiDescription} {...props}/>

export default BusinessTripApprovalPrepareRequest;
