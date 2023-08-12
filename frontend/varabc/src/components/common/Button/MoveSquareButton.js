import React from 'react';
import { useNavigate } from 'react-router-dom';

const bgColors = {
  gray: "bg-gray-400",
  green: "bg-[#5BDFCA]",
  basic: "bg-white",
  point: "bg-point",
};

const btnSizes = {
  big: "w-[358px] h-[100px]",
  basic: "w-[172px] h-[76px]",
};

const fontSizes = {
  big: "text-[64px]",
  basic: "text-[32px]",
};

const MoveSquareButton = ({ to, text, bgColor, btnSize, roomToken }) => {
  if(roomToken) console.log(roomToken);
  const navigate = useNavigate();
  const backgroundColor = bgColors[bgColor];
  const buttonSize = btnSizes[btnSize];
  const fontSize = fontSizes[btnSize];
  let textColor, hoverColor;
  switch (bgColor) {
    case "basic":
      textColor = "text-primary";
      hoverColor = "hover:bg-gray-200";
      break;
    case "green":
      textColor = "text-white";
      hoverColor = "hover:bg-emerald-500";
      break;
    case "gray":
      textColor = "text-gray-700";
      hoverColor = "hover:bg-gray-200";
      break;
      case "point":
      textColor = "text-white";
      hoverColor = "hover:bg-gray-200";
      break;
    default:
  }

  const onButtonClick = () => {
    navigate(to);
  };

  return (
    <button onClick={onButtonClick} type="button" className={`${backgroundColor} ${textColor} ${hoverColor} flex justify-center items-center rounded-lg font-bold ${buttonSize} ${fontSize}`}>
      {text}
    </button>
  );

};

export default MoveSquareButton;
