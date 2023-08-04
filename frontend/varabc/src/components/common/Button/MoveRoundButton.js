import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const bgColors = {
  red: "bg-red-400",
  gray: "bg-gray-400",
  green: "bg-[#5BDFCA]",
  basic: "bg-white",
};

const btnSizes = {
  big: "px-20 py-5 text-2xl",
  basic: "px-12 py-3 text-xl",
};



const MoveRoundButton = ({ to, text, bgColor, btnSize }) => {
  const navigate = useNavigate();
  const backgroundColor = bgColors[bgColor];
  const buttonSize = btnSizes[btnSize];
  let textColor, hoverColor;
  switch (bgColor) {
    case "basic":
      textColor = "text-gray-600";
      hoverColor = "hover:bg-gray-200";
      break;
    case "red":
      textColor = "text-white";
      hoverColor = "hover:bg-red-500";
      break;
    case "green":
      textColor = "text-white";
      hoverColor = "hover:bg-emerald-500";
      break;
    case "gray":
      textColor = "text-gray-700";
      hoverColor = "hover:bg-gray-200";
      break;
    default:
  }



  const handleClick = () => {
    console.log('페이지 이동');
    navigate(to);
  };

  return (

    <button onClick={handleClick} className={`${backgroundColor} ${textColor} ${hoverColor} flex justify-items-center items-center rounded-full ${buttonSize}`}>
      {text}
      <FontAwesomeIcon className={`${backgroundColor} ${textColor} ${hoverColor} flex ml-4`} icon={faArrowRightFromBracket} />
    </button>
  );

  }
  export default MoveRoundButton;
