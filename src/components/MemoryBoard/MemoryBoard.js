import React, { useState, useEffect } from "react";
import { rgb } from "random-color-gen";
import cx from "classnames";
import rc from "randomcolor";
import data, { currentColor } from "../../data/website";
import style from "./MemoryBoard.module.scss";
import MemoryCard from "../MemoryCard";

export default function MemoryBoard(props) {
  const [, setRender] = useState(null);
  const [dim, setDim] = useState({
    height: 0,
    width: 0,
  });
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  let {
    children,
    className,
    size,
    horizontal,
    dimensions,
    resolution,
    ...rest
  } = props;
  size = size == null ? 36 : size;
  let sections = [];
  for (let i = 0; i < size; i++) {
    sections[i] = i;
  }

  useEffect(() => {
    setDim({ height: dimensions.height, width: dimensions.width });
  }, [dimensions]);

  useEffect(() => {
    if (currentColor[0]) {
      if (Object.keys(currentColor[0]).length !== size) {
        sizeChange();
        resetCards();
        data.solvedPairs = 0;
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
    if (cardFields === solvedFields) finalWin();
  }, [firstCard, secondCard]);

  const finalWin = async () => {
    console.log("won");
    await delay(250);
    setRender(7);
    data.won = true;
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
    data.allPairs = size / 2;
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
        colorId: index,
        id: fields[(index + 1) * 2 - 1],
        isSolved: false,
        isFlipped: false,
        canFlip: true,
      };
      fieldColors[fields[(index + 1) * 2 - 2]] = {
        color: value,
        colorId: index,
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

  const getId = key => {
    if (currentColor[0] != null) {
      return currentColor[0][key].colorId ? currentColor[0][key].colorId : -1;
    } else {
      return -1;
    }
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

  const isSmall = () => {
    if (resolution === "xs" || resolution === "xxs" || resolution === "s")
      return true;
    return false;
  };

  let boardDims = {
    height: !isSmall()
      ? dim.width > dim.height
        ? dim.height
        : dim.width
      : dim.width > dim.height
      ? dim.width
      : dim.height,
    width: !isSmall()
      ? dim.width > dim.height
        ? dim.height
        : dim.width
      : dim.width > dim.height
      ? dim.width
      : dim.height,
  };

  let boardGrid = {
    gridTemplateColumns: `repeat(${horizontal}, calc(100% /${horizontal}))`,
    gridTemplateRows: `repeat(${size / horizontal}, calc(100% /${
      isSmall() ? size / horizontal : horizontal
    }))`,
  };

  return (
    <>
      <div style={boardDims}>
        {!data.won ? (
          <div className={cx(style.wrapper)} style={boardGrid} {...rest}>
            {sections.map(key => (
              <MemoryCard
                key={key}
                position={key}
                flipped={getFlipped(key)}
                background={getFlipped(key) ? getBackgroundColor(key) : null}
                onClick={() => cardClick(key)}
                size={size}
              >
                {children}
              </MemoryCard>
            ))}
          </div>
        ) : (
          <div className={style["win-container"]}>
            <div className={style["win-header"]}>You won! 🎉</div>
            <div className={style["win-text"]}>asdf</div>
          </div>
        )}
      </div>
    </>
  );
}
