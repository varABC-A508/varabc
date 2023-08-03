import {Outlet} from 'react-router-dom';

export const Battle = () => {
  return (
    <>
      <div>배틀 화면</div>
      <Outlet />
    </>
  );
}

export default Battle;