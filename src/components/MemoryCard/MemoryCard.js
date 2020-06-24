import React from "react";
import cx from "classnames";
import style from "./MemoryCard.module.scss";

export default function MemoryCard(props) {
  const { children, flipped, className, background, position, ...rest } = props;

  return (
    <div className={style.square}>
      <div
        className={cx(style.card, className)}
        style={
          background
            ? {
                backgroundColor: background,
                opacity: "1",
              }
            : {}
        }
        {...rest}
      ></div>
    </div>
  );
}
