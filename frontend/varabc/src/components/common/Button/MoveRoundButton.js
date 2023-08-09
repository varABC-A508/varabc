import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const bgColors = {
  red: "bg-red-400",
  gray: "bg-gray-400",
  green: "bg-[#5BDFCA]",
  basic: "bg-white",
  point: "bg-point",
};

const btnSizes = {
  big: "w-[420px] text-2xl",
  basic: "px-12 py-3 text-xl",
};



const MoveRoundButton = ({ to, text, bgColor, btnSize }) => {
  const navigate = useNavigate();
  const backgroundColor = bgColors[bgColor];
  const buttonSize = btnSizes[btnSize];
  let textColor, hoverColor, childHoverColor;
  switch (bgColor) {
    case "basic":
      textColor = "text-gray-600";
      hoverColor = "hover:bg-gray-200";
      break;
    case "red":
      textColor = "text-white";
      hoverColor = "group-hover:bg-red-500";
      break;
    case "green":
      textColor = "text-white";
      hoverColor = "group-hover:bg-emerald-500";
      break;
    case "gray":
      textColor = "text-gray-700";
      hoverColor = "group-hover:bg-gray-200";
      break;
    case "point":
      textColor = "font-primary";
      break;
    default:
  }
  childHoverColor = "group-" + hoverColor;

  const handleClick = () => {
    console.log('페이지 이동');
    navigate(to);
  };

  return (

    <button onClick={handleClick} className={`${backgroundColor} ${textColor} ${hoverColor} group h-[100px] flex justify-center items-center text-[44px] font-bold rounded-full ${buttonSize}`}>
      {text}
      <FontAwesomeIcon className={`${backgroundColor} ${textColor} ${childHoverColor} flex ml-4`} icon={faArrowRightFromBracket} />
    </button>
  );

  }
  export default MoveRoundButton;