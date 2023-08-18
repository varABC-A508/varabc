import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector} from 'react-redux';
import { setNickname } from "../../redux/Reducer/userReducers";
import SmButton from "../common/Button/SmButton";
import swal from 'sweetalert';

const NicknameModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const nickname = useSelector((state) => state.user.nickname);
  const [nicknameCheck, setNicknameCheck] = useState(false);
  const [newNickname, setNewNickname] = useState("");

  useEffect(() => {
    console.log("입력한 닉네임: " + newNickname);
  }, [newNickname]);

  const checkNickname = () => {
    axios.post("https://varabc.com:8080/member/checkNickname", {
      "memberNickname": newNickname
    }).then((res) => {
      if (res.data === "already exist nickname") {
        setNicknameCheck(false); 
      } else {
        dispatch(setNickname(newNickname));
        setNicknameCheck(true); 
      }
    }).catch((err) => {
      swal ( "이런" ,  "중복된 닉네임입니다!",  "error" );
    })
  };

  const handleSave = () => {
    if (nicknameCheck) {
      handleModalSave();
    }
  };

  const handleModalSave = () => {
    localStorage.setItem('nickname', nickname);
    const accessToken = localStorage.getItem("access-token");
    // accessToken과 nickname을 이용하여 백엔드에 요청을 보낼 수 있음
    if (accessToken && nickname) {
      axios.post('https://varabc.com:8080/member/changeNickname', {
        "memberNickname": nickname
      }, {
        headers: {
          "access-token": accessToken
        }
      }).then((res) => {
        isOpen = false;
        onClose();
      }).catch((err) => {
        swal ( "이런" ,  "닉네임 DB 저장 에러!" + err,  "error" );
      });
    }
  };

  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div className="bg-white p-8 rounded shadow-lg z-50">
            <h2 className="text-2xl font-bold mb-4">닉네임 입력</h2>
            <input
              className="border"
              type="text"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
            /> 
            <SmButton onClick={checkNickname} text={"중복 검사"} bgColor={"green"} />
            {nicknameCheck ? <p>사용 가능</p> : <p>사용 불가</p>}
            <SmButton onClick={handleSave} text={"확인"} bgColor={"green"} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NicknameModal;
