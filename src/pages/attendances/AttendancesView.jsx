import React from "react";
import {useSimplePageStyles} from "../../styles/simplePageStyles";
import {CircularProgress} from "@material-ui/core";
import Helmet from "react-helmet";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ContextActionsSection from "../../components/contextActionSection/ContextActionsSection";
import {HR, OMNI} from "../../security/Authorities";
import AuthWrapper from "../../security/AuthWrapper";
import {OpenAttendanceImportTileButton} from "./actions/OpenAttendanceImportTileButton";
import {DownloadAttendanceReportTileButton} from "./actions/DownloadAttendanceReportTileButton";

const AttendancesView = ({monthsWithoutAttendanceInfo, currentYear, preview = true, history}) => {
  const classes = useSimplePageStyles();
  return preview ?
    <CircularProgress/>
    : (<div>
      <Helmet title="Посещаемость - HR Jedi"/>
      <Card>
        <CardContent>
          <Typography className={classes.pageTitle} variant="h3">Посещаемость</Typography>
          <YearAttendanceInfo monthsWithoutAttendanceInfo={monthsWithoutAttendanceInfo} currentYear={currentYear} classes={classes}/>
          <ContextActionsSection history={history}>
            <AuthWrapper authorities={[OMNI, HR]}>
              <OpenAttendanceImportTileButton/>
            </AuthWrapper>
            <AuthWrapper authorities={[OMNI, HR]}>
              <DownloadAttendanceReportTileButton/>
            </AuthWrapper>
          </ContextActionsSection>
        </CardContent>
      </Card>
    </div>);
};

const YearAttendanceInfo = ({monthsWithoutAttendanceInfo, currentYear, classes}) => {
  return monthsWithoutAttendanceInfo.length === 0 ?
    <Typography className={classes.label} component="span" display="block">
      За {currentYear} год вся информация о посещаемости внесена в систему.
    </Typography>
    :
    <>
      <Typography className={classes.label} component="span" display="block">
        За {currentYear} год отсутствует информация о посещаемости за следующие месяцы:
      </Typography>
      <Typography className={classes.label} component="span" display="block">
        {monthsWithoutAttendanceInfo.map(month => <div key={month}>• {month}<br/></div>)}
      </Typography>
    </>;
};

export default AttendancesView;
