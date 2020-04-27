import React from "react";
import {useSimplePageStyles} from "../../styles/simplePageStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

const SettingsView = ({generatedPassword, generatePassword}) => {
  const classes = useSimplePageStyles();
  return (
    <Card>
      <CardContent>
        <Typography className={classes.pageTitle} variant="h3">Утилиты</Typography>
        <Typography className={classes.pageText} component="span">Надежный пароль: {generatedPassword}</Typography>
      </CardContent>
      <CardActions className={classes.bottomButton}>
        <Button variant="contained" color="primary" fullWidth={false} onClick={generatePassword}>
          <Typography>Сгенерировать надежный пароль</Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default SettingsView;
