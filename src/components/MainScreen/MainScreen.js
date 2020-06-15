import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { ResizeListener } from "react-resize-listener";
import cx from "classnames";
import data from "../../data/website";
import style from "./MainScreen.module.scss";
import MemoryBoard from "../MemoryBoard";
import Footer from "../Footer";
import Header from "../Header";

export default function MainScreen(props) {
  const { children } = props;
  const ref = useRef(null);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const [clicks, setClicks] = useState(data.clicks);
  const [solved, setSolved] = useState(data.solvedPairs);
  const [allPairs, setAllPairs] = useState(data.allPairs);
  const queries = {
    xxs: useMediaQuery(`only screen and (min-width: ${data.res.xxs.px})`),
    xs: useMediaQuery(`only screen and (min-width: ${data.res.xs.px})`),
    s: useMediaQuery(`only screen and (min-width: ${data.res.s.px})`),
    m: useMediaQuery(`only screen and (min-width: ${data.res.m.px})`),
    l: useMediaQuery(`only screen and (min-width: ${data.res.l.px})`),
    xl: useMediaQuery(`only screen and (min-width: ${data.res.l.px})`),
    xxl: useMediaQuery(`only screen and (min-width: ${data.res.l.px})`),
  };

  useEffect(() => {
    setDimensions({
      width: ref.current ? ref.current.offsetWidth : 0,
      height: ref.current ? ref.current.offsetHeight : 0,
    });
  }, [ref.current]);

  useEffect(() => {
    setClicks(data.clicks);
    setSolved(data.solvedPairs);
    setAllPairs(data.allPairs);
  }, queries);

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
    return resolution;
  };

  return (
    <>
      <div className={style.box}>
        <ResizeListener
          onResize={() => {
            setDimensions({
              width: ref.current ? ref.current.offsetWidth : 0,
              height: ref.current ? ref.current.offsetHeight : 0,
            });
            console.log(dimensions);
          }}
        />
        <Header />
        <section className={style.container}>
          <div className={style.undercontainer}>
            <div className={style["stats-container"]}>
              <div className={style.stats}>
                {clicks >= 10
                  ? clicks >= 100
                    ? clicks
                    : "0" + clicks
                  : "00" + clicks}
              </div>

              <div className={style.stats}>
                {solved}/
                {allPairs === 0 ? data.res[getFields()].fields / 2 : allPairs}
              </div>

              <div className={style.stats}>
                {data.res[getFields()].fields /
                  data.res[getFields()].horizontal}
                x{data.res[getFields()].horizontal}
              </div>
            </div>
            <main
              className={cx(style.middle, style.center)}
              style={
                data.res[getFields()].prio <= 1 ? { overflowY: "scroll" } : {}
              }
            >
              <div className={style.board} ref={ref}>
                <MemoryBoard
                  dimensions={{
                    width: dimensions.width,
                    height: dimensions.height,
                  }}
                  resolution={data.res[getFields()].type}
                  onClick={() => {
                    setClicks(data.clicks);
                    setSolved(data.solvedPairs);
                    setAllPairs(data.allPairs);
                  }}
                  size={data.res[getFields()].fields}
                  horizontal={data.res[getFields()].horizontal}
                >
                  {children}
                </MemoryBoard>
              </div>
            </main>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
