import React from "react";
import { RiCloseFill } from "react-icons/ri";

function Recipe({ setIsModalOpen, dataProps }: any) {
  const handleClick = () => {
    setIsModalOpen(false);
  };
  const { status, data, error } = dataProps;

  return (
    <div className='bg-yellow-100 dark:bg-gray-800  dark:text-white fixed z-50 h-full w-full overflow-auto flex justify-center align-middle'>
      <div
        className='bg-blue-300 text-white text-3xl fixed top-5 right-5 cursor-pointer '
        onClick={handleClick}
      >
        <RiCloseFill />
      </div>
      {status === "success" ? (
        <div className='recipe-cont'>
          <div className='w-full h-auto'>
            <img
              className='w-full h-full object-cover'
              src={data.data.result.result.list[0].pic}
              alt={data.data.result.result.list[0].name}
            />
          </div>
          <div className='p-5 '>
            <div className='text-2xl font-medium pb-5'>
              {data.data.result.result.list[0].name}
            </div>
            <div className='text-justify '>
              {data.data.result.result.list[0].content}
            </div>

            <div className='pt-5'>
              <div className='font-semibold pb-2 text-left text-lg '>用料</div>
              <ul>
                {data.data.result.result.list[0].material.map(
                  (item: any, index: any) => (
                    <li
                      key={index}
                      className='text-ml flex justify-between align-middle py-2 border-b border-gray-300'
                    >
                      <span>{item.mname} </span>
                      <span>{item.amount}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className='pt-5'>
              <ul>
                {data.data.result.result.list[0].process.map(
                  (item: any, index: any) => (
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
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <div>加载中...</div>
      )}
    </div>
  );
}

export default Recipe;
