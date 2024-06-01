import { useRouter } from 'next/navigation';
import React from 'react';

const ResultModal = ({ score, incorrectQuestions }) => {
  const router = useRouter();

  const handleClose = () => {
    localStorage.removeItem('authToken');
    router.push('/');
  };

  const handleShowCorrections = () => {
    router.push('/corrections');
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Congratulations!</h2>
        <p className="text-lg mb-6 text-gray-600">
          You have completed the quiz.
          <br />
          Your Score: <span className="text-green-500 font-bold">{score}</span>
        </p>
        <button 
          onClick={handleShowCorrections} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2 transition duration-300 transform hover:scale-105"
        >
          Show Corrections
        </button>
        <button 
          onClick={handleClose} 
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
