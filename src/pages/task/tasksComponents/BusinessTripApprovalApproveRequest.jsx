import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useTaskStyles} from "../taskStyles";
import dateFnsFormat from "date-fns/format";
import TaskHarness from "../taskHarness/TaskHarness";
import {SelectInput} from "../../../forms/inputs/selectInput/SelectInput";
import {formikValidate} from "../../../forms";
import {required} from "../../../forms/formik/formikValidationRules";

const ActionApprove = props => {
  const {values, handleSubmit, isSubmitting, errors, setErrors} = props;
  const classes = useTaskStyles();
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
          name="taskVariables.businessTrip.hotel"
          value={values.taskVariables.businessTrip.hotel}
          items={[]}
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

const validateSubmit = formikValidate({
  taskVariables: {
    businessTrip: {
      hotel: [required()],
    },
  },
});

const businessTripApprovalApproveRequestUiDescription = {
  actions: [
    {
      id: "approve",
      name: "Согласовать заявку",
      ComponentAction: ActionApprove,
      validate: validateSubmit,
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
