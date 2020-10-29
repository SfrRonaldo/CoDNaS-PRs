import React, { useEffect, useState } from "react";
import Parallax from "../../components/Parallax";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import styles from "../../assets/views/detailStyle";
import InfoGeneral from "./InfoGeneral";

const useStyles = makeStyles(styles);

export default function Estimacion() {
  const { id } = useParams();
  const [infoGeneral, setInfoGeneral] = useState(null);

  useEffect(() => {
    fetchInfoGeneral(id);
  }, [id]);

  const fetchInfoGeneral = async (id) => {
    const result = await fetch("/api/EstimarInfoGeneral/".concat(id));
    const data = await result.json();
    setInfoGeneral(data);
  };

  const classes = useStyles();
  return (
    <div style={{ marginTop: "60px" }}>
      <Parallax image={require("../../assets/img/background.PNG")} small />
      <div className={classes.container}>
        {infoGeneral && (
          <InfoGeneral
            pdb_id={infoGeneral.pdb_id}
            name={infoGeneral.nombre_proteina}
            title={infoGeneral.titulo}
            organism={infoGeneral.organismo}
            region_repetida={infoGeneral.region_repetida}
            rank={infoGeneral.clasificacion}
            key={id}
          />
        )}
      </div>
    </div>
  );
}
