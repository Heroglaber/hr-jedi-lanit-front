import CloudUload from "@material-ui/icons/CloudUpload";
import React from "react";
import TileButton from "../../../components/tileButton/TileButton";

export const OpenAttendanceImportTileButton = ({history, className, disabled = false, visible = true}) => (
  <TileButton
    className={className}
    buttonLabel="Импорт данных посещаемости"
    IconComponent={CloudUload}
    onClick={() => history.push("/attendances/attendance-import")}
    disabled={disabled}
    visible={visible}
  />
);
