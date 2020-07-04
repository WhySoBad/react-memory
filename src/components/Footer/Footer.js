import React from "react";
import cx from "classnames";
import style from "./Footer.module.scss";
import { Icon, addIcon } from "react-qol";
import data from "../../data/website";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";

const Footer = props => {
  const { className, ...rest } = props;
  addIcon("Logo", Logo);
  return (
    <footer className={cx(className, style.footer)} {...rest}>
      <div className={style["footer-container"]}>
        <div className={style["copyright-container"]}>
          <div className={style["horizontal"]}>
            <div className={style["logo-container"]}>
              <Icon name={"logo"} className={style.logo} />
            </div>
            <div className={style.copyright}>
              <div>{data.siteAuthor}</div>
              <div className={style["copyright-text"]}>
                All rights reserved ©{new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
