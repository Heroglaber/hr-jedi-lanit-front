import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {NavLink} from "react-router-dom";
import {useErrorStyles} from "./errorStyles";

const Error = ({title = "Ой! Произошла ошибка...", message = "Извините, мы обязательно разберёмся, что случилось.", details}) => {
  const classes = useErrorStyles();
  return (
    <Card>
      <CardContent>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="h6" className={classes.largeMessage}>{message}</Typography>
        <NavLink to="/" className={classes.errorNavHome}>
          <Button variant="contained" color="primary" size="large">
            На главную
          </Button>
        </NavLink>
        {details &&
        <ExpansionPanel className={classes.errorDetails}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} classes={{root: classes.errorDetailsSummary}}>
            <Typography variant="subtitle1">Технические подробности</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <pre>{details}</pre>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        }
      </CardContent>
    </Card>
  );
};

export default Error;
