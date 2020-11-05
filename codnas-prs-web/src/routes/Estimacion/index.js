import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import styles from "../../assets/views/detailStyle";
import InfoGeneral from "./InfoGeneral";
import Conformacion from "./Conformacion";
import InfoEstructural from "./InfoEstructural";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Estimacion() {
  const { id } = useParams();
  const [infoGeneral, setInfoGeneral] = useState(null);
  const [conformacion, setConformacion] = useState(null);
  const [infoEstructural, setInfoEstructural] = useState(null);

  useEffect(() => {
    fetchEstimar(id);
  }, [id]);

  const fetchEstimar = async (id) => {
    const result = await fetch("/api/Estimar/".concat(id));
    const data = await result.json();
    setInfoGeneral(data.info_general);
    setInfoEstructural(data.info_estructural);
    setConformacion(data.conformacion);
  };

  const classes = useStyles();
  return (
    <div style={{ marginTop: "60px" }} className={classes.root}>
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
