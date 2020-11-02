import { Card, CardContent, makeStyles } from "@material-ui/core";
import React from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import styles from "./sectionStyle";

const useStyles = makeStyles(styles);

export default function Section() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card className={classes.card}>
            <CardContent>
              <h2 className={classes.subtitle}>
                Resultados de la búsqueda y estimación de diversidad
                conformacional de la cadena de proteína repetida
              </h2>
              <p className={classes.description}>
                Una vez presionado el botón
                <i>
                  <b> Buscar</b>
                </i>
                , se le redireccionará al usuario a una página que detalla los
                datos recopilados de lá búsqueda en la base de datos CoDNaS-PRs
                de la información de diversidad conformacional de la cadena de
                proteína repetida insertada.
              </p>
              <h2 className={classes.subtitle}>
                Sección 1: Información General
              </h2>
              <p className={classes.description}>
                La información general sobre la proteína repetida se presenta en
                la parte superior de la página.
              </p>
              <ul className={classes.description}>
                <li>
                  <b>Nombre de la proteína repetida: </b>Nombre representativo
                  de la proteína extraída de RCSB PDB.
                </li>
                <li>
                  <b>Título: </b>Título que representa a la proteína
                </li>
                <li>
                  <b>Organismo: </b> Organismo a la que pertenece la proteína
                  repetida.
                </li>
                <li>
                  <b>Longitud de secuencia: </b> Cantidad de aminoácidos de la
                  proteína repetida.
                </li>
                <li>
                  <b>Clasificación: </b>Tipo de proteína clasificado por RCSB
                  PDB.
                </li>
              </ul>
              <img src="/tutorial_4.png" className={classes.image} alt="" />
              <hr />
              <h2 className={classes.subtitle}>
                Sección 2: Información Estructural
              </h2>
              <p className={classes.description}>
                La sección Información Estructural proporciona datos
                estructurales comparativos entre todas las conformaciones de la
                proteína repetida incluyendo la misma. Entre estos datos se
                tiene al número de conformaciones, el cual muestra la evidencia
                disponible sobre la diversidad conformacional de la proteína
                repetida. Además, se muestra el RMSD mínimo, máximo y promedio
                determinado por el software Mammoth. Estos valores proporcionan
                las mediciones centrales de la diversidad conformacional.
              </p>
              <img src="/tutorial_5.png" className={classes.image} alt="" />
              <hr />
              <h2 className={classes.subtitle}>Sección 3: Conformaciones</h2>
              <p className={classes.description}>
                La presente sección muestra las diversas conformaciones que la
                proteína repetida tiene. Asimismo, se presenta para cada
                conformación la región repetida a través del límite inferior y
                límite superior, la secuencia de similitud expresado en un valor
                numérico y la diferencia estructural entre la proteína repetida
                y la conformación expresada por la medida estadística RMSD.
              </p>
              <img src="/tutorial_6.png" className={classes.image} alt="" />
            </CardContent>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
