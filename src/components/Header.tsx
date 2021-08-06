import React from "react";
import { AiOutlineMore } from "react-icons/ai";
import { VscArrowLeft } from "react-icons/vsc";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { action } = e.currentTarget.dataset;
    console.log(action);

    switch (action) {
      case "backward":
        history.goBack();
        break;
      case "settings":
        break;
      default:
        console.error(`Error, no such case: ${action}`);
    }
  };
  return (
    <div className='fixed w-full flex justify-between text-2xl p-2'>
      <div className='back-icon' data-action='backward' onClick={handleClick}>
        <VscArrowLeft />
      </div>
      <div className='settings' data-action='settings' onClick={handleClick}>
        <AiOutlineMore />
      </div>
    </div>
  );
}

export default Header;
