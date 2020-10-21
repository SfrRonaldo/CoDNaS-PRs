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
          <Card className={classes.card} style={{ marginTop: "-175px" }}>
            <CardContent>
              <h2 className={classes.title}>Tutorial</h2>
              <h2>Búsqueda en CoDNaS-PRs</h2>
            </CardContent>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
