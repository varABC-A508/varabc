import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const Link = () => {

  const [isCopied, setIsCopied] = useState(false);
  const linkRef = useRef(null);

  const handleCopyClick = () => {
    linkRef.current.select();
    document.execCommand('copy');
    setIsCopied(true);
  };

  return (
    <div className='flex '>
      <p>
        <strong>Link:</strong> <input type="text" value={window.location.href} ref={linkRef} readOnly />
      </p>
      <FontAwesomeIcon onClick={handleCopyClick} icon={faCopy} />
      <p>{isCopied ? 'Copied!' : 'Copy'}</p>
    </div>
  );
};

export default Link;