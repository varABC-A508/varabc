import React from "react";

import NaverLogo from "../../img/naver_logo.png"

const SignNaver = () => {

  // Naver OAuth2 인증 요청을 보낼 URL 

  const redirect_uri = "https://varabc.com:8080/member/naver-login";
  const clientId = "hJcAv1JmHoHtXXOt91lO";
  const STATE = "false";
  const oAuth2URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&state=${STATE}&redirect_uri=${redirect_uri}`;

  function loginNaver() {
    window.location.href = oAuth2URL;
  }

  return (
    <div className='flex flex-col items-center'>
      <img onClick={loginNaver} className="w-20 h-20 rounded-lg border-4 border-coler-200"
        src={ NaverLogo }
        alt="네이버 로그인"
      />
       <p className='text-lg text-black font-semibold'>Naver</p>
    </div>
  )
}

export default SignNaver;