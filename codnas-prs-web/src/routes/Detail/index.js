import React, { useEffect, useState } from "react";
import Parallax from "../../components/Parallax";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/views/detailStyle";
import InfoGeneral from "./InfoGeneral";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function Detail() {
  const [infoGeneral, setInfoGeneral] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id) => {
    const result = await fetch("/api/GetInfoGeneral/".concat(id));
    const data = await result.json();
    setInfoGeneral(data.InfoGeneral);
  };

  const classes = useStyles();
  return (
    <div style={{ marginTop: "42px" }}>
      <Parallax image={require("../../assets/img/background.PNG")} />
      <div className={classes.container}>
        {infoGeneral.map((r, id) => (
          <InfoGeneral
            pdb_id={r.pdb_id}
            name={r.nombre_proteina}
            title={r.titulo}
            organism={r.organismo}
            long_secuencia={r.long_secuencia}
            rank={r.clasificacion}
            key={id}
          />
        ))}
      </div>
    </div>
  );
}
