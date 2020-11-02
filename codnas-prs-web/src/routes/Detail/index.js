import React, { useEffect, useState } from "react";
import Parallax from "../../components/Parallax";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/views/detailStyle";
import InfoGeneral from "./InfoGeneral";
import { useParams } from "react-router-dom";
import Conformacion from "./Conformacion";
import InfoEstructural from "./InfoEstructural";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Detail() {
  const { id } = useParams();
  const [infoGeneral, setInfoGeneral] = useState([]);
  const [conformacion, setConformacion] = useState(null);
  const [infoEstructural, setInfoEstructural] = useState(null);

  useEffect(() => {
    fetchInfoGeneral(id);
    fetchInfoEstructural(id);
    fetchConformacion(id);
  }, [id]);

  const fetchInfoGeneral = async (id) => {
    const result = await fetch("/api/GetInfoGeneral/".concat(id));
    const data = await result.json();
    setInfoGeneral(data.InfoGeneral);
  };

  const fetchInfoEstructural = async (id) => {
    const result = await fetch("/api/GetInfoEstructural/".concat(id));
    const data = await result.json();
    setInfoEstructural(data.InfoEstructural[0]);
  };

  const fetchConformacion = async (id) => {
    const result = await fetch("/api/GetConformacion/".concat(id));
    const data = await result.json();
    setConformacion(data.Conformacion);
  };

  const classes = useStyles();
  return (
    <div style={{ marginTop: "60px" }}>
      <Parallax image={require("../../assets/img/background.PNG")} small />
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
      <br />
      <div className={classes.container}>
        {infoEstructural && (
          <InfoEstructural
            num_conformaciones={infoEstructural.num_conformaciones}
            rmsd_min={infoEstructural.rmsd_min}
            rmsd_max={infoEstructural.rmsd_max}
            rmsd_avg={infoEstructural.rmsd_avg}
          />
        )}
      </div>
      <br />
      <div className={classes.container} style={{ marginBottom: "30px" }}>
        {conformacion && <Conformacion data={conformacion} />}
      </div>
      <div className={classes.container} style={{ marginBottom: "100px" }}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#cb6768", color: "white" }}
          href="/home"
        >
          Regresar
        </Button>
      </div>
    </div>
  );
}
