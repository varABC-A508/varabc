import {Outlet} from 'react-router-dom';
import { SideBar } from '../../components/common/sidebar';

export const MyPage = () => {
  return (
    <>
      <div>마이페이지</div>
      <div className='flex flex-row'>
        <SideBar />
        <Outlet className />
      </div>
    </>
  );
};