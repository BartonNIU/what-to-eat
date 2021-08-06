import React from "react";
import { FiShare2 } from "react-icons/fi";
import { RiShareForwardLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";

function Share() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const handleShare = () => {
    //console.log(window.location, window.location.hostname);
    if (navigator.share) {
      navigator
        .share({
          title: query.get("name") || "",
          //text: name + " " + window.location.href, //`${name} ${window.location.hostname}/panel/${id}`,
          url: window.location.href,
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
