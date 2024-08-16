"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ResultModal from "./ResultModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sections } from "./question";

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
          }, 100);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const handleAnswerOptionClick = (option) => {
    const currentQuestions = sections[currentSection].questions;

    if (selectedOptions[currentSection][currentQuestion] === option) {
      return;
    }

    setSelectedOptions((prev) => {
      const newSelections = [...prev];
      newSelections[currentSection][currentQuestion] = option;
      return newSelections;
    });

    const isCorrect = option === currentQuestions[currentQuestion].answer;
    const scoreChange = isCorrect ? 5 : -1;

    setScores((prevScores) => {
      const newScores = [...prevScores];
      newScores[currentSection] += scoreChange;
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
    const email = localStorage.getItem("currentUser");

    if (!email) {
      return;
    }

    const payload = {
      email,
      scores: sections.map((section, index) => ({
        title: section.title,
        score: scores[index],
      })),
    };

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
        setShowModal(true);
        localStorage.removeItem("currentUser");
      } else {
        const errorData = await response.json();
        toast.error("Error submitting score");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the score");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4 py-8"
      style={{
        backgroundImage: "url('/som_6.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-white bg-opacity-90 shadow-xl rounded-lg p-4 max-w-2xl w-full text-center border border-gray-300">
        <div className="relative mb-4">
          <div
            className={`absolute inset-0 flex justify-center items-center text-base font-bold ${
              timeLeft <= 300 ? "text-red-600" : "text-gray-700"
            }`}
          >
            Time Left: {Math.floor(timeLeft / 60)}:
            {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
          </div>
          <div className="h-2 w-full bg-gray-300 rounded-full overflow-hidden mt-6">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{
                width: `${((50 * 60 - timeLeft) / (50 * 60)) * 100}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="text-2xl font-extrabold mb-4 text-gray-800">
          {`Section ${currentSection + 1}: ${sections[currentSection].title}`}
        </div>
        <div className="text-base font-semibold mb-3 text-gray-700">
          {`Question ${currentQuestion + 1} of ${
            sections[currentSection].questions.length
          }`}
        </div>
        <div className="text-xl font-bold mb-5 text-gray-800">
          {sections[currentSection].questions[currentQuestion].question}
        </div>
        <div className="flex flex-col space-y-3">
          {sections[currentSection].questions[currentQuestion].options.map(
            (option) => (
              <button
                key={option}
                onClick={() => handleAnswerOptionClick(option)}
                className={`p-2 rounded-md transform transition-all duration-300 hover:scale-105 shadow ${
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
              className="bg-gray-500 text-white text-base p-2 rounded-md hover:bg-gray-700 transform transition-all duration-300 hover:scale-105 shadow"
            >
              Previous
            </button>
          )}
          {currentQuestion < sections[currentSection].questions.length - 1 ||
          currentSection < sections.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-gray-500 text-white p-2 text-sm rounded-md hover:bg-gray-700 transform transition-all duration-300 hover:scale-105 shadow"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700 transform transition-all duration-300 hover:scale-105 shadow"
            >
              Submit
            </button>
          )}
        </div>
      </div>
      {showModal && (
        <ResultModal
          score={scores.reduce((a, b) => a + b, 0)}
          questions={sections.flatMap((section) => section.questions)}
          selectedOptions={selectedOptions.flat()}
        />
      )}
    </div>
  );
};

export default Quiz;
