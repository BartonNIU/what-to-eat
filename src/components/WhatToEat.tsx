import React, { useState } from "react";

const meals = [
  "肥肠面",
  "螺蛳粉",
  "回锅肉",
  "胡辣汤",
  "面皮儿",
  "方便面",
  "焖面",
  "火锅",
  "大盘鸡",
  "卤肉",
  "干锅",
  "水饺",
  "火锅面",
  "水果",
];

const getRandomTop = () => {
  return Math.ceil(Math.random() * window.innerHeight);
};

const getRandomLeft = () => {
  return Math.ceil(Math.random() * window.innerWidth);
};

const getRandomFontSize = () => {
  return Math.ceil((Math.random() * window.innerWidth) / 50) + 20;
};

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
function WhatToEat() {
  const [clickCount, setClickCount] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [randomIndex, setRandomIndex] = useState(-1);
  const [randomStyles, setRandomStyles] = useState(initializeStyles(meals));

  // console.log(
  //   document.body.clientWidth,
  //   document.body.clientHeight,
  //   window.innerHeight,
  //   randomStyles
  // );

  const handleStart = () => {
    setIsStart(true);
    randomIndexTimer = setInterval(() => {
      setRandomIndex(Math.floor(Math.random() * meals.length));
    }, 50);

    randomStylesTimer = setInterval(() => {
      setRandomStyles(initializeStyles(meals));
    }, 500);
  };

  const handleStop = () => {
    setClickCount((prev) => prev + 1);
    clearInterval(randomIndexTimer);
    clearInterval(randomStylesTimer);
    setIsStart(false);
  };

  return (
    <div>
      <div className='text-lg  text-gray-700'>今天吃什么，吃什么？</div>
      <div className='text-red-400 text-2xl font-bold  m-5'>
        {clickCount < 3 ? meals[randomIndex] : "这么作，别吃了！！"}
      </div>

      {clickCount < 3 ? (
        isStart ? (
          <button
            className='bg-red-400 hover:bg-red-500 shadow-lg rounded-lg px-10 py-3 m-5'
            onClick={handleStop}
          >
            停止
          </button>
        ) : (
          <button
            className='bg-blue-400 hover:bg-blue-500 shadow-lg rounded-lg px-10 py-3 m-5'
            onClick={handleStart}
          >
            开始
          </button>
        )
      ) : null}

      {isStart && meals.length ? (
        <div className='text-gray-600'>
          {meals.map((item, index) => (
            <div
              key={index}
              style={{
                position: "fixed",
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
    </div>
  );
}

export default WhatToEat;
