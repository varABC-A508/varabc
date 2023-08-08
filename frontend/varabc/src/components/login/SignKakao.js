import React from "react";



const SignKakao = () => {

  // Kakao OAuth2 인증 요청을 보낼 URL 

  const redirect_uri = "https://localhost:8080/member/kakao-login";
  // const redirect_uri = "https://localhost:3000";
  const clientId = "b5f07ffc1619dad3d251b8239cbf6792";


  const oAuth2URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}&response_type=code`;

  function loginKakao() {
    window.location.href = oAuth2URL;
    console.log(oAuth2URL);
  }

  return (
    <div  className='flex flex-col items-center'>
      <img onClick = {loginKakao} className="w-20 h-20 rounded-lg border-4 border-coler-200"
        src = "images/kakao_logo.png"
        alt = "카카오 로그인" 
      />
       <p className='text-lg font-semibold'>Kakao</p>
    </div>
  )
}




export default SignKakao;
