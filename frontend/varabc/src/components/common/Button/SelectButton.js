import React, { useState } from 'react';
import axios from 'axios';

const SelectButton = () => {
  const [selectedOption, setSelectedOption] = useState('option1'); 

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

//   const handleSendToBackend = () => {
//     if (selectedOption) {
//       axios.post('https://varabc.com/save-selected-option', { selectedOption })
//         .then(response => {
//           console.log('Successfully sent to backend:', response.data);
//         })
//         .catch(error => {
//           console.error('Error sending to backend:', error);
//         });
//     }
//   };

  return (
    <div className="p-4"> 
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="border rounded px-2 py-1"
      >
        <option value="option1">옵션 1</option>
        <option value="option2">옵션 2</option>
        <option value="option3">옵션 3</option>
      </select>
      <button
        // onClick={handleSendToBackend}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        완료
      </button>
    </div>
  );
};

export default SelectButton;
