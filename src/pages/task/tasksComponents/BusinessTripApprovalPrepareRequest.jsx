import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useTaskStyles} from "../taskStyles";
import {DatePicker} from "../../../forms/inputs/datePicker/DatePicker";
import {formikValidate} from "../../../forms";
import {notPrecededBy, required} from "../../../forms/formik/formikValidationRules";
import TaskHarness from "../taskHarness/TaskHarness";
import {TextInput} from "../../../forms/inputs/textInput/TextInput";
import {SelectInput} from "../../../forms/inputs/selectInput/SelectInput";
import {getAllUsersExceptCurrent} from "../../../api/employeeApi";
import {useSnackbar} from "../../../utils/snackbar";

const ActionSubmit = props => {
  const {values, setFieldValue, handleSubmit, isSubmitting, errors, setErrors, history} = props;
  const classes = useTaskStyles();
  const [users, setUsers] = useState([]);
  const {showError} = useSnackbar();
  useEffect(() => {
    loadAllUsers(setUsers, history, showError);
  }, [setUsers, history, showError]);
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
        <SelectInput
          label="Командируемый сотрудник"
          name="taskVariables.businessTrip.employee"
          setFieldValue={setFieldValue}
          value={values.taskVariables.businessTrip.employee}
          showValue={getFullName}
          items={users}
          errors={errors}
          setErrors={setErrors}
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

const loadAllUsers = (setUsers, history, showError) => {
  getAllUsersExceptCurrent(history)
    .then(users => setUsers(users))
    .catch(() => showError("Ошибка при попытке загрузки списка пользователей"));
};

function getFullName(user) {
  return user.patronymic ? `${user.firstName} ${user.patronymic} ${user.lastName}` : `${user.firstName} ${user.lastName}`;
}

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
