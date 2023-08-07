import React from 'react';

const Modal = ({ isOpen, onClose}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div className="bg-white p-8 rounded shadow-lg z-50">
        <h2 className="text-2xl font-bold mb-4">Modal Title</h2>


    <button
      className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      onClick={onClose}
    >
      Close
    </button>
  </div>
</div>
  );
};

export default Modal;