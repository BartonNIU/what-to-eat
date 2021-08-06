import React, { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FiSun, FiMoon } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import WhatToEat from "../components/WhatToEat";

function Home() {
  const history = useHistory();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { action } = e.currentTarget.dataset;
    switch (action) {
      case "dashboard":
        history.push("/dashboard");
        break;
      case "dark-mode":
        setIsDarkMode((prev) => !prev);
        break;
      default:
        console.error(`Error, no such case: ${action}`);
    }
  };

  return (
    <>
      <div className='text-2xl fixed p-5 w-full flex justify-between cursor-pointer dark:text-white'>
        <div className='c' data-action='dashboard' onClick={handleClick}>
          <AiOutlineUser />
        </div>
        <div className='' data-action='dark-mode' onClick={handleClick}>
          {isDarkMode ? (
            <span>
              <FiMoon />
            </span>
          ) : (
            <span>
              <FiSun />
            </span>
          )}
        </div>
      </div>

      <WhatToEat />
    </>
  );
}

export default Home;
