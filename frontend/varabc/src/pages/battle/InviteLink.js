import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faXmark } from "@fortawesome/free-solid-svg-icons";

const Link = ({ isOpen, onClose }) => {

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
        <div className="flex justify-end ">
          <FontAwesomeIcon onClick={onClose} className='text-gray-700 w-10 h-10' icon={faXmark} />
        </div>
        <div className='flex '>
          <p>
            <strong>Link:</strong> <input type="text" value={window.location.href} ref={linkRef} readOnly />
          </p>
          <FontAwesomeIcon onClick={handleCopyClick} icon={faCopy} />
          <p>{isCopied ? 'Copied!' : 'Copy'}</p>
        </div>
      </div>
    </div>
  );
};

export default Link;