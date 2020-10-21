import { makeStyles } from "@material-ui/core";
import React from "react";
import Parallax from "../../components/Parallax";
import styles from "../../assets/views/tutorialStyle";
import Section1 from "./Section1";
import Section2 from "./Section2";

const useStyles = makeStyles(styles);

export default function Tutorial() {
  const classes = useStyles();
  return (
    <div>
      <Parallax filter image={require("../../assets/img/bg4.jpg")} small />
      <div className={classes.container}>
        <Section1 />
      </div>
      <br />
      <div className={classes.container}>
        <Section2 />
      </div>
      <br />
      <div className={classes.container}>
        <Section2 />
      </div>
      <br />
      <div className={classes.container} style={{ marginBottom: "30px" }}>
        <Section2 />
      </div>
    </div>
  );
}
