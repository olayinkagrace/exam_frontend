"use client";
import { useState, useEffect } from "react";
import ResultModal from "./ResultModal";
import "react-toastify/dist/ReactToastify.css";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris",
  },
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    options: ["Harper Lee", "Jane Austen", "Mark Twain", "J.K. Rowling"],
    answer: "Harper Lee",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "O", "H"],
    answer: "Au",
  },
  {
    question: "Who is the CEO of Tesla?",
    options: ["Jeff Bezos", "Elon Musk", "Bill Gates", "Tim Cook"],
    answer: "Elon Musk",
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1 * 60); // 30 minutes in seconds
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
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
    // Check if the option has already been selected for the current question
    if (selectedOptions[currentQuestion] === option) {
      return; // Prevent multiple selections of the same option
    }

    setSelectedOptions((prev) => {
      const newSelections = [...prev];
      newSelections[currentQuestion] = option;
      return newSelections;
    });

    // If the selected option is correct, increment the score
    if (option === questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    } else {
      // If the selected option is incorrect, deduct the score if previously selected option was correct
      if (
        selectedOptions[currentQuestion] === questions[currentQuestion].answer
      ) {
        setScore((prevScore) => prevScore - 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    const email = localStorage.getItem("currentUser");

    const response = await fetch("https://bible-test.onrender.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, score }),
    });

    if (response.ok) {
      setShowModal(true);
    } else {
      alert("Error submitting score");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full text-center">
        <div className="mt-4 text-lg font-bold text-gray-700">
          Time Left: {Math.floor(timeLeft / 60)}:
          {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
        </div>
        <div className="text-2xl font-bold mb-4 text-gray-800">{`Question ${
          currentQuestion + 1
        } : ${questions[currentQuestion].question}`}</div>
        <div className="flex flex-col space-y-4">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswerOptionClick(option)}
              className={`p-2 rounded-lg transform transition-all duration-300 hover:scale-105 ${
                selectedOptions[currentQuestion] === option
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex justify-between w-full mt-6">
          {currentQuestion > 0 && (
            <button
              onClick={handlePrevious}
              className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-700 transform transition-all duration-300 hover:scale-105"
            >
              Previous
            </button>
          )}
          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-700 transform transition-all duration-300 hover:scale-105"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-700 transform transition-all duration-300 hover:scale-105"
            >
              Submit
            </button>
          )}
        </div>
      </div>
      {showModal && <ResultModal score={score} />}
    </div>
  );
};

export default Quiz;
