import { useState } from "react";

const InviteLinkButton = () => {

  const [inviteMessage, setInviteMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setInviteMessage('URL이 클립보드에 복사되었습니다!');
        setShowMessage(true);

        setTimeout(() => {
          setShowMessage(false);
        }, 3000); // 3초 후에 알림 메시지가 사라짐
      })
      .catch((error) => {
        console.error('클립보드 복사 실패:', error);
      });
  };
    
  const handleCopyUrl = () => {
    const currentUrl = window.location.href;
    copyToClipboard(currentUrl);
  };

  return (
    <button
      onClick={handleCopyUrl}
      type="button"
      className={`bg-white text-primary flex justify-center items-center rounded-lg font-bold w-[358px] h-[100px] text-[64px]`}
    >
      {showMessage && <div className="notification">{inviteMessage}</div>}
      초대 URL
    </button>
  );
};

export default InviteLinkButton;