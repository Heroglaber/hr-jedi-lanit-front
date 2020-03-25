import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import {Link} from "react-router-dom";

export default ({title, onClick, classes, children, to}) => (
  <Link to={to} className={classes.menuLink}>
    <ListItem button disableGutters className={classes.toolbarItem} onClick={onClick}>
      <Tooltip title={title} placement="bottom-end">
        <ListItemIcon>
          {children}
        </ListItemIcon>
      </Tooltip>
      <ListItemText primary={title}/>
    </ListItem>
  </Link>
);
