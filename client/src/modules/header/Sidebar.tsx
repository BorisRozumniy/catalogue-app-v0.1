import React from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
} from "@material-ui/core";
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import {
  Home as HomeIcon,
  MoveToInbox as InboxIcon,
} from "@material-ui/icons";
import { frontendUrls } from "../../routes/frontendUrls";

interface StyleProps {
  root: BaseCSSProperties,
  drawer: BaseCSSProperties,
  drawerOpen: BaseCSSProperties,
  drawerClose: BaseCSSProperties,
  toolbar: BaseCSSProperties,
}

type PropsClasses = Record<keyof StyleProps, string>

interface IProps {
  open: boolean,
  classes: PropsClasses,
}

export default function Sidebar({ open, classes }: IProps) {
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar} />
      <List>
        <NavLink to={frontendUrls.home}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
              Home
            </ListItem>
        </NavLink>
        <NavLink to={frontendUrls.catalogue}>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
              Catalogue
            </ListItem>
        </NavLink>
      </List>
    </Drawer>
  );
}