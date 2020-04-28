import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import React from "react";
import TileButton from "../../../components/tileButton/TileButton";

export const DownloadAttendanceReportTileButton = ({history, className, disabled = false, visible = true}) => (
  <TileButton
    className={className}
    buttonLabel="Отчет о посещаемости"
    IconComponent={AssignmentTurnedInIcon}
    onClick={() => history.push("/attendances/report")}
    disabled={disabled}
    visible={visible}
  />
);
