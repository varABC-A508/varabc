import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTimes } from "@fortawesome/free-solid-svg-icons";

const InviteLink = ({ isOpen, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);
  const linkRef = useRef(null);

  const handleCopyClick = () => {
    linkRef.current.select();
    document.execCommand('copy');
    setIsCopied(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div className="bg-white p-8 rounded shadow-lg z-50">
        <div className="flex justify-end">
          <FontAwesomeIcon
            onClick={onClose}
            className="text-gray-700 w-5 h-5 cursor-pointer"
            icon={faTimes}
          />
        </div>
        <div className='flex items-center'>
          <p>
            <strong>Link:</strong>
            <input
              type="text"
              value={window.location.href}
              ref={linkRef}
              readOnly
              className="border rounded px-2 py-1 w-full"
            />
          </p>
          <FontAwesomeIcon
            onClick={handleCopyClick}
            className={`text-${isCopied ? 'gray' : '[#14b8a6]'} hover:text-${isCopied ? 'gray' : 'point'} cursor-pointer ml-3 w-5 h-5`}
            icon={faCopy}
          />
          {isCopied && (
            <div className="ml-3">
              <p>이제 친구들에게 링크를 보내 게임을 시작해 보세요!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InviteLink;
