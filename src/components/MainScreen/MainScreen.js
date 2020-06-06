import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import useResizeAware from "react-resize-aware";
import cx from "classnames";
import data from "../../data/website";
import style from "./MainScreen.module.scss";
import MemoryBoard from "../MemoryBoard";

export default function MainScreen(props) {
  const { children } = props;
  const ref = useRef(null);
  const [resizeListener, sizes] = useResizeAware();
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const [clicks, setClicks] = useState(data.clicks);
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
  }, [ref.current, sizes]);

  useEffect(() => {
    setClicks(data.clicks);
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
        <header className={cx(style.top, style.underbox)}>
          <div className={cx(style.left, style.head)}>
            BUTTONS Clicks: {clicks}
          </div>
          <div className={cx(style.middle, style.head)}>Memory</div>
          <div className={cx(style.right, style.head)}>SOCIAL</div>
        </header>
        <section className={style.container}>
          <div className={style.undercontainer}>
            <main className={cx(style.middle, style.center)}>
              <div className={style.board} ref={ref}>
                {resizeListener}
                <MemoryBoard
                  boxHeight={dimensions.height}
                  boxWidth={dimensions.width}
                  onClick={() => setClicks(data.clicks)}
                  size={data.res[getFields()].fields}
                  horizontal={data.res[getFields()].horizontal}
                >
                  {children}
                </MemoryBoard>
              </div>
            </main>
          </div>
        </section>
        <footer className={cx(style.bottom, style.underbox)}></footer>
      </div>
    </>
  );
}
