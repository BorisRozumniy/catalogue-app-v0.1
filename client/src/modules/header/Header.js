import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem, Container } from "reactstrap";
import {
  Button,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Home as HomeIcon, Menu as MenuIcon, MoveToInbox as InboxIcon} from "@material-ui/icons";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import HomeIcon from '@material-ui/icons/HomeIcon';
// import HomeIcon from "@material-ui/icons/Home";

import MailIcon from "@material-ui/icons/Mail";
import { frontendUrls } from "../../routes/frontendUrls";
import { actionLogout } from "../../redux/actions/auth";
import { actionClearProducts } from "../../redux/actions/products";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

const Header = ({ email, actionLogout, actionClearProducts }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    actionClearProducts();
    actionLogout();
  };
  return (
    <Navbar color="light" light expand="md" className="mb-4">
      <Container className="justify-content-center">
        <AppBar
          position="fixed"
          // className={clsx(classes.appBar, {
          //   [classes.appBarShift]: open,
          // })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              // className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Nav className="text-uppercase p-3">
              <NavItem className="mr-2 my-4 my-lg-2">
                <NavLink
                  exact
                  to={frontendUrls.home}
                  activeClassName="bg-warning"
                  className="p-3"
                >
                  home
                </NavLink>
              </NavItem>
              <NavItem className="mr-2 my-4 my-lg-2">
                <NavLink
                  to={frontendUrls.catalogue}
                  activeClassName="bg-warning"
                  className="p-3"
                >
                  catalogue
                </NavLink>
              </NavItem>
              <div className="mr-2 my-4 my-lg-2">
                {email && email}
                <Button
                  onClick={handleLogout}
                  color="white"
                  variant="contained"
                  color="default"
                  className={classes.button}
                  style={{ marginLeft: 8 }}
                >
                  logout
                </Button>
              </div>
            </Nav>
          </Toolbar>
        </AppBar>
      </Container>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <NavLink to={frontendUrls.catalogue} activeClassName="border">
              catalogue
            </NavLink>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <NavLink to={frontendUrls.home} activeClassName="border">
              home
            </NavLink>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  email: state.userReducer.email,
});

export default connect(mapStateToProps, {
  actionLogout,
  actionClearProducts,
})(Header);
