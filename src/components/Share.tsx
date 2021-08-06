import React from "react";
import { FiShare2 } from "react-icons/fi";
import { RiShareForwardLine } from "react-icons/ri";

function Share({ name, id }: { name: string; id: number }) {
  const handleShare = () => {
    //console.log(window.location, window.location.hostname);

    if (navigator.share && id) {
      navigator
        .share({
          title: name,
          text: name + " " + window.location.href, //`${name} ${window.location.hostname}/panel/${id}`,
        })
        .then()
        .catch((error) => console.error(error));
    } else {
      console.error("Error, share is not supported");
    }
  };

  return (
    <div className='flex items-center ' onClick={handleShare}>
      <span className=''>
        <RiShareForwardLine />
      </span>
      <span className='text-base animate-ping'>分享</span>
    </div>
  );
}

export default Share;
