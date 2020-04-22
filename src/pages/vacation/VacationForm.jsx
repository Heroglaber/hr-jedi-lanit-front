import DateFnsUtils from "@date-io/date-fns";
import {startOfDay} from "date-fns";
import {Button, Grid, TextField} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import React, {useState} from "react";

const VacationForm = ({vacation, readonly, onSubmit, onCancel}) => {
  const [startDate, setStartDate] = useState(vacation.startDate || startOfDay(new Date()));
  const [endDate, setEndDate] = useState(vacation.endDate || startOfDay(new Date()));
  const [substitute, setSubstitute] = useState(vacation.substitute || '');
  const [phone, setPhone] = useState(vacation.phone || '');

  const onSubmitButtonClicked = () => onSubmit(startDate, endDate, substitute, phone);
  const onCancelButtonClicked = () => onCancel();
  const onSubstituteChanged = (event) => setSubstitute(event.target.value);
  const onPhoneChanged = (event) => setPhone(event.target.value);

  return <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <KeyboardDatePicker
          inputVariant='outlined'
          margin='normal'
          id='vacation-start-date'
          disablePast
          fullWidth
          label='Начиная с'
          format='dd/MM/yyyy'
          value={startDate}
          onChange={(date) => setStartDate(date)}
          disabled={readonly}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <KeyboardDatePicker
          inputVariant='outlined'
          margin='normal'
          id='vacation-end-date'
          fullWidth
          label='Заканчивая'
          format='dd/MM/yyyy'
          value={endDate}
          onChange={(date) => setEndDate(date)}
          disabled={readonly}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <TextField id='vacation-substitute' fullWidth required variant='outlined' value={substitute} onChange={onSubstituteChanged}
                   disabled={readonly} label='Замещающий'/>
      </Grid>
      <Grid item xs={6}>
        <TextField id='vacation-phone' fullWidth required variant='outlined' value={phone} onChange={onPhoneChanged} disabled={readonly}
                   label='Номер телефона'/>
      </Grid>
      {!readonly && (
        <React.Fragment>
          <Grid item xs={6}>
            <Button fullWidth onClick={onSubmitButtonClicked} variant="contained" color="primary" size="large">Отправить на согласование</Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth onClick={onCancelButtonClicked} variant="contained" size="large">Отменить заявку</Button>
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  </MuiPickersUtilsProvider>
};

export default VacationForm;