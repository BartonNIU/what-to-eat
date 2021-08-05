import React, { useState } from "react";
import { combinedMeals } from "../constants/meals";
import { AiOutlineMore } from "react-icons/ai";
import { VscArrowLeft } from "react-icons/vsc";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";

function Dashboard() {
  const history = useHistory();
  const [defaultMeals, setDefaultMeals] = useState(combinedMeals);
  const [editStatus, setEditStatus] = useState<{ [key: string]: boolean }>({
    home: false,
    restaurant: false,
  });

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { action, name } = e.currentTarget.dataset;
    console.log(action);

    switch (action) {
      case "edit":
        if (name) {
          setEditStatus((prev) => ({ ...prev, [name]: !prev[name] }));
        }
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
      setDefaultMeals((prev) => ({
        ...prev,
        [key]: prev[key].filter((item, ind) => ind !== +index),
      }));
    }
  };

  return (
    <div className=''>
      <Header />

      <div className=''>
        {Object.entries(defaultMeals).map(([key, meals]) => (
          <div className='m-5' key={key}>
            <div className='flex justify-between text-xl mb-3'>
              <span> {key === "home" ? "家庭菜单" : "下馆子菜单"}</span>
              <span
                className='bg-gray-300 text-xs px-3 py-1 rounded-full'
                data-action='edit'
                data-name={key}
                onClick={handleClick}
              >
                {editStatus[key] ? "退出编辑" : "编辑"}
              </span>
            </div>
            <ul className='flex  justify-start items-start overflow-x-auto'>
              {meals.map((item, index) => (
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
                    {editStatus[key] && "X"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className='text-center'>
        <button
          className='bg-blue-500 text-white hover:bg-blue-600 px-6 py-3'
          data-action='login'
          onClick={handleClick}
        >
          登录创建更多菜单
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
