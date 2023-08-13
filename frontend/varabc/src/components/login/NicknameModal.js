import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector} from 'react-redux';
import { setNickname } from "../../redux/Reducer/userReducers";

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
      alert("현재 서버가 아파서 조금 이따가 시도해주세요!" + err);
    })
  };

  const handleSave = () => {
    if (nicknameCheck) {
      handleModalSave();
    }
  };

  const handleModalSave = () => {
    // TODO: 최종 빌드 시 localstrage 변경
    sessionStorage.setItem('nickname', nickname);
    const accessToken = sessionStorage.getItem("access-token");
    // accessToken과 nickname을 이용하여 백엔드에 요청을 보낼 수 있음
    if (accessToken && nickname) {
      axios.post('https://varabc.com:8080/member/changeNickname', {
        "memberNickname": nickname
      }, {
        headers: {
          "access-token": accessToken
        }
      }).then(() => {
        isOpen(false);
        onClose();
      }).catch((err) => {
        alert("지금은 서버가 아파요! 나중에 다시 시도해주세요!" + err);
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
            <button
              className="mt-4 px-4 py-2 bg-green text-black rounded z-60"
              onClick={checkNickname}
            >
              중복 검사
            </button>
            {nicknameCheck ? <p>사용 가능</p> : <p>사용 불가</p>}
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-black rounded z-60"
              onClick={handleSave}
            >
              확인
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NicknameModal;
