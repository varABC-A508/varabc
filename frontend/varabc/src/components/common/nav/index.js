import {Link} from 'react-router-dom';
import Profile from '../ProfileImage';
import profile2 from '../../../img/test/profile2.png';

export const Nav = () => {
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
      <div className="w-20% pr-10 flex">
        <Profile size="small" imgLink={profile2} />
        {
          <Link to="/myPage/profile">
            <div className="flex flex-col ml-[20px]">
              <div className="text-xl">환영합니다</div>
              <div className="text-2xl">
                <span className="font-bold">DP조아</span>
                <span>님!</span>
              </div>
            </div>
          </Link>
        }
      </div>
    </div>
  );
};