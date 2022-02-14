import React from "react";
import {useSimplePageStyles} from "../../styles/simplePageStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

const SettingsView = ({generatedPassword, generatePassword, uploadUsers}) => {
  const classes = useSimplePageStyles();
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      let json = e.target.files[0];
      uploadUsers(json);
    }
  }
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
      <CardActions className={classes.bottomButton}>
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span" className={classes.button} color="primary" fullWidth={false}>
            <Typography>Загрузить файл с сотрудниками</Typography>
            <input type="file" 
              className={classes.input}
              accept="application/JSON"
              id="raised-button-file"
              onChange={(e) => handleImageUpload(e)}
              multiple
              hidden={true}
            />
          </Button>
        </label> 
      </CardActions>
    </Card>
  );
};

export default SettingsView;
