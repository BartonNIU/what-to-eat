import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useTypeDispatch, useTypeSelector } from "../hooks/baseHooks";
import { addMeal, deleteMeal } from "../redux/menusSlice";

interface Title {
  [key: string]: string;
}

const titles: Title = {
  home: "编辑家常菜单",
  restaurant: "编辑下馆子菜单",
  new: "添加新菜单",
};

function CreateMenu() {
  const params = useParams<{ key: string }>();
  const { key }: { key: string } = params;

  const [menu, setMenu] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const { menus } = useTypeSelector((state) => state.menus);
  const dispatch = useTypeDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputValue("");
    //setMenu((prev) => [...prev, inputValue]);
    inputValue && dispatch(addMeal({ key, value: inputValue }));
  };

  const handleDelete = (e: React.MouseEvent<HTMLSpanElement>) => {
    const { index } = e.currentTarget.dataset;
    if (key && index) {
      dispatch(deleteMeal({ key, index }));
    }
  };

  return (
    <div className=' '>
      <Header position='relative' />

      <div className='w-10/12 p-2 my-2 mx-auto'>
        <div className='dark:text-white'>{titles[key]}</div>
        <div
          className='bg-gray-200 p-1 my-3 mx-auto border-2 border-solid'
          style={{ minHeight: "300px" }}
        >
          <ul className='p-0 m-0 flex flex-wrap'>
            {menus[key]?.map((meal, index) => (
              <li
                key={index}
                className='bg-yellow-700 text-white text-sm px-3 py-1 m-1 rounded-full'
              >
                <span className='c'>{meal}</span>
                <span
                  className='pl-2'
                  data-index={index}
                  onClick={handleDelete}
                >
                  X
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <form className='w-full flex justify-between' onSubmit={handleSubmit}>
            <input
              className='py-3 px-2 flex-auto border border-solid border-gray-300'
              type='text'
              value={inputValue}
              onChange={handleChange}
            />
            <button
              className='bg-blue-500 text-white shadow-lg hover:bg-blue-600 px-6 py-3'
              // onClick={handleClick}
            >
              添加
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateMenu;
