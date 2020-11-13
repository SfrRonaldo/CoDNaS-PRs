import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import styles from "./searchStyle.js";
import TutorialIcon from "@material-ui/icons/MenuBook";
import { useHistory } from "react-router-dom";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles(styles);

export default function SearchSection() {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const history = useHistory();
  const [prs, setPrs] = useState([]);
  const [limInf, setLimInf] = useState(0);
  const [limSup, setLimSup] = useState(0);
  const [is, setIs] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [longSecuencia, setLongSecuencia] = useState([]);

  useEffect(() => {
    fetchAllPR();
  }, []);

  const fetchAllPR = async () => {
    const result = await fetch("/api/GetAll");
    const data = await result.json();
    setPrs(data.data);
    setIs(data.lista);
    setLongSecuencia(data.long_secuencia);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  function push(e) {
    if (e.key === "Enter") {
      if (!limSup && !limInf) {
        if (input.length === 6) {
          if (is.includes(input)) {
            history.push("/detail/".concat(input));
          }
        }
      } else {
        if (limSup && limInf) {
          if (input.length === 6) {
            if (parseInt(limInf) <= 0) {
              handleClickOpen3();
            } else {
              if (parseInt(limSup) <= parseInt(limInf)) {
                handleClickOpen();
              } else {
                if (parseInt(limSup) > parseInt(limInf)) {
                  if (longSecuencia[is.indexOf(input)] >= limSup) {
                    history.push(
                      "/estimacion/"
                        .concat(input)
                        .concat("_")
                        .concat(limInf)
                        .concat("_")
                        .concat(limSup)
                    );
                  } else {
                    handleClickOpen2();
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return (
    <>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card className={classes.card} style={{ marginTop: "180px" }}>
            <CardContent>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                  <h2 className={classes.title}>
                    Herramienta para el análisis de diversidad conformacional en
                    estructuras de proteínas repetidas
                  </h2>
                </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={prs}
                    getOptionLabel={(option) => option.pdb_id}
                    onInputChange={(event, newInputValue) => {
                      setInput(newInputValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Proteína Repetida"
                        variant="outlined"
                        style={{
                          marginRight: "10px",
                          width: "210px",
                          marginBottom: "10px",
                        }}
                        size="small"
                        onKeyPress={push}
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    id="outlined-basic2"
                    label="Inferior"
                    variant="outlined"
                    size="small"
                    type="number"
                    style={{
                      marginRight: "10px",
                      width: "100px",
                      marginBottom: "10px",
                    }}
                    onChange={(e) => {
                      setLimInf(e.target.value);
                    }}
                    onKeyPress={push}
                  />
                  <TextField
                    id="outlined-basic3"
                    label="Superior"
                    variant="outlined"
                    size="small"
                    type="number"
                    style={{
                      marginRight: "10px",
                      width: "100px",
                      marginBottom: "10px",
                    }}
                    onChange={(e) => {
                      setLimSup(e.target.value);
                    }}
                    onKeyPress={push}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12} style={{ marginTop: "10px" }}>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#cb6768",
                      color: "white",
                      marginRight: "20px",
                    }}
                    href={
                      !limInf || !limSup || input === ""
                        ? "/home"
                        : "/estimacion/"
                            .concat(input)
                            .concat("_")
                            .concat(limInf)
                            .concat("_")
                            .concat(limSup)
                    }
                    disabled={!limInf || !limSup || input === "" ? true : false}
                  >
                    Estimar
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#cb6768", color: "white" }}
                    href={input === "" ? "/home" : "/detail/".concat(input)}
                    disabled={input === "" ? true : false}
                  >
                    Buscar
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
                diversidad conformacional o buscarla en la base de datos
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title-1">{"Sugerencia"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description-1">
            Estimado usuario, el límite superior debe ser mayor que el límite
            inferior.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle id="alert-dialog-title-2">{"Sugerencia"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description-2">
            Estimado usuario, el límite superior supera la longitud de la
            secuencia ({longSecuencia[is.indexOf(input)]}) de la proteína
            repetida.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} color="secondary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open3} onClose={handleClose3}>
        <DialogTitle id="alert-dialog-title-3">{"Sugerencia"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description-3">
            Estimado usuario, el valor del límite inferior debe ser mayor que 0.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose3} color="secondary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
