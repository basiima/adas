import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          ADAS
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              HOME
            </Link>
            <Link to="/login" className={classes.link}>
              LOGIN
            </Link>
            <Link to="/guide" className={classes.link}>
              GUIDE
            </Link>
            <Link to="/about" className={classes.link}>
              ABOUT 
            </Link>
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;