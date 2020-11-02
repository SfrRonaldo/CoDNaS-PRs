import { makeStyles } from "@material-ui/core";
import React from "react";
import Parallax from "../../components/Parallax";
import styles from "../../assets/views/tutorialStyle";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";

const useStyles = makeStyles(styles);

export default function Tutorial() {
  const classes = useStyles();
  return (
    <div>
      <Parallax image={require("../../assets/img/background.PNG")} small />
      <div className={classes.container}>
        <Section1 />
      </div>
      <br />
      <div className={classes.container}>
        <Section2 />
      </div>
      <br />
      <div className={classes.container}>
        <Section3 />
      </div>
      <br />
      <div className={classes.container} style={{ marginBottom: "100px" }}>
        <Section4 />
      </div>
    </div>
  );
}
