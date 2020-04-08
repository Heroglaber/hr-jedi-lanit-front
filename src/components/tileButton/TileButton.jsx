import React from "react";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import {useTileButtonStyles} from "./tileButtonStyles";

/**
 * Returns an TileButton component that is used to show a set of possible actions on landing pages
 * It renders labels under icon and can receive href(optional) to call some page.
 * @param classes - CSS style classes
 * @param buttonLabel - the description of the action
 * @param IconComponent - the action icon
 * @param onClick - onClick event handler
 * @param href - the URL of the page the button goes to
 * @param visible - indicates whether button visible or not
 * @param disabled - specifies that the button should be disabled
 * @param className - implemented CSS class
 */
const TileButton = ({
  buttonLabel = "Действие: Подробное Описание",
  IconComponent,
  onClick = () => {},
  href,
  visible = true,
  disabled = false,
  className,
}) => {
  const classes = useTileButtonStyles();
  return (
    visible &&
    <Button className={classNames({[className]: className, [classes.button]: true})} onClick={onClick} href={href} disabled={disabled}>
      <IconComponent className={classes.icon}/>
      <p className={classes.label}>
        {
          buttonLabel
        }
      </p>
    </Button>
  );
};

export default TileButton;
