import ProblemList from '../../components/common/list/ProblemList'
import SmButton from "../../components/common/Button/SmButton";
import { useNavigate } from 'react-router-dom';

const AdminProblemList = () => {

  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/admin/create')
  }

  return (
    <div className='flex flex-col items-center mx-auto py-0'>
      <div className='w-[1000px] flex justify-end mx-0 mt-4 py-0'>
        <SmButton text="등록" bgColor="green" onClick={handleClick} />
      </div>
      <ProblemList mode="admin" />
    </div>
  )

}

export default AdminProblemList; 