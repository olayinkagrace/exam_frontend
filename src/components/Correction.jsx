import React from 'react';

const Corrections = () => {
  // Mock data of incorrect questions and their correct answers
  const incorrectQuestions = [
    {
      question: "What is the capital of France?",
      selectedAnswer: "Berlin",
      correctAnswer: "Paris"
    },
    {
      question: "What is 2 + 2?",
      selectedAnswer: "3",
      correctAnswer: "4"
    },
    // Add more incorrect questions here if needed
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Corrections</h1>
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        {incorrectQuestions.map((question, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-lg font-bold mb-2 text-gray-800">Question {index + 1}</h2>
            <p className="mb-2"><strong>Your Answer:</strong> {question.selectedAnswer}</p>
            <p><strong>Correct Answer:</strong> {question.correctAnswer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Corrections;
