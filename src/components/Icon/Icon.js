import React from "react";
import Container from "./Container";
import { Icons } from "./Icons";

const Icon = props => {
  const { name, ...rest } = props;
  const SVG =
    Icons[
      Object.keys(Icons).find(key => key.toLowerCase() === name.toLowerCase())
    ];
  return (
    <Container {...rest}>
      <SVG />
    </Container>
  );
};

export default Icon;
