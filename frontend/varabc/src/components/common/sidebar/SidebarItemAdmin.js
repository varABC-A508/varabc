import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser, faChartColumn, faUserGroup, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";



const SidebarItemAdmin = ({to, text, icon}) => {
    const iconList = {
        user: faUser,
        statistics: faChartColumn,
        review: faCommentDots,
        friend: faUserGroup,
        problem: faFileLines, 

    };
    return (
        <Link to={'/admin/' + to} className="flex items-center mb-[20px]">
            <FontAwesomeIcon icon={iconList[icon]} className="text-point text-[25px] mr-[20px]"  />
            <div className="w-full h-[60px] flex items-center justify-start text-white text-[24px] font-bold">{text}</div>
        </Link>
    );
};

export default SidebarItemAdmin;