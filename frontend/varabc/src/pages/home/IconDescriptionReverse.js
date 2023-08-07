
const IconDescriptionReverse = ({url, alt, descTop, descBottom}) => {
    return (
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-center">
          <div className="text-[24px] font-bold text-primary">{descTop}</div>
          <div className="text-[24px] font-bold text-primary">{descBottom}</div>
        </div>
        <img src={url} className="w-[150px] h-[150px]" alt={alt} />
      </div>
    );
  }
  
  export default IconDescriptionReverse;