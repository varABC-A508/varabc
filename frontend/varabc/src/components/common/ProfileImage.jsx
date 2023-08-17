const ProfileImage = ({
  size, 
  imgLink,
  isActive = true,
  clickable = true,
}) => {

  const handleClick = e => {
  }

  const clickStyle = "cursor-pointer transition-[border-color] duration-300 hover:border-[#5BDFCA]"

  const sizeStyle = {
    "small": "w-[60px] h-[60px]", 
    "medium": "w-[120px] h-[120px]", 
    "large": "w-[180px] h-[180px]", 
    "x-large": " w-[360px] h-[360px] "
  }

  return (
    <div
      className={`box-border inline-flex overflow-hidden border border-[2px] border-solid border-[#E3E3E3] rounded-[16px] ${sizeStyle[size]} ${clickable ? clickStyle : ""}`}
      onClick={handleClick}
    >
      <img
        className={`w-full h-full object-cover ${isActive ? "" : "brightness-50"}`}
        src={imgLink}
        alt="profile"
      />
    </div>
  );
}

export default ProfileImage;
