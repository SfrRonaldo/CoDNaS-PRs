import { List, ListItem, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../../assets/components/headerLinkStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link to="/home" className={classes.navLink}>
          Inicio
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to="/tutorial" className={classes.navLink}>
          Tutorial
        </Link>
      </ListItem>
    </List>
  );
}
