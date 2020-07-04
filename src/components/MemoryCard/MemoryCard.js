import React from "react";
import cx from "classnames";
import { Square } from "react-qol";
import style from "./MemoryCard.module.scss";

export default function MemoryCard(props) {
  const {
    children,
    flipped,
    className,
    background,
    position,
    ver,
    hor,
    ...rest
  } = props;
  let corner = "";
  const size = ver * hor;
  if (position === 0) {
    corner = "top-left";
  } else if (position === size - 1) {
    corner = "bottom-right";
  } else if (position - ver === -1) {
    corner = "bottom-left";
  } else if (position + ver === size) {
    corner = "top-right";
  }
  return (
    <Square>
      <div
        className={cx(style.card, style[corner], className)}
        style={
          background
            ? {
                background: background,
                opacity: "1",
              }
            : {}
        }
        {...rest}
      />
    </Square>
  );
}
