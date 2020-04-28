import {ContactMail} from "@material-ui/icons";
import React, {useContext} from "react";
import TileButton from "../../../components/tileButton/TileButton";
import * as processApi from "../../../api/processApi";
import {AppContext} from "../../../AppContext";
import {useSnackbar} from "../../../utils/snackbar";

export const StartVacationApprovalProcessTileButton = ({history, className, disabled = false, visible = true}) => {
  const [context] = useContext(AppContext);
  const {currentUser} = context;
  const {showError, showSuccess} = useSnackbar();
  return (
    <TileButton
      className={className}
      buttonLabel="Оформить заявку на отпуск"
      IconComponent={ContactMail}
      onClick={onStartVacationApprovalProcessButtonClick(currentUser, history, showError, showSuccess)}
      disabled={disabled}
      visible={visible}
    />
  );
};

const onStartVacationApprovalProcessButtonClick = (currentUser, history, showError, showSuccess) => () => {
  return processApi.startProcess("vacation-approval", history)
    .catch(error => showError("Возникла ошибка при запуске процесса согласования отпуска"))
    .then(startedProcessInfo => processApi.getTasksByProcessIdAndAssignee(startedProcessInfo.id, currentUser.username))
    .then(taskList => {
      const destinationUrl = `/task/${taskList[0].id}`;
      return history.push(destinationUrl)
    })
    .then(() => showSuccess("Процесс согласования отпуска успешно запущен"))
    .catch(error => showError("Возникла ошибка при переходе на страницу оформления заявки на отпуск " + error));
};
