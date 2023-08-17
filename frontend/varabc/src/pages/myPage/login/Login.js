import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import SignGoogle from "../../../components/login/SignGoogle"
import SignKakao from "../../../components/login/SignKakao";
// import SignNaver from "../../../components/login/SignNaver";
// import SignGitHub from "../../../components/login/SignGitHub";

import VarabcLogo from "../../../img/varABC_logo.png";

export const Login = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-20 rounded-lg">
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div className="w-[500px] bg-[#94a3b8] p-20 rounded shadow-lg z-50">
        <div className="flex justify-end ">
          <FontAwesomeIcon onClick={onClose} className='text-gray-700 w-10 h-10 cursor-pointer hover:text-red' icon={faXmark} />
        </div>
        <h2 className="text-2xl text-black font-bold mb-4">varABC</h2>
        <hr />
        <img src={VarabcLogo } alt="로고" className="object-cover mt-4 mb-4" />
        <div className="flex justify-around">
          <SignGoogle />
          <SignKakao />
          {/* <SignNaver />
          <SignGitHub /> */}
        </div>
      </div>
    </div>
  );
};