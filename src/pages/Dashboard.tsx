import React, { useState } from "react";
import { combinedMenus } from "../constants/menus";
import { AiOutlineMore } from "react-icons/ai";
import { VscArrowLeft } from "react-icons/vsc";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import { useTypeDispatch, useTypeSelector } from "../hooks/baseHooks";
import { deleteMeal, toggleMenuGroup } from "../redux/menusSlice";

interface Title {
  [key: string]: string;
}

const titles: Title = {
  home: "家常菜单",
  restaurant: "下馆子菜单",
  new: "自定义菜单",
};

function Dashboard() {
  const history = useHistory();

  const { menus, editMealGroupStatus } = useTypeSelector(
    (state) => state.menus
  );
  const { isLogin } = useTypeSelector((state) => state.users);
  const dispatch = useTypeDispatch();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { action, name } = e.currentTarget.dataset;
    // console.log(action, name);

    switch (action) {
      case "edit":
        if (name) {
          // setEditStatus((prev) => ({ ...prev, [name]: !prev[name] }));

          //dispatch(toggleMenuGroup(name));
          history.push({
            pathname: `/create-menu/${name}`,
          });
        }
        break;
      case "create-menu":
        history.push({
          pathname: "/create-menu/new",
        });
        break;
      case "login":
        history.push("/login");
        break;
      default:
        console.error(`Error, no such case: ${action}`);
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLSpanElement>) => {
    console.log(e.currentTarget.dataset);
    const { key, index } = e.currentTarget.dataset;
    console.log("key, index", key, index);
    if (key && index) {
      dispatch(deleteMeal({ key, index }));
    }
  };

  return (
    <div className='min-h-screen'>
      <Header position='relative' />

      <div className=''>
        {Object.entries(menus).map(([key, menus]) => (
          <div className='m-5' key={key}>
            <div className=' dark:text-white flex justify-between text-xl mb-3'>
              <span> {titles[key]}</span>
              <span
                className='bg-gray-300 dark:bg-blue-400 text-xs px-3 py-1 rounded-full'
                data-action='edit'
                data-name={key}
                onClick={handleClick}
              >
                {editMealGroupStatus[key] ? "退出" : "编辑"}
              </span>
            </div>
            <ul className='flex  justify-start items-start overflow-x-auto'>
              {menus.map((item, index) => (
                <li
                  key={index}
                  className='bg-yellow-700 text-white px-3 py-3 m-2 rounded-md'
                  style={{ writingMode: "vertical-lr", letterSpacing: "10px" }}
                >
                  <span>{item} </span>
                  <span
                    className='cursor-pointer'
                    data-key={key}
                    data-index={index}
                    onClick={handleDelete}
                  >
                    {editMealGroupStatus[key] && "X"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {isLogin ? (
        menus.new ? null : (
          <div className='c'>
            <button
              className=' bg-blue-500 text-white shadow-lg hover:bg-blue-600 px-6 py-3'
              data-action='create-menu'
              onClick={handleClick}
            >
              创建菜单
            </button>
          </div>
        )
      ) : (
        <div className='w-full fixed bottom-0 '>
          <button
            className='w-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 px-6 py-4'
            data-action='login'
            onClick={handleClick}
          >
            登录创建菜单
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
