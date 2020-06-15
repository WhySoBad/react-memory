import React from "react";
import cx from "classnames";
import style from "./Container.module.scss";

const Container = props => {
  const { className, children, ...rest } = props;
  return (
    <div className={cx(className, style.container)} {...rest}>
      {children}
    </div>
  );
};

export default Container;
