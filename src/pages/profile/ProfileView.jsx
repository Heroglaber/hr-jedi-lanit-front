import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import React, {useRef} from "react";
import Grid from "@material-ui/core/Grid";
import hrJediLogo from "../../images/hr-jedi.png";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import {useProfileStyles} from "./profileStyles";
import {CircularProgress} from "@material-ui/core";
import {useFormik} from "formik";
import {formikValidate} from "../../forms";
import {required} from "../../forms/formik/formikValidationRules";

const validate = formikValidate({
  email: [required()],
});

const ProfileView = ({currentUser, onSave, onImageUpload, avatar}) => {
  const inputImgRef = useRef( null );
  const preview = !currentUser;
  const classes = useProfileStyles();
  const {values, errors, handleSubmit, handleChange, setErrors} = useFormik({
    initialValues: {
      email: currentUser ? currentUser.email : "",
    },
    onSubmit: (values) => {
      return onSave(values)
    },
    validate,
    validateOnChange: false,
    validateOnBlur: true,
    enableReinitialize: true,
  });
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      let image = e.target.files[0];
      onImageUpload(image);
    }
  }
  return (
    preview ?
      <CircularProgress/>
      :
      <form onSubmit={handleSubmit} onChange={() => Object.keys(errors).length !== 0 && setErrors({})}>
        <Card>
          <CardContent>
            <Grid container justify="center">
              <Grid item>
                <img alt="complex" 
                  className={classes.imageInput} 
                  src={avatar ? avatar : hrJediLogo} 
                  onClick={()=>{inputImgRef.current.click()}}
                />
                <input type="file" 
                  accept="image/png"
                  ref={inputImgRef}
                  onChange={(e) => handleImageUpload(e)}
                  hidden={true}
                />
              </Grid>
              <Grid item sm>
                <Typography className={classes.pageTitle} variant="h3">
                  {currentUser.fullName}
                </Typography>
                <CardContent>
                  <TextField
                    id="email"
                    label="???????????????? ????????"
                    placeholder="???????????????? ????????"
                    type="text"
                    className={classes.gridContainer}
                    error={errors.email}
                    helperText={errors.email}
                    value={values.email}
                    onChange={handleChange}
                  />
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="primary" onClick={handleSubmit}>
                    ??????????????????
                  </Button>
                </CardActions>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
  );
};

export default ProfileView;
