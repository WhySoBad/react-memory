import React, { useState, useEffect, useRef } from "react";
import { rgb } from "random-color-gen";
import cx from "classnames";
import rc from "randomcolor";
import { ResizeListener } from "react-resize-listener";
import data, { board, clicks } from "../../data/website";
import style from "./MemoryBoard.module.scss";
import MemoryCard from "../MemoryCard";
import Statistics from "../Statistics";

export default function MemoryBoard(props) {
  const ref = useRef(null);
  const [render, setRender] = useState(0);
  const [stats, setStats] = useState({
    clicks: 0,
    solved: 0,
  });
  const [rep, setRep] = useState({
    hor: 0,
    ver: 0,
  });
  const [dimensions, setDimensions] = useState({
    width: ref.current ? ref.current.offsetWidth : 0,
    height: ref.current ? ref.current.offsetHeight : 0,
  });
  const [cards, setCards] = useState({
    1: null,
    2: null,
  });
  let { children, className, horizontal, resolution, ...rest } = props;
  let size = rep.hor * rep.ver;
  let sections = [];
  for (let i = 0; i < size; i++) {
    sections[i] = i;
  }

  useEffect(() => {
    setDimensions({
      width: ref.current ? ref.current.offsetWidth : 0,
      height: ref.current ? ref.current.offsetHeight : 0,
    });
  }, [ref.current]);

  useEffect(() => {
    if (data.won) {
      resetBoard();
    }
    setRep({
      hor: data.res[resolution].horizontal,
      ver: Math.floor(
        dimensions.height / (dimensions.width / data.res[resolution].horizontal)
      ),
    });
    data.rep = {
      hor: rep.hor,
      ver: rep.ver,
    };
  }, [dimensions]);

  useEffect(() => {
    if (board) {
      if (Object.keys(board).length !== size) {
        sizeChange();
        resetCards();
        data.solvedPairs = 0;
        setStats({ ...stats, solved: data.solvedPairs });
        Object.keys(board).forEach(key => delete board[key]);
        newColors(size);
      }
    }
  }, [size]);

  useEffect(() => {
    if (!cards[1] || !cards[2]) return;
    cards[1].color === cards[2].color ? win() : lose();
    let solvedFields = 0;
    let cardFields = 0;
    Object.keys(board).forEach(key => {
      cardFields++;
      if (board[key].isSolved) solvedFields++;
    });
    data.solvedPairs = solvedFields / 2;
    setStats({ ...stats, solved: data.solvedPairs });
    if (cardFields === solvedFields) finalWin();
  }, [cards]);

  const finalWin = async () => {
    data.time.end = new Date().getTime();
    await delay(250);
    console.log(
      `Solved memory 🎉\n- ${clicks} Clicks\n- ${
        rep.hor * rep.ver
      } Fields\n- ${getTime()}`
    );
    data.won = true;
    setRender(render - 10);
  };

  const win = () => {
    setCards({
      1: { isSolved: true, canFlip: false },
      2: { isSolved: true, canFlip: false },
    });
    board[cards[1].id].isSolved = true;
    board[cards[2].id].isSolved = true;
    board[cards[1].id].canFlip = false;
    board[cards[2].id].canFlip = false;
    resetCards();
  };

  const lose = async () => {
    flipCards();
    resetCards();
  };

  function delay(ms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  const flipCards = async () => {
    const IDs = [cards[1].id, cards[2].id];
    await delay(650);
    board[IDs[0]].isFlipped = false;
    board[IDs[1]].isFlipped = false;
    setRender(render + 1);
  };

  const resetBoard = () => {
    Object.keys(board).forEach(key => delete board[key]);
    newColors();
    setStats({
      solved: 0,
      clicks: 0,
    });
    setCards({
      1: null,
      2: null,
    });
    data.won = false;
    setRender(render + 1);
  };

  const sizeChange = () => {
    if (cards[1]) board[cards[1].id].isFlipped = false;
    if (cards[2]) board[cards[2].id].isFlipped = false;
    data.clicks = 0;
    setRender(render - 1);
  };

  const resetCards = () => {
    setCards({
      1: null,
      2: null,
    });
  };

  const cardClick = position => {
    if (Object.keys(board).length === 0) newColors(size);
    let card = board[position];
    if (card.isFlipped) return;
    if (!card.canFlip) return;
    if (cards[1] && cards[1].id === card.id) return;
    if (cards[2] && cards[2].id === card.id) return;
    if (data.clicks === 0) {
      data.time.start = new Date().getTime();
      data.time.end = 0;
    }
    data.clicks++;
    finalWin();
    card.isFlipped = true;
    cards[1]
      ? setCards({ ...cards, 2: card })
      : setCards({ ...cards, 1: card });
  };

  const newColors = size => {
    let colors = [];
    for (let a = 1; a < size / 2; a++) {
      colors.push([rgb(), rgb(), rgb()]);
    }
    let singleColor = [
      ...rc({
        luminosity: "light",
        format: "rgb",
        count: size / 2,
      }),
    ];
    let gradient = [];

    colors.forEach((color, index) => {
      let currColor = [...colors[index]];
      let startColor = `rgb(${currColor[0][0]}, ${currColor[0][1]}, ${currColor[0][2]})`;
      let finishColor = `rgb(${currColor[2][0]}, ${currColor[2][1]}, ${currColor[2][2]})`;

      gradient.push(
        `linear-gradient(to right top, ${startColor}, ${finishColor})`
      );
    });

    let fields = [];

    for (let i = 0; i < size; i++) {
      fields[i] = i;
    }
    fields.sort(() => Math.random() - 0.5);

    let fieldColors = {};
    singleColor.forEach((value, index) => {
      fieldColors[fields[(index + 1) * 2 - 1]] = {
        color: value,
        id: fields[(index + 1) * 2 - 1],
        isSolved: false,
        isFlipped: false,
        canFlip: true,
      };
      fieldColors[fields[(index + 1) * 2 - 2]] = {
        color: value,
        id: fields[(index + 1) * 2 - 2],
        isSolved: false,
        isFlipped: false,
        canFlip: true,
      };
    });
    Object.assign(board, fieldColors);
    return board;
  };

  const getFlipped = key => {
    if (board) {
      return board[key] ? true : false;
    }
    return false;
  };

  const getBackgroundColor = position => {
    if (board) {
      if (board[position].isFlipped) {
        return board[position].color;
      }
    }
    return "";
  };

  const getTime = () => {
    const time = data.time.end - data.time.start;
    let rest = 0;
    let d = Math.floor(time / 86400000);
    rest = time % 86400000;
    let h = Math.floor(rest / 3600000);
    rest %= 3600000;
    let min = Math.floor(rest / 60000);
    rest %= 60000;
    let sec = Math.floor(rest / 1000);
    let mil = rest % 1000;
    return `${d === 0 ? "" : `${d}d `}${h === 0 ? "" : `${h}h `}${
      min === 0 ? "" : `${min}m `
    }${sec === 0 ? "" : `${sec}s `}${mil}ms`;
  };

  const boardGrid = {
    gridTemplateColumns: `repeat(${rep.hor},  calc(${
      dimensions.width / horizontal
    }px - 1rem))`,
    gridTemplateRows: `repeat(${rep.ver},  calc(${
      dimensions.width / horizontal
    }px - 1rem))`,
  };
  const backgroundDims = {
    height: `${(rep.ver / rep.hor) * dimensions.width}px`,
    width: "100%",
  };
  return (
    <>
      <div className={style["stats-container"]}>
        <Statistics
          dim={rep}
          stats={{ clicks: stats.clicks, solved: stats.solved }}
          resPrio={data.res[resolution].prio}
        />
      </div>
      <ResizeListener
        onResize={() => {
          setDimensions({
            width: ref.current ? ref.current.offsetWidth : 0,
            height: ref.current ? ref.current.offsetHeight : 0,
          });
          data.clicks = 0;
          setStats({ clicks: data.clicks, solved: data.solvedPairs });
        }}
      />

      <div className={style["game-container"]} ref={ref}>
        <div className={style["background-box"]} style={backgroundDims}>
          {!data.won ? (
            <div className={style["background-content"]}>
              <div className={cx(style.wrapper)} style={boardGrid} {...rest}>
                {sections.map(key => (
                  <MemoryCard
                    key={key}
                    position={key}
                    flipped={getFlipped(key)}
                    background={
                      getFlipped(key) ? getBackgroundColor(key) : null
                    }
                    onClick={() => {
                      cardClick(key);
                      setStats({
                        clicks: data.clicks,
                        solved: data.solvedPairs,
                      });
                    }}
                    ver={rep.ver}
                    hor={rep.hor}
                  >
                    {children}
                  </MemoryCard>
                ))}
              </div>
            </div>
          ) : (
            <div className={style["win-container"]}>
              <div className={style["win-header"]}>Memory solved 🎉</div>
              <div className={style["win-text"]}>
                <div className={style["win-stats"]}>
                  <span className={style["win-stats-prefix"]}>Clicks</span>
                  {data.clicks}
                </div>
                <div className={style["win-stats"]}>
                  <span className={style["win-stats-prefix"]}>Fields</span>
                  {rep.hor * rep.ver}
                </div>
                <div className={style["win-stats"]}>
                  <span className={style["win-stats-prefix"]}>Time</span>
                  {getTime()}
                </div>
              </div>
              <div className={style["win-button"]}>
                <button className={style["button"]} onClick={resetBoard}>
                  Play again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
