import React, { useState } from 'react';
import axios from 'axios';

const NicknameModal = ({ isOpen, onClose, onSave }) => {
  console.log('>>열렸다', isOpen);
  const [nickname, setNickname] = useState('');
  const [NicknameCheck, setNicknameCheck] = useState(false);

  const checkNickname = async () => {
    try {
      console.log(">>>>닉네임 체크");
      // 경로 확인 필요
      const api = "https://varabc.com:8080/member/checkNickname";
      const requestBody = {
        memberNickname: nickname,
      };

      axios.post(api, requestBody)
        .then(response => {
          console.log('>>>>응답왔어', response);
          setNicknameCheck(true);
        })

    } catch (error) {
      console.log(error);
    }
  }

  const handleSave = () => {
    console.log('>>>저장');
    onSave(nickname);
    onClose();
  };

  if (!isOpen) return null;
  else {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        <div className="bg-white p-8 rounded shadow-lg z-50">
          <h2 className="text-2xl font-bold mb-4">닉네임 입력</h2>
          <input className='border'
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button className="mt-4 px-4 py-2 bg-green text-black rounded z-60" onClick={checkNickname}>중복 검사</button>
          {NicknameCheck ? <p>사용 가능</p> : <p>사용 불가</p>}
          <button className="mt-4 px-4 py-2 bg-blue-500 text-black rounded z-60" onClick={handleSave}>확인</button>
        </div>
      </div>
    );
  }

};

export default NicknameModal;
