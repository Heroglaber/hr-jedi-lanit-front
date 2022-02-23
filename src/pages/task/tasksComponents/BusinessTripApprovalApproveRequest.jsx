import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useTaskStyles} from "../taskStyles";
import dateFnsFormat from "date-fns/format";
import TaskHarness from "../taskHarness/TaskHarness";
import {SelectInput} from "../../../forms/inputs/selectInput/SelectInput";
import {formikValidate} from "../../../forms";
import {required} from "../../../forms/formik/formikValidationRules";
import * as hotelApi from "../../../api/hotelApi";
import {useSnackbar} from "../../../utils/snackbar";

const ActionApprove = props => {
  const {values, setFieldValue, handleSubmit, isSubmitting, errors, setErrors, history} = props;
  const classes = useTaskStyles();
  const {showError} = useSnackbar();
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    loadAllHotels(setHotels, history, showError);
  }, [setHotels, history, showError]);

  return (
    <>
      <div className={classes.actionContent}>
        <Typography paragraph>
          Выберите отель для заселения на время командировки
        </Typography>
        <Typography>
          Начало командировки: <strong>{dateFnsFormat(new Date(values.taskVariables.businessTrip.start), "dd.MM.yyyy")}</strong>
        </Typography>
        <Typography>
          Конец командировки: <strong>{dateFnsFormat(new Date(values.taskVariables.businessTrip.end), "dd.MM.yyyy")}</strong>
        </Typography>
        <Typography>
          Бюджет на командировку в рублях: <strong>{values.taskVariables.businessTrip.budget}</strong>
        </Typography>
        <SelectInput
          label="Отель для заселения"
          name="taskVariables.hotel"
          setFieldValue={setFieldValue}
          value={values.taskVariables.hotel}
          showValue={getHotelName}
          items={hotels}
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
        >
          Согласовать
        </Button>
      </div>
    </>
  );
};

const loadAllHotels = (setHotels, history, showError) => {
  hotelApi.getAllHotels(history)
    .then(hotels => setHotels(hotels))
    .catch(() => showError("Ошибка при попытке загрузки списка отелей"));
};

function getHotelName(hotel) {
  return hotel.name;
}

const ActionReject = props => {
  const {handleSubmit, isSubmitting} = props;
  const classes = useTaskStyles();
  return (
    <>
      <div className={classes.actionContent}>
        <Typography>
          Отклоните заявку, если командировка потеряла актуальность.
        </Typography>
      </div>
      <div className={classes.actionButtons}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          Отклонить
        </Button>
      </div>
    </>
  );
};

const validateSubmit = formikValidate({
  taskVariables: {
    hotel: {
      name: [required()],
    },
  },
});

const updateVariables = (variables, action) => ({
  hotel: variables.hotel,
  action: action.id,
});

const businessTripApprovalApproveRequestUiDescription = {
  actions: [
    {
      id: "approve",
      name: "Согласовать заявку",
      ComponentAction: ActionApprove,
      validate: validateSubmit,
      updateVariables: updateVariables,
    },
    {
      id: "reject",
      name: "Отклонить заявку",
      ComponentAction: ActionReject,
    },
  ],
  defaultActionId: "submit",
};

const BusinessTripApprovalApproveRequest = props => <TaskHarness uiDescription={businessTripApprovalApproveRequestUiDescription} {...props}/>

export default BusinessTripApprovalApproveRequest;
