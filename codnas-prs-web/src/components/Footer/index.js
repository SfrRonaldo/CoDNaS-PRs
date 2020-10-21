import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer className={footerClasses} style={{ backgroundColor: "#cb6768" }}>
      <div className={classes.container}>
        <div>
          &copy; {1900 + new Date().getYear()}. Hecho por Ronaldo Romario Tunque
          Cahui
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
