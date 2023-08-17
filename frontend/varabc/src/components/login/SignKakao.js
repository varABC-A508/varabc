import React from "react";

import KakaoLogo from "../../img/kakao_logo.png";

const SignKakao = () => {
  // Kakao OAuth2 인증 요청을 보낼 URL

  const redirect_uri = "https://varabc.com:8080/member/kakaoLogin";
  const clientId = "b5f07ffc1619dad3d251b8239cbf6792";
  const oAuth2URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}&response_type=code`;

  function loginKakao() {
    window.location.href = oAuth2URL;
  }

  return (
    <div className="flex flex-col items-center cursor-pointer">
      <img
        onClick={loginKakao}
        className="w-20 h-20 rounded-lg border-4 border-coler-200"
        src={KakaoLogo}
        alt="카카오 로그인"
      />
      <p className="text-lg text-black font-semibold">Kakao</p>
    </div>
  );
};

export default SignKakao;
