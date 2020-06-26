import React, { useState, useEffect, useRef } from "react";
import { rgb } from "random-color-gen";
import cx from "classnames";
import rc from "randomcolor";
import { ResizeListener } from "react-resize-listener";
import data, { currentColor } from "../../data/website";
import style from "./MemoryBoard.module.scss";
import MemoryCard from "../MemoryCard";
import Statistics from "../Statistics";

export default function MemoryBoard(props) {
  const [, setRender] = useState(null);
  const [clicks, setClicks] = useState(data.clicks);
  const [solved, setSolved] = useState(data.solvedPairs);
  const [allPairs, setAllPairs] = useState(data.allPairs);
  const ref = useRef(null);
  const [rep, setRep] = useState({
    hor: 0,
    ver: 0,
  });
  const [dimensions, setDimensions] = useState({
    width: ref.current ? ref.current.offsetWidth : 0,
    height: ref.current ? ref.current.offsetHeight : 0,
  });
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
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
    setAllPairs((rep.hor * rep.ver) / 2);
  }, [dimensions]);

  useEffect(() => {
    if (currentColor[0]) {
      if (Object.keys(currentColor[0]).length !== size) {
        sizeChange();
        resetCards();
        data.solvedPairs = 0;
        setSolved(data.solvedPairs);
        currentColor.shift();
        newColors(size);
      }
    }
  }, [size]);

  useEffect(() => {
    if (!firstCard || !secondCard) return;
    firstCard.color === secondCard.color ? win() : lose();
    let solvedFields = 0;
    let cardFields = 0;
    Object.keys(currentColor[0]).forEach(key => {
      cardFields++;
      if (currentColor[0][key].isSolved) solvedFields++;
    });
    data.solvedPairs = solvedFields / 2;
    setSolved(data.solvedPairs);
    if (cardFields === solvedFields) finalWin();
  }, [firstCard, secondCard]);

  const finalWin = async () => {
    console.log("won");
    await delay(250);
    data.won = true;
    setRender(7);
  };

  const win = () => {
    setFirstCard({ isSolved: true });
    currentColor[0][firstCard.id].isSolved = true;
    setSecondCard({ isSolved: true });
    currentColor[0][secondCard.id].isSolved = true;
    setFirstCard({ canFlip: false });
    currentColor[0][firstCard.id].canFlip = false;
    setSecondCard({ canFlip: false });
    currentColor[0][secondCard.id].canFlip = false;
    resetCards();
  };

  const lose = () => {
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
    setFirstCard({ isFlipped: false });
    setSecondCard({ isFlipped: false });
    const firstId = firstCard.id;

    await delay(650);
    currentColor[0][firstId].isFlipped = false;
    setRender(1);
    //await delay(500);
    const secondId = secondCard.id;
    currentColor[0][secondId].isFlipped = false;
    setRender(2);
  };

  const sizeChange = () => {
    if (firstCard) {
      setFirstCard({ isFlipped: true });
      currentColor[0][firstCard.id].isFlipped = false;
    }
    if (secondCard) {
      setSecondCard({ isFlipped: true });
      currentColor[0][secondCard.id].isFlipped = false;
    }
    data.clicks = 0;
    data.win = false;
  };

  const resetCards = () => {
    setFirstCard(null);
    setSecondCard(null);
  };

  const cardClick = position => {
    if (currentColor[0] == null) newColors(size);
    let card = currentColor[0][position];
    //console.log(currentColor[0]); //debug only [see card data]
    if (card.isFlipped) return;
    if (!card.canFlip) return;
    if (firstCard && firstCard.id === card.id) return;
    if (secondCard && secondCard.id === card.id) return;
    data.clicks++;
    card.isFlipped = true;
    firstCard ? setSecondCard(card) : setFirstCard(card);
    setRender(null);
  };

  const newColors = size => {
    //data.allPairs = size / 2;
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
    currentColor.push(fieldColors);
    return currentColor;
  };

  const getFlipped = key => {
    if (currentColor[0] != null) {
      return currentColor[0][key] ? true : false;
    }
    return false;
  };

  const getBackgroundColor = position => {
    if (currentColor[0] != null) {
      if (currentColor[0][position].isFlipped) {
        return currentColor[0][position].color;
      } else {
        return "";
      }
    } else {
      return "";
    }
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
  };
  return (
    <>
      <div className={style["stats-container"]}>
        <Statistics
          hor={rep.hor}
          ver={rep.ver}
          clicks={clicks}
          solved={solved}
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
          setClicks(data.clicks);
          setSolved(data.solvedPairs);
          setAllPairs(data.allPairs);
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
                      setClicks(data.clicks);
                      setSolved(data.solvedPairs);
                      setAllPairs(data.allPairs);
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
              <div className={style["win-header"]}>You won! 🎉</div>
              <div className={style["win-text"]}>asdf</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
