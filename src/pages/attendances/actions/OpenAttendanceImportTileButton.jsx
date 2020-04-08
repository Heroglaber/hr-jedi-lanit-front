import Archive from "@material-ui/icons/Archive";
import React from "react";
import TileButton from "../../../components/tileButton/TileButton";

export const OpenAttendanceImportTileButton = ({history, className, disabled = false, visible = true}) => (
  <TileButton
    className={className}
    buttonLabel="Импорт данных посещаемости"
    IconComponent={Archive}
    onClick={() => history.push("attendances/attendance-import")}
    disabled={disabled}
    visible={visible}
  />
);
