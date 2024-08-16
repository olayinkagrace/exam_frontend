import React from "react";
import { useRouter } from "next/navigation";

const ResultModal = ({ score, questions, selectedOptions }) => {
  const router = useRouter();

  const wrongAnswers = questions.filter(
    (question, index) => selectedOptions[index] !== question.answer
  );

  const handleClose = () => {
    localStorage.clear(); // Remove the authentication token
    router.push("/"); // Redirect to the home page
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/som_7.png')" }}
    >
      <div className="bg-white bg-opacity-90 rounded-xl p-6 w-full max-w-2xl mx-4 shadow-2xl max-h-[80vh] overflow-hidden">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Quiz Result
        </h2>
        <p className="mb-4 text-gray-700 font-semibold text-lg text-center">
          Your Score: <span className="text-indigo-600">{score}</span> / {questions.length * 5}
        </p>
        <div className="mb-6 overflow-y-auto max-h-[40vh] px-4">
          {wrongAnswers.length > 0 ? (
            <>
              <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">
                Incorrect Answers
              </h3>
              <ul className="space-y-4">
                {wrongAnswers.map((question, index) => (
                  <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                    <p className="text-gray-800">
                      <span className="font-semibold text-indigo-600">Question:</span> {question.question}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-semibold text-red-600">Your Answer:</span> {selectedOptions[questions.indexOf(question)]}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-semibold text-green-600">Correct Answer:</span> {question.answer}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-lg font-semibold text-center text-green-600">
              Congratulations! You got all the answers correct.
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleClose}
            className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
