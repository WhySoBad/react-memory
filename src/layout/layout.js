import React from "react";
import style from "./Layout.module.scss";
import MainScreen from "../components/MainScreen";
import "../styles/main.scss"; //Global stylesheet

const Layout = props => {
  const { children } = props;
  return (
    <>
      <div className={style.content}>
        <main className={style.main}>
          <MainScreen /> {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
