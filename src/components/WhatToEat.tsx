import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getRecipesByName } from "../apis/recipes";
import { api } from "../services/api";
import { getRandomFontSize } from "../utils/font";
import { getRandomLeft, getRandomTop } from "../utils/position";
import { useHistory } from "react-router-dom";
import RecipeList from "./RecipeList";
import { combinedMenus } from "../constants/menus";
import { useTypeDispatch, useTypeSelector } from "../hooks/baseHooks";
import {
  resetClickedCount,
  toggleMenu,
  updateClickedCount,
} from "../redux/menusSlice";
import { resetTimeRemaining, timeCountdown } from "../redux/settingsSlice";

const initializeStyles = (array: string[]) => {
  return array.map((item) => ({
    top: getRandomTop(),
    left: getRandomLeft(),
    font: getRandomFontSize(),
    opacity: Math.random() + 0.2,
  }));
};

let randomIndexTimer: NodeJS.Timeout;
let randomStylesTimer: NodeJS.Timeout;
let countdownInterval: NodeJS.Timeout;
const countLimit = process.env.NODE_ENV === "development" ? 3 : 3;

function WhatToEat() {
  const { menus, menuKey, clickedCount } = useTypeSelector(
    (state) => state.menus
  );
  //const { timeRemaining } = useTypeSelector((state) => state.settings);
  const dispatch = useTypeDispatch();

  const [isStart, setIsStart] = useState(false);
  const [randomIndex, setRandomIndex] = useState(-1);
  const [randomStyles, setRandomStyles] = useState(
    initializeStyles(menus[menuKey])
  );
  const [timeRemaining, setTimeRemaining] = useState(() => {
    const storedTime = localStorage.getItem("countdownTime");
    if (storedTime) {
      const remainingTime = parseInt(storedTime, 10) - Date.now();
      return remainingTime > 0 ? Math.floor(remainingTime / 1000) : 0;
    }
    return 300; // 5 minutes in seconds
  });
  //console.log("timeRemaining", timeRemaining);

  const history = useHistory();

  useEffect(() => {
    //console.log("clickedCount", clickedCount);
    const targetTime = Date.now() + timeRemaining * 1000;
    localStorage.setItem("countdownTime", targetTime.toString());

    //let timer: NodeJS.Timeout;
    if (clickedCount > 3) {
      // timer = setTimeout(() => {
      //   dispatch(resetClickedCount());
      //   setRandomIndex(-1);
      // }, 1000 * 60 * 5); //FIXME: Why order matter? if putting this line below setInterval, it will need another 5mins
      countdownInterval = setInterval(() => {
        const secondsLeft = Math.round((targetTime - Date.now()) / 1000);

        if (secondsLeft <= 0) {
          clearInterval(countdownInterval);
          setTimeRemaining(0);
          localStorage.removeItem("countdownTime");
        } else {
          setTimeRemaining(secondsLeft);
        }
      }, 1000);
    }

    return () => {
      clearInterval(countdownInterval);
      //clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedCount]);

  useEffect(() => {
    if (clickedCount > 3 && timeRemaining === 0) {
      setTimeRemaining(60 * 5);
      clearInterval(countdownInterval);
      dispatch(resetClickedCount());
      // dispatch(resetTimeRemaining());
      setRandomIndex(-1);
    }
  }, [timeRemaining, clickedCount, dispatch]);

  useEffect(() => {
    // setMenus(combinedMenus[menuKey]);
    setRandomStyles(initializeStyles(menus[menuKey]));
  }, [menuKey, menus]);

  const handleStart = () => {
    if (clickedCount === countLimit) return dispatch(updateClickedCount()); //setClickCount((prev) => prev + 1);
    setIsStart(true);

    randomIndexTimer = setInterval(() => {
      setRandomIndex(Math.floor(Math.random() * menus[menuKey].length));
    }, 50);

    randomStylesTimer = setInterval(() => {
      setRandomStyles(initializeStyles(menus[menuKey]));
    }, 500);
  };

  const handleStop = () => {
    //setClickCount((prev) => prev + 1);
    dispatch(updateClickedCount());
    clearInterval(randomIndexTimer);
    clearInterval(randomStylesTimer);
    setIsStart(false);
    //console.log(menus[menuKey][randomIndex]);
    // refetch();
  };

  const handleModalClick = async () => {
    //setIsModalOpen(true);
    history.push({
      pathname: "/recipe",
      search: `?name=${menus[menuKey][randomIndex]}`,
    });
  };

  const handleDoubleClick = () => {
    if (isStart) return;
    //setMealKey((prev) => (prev === "home" ? "restaurant" : "home"));
    dispatch(toggleMenu());
    // setClickCount(0);
    dispatch(resetClickedCount());
    setRandomIndex(-1);
    setTimeRemaining(60 * 5);
  };

  return (
    <div
      className='h-screen w-full flex flex-col justify-center items-center'
      onDoubleClick={handleDoubleClick}
    >
      <div className='relative z-20'>
        <div
          className={
            "text-xl  text-black dark:text-white p-5 " +
            (isStart ? " text-blue-500 dark:text-pink-400" : "")
          }
        >
          今天吃什么，
          <span
            className={
              " text-2xl inline-block " +
              (isStart
                ? " text-blue-500 dark:text-pink-400 animate-spin"
                : "animate-none")
            }
          >
            {clickedCount &&
            clickedCount <= countLimit &&
            !isStart &&
            randomIndex !== -1
              ? "吃这个！"
              : "吃什么？"}
          </span>
        </div>
        <div className='text-red-500 text-3xl font-bold  m-5'>
          {clickedCount <= countLimit ? (
            <div>
              {menus[menuKey][randomIndex]}
              {menuKey !== "restaurant" &&
              menus[menuKey][randomIndex] &&
              !isStart ? (
                //   &&
                // status === "success" &&
                //   data?.data.result
                <span
                  className='bg-pink-500 text-white text-sm align-middle px-3 py-1 ml-2 rounded-md cursor-pointer'
                  onClick={handleModalClick}
                >
                  菜谱
                </span>
              ) : null}
            </div>
          ) : (
            "这么作，别吃了！！"
          )}
        </div>

        {clickedCount <= countLimit ? (
          isStart ? (
            <button
              className='bg-red-500 hover:bg-red-600 text-white text-lg shadow-lg rounded-lg px-10 py-3 m-5'
              onClick={handleStop}
            >
              停止
            </button>
          ) : (
            <button
              className={
                "bg-blue-500 hover:bg-blue-600 text-white text-lg shadow-lg rounded-lg  py-3 m-5 " +
                (clickedCount > 0 ? "px-6" : "px-10")
              }
              onClick={handleStart}
            >
              {clickedCount > 0 ? "再来一次" : " 开始"}
            </button>
          )
        ) : null}
      </div>

      {menus[menuKey].length ? (
        <div
          style={{ display: isStart ? "block" : "none" }}
          className={
            "text-gray-600 dark:text-gray-200 "
            //+"transition-all duration-200 ease-in-out " +
            // (isStart ? "text-opacity-100" : "text-opacity-0")
            // isStart ? "visible" : "invisible"
          }
        >
          {menus[menuKey].map((item, index) => (
            <div
              key={index}
              className='fixed transition-all duration-500 linear'
              style={{
                // position: "fixed",
                top: `${randomStyles[index]?.top}px`,
                left: `${randomStyles[index]?.left}px`,
                fontSize: `${randomStyles[index]?.font}px`,
                opacity: randomStyles[index]?.opacity,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      ) : null}
      {/* {isModalOpen ? (
        <RecipeList
          setIsModalOpen={setIsModalOpen}
          query={meals[menuKey][randomIndex]}
        />
      ) : null} */}
      <div className='text-sm text-gray-200 dark:text-gray-600'>
        {isStart
          ? ""
          : clickedCount <= 3
          ? "注：双击屏幕切换菜单"
          : Math.floor(timeRemaining / 60) +
            " 分钟 " +
            (timeRemaining % 60) +
            " 秒后重置"}
      </div>
    </div>
  );
}

export default WhatToEat;
