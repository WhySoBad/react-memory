import React from "react";
import style from "./Statistics.module.scss";
import data from "../../data/website";

const Statistics = props => {
  const { hor, ver, clicks, solved, resPrio } = props;
  data.allPairs = (hor * ver) / 2;
  data.clicks = clicks;
  data.solvedPairs = solved;
  data.allPairs = hor * ver;
  data.rep = {
    hor: hor,
    ver: ver,
  };
  return (
    <div
      className={style["stats-container"]}
      style={
        resPrio > 0
          ? { width: "fit-content", padding: "0.5rem 2rem" }
          : { width: "100%", padding: "0.5rem 0.5rem" }
      }
    >
      <div className={style.stats}>
        {clicks >= 10 ? (clicks >= 100 ? clicks : "0" + clicks) : "00" + clicks}
      </div>

      <div className={style.stats}>
        {solved}/{(hor * ver) / 2}
      </div>

      <div className={style.stats}>{`${hor}x${ver}`}</div>
    </div>
  );
};

export default Statistics;
