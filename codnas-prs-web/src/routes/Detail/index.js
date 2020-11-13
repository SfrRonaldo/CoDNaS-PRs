import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/views/detailStyle";
import InfoGeneral from "./InfoGeneral";
import { useParams } from "react-router-dom";
import Conformacion from "./Conformacion";
import InfoEstructural from "./InfoEstructural";
import { Button, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Detail() {
  const { id } = useParams();
  const [infoGeneral, setInfoGeneral] = useState(null);
  const [conformacion, setConformacion] = useState(null);
  const [infoEstructural, setInfoEstructural] = useState(null);
  const [regiones, setRegiones] = useState(null);

  useEffect(() => {
    document.title = "Detalle";
    fetchInfoGeneral(id);
    fetchInfoEstructural(id);
    fetchConformacion(id);
  }, [id]);

  const fetchInfoGeneral = async (id) => {
    const result = await fetch("/api/GetInfoGeneral/".concat(id));
    const data = await result.json();
    setInfoGeneral(data.InfoGeneral[0]);
  };

  const fetchInfoEstructural = async (id) => {
    const result = await fetch("/api/GetInfoEstructural/".concat(id));
    const data = await result.json();
    setRegiones(data.Regiones);
    setInfoEstructural(data.InfoEstructural);
  };

  const fetchConformacion = async (id) => {
    const result = await fetch("/api/GetConformacion/".concat(id));
    const data = await result.json();
    setConformacion(data.Conformacion);
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
            long_secuencia={infoGeneral.long_secuencia}
            rank={infoGeneral.clasificacion}
            cluster={infoGeneral.cluster}
            num_regiones={infoGeneral.num_regiones}
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
          <InfoEstructural data={infoEstructural} regiones={regiones} />
        )}
        {!infoEstructural && (
          <div className={classes.container}>
            <CircularProgress />
          </div>
        )}
      </div>
      <br />
      <div className={classes.container} style={{ marginBottom: "100px" }}>
        {conformacion && regiones && (
          <div>
            <Conformacion data={conformacion} regiones={regiones} />
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
        {!conformacion && !regiones && (
          <div className={classes.container}>
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
}
