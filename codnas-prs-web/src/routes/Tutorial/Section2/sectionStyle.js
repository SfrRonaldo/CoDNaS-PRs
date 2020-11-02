import { title } from "../../../assets/material-kit-react";

const sectionStyle = {
  section: {
    padding: "0 0",
    textAlign: "center",
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    textAlign: "center",
  },
  subtitle: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    textAlign: "left",
  },
  description: {
    color: "#999",
    textAlign: "justify",
  },
  card: {
    maxWidth: "auto",
  },
  table: {
    minWidth: "auto",
  },
  image: {
    width: "100%",
  },
};

export default sectionStyle;
