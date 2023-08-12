import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Login } from '../../../pages/myPage/login/Login';

export const Nav = () => {

  const [nickname, setNickname] = useState(localStorage.getItem('nickname'));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('nickname');
    setNickname(null);
    window.location.reload();
  }

  useEffect(() => {
    localStorage.setItem('nickname', nickname);
  }, [nickname]);

  return (
    <div className="flex flex-wrap flex-row items-center justify-between w-full h-[80px] bg-primaryDark text-white">
      <div className="w-20% pl-10">
        <Link to="/" className="font-bold text-4xl">
          <span>변수명</span>
          <span> abc</span>
        </Link>
      </div>
      <div className="w-[480px] flex flex-row align-center justify-between">
        <Link to="/battle" className="font-bold text-2xl">
          코드 배틀
        </Link>
        <Link to="/problem" className="font-bold text-2xl">
          문제
        </Link>
        <Link to="/tier" className="font-bold text-2xl">
          티어
        </Link>
      </div>
      <div className="w-20% pr-10">
        {(nickname === "null") || (nickname === null) || (nickname === (undefined)) || (nickname === "" )? (
          <div>
            <button
              onClick={handleOpenModal}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
            <Login isOpen={isModalOpen} onClose={handleCloseModal} />
          </div>
        ) : (
          <div>
            <div className="text-xl">환영합니다</div>
            <div className="text-2xl">
              <span className="font-bold">{nickname}</span>
              <span>님!</span>
              <button onClick={logout}>로그아웃</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};