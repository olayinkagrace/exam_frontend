"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ResultModal from "./ResultModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sections } from "./question"; // Import sections from questions.js

const Quiz = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState(Array(sections.length).fill(0));
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(50 * 60); 
  const [selectedOptions, setSelectedOptions] = useState(
    sections.map((section) => Array(section.questions.length).fill(null))
  );
  const router = useRouter();
  const timerRef = useRef();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      router.push("/"); 
    }
  }, [router]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          setTimeout(() => {
            handleSubmit(); // Automatically submit when time runs out
          }, 100); // 100ms delay
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current); // Clean up the timer on component unmount
  }, []);

  const handleAnswerOptionClick = (option) => {
    const currentQuestions = sections[currentSection].questions;

    if (selectedOptions[currentSection][currentQuestion] === option) {
      return; // Prevent multiple selections of the same option
    }

    setSelectedOptions((prev) => {
      const newSelections = [...prev];
      newSelections[currentSection][currentQuestion] = option;
      return newSelections;
    });

    // Calculate the score for the current question
    const isCorrect = option === currentQuestions[currentQuestion].answer;
    const scoreChange = isCorrect ? 5 : -1;

    // Update the score for the current section
    setScores((prevScores) => {
      const newScores = [...prevScores];
      newScores[currentSection] += scoreChange;
      console.log("Updated Scores:", newScores); // Debugging: Log updated scores
      return newScores;
    });
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    } else if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
      setCurrentQuestion(sections[currentSection - 1].questions.length - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < sections[currentSection].questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else if (currentSection < sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
      setCurrentQuestion(0);
    }
  };

  const handleSubmit = async () => {
    console.log("handleSubmit called"); // Debug log to check if this gets called automatically

    const email = localStorage.getItem("currentUser");

    if (!email) {
      // console.error("No email found in local storage");
      // toast.error("User email is not available");
      return;
    }

    // Double-check the scores before submission
    console.log("Scores being submitted:", scores);

    const payload = {
      email,
      scores: sections.map((section, index) => ({
        title: section.title,
        score: scores[index],
      })),
    };

    console.log("Submitting the following payload:", payload); // Log payload to check data

    try {
      const response = await fetch(
        "https://exam-backend-ubjk.onrender.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        console.log("Submission successful");
        setShowModal(true);
        localStorage.removeItem("currentUser");
      } else {
        const errorData = await response.json();
        console.error("Error submitting score:", errorData);
        toast.error("Error submitting score");
      }
    } catch (error) {
      console.error("An error occurred while submitting the score:", error);
      toast.error("An error occurred while submitting the score");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/ministry.png')" }}
    >
      <div className="bg-white bg-opacity-90 shadow-lg rounded-lg p-6 max-w-3xl w-full text-center">
        <div className="mt-4 text-lg font-bold text-gray-700">
          Time Left: {Math.floor(timeLeft / 60)}:
          {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
        </div>
        <div className="text-2xl font-bold mb-4 text-gray-800">
          Section: {sections[currentSection].title}
        </div>
        <div className="text-xl font-semibold mb-6 text-gray-700">
          {`Question ${currentQuestion + 1} of ${
            sections[currentSection].questions.length
          }`}
        </div>
        <div className="text-2xl font-bold mb-4 text-gray-800">
          {`Question ${currentQuestion + 1} : ${
            sections[currentSection].questions[currentQuestion].question
          }`}
        </div>
        <div className="flex flex-col space-y-4">
          {sections[currentSection].questions[currentQuestion].options.map(
            (option) => (
              <button
                key={option}
                onClick={() => handleAnswerOptionClick(option)}
                className={`p-2 rounded-lg transform transition-all duration-300 hover:scale-105 ${
                  selectedOptions[currentSection][currentQuestion] === option
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-700"
                }`}
              >
                {option}
              </button>
            )
          )}
        </div>
        <div className="flex justify-between w-full mt-6">
          {(currentQuestion > 0 || currentSection > 0) && (
            <button
              onClick={handlePrevious}
              className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-700 transform transition-all duration-300 hover:scale-105"
            >
              Previous
            </button>
          )}
          {currentQuestion < sections[currentSection].questions.length - 1 ||
          currentSection < sections.length - 1 ? (
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
      {showModal && (
        <ResultModal
          score={scores.reduce((a, b) => a + b, 0)} // total score
          questions={sections.flatMap((section) => section.questions)} // all questions
          selectedOptions={selectedOptions.flat()} // all selected options
        />
      )}
    </div>
  );
};

export default Quiz;
