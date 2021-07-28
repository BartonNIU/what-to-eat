import React from "react";
import { RiCloseFill } from "react-icons/ri";

function Modal({ setIsModalOpen }: any) {
  const handleClick = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='bg-green-200 fixed z-50 h-screen w-full flex justify-center align-middle'>
      <div
        className='text-3xl absolute top-5 right-10 cursor-pointer'
        onClick={handleClick}
      >
        <RiCloseFill />
      </div>
      this is recipe
    </div>
  );
}

export default Modal;
