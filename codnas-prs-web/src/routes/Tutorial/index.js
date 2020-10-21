import { makeStyles } from "@material-ui/core";
import React from "react";
import Parallax from "../../components/Parallax";
import styles from "../../assets/views/tutorialStyle";

const useStyles = makeStyles(styles);

export default function Tutorial() {
  const classes = useStyles();
  return (
    <div>
      <Parallax filter image={require("../../assets/img/bg4.jpg")} small />
      <div className={classes.container}></div>
    </div>
  );
}
