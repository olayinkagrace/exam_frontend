import { useRouter } from 'next/navigation';
import React from 'react';


const ResultModal = ({ score }) => {
  const router = useRouter();

  const handleClose = () => {
    // Clear user session or authentication token here
    // For example, if you are using localStorage:
    localStorage.removeItem('authToken');

    // Redirect to login page
    router.push('/login');
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Quiz Completed!</h2>
        <p className="text-xl mb-6 text-gray-600">
          Your Score: <span className="text-green-500 font-bold">{score}</span>
        </p>
        <button 
          onClick={handleClose} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
