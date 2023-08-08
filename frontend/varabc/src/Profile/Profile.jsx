export default function Profile({
  size, 
  imgLink,
  isActive = true,
  clickable = true,
}) {

  const handleClick = e => {
    if (clickable) {
      console.log('clicked')
    }
  }

  const clickStyle = "cursor-pointer transition-[border-color] duration-300 hover:border-[#5BDFCA]"

  const sizeStyle = {
    "small": "w-[60px] h-[60px]", 
    "medium": "w-[120px] h-[120px]", 
    "large": "w-[180px] h-[180px]", 
    "x-large": "w-[360px] h-[360px]"
  }

  return (
    <div
      className={`box-border inline-flex overflow-hidden mx-auto my-0 border border-solid border-[#E3E3E3] rounded-[16px] ${sizeStyle[size]} ${clickable ? clickStyle : ""}`}
      onClick={handleClick}
    >
      <img
        className={`w-full h-full object-cover ${isActive ? "" : "brightness-50"}`}
        src={imgLink}
        alt="profile-image"
      />
    </div>
  );
}
