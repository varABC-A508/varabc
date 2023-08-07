import React, { useState } from 'react';
import Modal from './Modal';

const PageTest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div>
      <button onClick={handleOpenModal} className="bg-blue-500 text-white px-4 py-2 rounded">
        Open Modal
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default PageTest;