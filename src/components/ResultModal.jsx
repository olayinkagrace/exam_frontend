import React from 'react';

const ResultModal = ({ score }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-2xl mb-4">Quiz Completed!</h2>
        <p className="text-lg">Your Score: {score}</p>
        <button onClick={() => window.location.reload()} className="mt-4 bg-blue-500 text-white p-2 rounded">Close</button>
      </div>
    </div>
  );
};

export default ResultModal;
