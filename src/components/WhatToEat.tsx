import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getRecipesByName } from "../apis/recipes";
import { api } from "../services/api";
import { getRandomFontSize } from "../utils/font";
import { getRandomLeft, getRandomTop } from "../utils/position";
import Recipe from "./Recipe";

const homeMeals = [
  "肥肠面",
  "螺蛳粉",
  "回锅肉",
  "胡辣汤",
  "面皮儿",
  "方便面",
  "焖面",
  "火锅",
  "大盘鸡",
  "卤肉面",
  "干锅",
  "水饺",
  "火锅面",
  "水果沙拉",
  "鸡蛋面",
  "醋溜白菜",
  "红烧肉",
  "白吉馍",
  "鸭血粉丝汤",
  "手抓饼",
  "煎包",
  "油条",
  "麻婆豆腐",
  "酸汤肥牛",
  "烤红薯",
  "烤鱼",
  "烧烤",
  "巧克力",
  "红烧排骨",
  "孜然羊肉",
];

const restaurantMeals = [
  "Brunch",
  "泰国菜",
  "越南菜",
  "韩国菜",
  "印度菜",
  "烧烤",
  "火锅",
  "大盘鸡",
  "麻辣干锅",
  "新疆菜",
  "湖南菜",
  "早茶",
  "北京烤鸭",
  "意大利菜",
  "奶茶",
  "日本菜",
  "小笼包",
];

const combinedMeals = [homeMeals, restaurantMeals];

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
  const [clickCount, setClickCount] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [randomIndex, setRandomIndex] = useState(-1);
  const [meals, setMeals] = useState(homeMeals);
  const [mealIndex, setMealIndex] = useState(0);
  const [randomStyles, setRandomStyles] = useState(initializeStyles(homeMeals));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { status, data, error } = useQuery(
    "recipes",
    () => getRecipesByName(meals[randomIndex]),
    {
      enabled: isModalOpen,
    }
  );

  console.log(status, data, error);

  useEffect(() => {
    setMeals(combinedMeals[mealIndex]);
    setRandomStyles(initializeStyles(combinedMeals[mealIndex]));
  }, [mealIndex]);

  const handleStart = () => {
    if (clickCount === countLimit) return setClickCount((prev) => prev + 1);
    setIsStart(true);

    // Start once immediately rather than waiting for 1s
    // setTimeout(() => {
    //   setRandomStyles(initializeStyles(meals));
    // }, 50);

    randomIndexTimer = setInterval(() => {
      setRandomIndex(Math.floor(Math.random() * meals.length));
    }, 50);

    randomStylesTimer = setInterval(() => {
      setRandomStyles(initializeStyles(meals));
    }, 1000);
  };

  const handleStop = () => {
    setClickCount((prev) => prev + 1);
    clearInterval(randomIndexTimer);
    clearInterval(randomStylesTimer);
    setIsStart(false);
    console.log(meals[randomIndex]);
  };

  const handleModalClick = async () => {
    setIsModalOpen(true);
  };

  const handleDoubleClick = () => {
    if (isStart) return;
    setMealIndex((prev) => (prev === 0 ? 1 : 0));
    setClickCount(0);
    setRandomIndex(-1);
  };

  return (
    <div
      className='h-full w-full flex flex-col justify-center items-center'
      onDoubleClick={handleDoubleClick}
    >
      <div className='relative z-20'>
        <div className='text-xl  text-black dark:text-white p-5'>
          今天吃什么，
          <span
            className={
              " text-2xl inline-block " +
              (isStart
                ? " text-blue-500 dark:text-pink-400 animate-spin"
                : "animate-none")
            }
          >
            {clickCount && clickCount <= countLimit && !isStart
              ? "吃这个！"
              : "吃什么？"}
          </span>
        </div>
        <div className='text-red-500 text-3xl font-bold  m-5'>
          {clickCount <= countLimit ? (
            <div>
              {meals[randomIndex]}
              {meals[randomIndex] && !isStart ? (
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

        {clickCount <= countLimit ? (
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
                (clickCount > 0 ? "px-6" : "px-10")
              }
              onClick={handleStart}
            >
              {clickCount > 0 ? "再来一次" : " 开始"}
            </button>
          )
        ) : null}
      </div>

      {meals.length ? (
        <div
          style={{ display: isStart ? "block" : "none" }}
          className={
            "text-gray-600 dark:text-gray-200 "
            //+"transition-all duration-200 ease-in-out " +
            // (isStart ? "text-opacity-100" : "text-opacity-0")
            // isStart ? "visible" : "invisible"
          }
        >
          {meals.map((item, index) => (
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
      {isModalOpen ? (
        <Recipe
          setIsModalOpen={setIsModalOpen}
          dataProps={{ status, data, error }}
        />
      ) : null}
    </div>
  );
}

export default WhatToEat;
