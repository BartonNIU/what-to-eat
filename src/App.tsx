import React, { useState } from "react";
import "./App.css";
import { FiSun, FiMoon } from "react-icons/fi";
import WhatToEat from "./components/WhatToEat";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
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
    <QueryClientProvider client={queryClient}>
      <div className='h-screen text-center dark:bg-gray-800'>
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
      </div>
    </QueryClientProvider>
  );
}

export default App;
