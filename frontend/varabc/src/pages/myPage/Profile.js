import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNickname } from "../../redux/Reducer/userReducers";
import ProfileImage from "../../components/common/ProfileImage";
import profilepic from "../../img/test/profile1.png";
import { calculateTier } from "../../utils/problemUtil";
import axios from "axios";
import swal from 'sweetalert';

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [noData, setNoData] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUserData() {
      try {
        const userToken = localStorage.getItem("access-token");
        if (!userToken) {
          swal ( "이런" ,  "로그인부터 해주세요!" ,  "error" );
          navigate("/");
          return;
        }

        const response = await axios.get(
          `https://varabc.com:8080/member/getUserInfo`,
          {
            headers: {
              "access-token": userToken,
            },
          }
        );
        // console.log(response);

        if (response.status === 200) {
          setUser(response.data.userInfo);
          setNoData(false);
        }
      } catch (e) {
        console.error(e);
      }
    }

    getUserData();
    // eslint-disable-next-line
  }, []);

  const logout = () => {
    localStorage.removeItem("nickname");
    dispatch(setNickname(null));
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  const deleteUser = async () => {
    try {
      const userToken = localStorage.getItem("access-token");
      if (!userToken) {
        swal ( "이런" ,  "회원가입부터 해주세요!" ,  "error" );
        navigate("/");
        return;
      }
      const response = await axios.get(
        `https://varabc.com:8080/member/getUserInfo`,
        {
          headers: {
            "access-token": userToken,
          },
        }
      );
      const memberNo = response.data.userInfo.memberNo;

      const deleteRes = await axios.patch(
        `https://varabc.com:8080/member/delete/${memberNo}`
      );
      // console.log(deleteRes);
      if (deleteRes.status === 200) {
        logout();
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onDeleteClick = (e) => {
    swal({
      title: "정말 탈퇴하시겠습니까?", 
      icon: 'warning', 
      buttons: ['Cancel', 'Confirm'], 
      dangerMode: true, 
    }).then((confirmed) => {
      if (confirmed) {
        deleteUser();
        swal('탈퇴 성공', '탈퇴되셨습니다.', 'sucess')
      }
    })
  };

  if (noData) {
    return (
      <div className="w-full h-screen p-[40px]">
        <div className="text-white text-lg mt-[20px] mb-[20px] flex justify-center">
          프로필 정보가 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen p-[20px] flex flex-col items-center">
      <div className="w-9/12 text-white text-[36px] font-bold mt-[20px] mb-[20px] flex justify-start">
        {user.memberNickname || "유저"}의 프로필
      </div>
      <div className="w-9/12 flex items-center justify-between pr-[20px]">
        <ProfileImage
          size="x-large"
          imgLink={user.memberImage || profilepic}
          clickable={false}
        />
        <div className="bg-primary w-[620px] h-[360px] rounded-[15px] ms-4 p-[30px]">
          <div className="text-point">
            <div className="flex items-center">
              <img
                src={calculateTier(user.memberExp || 0)[0]}
                alt="티어"
                className="w-[75px] h-[75px] object-cover"
              />
              <div className="text-[48px] ml-[10px]">
                {calculateTier(user.memberExp || 0)[1]}
              </div>
            </div>
            <div className="text-[64px] font-bold">
              {user.memberNickname || "유저"}
            </div>
          </div>
          <div className="text-white text-[24px] mt-[20px]">
            <div className="mb-[40px]">이메일: {user.memberEmail || "-"}</div>
            {/* <div>{user.userProfileMessage}</div> */}
          </div>
        </div>
      </div>
      <div
        className="w-9/12 mt-[85px] text-gray-300 text-[16px] flex justify-start cursor-pointer hover:font-bold hover:text-red"
        onClick={onDeleteClick}
      >
        계정 탈퇴하기
      </div>
    </div>
  );
};
