import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import WhatToEat from "../components/WhatToEat";

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleClick = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <>
      <div
        className='text-2xl fixed top-5 right-5 cursor-pointer dark:text-white'
        onClick={handleClick}
      >
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
      <WhatToEat />
    </>
  );
}

export default Home;
