import {
  Button,
  Card,
  CardContent,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import styles from "./searchStyle.js";
import TutorialIcon from "@material-ui/icons/MenuBook";

const useStyles = makeStyles(styles);

export default function SearchSection() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card className={classes.card} style={{ marginTop: "-590px" }}>
            <CardContent>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                  <h2 className={classes.title}>
                    Herramienta Para El Análisis De Diversidad Conformacional En
                    Estructuras De Proteínas Repetidas
                  </h2>
                </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    size="small"
                    style={{
                      marginRight: "10px",
                      width: "1000",
                      marginBottom: "10px",
                    }}
                  />
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#cb6768", color: "white" }}
                    href="/detail"
                  >
                    Estimar
                  </Button>
                </GridItem>
              </GridContainer>
              <p
                style={{
                  color: "#cb6768",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Ingresar una cadena de proteína repetida para analizar la
                diversidad conformacional
              </p>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                  <Button
                    variant="outlined"
                    size="small"
                    style={{
                      marginBottom: "15px",
                      color: "#cb6768",
                      textTransform: "capitalize",
                      fontWeight: "bold",
                    }}
                    href="/tutorial"
                  >
                    <TutorialIcon style={{ marginRight: "7px" }} /> ¿CÓMO
                    EVALUAR?
                  </Button>
                </GridItem>
              </GridContainer>
            </CardContent>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
