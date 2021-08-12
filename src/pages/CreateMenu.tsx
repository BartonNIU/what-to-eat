import React, { useState } from "react";
import Header from "../components/Header";

function CreateMenu() {
  const [menu, setMenu] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    setMenu((prev) => [...prev, inputValue]);
  };

  return (
    <div className=' '>
      <Header position='relative' />

      <div className='w-10/12 p-2 my-2 mx-auto'>
        <div className='dark:text-white'>添加新菜单</div>
        <div
          className='bg-gray-200 p-2 my-3 mx-auto border-2 border-solid'
          style={{ minHeight: "300px" }}
        >
          {menu.map((meal, index) => (
            <span key={index} className='bg-gray-400 px-3 py-1 rounded-full'>
              {meal}
            </span>
          ))}
        </div>
        <div className='w-full flex justify-between'>
          <input
            className='py-3 flex-auto'
            type='text'
            value={inputValue}
            onChange={handleChange}
          />
          <button
            className='bg-blue-500 text-white shadow-lg hover:bg-blue-600 px-6 py-3'
            onClick={handleClick}
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateMenu;
