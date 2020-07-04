import React from "react";
import style from "./Header.module.scss";
import data from "../../data/website";
import cx from "classnames";
import { Icon, addIcon, Link } from "react-qol";
import { ReactComponent as GitHub } from "../../assets/icons/github.svg";

const Header = props => {
  const { className, ...rest } = props;
  addIcon("GitHub", GitHub);
  return (
    <header className={cx(className, style.header)} {...rest}>
      <div className={style["header-container"]}>
        <div className={style.left}></div>
        <div className={style.middle}>Memory</div>
        <div className={style.right}>
          <Link href={data.social.github.link}>
            <Icon className={cx(style.icon, style.github)} name={"github"} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
