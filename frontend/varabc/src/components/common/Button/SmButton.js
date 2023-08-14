const bgColors = {
	red: "bg-red",
	green: "bg-emerald-400",
	basic: "bg-white"
};

const SmButton = ({text, onClick, bgColor, type='button'}) => {
	const backgroundColor = bgColors[bgColor];
	let textColor, hoverColor;
	switch(bgColor){
		case "basic":
			textColor = "text-gray-600";
			hoverColor = "hover:bg-gray-200";
			break;
		case "red":
			textColor = "text-white";
			hoverColor = "hover:bg-red";
			break;
		case "green":
			textColor = "text-white";
			hoverColor = "hover:bg-emerald-500";
			break;
		default:
	}
  return (
		<button onClick={onClick} type={type} className={`${backgroundColor} ${textColor} ${hoverColor} ml-1 mr-1 border text-[16px] w-[100px] h-[40px] p-1 font-bold rounded`}>{text}</button>
	);
};

export default SmButton;