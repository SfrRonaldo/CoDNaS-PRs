import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import styles from "../../assets/views/detailStyle";
import InfoGeneral from "./InfoGeneral";
import Conformacion from "./Conformacion";
import InfoEstructural from "./InfoEstructural";
import { Button, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Estimacion() {
  const { id } = useParams();
  const [infoGeneral, setInfoGeneral] = useState(null);
  const [conformacion, setConformacion] = useState(null);
  const [infoEstructural, setInfoEstructural] = useState(null);

  /*useEffect(() => {
    fetchEstimar(id);
  }, [id]);

  const fetchEstimar = async (id) => {
    const result = await fetch("/api/Estimar/".concat(id));
    const data = await result.json();
    setInfoGeneral(data.info_general);
    setInfoEstructural(data.info_estructural);
    setConformacion(data.conformacion);
  };*/
  useEffect(() => {
    document.title = "Estimación";
    fetchLimpiar();
    fetchInfoGeneral(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchLimpiar = async () => {
    await fetch("/api/Limpiar/");
  };

  const fetchInfoGeneral = async (id) => {
    const result = await fetch("/api/EstimarInfoGeneral/".concat(id));
    const data = await result.json();
    setInfoGeneral(data);
    fetchConformacion(id);
  };

  const fetchInfoEstructural = async (id) => {
    const result = await fetch("/api/EstimarInfoEstructural/".concat(id));
    const data = await result.json();
    setInfoEstructural(data);
  };

  const fetchConformacion = async (id) => {
    const result = await fetch("/api/EstimarConformacion/".concat(id));
    const data = await result.json();
    setConformacion(data);
    fetchInfoEstructural(id);
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
        {!infoGeneral && (
          <>
            <div style={{ marginTop: "200px" }} className={classes.container}>
              <CircularProgress />
            </div>
          </>
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
        {!infoEstructural && (
          <div className={classes.container}>
            <CircularProgress />
          </div>
        )}
      </div>
      <br />
      <div className={classes.container} style={{ marginBottom: "100px" }}>
        {conformacion && (
          <div>
            <Conformacion data={conformacion} />
            <Button
              variant="contained"
              style={{
                backgroundColor: "#cb6768",
                color: "white",
                marginTop: "30px",
              }}
              href="/home"
            >
              Regresar
            </Button>
          </div>
        )}
        {!conformacion && (
          <div className={classes.container}>
            <CircularProgress />
          </div>
        )}
      </div>
      <div
        className={classes.container}
        style={{ marginBottom: "100px" }}
      ></div>
    </div>
  );
}
