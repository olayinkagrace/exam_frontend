import React from "react";
import { useRouter } from 'next/navigation';

const ResultModal = ({ score, questions, selectedOptions }) => {
  const router = useRouter();
  
  const wrongAnswers = questions.filter(
    (question, index) => selectedOptions[index] !== question.answer
  );

  const handleClose = () => {
    localStorage.clear(); // Remove the authentication token
    router.push('/'); // Redirect to the home page
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
        <p className="mb-4">
          Your score: {score}/{questions.length *5}
        </p>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Incorrect Answers:</h3>
          <ul>
            {wrongAnswers.map((question, index) => (
              <li key={index} className="mb-2">
                <p>
                  <span className="font-semibold">Question:</span>{" "}
                  {question.question}
                </p>
                <p>
                  <span className="font-semibold">Your Answer:</span>{" "}
                  {selectedOptions[questions.indexOf(question)]}
                </p>
                <p>
                  <span className="font-semibold">Correct Answer:</span>{" "}
                  {question.answer}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleClose}
            className="bg-violet-500 text-white py-2 w-3/5 px-4 rounded-lg hover:bg-violet-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
