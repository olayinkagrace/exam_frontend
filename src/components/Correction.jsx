"use client"
import React, { useEffect, useState } from 'react';

const Corrections = () => {
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);

  useEffect(() => {
    const savedWrongAnswers = localStorage.getItem('wrongAnswers');
    if (savedWrongAnswers) {
      setIncorrectQuestions(JSON.parse(savedWrongAnswers));
    }
  }, []);

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
