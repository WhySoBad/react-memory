import React from "react";
import cx from "classnames";
import style from "./MemoryCard.module.scss";

export default function MemoryCard(props) {
  const { children, className, background, position, ...rest } = props;

  return (
    <div className={style.square}>
      <div
        className={cx(style.card, className)}
        style={
          background
            ? {
                background: background,
                opacity: "1",
                //backgroundColor: background,
              }
            : {}
        }
        {...rest}
      />
    </div>
  );
}
