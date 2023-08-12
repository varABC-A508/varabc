import React from 'react';

import GitHubLogo from "../../img/github_logo.png"

const SignGitHub = () => {

  // GitHub OAuth2 인증 요청을 보낼 URL 
  const redirect_uri = "https://varabc.com:8080/member/github-login";
  const clientId = "9067acb2a2d736dfa65f";
  const oAuth2URL = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user&redirect_uri=${redirect_uri}`;

  function loginGitHub() {
    window.location.href = oAuth2URL;
  }

  return (
    <div className='flex flex-col items-center'>
      <img onClick={loginGitHub} className="w-20 h-20 rounded-lg border-4 border-coler-200"
        src={ GitHubLogo }
        alt="깃헙 로그인"
      />
      <p className='text-lg text-black font-semibold'>GitHub</p>
    </div>
  );
};

export default SignGitHub;