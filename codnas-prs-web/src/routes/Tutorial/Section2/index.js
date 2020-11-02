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
                Buscar información de diversidad conformacional de la proteína
                repetida
              </h2>
              <p className={classes.description}>
                Para acceder u obtener información de la diversidad
                conformacional de alguna proteína repetida, existe en la página
                principal la opción
                <i>
                  <b> Buscar</b>
                </i>
                , la cual permite extraer de la base de datos CoDNaS-PRs la
                información de diversidad conformacional (información general,
                información estructural y conformaciones) de la proteína
                repetida que se requiera. Para esto, los usuarios pueden buscar
                únicamente por cadena de proteína repetida. Asimismo, en caso el
                usuario no recuerde la cadena de proteína repetida, la presente
                herramienta le otorgará un autocompletado. Además, la opción
                <i>
                  <b> Buscar </b>
                </i>
                estará habilitado siempre y cuando se haya ingresado la cadena
                de proteína repetida, sino estará deshabilitado. Con lo
                mencionado previamente, facilitará al usuario la búsqueda de
                información de diversidad conformacional de la proteína repetida
                que quisiera conocer.
              </p>
              <img src="/tutorial_2.png" className={classes.image} alt="" />
            </CardContent>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
