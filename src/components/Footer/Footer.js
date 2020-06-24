import React from "react";
import cx from "classnames";
import style from "./Footer.module.scss";
import Icon from "../Icon";
import data from "../../data/website";

const Footer = props => {
  const { className, ...rest } = props;
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
