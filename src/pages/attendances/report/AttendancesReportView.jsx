import React from "react";
import {useSimplePageStyles} from "../../../styles/simplePageStyles";
import Helmet from "react-helmet";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ContextActionsSection from "../../../components/contextActionSection/ContextActionsSection";
import {HR, OMNI} from "../../../security/Authorities";
import AuthWrapper from "../../../security/AuthWrapper";
import TileButton from "../../../components/tileButton/TileButton";
import Archive from "@material-ui/icons/Archive";
import {DatePicker} from "@material-ui/pickers";

const AttendancesReportView = ({date, setDate, history, onDownloadReport}) => {
  const classes = useSimplePageStyles();
  return <div>
    <Helmet title="Отчет о посещаемости"/>
    <Card>
      <CardContent>
        <Typography className={classes.pageTitle} variant="h3">Отчет о посещаемости</Typography>
        <DatePicker
          autoOk
          views={["year", "month"]}
          label="Месяц года"
          disableFuture
          value={date}
          onChange={setDate}
          className={classes.dateTimeInput}
        />
        <ContextActionsSection history={history}>
          <AuthWrapper authorities={[OMNI, HR]}>
            <TileButton
              buttonLabel="Скачать отчет о посещаемости"
              IconComponent={Archive}
              onClick={onDownloadReport}
            />
          </AuthWrapper>
        </ContextActionsSection>
      </CardContent>
    </Card>
  </div>
};

export default AttendancesReportView;
