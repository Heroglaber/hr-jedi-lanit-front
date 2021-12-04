import {ContactMail} from "@material-ui/icons";
import React, {useContext} from "react";
import TileButton from "../../../components/tileButton/TileButton";
import * as processApi from "../../../api/processApi";
import {AppContext} from "../../../AppContext";
import {useSnackbar} from "../../../utils/snackbar";

export const StartBusinessTripsApprovalProcessTileButton = ({history, className, disabled = false, visible = true}) => {
  const [context] = useContext(AppContext);
  const {currentUser} = context;
  const {showError, showSuccess} = useSnackbar();
  return (
    <TileButton
      className={className}
      buttonLabel="Оформить заявку на командировку"
      IconComponent={ContactMail}
      onClick={onStartBusinessTripsApprovalProcessButtonClick(currentUser, history, showError, showSuccess)}
      disabled={disabled}
      visible={visible}
    />
  );
};

const onStartBusinessTripsApprovalProcessButtonClick = (currentUser, history, showError, showSuccess) => () => {
  return processApi.startProcess("business-trip-approval", history)
    .catch(() => showError("Возникла ошибка при запуске процесса согласования места проживания"))
    .then(startedProcessInfo => processApi.getTasksByProcessIdAndAssignee(startedProcessInfo.id, currentUser.username))
    .then(taskList => {
      const destinationUrl = `/task/${taskList[0].id}`;
      return history.push(destinationUrl)
    })
    .then(() => showSuccess("Процесс согласования места проживания успешно запущен"))
    .catch(error => showError("Возникла ошибка при переходе на страницу согласования места проживания " + error));
};
