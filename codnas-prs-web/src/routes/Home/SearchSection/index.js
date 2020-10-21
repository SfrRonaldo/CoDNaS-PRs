import { Card, CardContent, makeStyles } from "@material-ui/core";
import React from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import styles from "./searchStyle.js";

const useStyles = makeStyles(styles);

export default function SearchSection() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card className={classes.card} style={{ marginTop: "-95px" }}>
            <CardContent>
              <h2 className={classes.title}>
                Herramienta Para El Análisis De Diversidad Conformacional En
                Estructuras De Proteínas Repetidas
              </h2>
            </CardContent>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
