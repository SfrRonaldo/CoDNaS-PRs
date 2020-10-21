import React from "react";
import Parallax from "../../components/Parallax";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/views/detailStyle";

const useStyles = makeStyles(styles);

export default function Detail() {
  const classes = useStyles();
  return (
    <div style={{ marginTop: "42px" }}>
      <Parallax image={require("../../assets/img/background.PNG")} />
      <div className={classes.container}>
        <h1>HOLA</h1>
      </div>
    </div>
  );
}
