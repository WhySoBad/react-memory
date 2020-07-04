import React from "react";
import style from "./Container404.module.scss";
import { Button } from "react-qol";

const Container = props => {
  const { children } = props;
  return (
    <>
      <main className={style.box}>
        <div className={style.background}>
          <div className={style.container}>
            <div className={style.text}>{children}</div>
            <div className={style["back-button"]}>
              <Button to={"/"} className={style.button}>
                Home
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Container;
