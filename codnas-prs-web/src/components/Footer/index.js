import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer({ children }) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.phantom} />
      <div className={classes.footer}>{children}</div>
    </div>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
