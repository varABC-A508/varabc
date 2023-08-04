import {Link} from 'react-router-dom';

export const Nav = () => {
  return (
    <div className='flex flex-wrap flex-row align-center justify-between w-full'>
      <div className='w-20%'>
        <Link to="/" className='font-bold text-2xl'>변수명abc</Link>
      </div>
      <div className='w-60% flex flex-row align-center'>
        <Link to="/battle" className='mr-4'>코드 배틀</Link>
        <Link to="/problems" className='mr-4'>문제</Link>
        <Link to="/tier" className='mr-4'>티어</Link>
      </div>
      <div className='w-20%'>
        {<Link to="/myPage/profile">
          <div>환영합니다</div>
          <div>DP조아님!</div>
          </Link>}
      </div>
    </div>
  );
};