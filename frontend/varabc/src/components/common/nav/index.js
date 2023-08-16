import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Login } from '../../../pages/myPage/login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { setNickname } from '../../../redux/Reducer/userReducers';

export const Nav = () => {
  const dispatch = useDispatch();
  const nickname = useSelector((state) => state.user.nickname);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log('NAV의 닉네임: ' + nickname);
  }, [nickname]);

  const logout = () => {
    // TODO: 최종 빌드 시 localstrage 변경
    localStorage.removeItem('nickname');
    dispatch(setNickname(null));
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    if (location.pathname === '/battle') {
      setActiveTab('battle');
    } else if (location.pathname === '/problem') {
      setActiveTab('problem');
    } else if (location.pathname === '/tier') {
      setActiveTab('tier');
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-wrap flex-row items-center justify-between w-full h-[80px] bg-primaryDark text-white">
      <div className="w-20% pl-10">
        <Link to="/" className="font-bold text-4xl">
          <span>변수명</span>
          <span> abc</span>
        </Link>
      </div>
      <div className="w-[480px] flex flex-row align-center justify-between">
        <Link
          to="/battle"
          className={`font-bold text-2xl ${activeTab === 'battle' ? 'text-point' : ''}`}
        >
          코드 배틀
        </Link>
        <Link
          to="/problem"
          className={`font-bold text-2xl ${activeTab === 'problem' ? 'text-point' : ''}`}
        >
          문제
        </Link>
        <Link
          to="/tier"
          className={`font-bold text-2xl ${activeTab === 'tier' ? 'text-point' : ''}`}
        >
          티어
        </Link>
      </div>
      <div className="w-20% pr-10">
        {(nickname === "null") || (nickname === null) || (nickname === (undefined)) || (nickname === "") ? (
          <div>
            <button
              onClick={handleOpenModal}
              className="m-[5px] text-[25px] font-bold"
            >
              로그인
            </button>
            <Login isOpen={isModalOpen} onClose={handleCloseModal} />
          </div>
        ) : (
          <div>
            <div className="text-2xl">
              <span className="font-bold">{nickname}</span>
              <span>님!</span>
              <button className="m-[15px] text-[25px] font-bold" onClick={logout}>로그아웃</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};