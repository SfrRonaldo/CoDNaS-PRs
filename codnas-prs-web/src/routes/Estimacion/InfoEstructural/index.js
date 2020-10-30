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
import styles from "./infoEstructuralStyle";

const useStyles = makeStyles(styles);

const InfoEstructural = ({
  num_conformaciones,
  rmsd_min,
  rmsd_max,
  rmsd_avg,
}) => {
  const classes = useStyles();
  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card className={classes.card}>
            <CardContent>
              <h2 className={classes.title}>Información Estructural</h2>
              <TableContainer component={Paper}>
                <Table className={classes.table} arial-label="simple data">
                  <TableBody>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ fontWeight: "bold" }}
                      >
                        #Conformaciones:
                      </TableCell>
                      <TableCell>{num_conformaciones}</TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ fontWeight: "bold" }}
                      >
                        RMSD Mínimo:
                      </TableCell>
                      <TableCell>{rmsd_min}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ fontWeight: "bold" }}
                      >
                        RMSD Máximo:
                      </TableCell>
                      <TableCell>{rmsd_max}</TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ fontWeight: "bold" }}
                      >
                        RMSD Promedio:
                      </TableCell>
                      <TableCell>{rmsd_avg}</TableCell>
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

export default InfoEstructural;
