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
                Estimar la diversidad conformacional de la proteína repetida
              </h2>
              <p className={classes.description}>
                Para estimar la diversidad conformacional de alguna proteína
                repetida existe en la página principal la opción
                <i>
                  <b> Estimar</b>
                </i>
                , la cual permite estimar la diversidad conformacional de la
                proteína repetida que se requiera y obtener los resultados
                correspondientes (información general, información estructural y
                conformaciones). Para esto, los usuarios pueden estimar
                ingresando la cadena de proteína repetida y la región de
                repetición, la cual tiene un límite inferior y un límite
                superior. Asimismo, en caso el usuario no recuerde la cadena de
                proteína repetida, la presente herramienta le otorgará un
                autocompletado. Además, la opción
                <i>
                  <b> Estimar </b>
                </i>
                estará habilitado siempre y cuando se haya ingresado la cadena
                de proteína repetida y la región de repetición, sino estará
                deshabilitado. Con lo mencionado previamente, facilitará al
                usuario estimar la diversidad conformacional de la proteína
                repetida que quisiera evaluar.
              </p>
              <img src="/tutorial_3.png" className={classes.image} alt="" />
            </CardContent>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
