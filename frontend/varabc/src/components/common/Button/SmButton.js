const bgColors = {
	red: "bg-red-400",
	green: "bg-emerald-400",
	basic: "bg-white"
};

const SmButton = ({text, onClick, bgColor}) => {
	const backgroundColor = bgColors[bgColor];
	let textColor, hoverColor;
	switch(bgColor){
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
		default:
	}
  return (
		<button onClick={onClick} className={`${backgroundColor} ${textColor} ${hoverColor} ml-1 mr-1 border text-[16px] w-[100px] h-[40px] p-1 font-bold rounded`}>{text}</button>
	);
};

export default SmButton;