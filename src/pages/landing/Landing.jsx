import React, {useContext} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Helmet from "react-helmet";
import Typography from "@material-ui/core/Typography";
import {useSimplePageStyles} from "../../styles/simplePageStyles";
import {AppContext} from "../../AppContext";

const Landing = () => {
  const [context] = useContext(AppContext);
  const classes = useSimplePageStyles();
  const currentUser = context.currentUser;
  return (
    <div>
      <Helmet title="HR Jedi"/>
      <Card>
        <CardContent>
          <Typography variant="h3">{`Привет, ${currentUser ? currentUser.username : "незнакомец"}!`}</Typography>
          <Typography variant="h6" className={classes.largeMessage}>Это HR Jedi &mdash; система управления персоналом.</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Landing;
