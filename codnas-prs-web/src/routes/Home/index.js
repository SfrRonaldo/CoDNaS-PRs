import React, { useEffect, useState } from "react";
//import Parallax from "../../components/Parallax";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/views/homeStyle";
import SearchSection from "./SearchSection";
import { Helmet, HelmetProvider } from "react-helmet-async";

const useStyles = makeStyles(styles);

export default function Home() {
  const [title] = useState("Inicio");

  useEffect(() => {
    fetchLimpiar();
  }, []);

  const fetchLimpiar = async () => {
    await fetch("/api/Limpiar/");
  };

  const classes = useStyles();
  return (
    <div style={{ marginTop: "42px" }} className={classes.root}>
      <HelmetProvider>
        <Helmet>
          <title>{title}</title>
        </Helmet>
      </HelmetProvider>
      {/*<Parallax image={require("../../assets/img/background.PNG")} />*/}
      <div className={classes.container}>
        <SearchSection />
      </div>
    </div>
  );
}
