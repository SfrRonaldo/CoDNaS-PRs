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
          <Card className={classes.card} style={{ marginTop: "100px" }}>
            <CardContent>
              <h1 className={classes.title}>Tutorial</h1>
              <h2 className={classes.subtitle}>
                Herramienta para el análisis de diversidad conformacional en
                estructuras de proteínas repetidas
              </h2>
              <p className={classes.description}>
                La presente herramienta permite buscar en la base de datos
                CoDNaS-PRs los resultados obtenidos empleando el método que
                analiza la diversidad conformacional de las proteínas repetidas
                en base al dominio repetitivo (regiones repetidas) y en caso no
                se encuentre en la misma, se tiene la opción de estimar la
                diversidad conformacional de la proteína repetida que se
                ingrese.
              </p>
              <img src="/tutorial_1.png" className={classes.image} alt="" />
            </CardContent>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
