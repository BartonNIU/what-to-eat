import React from "react";
import { RiCloseFill } from "react-icons/ri";

function Recipe({ setIsModalOpen, dataProps }: any) {
  const handleClick = () => {
    setIsModalOpen(false);
  };
  const { status, data, error } = dataProps;

  return (
    <div className='bg-gray-200 fixed z-50 h-full w-full overflow-auto flex justify-center align-middle'>
      <div
        className='text-3xl absolute top-5 right-10 cursor-pointer'
        onClick={handleClick}
      >
        <RiCloseFill />
      </div>
      {status === "success" ? (
        <div className='recipe-cont'>
          <h3>{data.data.result.result.list[0].name}</h3>
          <p>{data.data.result.result.list[0].content}</p>
          <img
            src={data.data.result.result.list[0].pic}
            alt={data.data.result.result.list[0].name}
          />
          <div className='materials'>
            <ul>
              {data.data.result.result.list[0].material.map(
                (item: any, index: any) => (
                  <li key={index}>
                    <span>{item.mname} </span>
                    <span>{item.amount}</span>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className='processes'>
            <ul>
              {data.data.result.result.list[0].process.map(
                (item: any, index: any) => (
                  <li key={index}>
                    <span>{item.pcontent} </span>
                    <span>
                      <img src={item.pic} alt='process' />
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Recipe;
