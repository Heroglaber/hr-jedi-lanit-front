import React from "react";
import {useSimplePageStyles} from "../../styles/simplePageStyles";
import {CircularProgress} from "@material-ui/core";
import Helmet from "react-helmet";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ContextActionsSection from "../../components/contextActionSection/ContextActionsSection";
import AuthWrapper from "../../security/AuthWrapper";
import {HR, OMNI} from "../../security/Authorities";
import Card from "@material-ui/core/Card";
import {StartBusinessTripsApprovalProcessTileButton} from "./actions/StartBusinessTripsApprovalProcessTileButton";

const BusinessTripsView = ({preview = false, history}) => {
  const classes = useSimplePageStyles();

  return preview ?
    <CircularProgress/>
    : (<div>
      <Helmet title="Командировки - HR Jedi"/>
      <Card>
        <CardContent>
          <Typography className={classes.pageTitle} variant="h3">Командировки</Typography>
          <ContextActionsSection history={history}>
            <AuthWrapper authorities={[HR, OMNI]}>
              <StartBusinessTripsApprovalProcessTileButton/>
            </AuthWrapper>
          </ContextActionsSection>
        </CardContent>
      </Card>
    </div>);
};

export default BusinessTripsView;
