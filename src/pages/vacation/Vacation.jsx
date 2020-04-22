import React, {useContext, useEffect, useState} from "react";
import {Card, CardContent, CircularProgress, Container, Grid} from "@material-ui/core";
import {claimTask, completeTask, findProcessInstance, getProcessInstanceVariables, getUserTask, sendMessage, startProcess} from "../../api/processApi"
import {AppContext} from "../../AppContext";
import {useSnackbar} from "../../utils/snackbar";
import {VacationReadonlyView, VacationView} from "./VacationView";
import {firstListItem, handleError} from "./common";

const VACATION_APPROVAL_PROCESS = 'vacation-approval';
const FILL_VACATION_TASK = 'vacation-fill';

const findVacationProcess = (user, history, errorHandler) => {
  const searchParams = {
    'processDefinitionKey': VACATION_APPROVAL_PROCESS,
    'active': 'true',
    'vacation-approval': 'initiatorLogin_eq_' + user,
    'maxResults': '1'
  };
  return findProcessInstance(searchParams, history)
    .then(firstListItem)
    .catch(errorHandler);
};

const startVacationProcess = (user, history, errorHandler) => {
  const variables = {
    initiatorLogin: {value: user}
  };
  return startProcess(VACATION_APPROVAL_PROCESS, history, variables)
    .then(process => ({id: process.id, businessKey: process.businessKey}))
    .catch(errorHandler);
};

const findVacationTask = (processId) => {
  return getUserTask(VACATION_APPROVAL_PROCESS, FILL_VACATION_TASK, processId).then(firstListItem);
};

const loadVacation = async (user, history, errorHandler) => {
  let vacation = await findVacationProcess(user, history, errorHandler);

  if (!vacation || !vacation.id) {
    vacation = await startVacationProcess(user, history, errorHandler);
  }

  const variables = await getProcessInstanceVariables(vacation.id).catch(errorHandler);
  const task = await findVacationTask(vacation.id).catch(errorHandler);

  if (task && task.id) {
    await claimTask(user, task.id).catch(errorHandler);
  }

  return {
    processId: vacation.id,
    businessKey: vacation.businessKey,
    taskId: task && task.id,
    status: variables.status.value || ''
  };
};

const VacationContent = (props) => {
  const [context] = useContext(AppContext);
  const {currentUser} = context;
  const {history} = props;
  const {showError} = useSnackbar();
  const [vacation, setVacation] = useState(null);
  const [loading, setLoading] = useState(true);

  const reloadVacation = () => {
    setLoading(true);
    loadVacation(currentUser.username, history, handleError(showError, "Ошибка"))
      .then(setVacation)
      .finally(() => setLoading(false));
  };

  const onSubmit = (startDate, endDate, substitute, phone) => {
    const variables = {
      startDate: {value: startDate},
      endDate: {value: endDate},
      substitute: {value: substitute},
      phone: {value: phone},
      lastAction: {value: 'submit'}
    };
    completeTask(vacation.taskId, variables)
      .then(reloadVacation)
      .catch(handleError(showError, 'Не удалось создать заявку'));
  };

  const onCancel = () => {
    const variables = {
      lastAction: {value: 'cancel'}
    };
    completeTask(vacation.taskId, variables)
      .then(() =>
        getProcessInstanceVariables(vacation.processId)
          .then(() => history.push('/'))
      )
      .catch(handleError(showError, 'Не удалось создать заявку'));
  };

  useEffect(reloadVacation, [currentUser, history, showError]);

  if (loading) {
    return <Grid container justify="center" alignItems="center"><CircularProgress/></Grid>;
  }

  if (vacation.status && vacation.status !== 'new' && vacation.status !== 'correction') {
    return <VacationReadonlyView vacation={vacation} onCancel={onCancel} history={history}/>;
  } else {
    return <VacationView vacation={vacation} history={history} onSubmit={onSubmit} onCancel={onCancel}/>;
  }
};

const Vacation = (props) => {
  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <VacationContent {...props}/>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Vacation;