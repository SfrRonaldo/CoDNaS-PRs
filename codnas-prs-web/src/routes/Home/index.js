import React, { useEffect } from "react";
import Parallax from "../../components/Parallax";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/views/homeStyle";
import SearchSection from "./SearchSection";

const useStyles = makeStyles(styles);

export default function Home() {
  useEffect(() => {
    fetch("/api/Limpiar");
  });

  useEffect(() => {
    fetchLimpiar();
  }, []);

  const fetchLimpiar = async () => {
    await fetch("/api/Limpiar/");
  };

  const classes = useStyles();
  return (
    <div style={{ marginTop: "42px" }}>
      <Parallax image={require("../../assets/img/background.PNG")} />
      <div className={classes.container}>
        <SearchSection />
      </div>
    </div>
  );
}
