import { container, title, mainRaised } from "../material-kit-react";

const detailStyle = {
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
  root: {
    backgroundImage: "url(/background.PNG)",
    backgroundSize: "auto",
    opacity: 0.9,
    height: "100%",
    paddingBottom: 10,
  },
};

export default detailStyle;
