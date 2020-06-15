import React from "react";
import style from "./Header.module.scss";
import data from "../../data/website";
import cx from "classnames";
import Icon from "../Icon";

const Header = props => {
  const { className, ...rest } = props;
  return (
    <header className={cx(className, style.header)} {...rest}>
      <div className={style["header-container"]}>
        <div className={style.left}></div>
        <div className={style.middle}>Memory</div>
        <div className={style.right}>
          <a href={data.social.github.link} target="_blank">
            <Icon className={cx(style.icon, style.github)} name={"github"} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
