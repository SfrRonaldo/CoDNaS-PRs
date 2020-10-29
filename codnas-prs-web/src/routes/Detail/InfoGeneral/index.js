import {
  Card,
  CardContent,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import React from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import styles from "./infoGeneralStyle";

const useStyles = makeStyles(styles);

const InfoGeneral = ({
  pdb_id,
  name,
  title,
  organism,
  long_secuencia,
  rank,
}) => {
  const classes = useStyles();
  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card className={classes.card} style={{ marginTop: "-175px" }}>
            <CardContent>
              <h1 className={classes.title}>{pdb_id}</h1>
              <h2 className={classes.title} style={{ textAlign: "left" }}>
                Información General
              </h2>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple data">
                  <TableBody>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ fontWeight: "bold" }}
                      >
                        Nombre de la proteína repetida:
                      </TableCell>
                      <TableCell>{name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ fontWeight: "bold" }}
                      >
                        Título:
                      </TableCell>
                      <TableCell>{title}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ fontWeight: "bold" }}
                      >
                        Organismo
                      </TableCell>
                      <TableCell>{organism}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ fontWeight: "bold" }}
                      >
                        Longitud de secuencia:
                      </TableCell>
                      <TableCell>{long_secuencia}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ fontWeight: "bold" }}
                      >
                        Clasificación:
                      </TableCell>
                      <TableCell>{rank}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default InfoGeneral;
