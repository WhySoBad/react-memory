import React from "react";
import { useMediaQuery } from "@react-hook/media-query";
import cx from "classnames";
import data from "../../data/website";
import style from "./MainScreen.module.scss";
import MemoryBoard from "../MemoryBoard";
import Footer from "../Footer";
import Header from "../Header";

export default function MainScreen(props) {
  const { children } = props;

  const queries = {
    xxxs: useMediaQuery(`only screen and (min-width: ${data.res.xxxs.px})`),
    xxs: useMediaQuery(`only screen and (min-width: ${data.res.xxs.px})`),
    xs: useMediaQuery(`only screen and (min-width: ${data.res.xs.px})`),
    s: useMediaQuery(`only screen and (min-width: ${data.res.s.px})`),
    m: useMediaQuery(`only screen and (min-width: ${data.res.m.px})`),
    l: useMediaQuery(`only screen and (min-width: ${data.res.l.px})`),
    xl: useMediaQuery(`only screen and (min-width: ${data.res.xl.px})`),
    xxl: useMediaQuery(`only screen and (min-width: ${data.res.xxl.px})`),
  };

  const getFields = () => {
    let prio = -1;
    let resolution = "";
    Object.keys(queries).forEach(res => {
      if (queries[res]) {
        if (data.res[res].prio > prio) {
          prio = data.res[res].prio;
          resolution = res;
        }
      }
    });
    if (resolution === "") return "xxl";
    return resolution;
  };

  return (
    <>
      <div className={style.box}>
        <Header />
        <section className={style.container}>
          <div className={style.undercontainer}>
            <main className={cx(style.middle, style.center)}>
              {getFields() !== "xxxs" ? (
                <MemoryBoard
                  className={style["grid-container"]}
                  resolution={data.res[getFields()].type}
                  horizontal={data.res[getFields()].horizontal}
                >
                  {children}
                </MemoryBoard>
              ) : (
                <div className={style.error}>
                  <div className={style["error-text"]}>
                    <h1>TOO SMALL</h1>
                    <p>Your device width is too small for this application.</p>
                  </div>
                </div>
              )}
            </main>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
