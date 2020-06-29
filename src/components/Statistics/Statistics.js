import React from "react";
import style from "./Statistics.module.scss";
import data from "../../data/website";

const Statistics = props => {
  const { dim, stats, resPrio } = props;
  data.allPairs = (dim.hor * dim.ver) / 2;
  data.clicks = stats.clicks;
  data.solvedPairs = stats.solved;
  data.allPairs = dim.hor * dim.ver;
  data.rep = {
    hor: dim.hor,
    ver: dim.ver,
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
        {stats.clicks >= 10
          ? stats.clicks >= 100
            ? stats.clicks
            : "0" + stats.clicks
          : "00" + stats.clicks}
      </div>

      <div className={style.stats}>
        {stats.solved}/{(dim.hor * dim.ver) / 2}
      </div>

      <div className={style.stats}>{`${dim.hor}x${dim.ver}`}</div>
    </div>
  );
};

export default Statistics;
