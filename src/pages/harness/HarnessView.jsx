import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PeopleIcon from "@material-ui/icons/People";
import HowToRegIcon from '@material-ui/icons/HowToReg';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import {useHarnessStyles} from "./harnessStyles";
import DrawerLinkItem from "./DrawerLinkItem";
import hrJediLogo from "../../images/hr-jedi.png";
import AuthWrapper from "../../security/AuthWrapper";
import {ADMIN, ALL, HR, OMNI} from "../../security/Authorities";

const AccountMenu = ({classes, currentUser, onLogoutClick, accountMenuAnchor, onAccountMenuClick, onAccountMenuClose}) => {
  return (
    <div className={classes.accountButton}>
      <Tooltip title={currentUser.username} enterDelay={1000}>
        <IconButton color="inherit" onClick={onAccountMenuClick}>
          <AccountCircle/>
        </IconButton>
      </Tooltip>
      <Menu
        MenuListProps={{subheader: <ListSubheader>{currentUser.username}</ListSubheader>}}
        anchorEl={accountMenuAnchor}
        getContentAnchorEl={null}
        anchorOrigin={{vertical: "bottom", horizontal: "right"}}
        transformOrigin={{vertical: "top", horizontal: "right"}}
        open={Boolean(accountMenuAnchor)}
        onClose={onAccountMenuClose}
      >
        <MenuItem onClick={onLogoutClick}>
          <ListItemIcon><ExitToAppIcon/></ListItemIcon>
          <ListItemText primary="Выйти"/>
        </MenuItem>
      </Menu>
    </div>
  );
};

const Header = ({toolbarExpanded, onExpandToolbarClick, classes, ...otherProps}) => (
  <AppBar position="absolute" className={classNames(classes.appBar, toolbarExpanded && classes.appBarShift)}>
    <Toolbar disableGutters={!toolbarExpanded}>
      <IconButton color="inherit" className={classNames(classes.menuButton, toolbarExpanded && classes.hide)} onClick={onExpandToolbarClick}>
        <MenuIcon/>
      </IconButton>
      <NavLink to="/" className={classes.homeLink}>
        <img src={hrJediLogo} className={classes.appLogo} alt="HR Jedi"/>
        <Typography variant="h4" color="inherit" noWrap className={classes.appTitle}>
          HR Jedi
        </Typography>
      </NavLink>
      <AccountMenu {...otherProps} classes={classes}/>
    </Toolbar>
  </AppBar>
);

const LeftToolbar = ({classes, toolbarExpanded, onCollapseToolbarClick, onAccountMenuClose,}) => (
    <Drawer
      variant="permanent"
      classes={{
        paper: classNames(classes.drawerPaper, !toolbarExpanded && classes.drawerPaperClose),
      }}
      open={toolbarExpanded}
    >
      <div className={classes.collapseToolbarItem}>
        <IconButton onClick={onCollapseToolbarClick}>
          <ChevronLeftIcon/>
        </IconButton>
      </div>
      <Divider/>
      <List>
        <AuthWrapper authorities={ALL}>
          <DrawerLinkItem title="Список задач" to="/task-list" onClick={onAccountMenuClose} classes={classes}><AssignmentTurnedInIcon/></DrawerLinkItem>
        </AuthWrapper>
        <AuthWrapper authorities={ALL}>
          <DrawerLinkItem title="Сотрудники" to="/employees" onClick={onAccountMenuClose} classes={classes}><PeopleIcon/></DrawerLinkItem>
        </AuthWrapper>
        <AuthWrapper authorities={[OMNI, HR]}>
          <DrawerLinkItem title="Посещаемость" to="/attendances" onClick={onAccountMenuClose} classes={classes}><HowToRegIcon/></DrawerLinkItem>
        </AuthWrapper>
        <AuthWrapper authorities={[OMNI, ADMIN]}>
          <Divider/>
          <DrawerLinkItem title="Система" to="/system" onClick={onAccountMenuClose} classes={classes}><AccountBalanceIcon/></DrawerLinkItem>
          <Divider/>
        </AuthWrapper>
      </List>
    </Drawer>
  );

const HarnessView = (props) => {
  const classes = useHarnessStyles();
  const {children} = props;
  const [toolbarExpanded, setTolbarExpanded] = useState(false);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
  const onAccountMenuClick = (e) => setAccountMenuAnchor(e.currentTarget);
  const onAccountMenuClose = () => setAccountMenuAnchor(null);
  return (
    <div className={classes.root}>
      <Header
        {...props}
        classes={classes}
        toolbarExpanded={toolbarExpanded}
        onExpandToolbarClick={() => setTolbarExpanded(true)}
        accountMenuAnchor={accountMenuAnchor}
        onAccountMenuClick={onAccountMenuClick}
        onAccountMenuClose={onAccountMenuClose}
      />
      <LeftToolbar
        {...props}
        classes={classes}
        toolbarExpanded={toolbarExpanded}
        onCollapseToolbarClick={() => setTolbarExpanded(false)}
        onAccountMenuClose={onAccountMenuClose}/>
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
};

export default HarnessView;
