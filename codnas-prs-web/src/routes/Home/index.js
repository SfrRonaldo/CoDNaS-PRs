import React from "react";
import Parallax from "../../components/Parallax";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/views/homeStyle";
import SearchSection from "./SearchSection";

const useStyles = makeStyles(styles);

export default function Home() {
  const classes = useStyles();
  return (
    <>
      <Parallax image={require("../../assets/img/bg4.jpg")} small />
      <div className={classes.container} style={{ marginBottom: "30px" }}>
        <SearchSection />
      </div>
    </>
  );
}
