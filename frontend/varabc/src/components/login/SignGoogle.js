import React from "react";

import GoogleLogo from "../../img/google_logo.png"

const SignGoogle = () => {

  // Google OAuth2 인증 요청을 보낼 URL 

  const redirect_uri = "https://varabc.com:8080/member/googleLogin";
  const clientId = "1050412541304-1oh88pq5loji98ahf8fi7vdd5l94s44s.apps.googleusercontent.com";

  //token
  // const oAuth2URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirect_uri}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email`;

  //code
  const oAuth2URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirect_uri}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email profile`;


  function loginGoogle() {
    window.location.href = oAuth2URL;
  }

  return (
    <div  className='flex flex-col items-center cursor-pointer'>
      <img onClick={loginGoogle} className="w-20 h-20 rounded-lg border-4 border-coler-200"
        src={ GoogleLogo }
        alt="구글 로그인"
      />
       <p className='text-lg text-black font-semibold'>Google</p>
    </div>
  )
}




export default SignGoogle;
