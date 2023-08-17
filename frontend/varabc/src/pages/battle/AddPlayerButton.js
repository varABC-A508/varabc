import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const AddPlayerButton = () => {
  return (
    <div className="flex justify-center items-center w-[370px] h-[120px] bg-white rounded-[16px]">
      <FontAwesomeIcon icon={faUser} className="text-gray-700 text-[60px]" />
    </div>
  );
};

export default AddPlayerButton;