import React from 'react';

const SelectButton = ({ selectedSource, selectedDifficulty, onSourceSelect, onDifficultySelect }) => {
  const sources = [
    { label: '백준', value: 'backjoon' },
    { label: 'SWEA', value: 'swea' },
    { label: '정올', value: 'jungol' },
    { label: '기타', value: 'other' },
  ];

  const difficulties = [
    { label: '브론즈', value: 'bronze' },
    { label: '실버', value: 'silver' },
    { label: '골드', value: 'gold' },
    { label: '다이아', value: 'diamond' },
  ];

  return (
    <div className="container mx-auto mt-8 p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">옵션 선택</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* 출처 선택 */}
        <div>
          <label htmlFor="sourceSelect" className="block font-medium">
            출처
          </label>
          <select
            id="sourceSelect"
            className="p-[10px] bg-gray-50 border border-gray-300 text-gray-900 text-[20px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedSource}
            onChange={onSourceSelect}
          >
            <option value="">선택하세요</option>
            {sources.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 난이도 선택 */}
        <div>
          <label htmlFor="difficultySelect" className="block font-medium">
            난이도
          </label>
          <select
            id="difficultySelect"
            className="border p-2 text-black"
            value={selectedDifficulty}
            onChange={onDifficultySelect}
          >
            <option value="">선택하세요</option>
            {difficulties.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SelectButton;
