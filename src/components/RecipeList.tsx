import React from "react";
import { RiCloseFill, RiArrowUpLine } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";
import { useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getRecipesByName } from "../apis/recipes";
import { isError } from "../utils/validation";

function RecipeList({ setIsModalOpen, query }: any) {
  const history = useHistory();
  const location = useLocation();
  const { search } = location;
  //const query = new URLSearchParams(search);
  console.log(query);

  const { status, data, error } = useQuery("recipe", () =>
    // getRecipesByName(query.get("name") || "")
    getRecipesByName(query)
  );
  console.log("data", data);

  const recipeData = data?.data.result;
  const topRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    //history.goBack();
    setIsModalOpen(false);
  };

  const handleBackToTop = () => {
    // console.log("clicked");

    topRef.current && topRef.current.scrollIntoView({ behavior: "smooth" });
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
  };
  return (
    <div
      className={
        "bg-yellow-100 dark:bg-gray-800  dark:text-gray-100  fixed  z-50 h-full w-full overflow-auto flex justify-center " +
        (status === "success" && recipeData ? "" : "items-center")
      }
    >
      <div
        className='bg-yellow-300 text-white text-3xl absolute top-5 right-5 rounded-full cursor-pointer '
        onClick={handleClick}
      >
        <RiCloseFill />
      </div>
      {status === "success" ? (
        recipeData ? (
          <div className=' md:w-4/5 lg:w-2/5 2xl:w-1/3'>
            <div ref={topRef} className='w-full h-auto '>
              <img
                className='w-full h-full object-cover'
                src={recipeData.list[0].pic}
                alt={recipeData.list[0].name}
              />
            </div>
            <div className='p-5 '>
              <div className='text-2xl font-medium pb-5 '>
                {recipeData.list[0].name}
              </div>
              <div className='text-justify '>{recipeData.list[0].content}</div>

              <div className='pt-5'>
                <div className='font-semibold pb-2 text-left text-lg '>
                  用料
                </div>
                <ul>
                  {recipeData.list[0].material.map((item: any, index: any) => (
                    <li
                      key={index}
                      className='text-ml flex justify-between align-middle py-2 border-b border-gray-300'
                    >
                      <span>{item.mname} </span>
                      <span>{item.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='pt-5'>
                <ul>
                  {recipeData.list[0].process.map((item: any, index: any) => (
                    <li key={index} className='border-b border-gray-300 py-2'>
                      <div className='font-semibold pb-2 text-left  '>
                        步骤 {index + 1}
                      </div>
                      <div className='w-full h-auto'>
                        <img
                          className='w-full h-full'
                          src={item.pic}
                          alt='process'
                        />
                      </div>
                      <div className='text-left py-2'>{item.pcontent} </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className='text-3xl font-bold text-gray-500 dark:text-yellow-200 flex justify-end p-5 cursor-pointer'
              onClick={handleBackToTop}
            >
              <RiArrowUpLine />
            </div>
          </div>
        ) : (
          <div className='h-10 '>啊，没有找到相关的菜谱，换一个吧 :(</div>
        )
      ) : error ? (
        <div>{error instanceof Error && error.message}</div>
      ) : (
        <div>
          <div className=' text-5xl flex justify-center animate-bounce scale-150  mb-10'>
            <IoFastFoodOutline />
          </div>
          <p>稍等片刻，加载中...</p>
        </div>
      )}
    </div>
  );
}

export default RecipeList;
