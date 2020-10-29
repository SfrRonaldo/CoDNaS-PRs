import { container, title, mainRaised } from "../material-kit-react";

const estimacionStyle = {
  container: {
    zIndex: "12",
    color: "black",
    textAlign: "center",
    ...container,
  },
  outcontainer: {
    zIndex: "12",
    color: "black",
    ...container,
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none",
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0",
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
  },
  mainRaised: {
    ...mainRaised,
  },
};

export default estimacionStyle;
