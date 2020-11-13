import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import styles from "../../assets/views/tutorialStyle";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";

const useStyles = makeStyles(styles);

export default function Tutorial() {
  const classes = useStyles();
  useEffect(() => {
    document.title = "Título";
  });
  return (
    <div className={classes.root}>
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
