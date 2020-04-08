import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {useContextActionsSectionStyles} from "./contextActionsSectionStyles";
import {previewfy} from "../../common";

/**
 * In this component methods React.Children.map and React.cloneElement are used to pass arguments of ContextActionsSection to its child elements.
 * React.Children.map is used to invoke a clone function for every child component of ContextActionsSection and returns an array of cloned child elements.
 * React.cloneElement is used to clone component passed to it and to assign arguments of ContextActionsSection to a cloned component.
 */
const ContextActionsSection = ({children, preview = false, visible = true, ...otherProps}) => {
  const classes = useContextActionsSectionStyles();
  return (
    visible && !!children && (!preview ? (
          <>
            <Typography variant="h5" className={previewfy(classes, classes.pageSubTitle, preview)}>
              Действия
            </Typography>
            <Grid className={classes.actionsGridContainer}>
              <Grid item>
                {
                  React.Children.map(children, child => React.cloneElement(child, {className: previewfy(classes, null, preview), ...otherProps}))
                }
              </Grid>
            </Grid>
          </>
        )
        :
        <DummyContextActionsSection classes={classes}/>
    )
  );
};

const DummyContextActionsSection = ({classes}) => (
  <>
    <div className={previewfy(classes, classes.previewActionsLabel, true)}/>
    <div className={classes.previewTileButtonsSection}>
      <div className={previewfy(classes, classes.previewTileButton, true)}/>
      <div className={previewfy(classes, classes.previewTileButton, true)}/>
      <div className={previewfy(classes, classes.previewTileButton, true)}/>
    </div>
  </>
);

export default ContextActionsSection;
