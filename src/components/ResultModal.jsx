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
      style={{ backgroundImage: "url('/ministry.png')" }}
    >
      <div className="bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl p-8 w-full max-w-3xl mx-4 shadow-lg max-h-[80vh] overflow-hidden">
        <h2 className="text-xl font-extrabold text-white mb-6 text-center">
          Quiz Result
        </h2>
        <p className="mb-6 text-white font-bold text-base text-center">
          Your Score: {score}/{questions.length * 5}
        </p>
        <div className="mb-6 overflow-y-auto max-h-[40vh] px-4">
          <h3 className="text-base font-semibold text-white mb-4 text-center">
            Incorrect Answers
          </h3>
          <ul className="space-y-4">
            {wrongAnswers.map((question, index) => (
              <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-gray-800">
                  <span className="font-semibold text-indigo-600">
                    Question:
                  </span>{" "}
                  {question.question}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold text-indigo-600">
                    Your Answer:
                  </span>{" "}
                  {selectedOptions[questions.indexOf(question)]}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold text-indigo-600">
                    Correct Answer:
                  </span>{" "}
                  {question.answer}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleClose}
            className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
