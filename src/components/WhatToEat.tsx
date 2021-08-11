import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getRecipesByName } from "../apis/recipes";
import { api } from "../services/api";
import { getRandomFontSize } from "../utils/font";
import { getRandomLeft, getRandomTop } from "../utils/position";
import { useHistory } from "react-router-dom";
import RecipeList from "./RecipeList";
import { combinedMeals } from "../constants/meals";
import { useTypeDispatch, useTypeSelector } from "../hooks/baseHooks";
import {
  resetClickedCount,
  toggleMeal,
  updateClickedCount,
} from "../redux/mealsSlice";

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
const countLimit = process.env.NODE_ENV === "development" ? 30 : 3;
function WhatToEat() {
  // const [clickedCount, setClickCount] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [randomIndex, setRandomIndex] = useState(-1);
  const [randomStyles, setRandomStyles] = useState(
    initializeStyles(combinedMeals.home)
  );
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const { meals, mealKey, clickedCount } = useTypeSelector(
    (state) => state.meals
  );
  const dispatch = useTypeDispatch();

  const history = useHistory();

  useEffect(() => {
    // setMeals(combinedMeals[mealKey]);
    setRandomStyles(initializeStyles(combinedMeals[mealKey]));
  }, [mealKey]);

  const handleStart = () => {
    if (clickedCount === countLimit) return dispatch(updateClickedCount()); //setClickCount((prev) => prev + 1);
    setIsStart(true);

    randomIndexTimer = setInterval(() => {
      setRandomIndex(Math.floor(Math.random() * meals[mealKey].length));
    }, 50);

    randomStylesTimer = setInterval(() => {
      setRandomStyles(initializeStyles(meals[mealKey]));
    }, 500);
  };

  const handleStop = () => {
    //setClickCount((prev) => prev + 1);
    dispatch(updateClickedCount());
    clearInterval(randomIndexTimer);
    clearInterval(randomStylesTimer);
    setIsStart(false);
    console.log(meals[mealKey][randomIndex]);
    // refetch();
  };

  const handleModalClick = async () => {
    //setIsModalOpen(true);
    history.push({
      pathname: "/recipe",
      search: `?name=${meals[mealKey][randomIndex]}`,
    });
  };

  const handleDoubleClick = () => {
    if (isStart) return;
    //setMealKey((prev) => (prev === "home" ? "restaurant" : "home"));
    dispatch(toggleMeal());
    // setClickCount(0);
    dispatch(resetClickedCount());
    setRandomIndex(-1);
  };

  return (
    <div
      className='h-full w-full flex flex-col justify-center items-center'
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
            {clickedCount && clickedCount <= countLimit && !isStart
              ? "吃这个！"
              : "吃什么？"}
          </span>
        </div>
        <div className='text-red-500 text-3xl font-bold  m-5'>
          {clickedCount <= countLimit ? (
            <div>
              {meals[mealKey][randomIndex]}
              {meals[mealKey][randomIndex] && !isStart ? (
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

      {meals[mealKey].length ? (
        <div
          style={{ display: isStart ? "block" : "none" }}
          className={
            "text-gray-600 dark:text-gray-200 "
            //+"transition-all duration-200 ease-in-out " +
            // (isStart ? "text-opacity-100" : "text-opacity-0")
            // isStart ? "visible" : "invisible"
          }
        >
          {meals[mealKey].map((item, index) => (
            <div
              key={index}
              className='fixed transition-all duration-500 linear'
              style={{
                // position: "fixed",
                top: `${randomStyles[index].top}px`,
                left: `${randomStyles[index].left}px`,
                fontSize: `${randomStyles[index].font}px`,
                opacity: randomStyles[index].opacity,
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
          query={meals[mealKey][randomIndex]}
        />
      ) : null} */}
    </div>
  );
}

export default WhatToEat;
