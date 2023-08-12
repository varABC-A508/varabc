import React from 'react';

const ReviewCard = () => {
  const colors = [
    'bg-blue-300',
    'bg-green-300',
    'bg-yellow-300',
    'bg-indigo-300',
    'bg-pink-300',
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className={`p-4 rounded-lg ${randomColor}`}>
      <h2 className="text-lg font-bold mb-2">친구</h2>
    </div>
  );
};

export default ReviewCard;