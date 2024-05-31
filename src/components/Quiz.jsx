"use client"

import { useState, useEffect } from 'react';
import ResultModal from './ResultModal';

const questions = [
  { question: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'], answer: 'Paris' },
  { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: '4' },
  { question: 'Who wrote "To Kill a Mockingbird"?', options: ['Harper Lee', 'Jane Austen', 'Mark Twain', 'J.K. Rowling'], answer: 'Harper Lee' },
  { question: 'What is the chemical symbol for gold?', options: ['Au', 'Ag', 'O', 'H'], answer: 'Au' },
  { question: 'Who is the CEO of Tesla?', options: ['Jeff Bezos', 'Elon Musk', 'Bill Gates', 'Tim Cook'], answer: 'Elon Musk' },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerOptionClick = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowModal(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async () => {
    const user = localStorage.getItem('currentUser');
    const response = await fetch('https://bible-test.onrender.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: user, score })
    });

    if (response.ok) {
      setShowModal(true);
    } else {
      alert('Error submitting score');
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="text-2xl mb-4">{questions[currentQuestion].question}</div>
      {questions[currentQuestion].options.map((option) => (
        <button key={option} onClick={() => handleAnswerOptionClick(option)} className="bg-blue-500 text-white p-2 rounded m-2">
          {option}
        </button>
      ))}
      <div className="flex justify-between w-full max-w-md mt-4">
        <button onClick={handlePrevious} className="bg-gray-500 text-white p-2 rounded" disabled={currentQuestion === 0}>
          Previous
        </button>
        <button onClick={handleNext} className="bg-gray-500 text-white p-2 rounded" disabled={currentQuestion === questions.length - 1}>
          Next
        </button>
        <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded">
          Submit
        </button>
      </div>
      <div className="mt-4 text-lg">
        Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
      </div>
      {showModal && <ResultModal score={score} />}
    </div>
  );
};

export default Quiz;
