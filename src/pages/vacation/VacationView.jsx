import React, {useEffect, useState} from "react";
import VacationForm from "./VacationForm";
import {getProcessInstanceVariables} from "../../api/processApi";
import {useSnackbar} from "../../utils/snackbar";
import {CircularProgress, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {handleError} from "./common";

const loadVacationData = async (processId) => {
  if (!processId) {
    return null;
  }
  return await getProcessInstanceVariables(processId)
    .then(response => ({
      startDate: response.startDate.value || null,
      endDate: response.endDate.value || null,
      substitute: response.substitute.value || '',
      phone: response.phone.value || '',
    }));
};

export const VacationView = ({vacation, onSubmit, onCancel}) => {
  const {showError} = useSnackbar();
  const [vacationData, setVacationData] = useState(null);

  useEffect(() => {
    loadVacationData(vacation.processId)
      .then(setVacationData)
      .catch(handleError(showError, "Не удалось загрузить информацию о задаче"));
  }, [vacation.processId, showError]);

  return vacationData == null
    ? (<Grid container justify="center" alignItems="center"><CircularProgress/></Grid>)
    : (<Grid container>
      <Grid item xs={12}>
        <Typography variant='h6'>Хочу в отпуск:</Typography>
      </Grid>
      <Grid item>
        <VacationForm vacation={vacationData} readonly={false} onSubmit={onSubmit} onCancel={onCancel}/>
      </Grid>
    </Grid>)
};

export const VacationReadonlyView = ({vacation, onCancel, onCorrection}) => {
  const {showError} = useSnackbar();
  const [vacationData, setVacationData] = useState(null);

  useEffect(() => {
    loadVacationData(vacation.processId)
      .then(setVacationData)
      .catch(handleError(showError, "Не удалось загрузить информацию о задаче"));
  }, [vacation.processId, showError]);

  const approveBy = 'Дядя Вася';

  return vacationData == null
    ? <Grid container justify="center" alignItems="center"><CircularProgress/></Grid>
    : (<Grid container spacing={1}>
      <Grid item>
        <Typography variant='h5'>Заявку {vacation.businessKey} согласовывает {approveBy}</Typography>
      </Grid>
      <Grid item>
        <VacationForm vacation={vacationData} onCorrection={onCorrection} onCancel={onCancel} readonly={true}/>
      </Grid>
    </Grid>)
};